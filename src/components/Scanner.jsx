import React, { useEffect, useState, useRef } from 'react';
import Quagga from '@ericblade/quagga2';
import Card from './Card';
import Emoji from './Emoji';
import AiSearchPrompt from './AiSearchPrompt';
import { useOpenBeautyFacts } from '../hooks/useOpenBeautyFacts';
import './Scanner.css';

const Scanner = ({ onAnalyze, onAiRequest }) => {
  const [scanning, setScanning] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [cameraError, setCameraError] = useState(null);
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const scannerRef = useRef(null);
  const { searchProduct, loading, error: apiError } = useOpenBeautyFacts();

  const startScanner = async () => {
    setScanning(true);
    setCameraError(null);
    try {
      await Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            facingMode: "environment",
            aspectRatio: { min: 1, max: 2 }
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: 2,
        decoder: {
          readers: ["ean_reader", "code_128_reader", "upc_reader"]
        },
        locate: true,
      }, (err) => {
        if (err) {
          console.error(err);
          setCameraError("Impossibile accedere alla fotocamera. Verifica i permessi.");
          setScanning(false);
          return;
        }
        Quagga.start();
      });

      Quagga.onDetected(handleDetected);
    } catch (err) {
      console.error(err);
      setCameraError("Errore inizializzazione scanner.");
      setScanning(false);
    }
  };

  const stopScanner = () => {
    try {
      Quagga.stop();
      Quagga.offDetected(handleDetected);
    } catch (e) {
      // Ignore stop errors if already stopped
    }
    setScanning(false);
    if (scannerRef.current) {
      scannerRef.current.innerHTML = '';
    }
  };

  const handleDetected = (result) => {
    if (result && result.codeResult && result.codeResult.code) {
      setBarcode(result.codeResult.code);
      stopScanner();
    }
  };

  const handleSearch = async () => {
    if (!barcode) return;
    
    // Reset previous states
    setShowAiPrompt(false);

    const product = await searchProduct(barcode);
    if (product) {
      onAnalyze(product.productName, product.ingredientsText);
    } else {
      // Product not found -> Show Custom AI Prompt
      setShowAiPrompt(true);
    }
  };

  const handleConfirmAi = () => {
    setShowAiPrompt(false);
    if (onAiRequest) {
      onAiRequest(barcode);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scanning) {
        try {
          Quagga.stop(); 
        } catch(e) {}
        if (scannerRef.current) scannerRef.current.innerHTML = '';
      }
    };
  }, [scanning]);

  return (
    <Card title="Scanner Codice" icon={<Emoji name="Camera with Flash" fallback="📷" />} className="scanner-card">
      <div className="scanner-controls">
        {!scanning ? (
          <button className="btn btn-primary" onClick={startScanner}>
            Avvia Scanner
          </button>
        ) : (
          <button className="btn btn-danger" onClick={stopScanner}>
            Ferma Scanner
          </button>
        )}
      </div>

      {cameraError && <div className="error-message">{cameraError}</div>}

      <div 
        ref={scannerRef} 
        className={`scanner-viewport ${scanning ? 'active' : ''}`}
      />

      <div className="manual-input-group">
        <label htmlFor="barcode-input">O inserisci manualmente:</label>
        <div className="input-row">
          <input 
            id="barcode-input"
            type="text" 
            placeholder="123456789012"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="input-field"
          />
          <button 
            className="btn btn-secondary" 
            onClick={handleSearch}
            disabled={loading || !barcode}
          >
            {loading ? 'Cercando...' : <><Emoji name="Magnifying Glass Tilted Right" fallback="🔎" /> Cerca</>}
          </button>
        </div>
      </div>
      
      {apiError && <div className="error-message">Errore API: {apiError}</div>}

      {/* AI Search Prompt Modal */}
      <AiSearchPrompt 
        isOpen={showAiPrompt} 
        barcode={barcode}
        onClose={() => setShowAiPrompt(false)}
        onConfirm={handleConfirmAi}
      />
    </Card>
  );
};

export default Scanner;

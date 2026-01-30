import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { useLanguage } from '../context/LanguageContext';
import './OCRReader.css';
import Emoji from './Emoji';

const OCRReader = ({ onScanComplete }) => {
  const { t } = useLanguage();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setImage(URL.createObjectURL(img));
      processImage(img);
    }
  };

  const processImage = async (imgFile) => {
    setLoading(true);
    setProgress(0);
    setStatus(t('ocr.status_init'));

    try {
      // 1. Preprocess image for better OCR accuracy
      setStatus(t('ocr.status_optimize'));
      const optimizedImageBlob = await preprocessImage(imgFile);
      
      // 2. Run Tesseract
      const result = await Tesseract.recognize(
        optimizedImageBlob,
        'eng', 
        {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setProgress(Math.round(m.progress * 100));
              setStatus(t('ocr.status_scanning').replace('{percent}', Math.round(m.progress * 100)));
            } else {
              // Generic status fallback, or just ignore
              // setStatus(m.status); 
            }
          },
        }
      );

      const cleanedText = cleanText(result.data.text);
      if (!cleanedText) {
          throw new Error(t('ocr.error_no_text'));
      }
      
      onScanComplete(cleanedText);
      setLoading(false);
      setStatus(t('ocr.status_complete'));
    } catch (error) {
      console.error('OCR Error:', error);
      setStatus(error.message || t('ocr.error_generic'));
      setLoading(false);
    }
  };

  // ... (rest of methods)

  const cleanText = (text) => {
    return text
      .replace(/\n\s*\n/g, ', ')
      .replace(/\n/g, ' ')
      .replace(/[|]/g, 'l')
      .trim();
  };

  return (
    <div className="ocr-reader">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
        capture="environment"
      />

      <button 
        className="btn btn-secondary ocr-btn" 
        onClick={() => fileInputRef.current.click()}
        disabled={loading}
      >
        📸 {loading ? t('ocr.btn_scanning') : t('ocr.btn_scan')}
      </button>

      {loading && (
        <div className="ocr-progress">
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="status-text">{status}</span>
        </div>
      )}

      {image && !loading && (
        <div className="img-preview">
          <img src={image} alt="Scanned label" />
          <button className="clear-img" onClick={() => setImage(null)}>✕</button>
        </div>
      )}
    </div>
  );
};

export default OCRReader;

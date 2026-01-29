import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import './OCRReader.css';
import Emoji from './Emoji';

const OCRReader = ({ onScanComplete }) => {
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
    setStatus('Initializing OCR engine...');

    try {
      const result = await Tesseract.recognize(
        imgFile,
        'eng', // INCI is mostly Latin-based, English model works best
        {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setProgress(Math.round(m.progress * 100));
              setStatus(`Scanning: ${Math.round(m.progress * 100)}%`);
            } else {
              setStatus(m.status);
            }
          },
        }
      );

      const cleanedText = cleanText(result.data.text);
      onScanComplete(cleanedText);
      setLoading(false);
      setStatus('Complete!');
    } catch (error) {
      console.error('OCR Error:', error);
      setStatus('Error scanning image.');
      setLoading(false);
    }
  };

  const cleanText = (text) => {
    // Basic cleanup: remove extra newlines, fix common OCR errors in INCI
    return text
      .replace(/\n\s*\n/g, ', ') // Replace double newlines with commas
      .replace(/\n/g, ' ') // Replace single newlines with spaces
      .replace(/[|]/g, 'l') // Common error: | read as l
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
        capture="environment" // Prefer back camera on mobile
      />

      <button 
        className="btn btn-secondary ocr-btn" 
        onClick={() => fileInputRef.current.click()}
        disabled={loading}
      >
        📸 {loading ? 'Scanning...' : 'Scan Label (Beta)'}
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

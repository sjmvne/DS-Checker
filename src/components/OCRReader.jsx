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
      // 1. Preprocess image for better OCR accuracy
      setStatus('Optimizing image...');
      const optimizedImageBlob = await preprocessImage(imgFile);
      
      // 2. Run Tesseract
      const result = await Tesseract.recognize(
        optimizedImageBlob,
        'eng', 
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
      if (!cleanedText) {
          throw new Error("No text found. Try a clearer image.");
      }
      
      onScanComplete(cleanedText);
      setLoading(false);
      setStatus('Complete!');
    } catch (error) {
      console.error('OCR Error:', error);
      setStatus(error.message || 'Error scanning image.');
      setLoading(false);
    }
  };

  /**
   * Preprocesses image to improve OCR accuracy:
   * - Resize if too huge
   * - Grayscale
   * - High Contrast / Binarization simulation
   */
  const preprocessImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Resize to max 1500px width (balance speed/detail)
        const MAX_WIDTH = 1500;
        let width = img.width;
        let height = img.height;
        
        if (width > MAX_WIDTH) {
          height = (height * MAX_WIDTH) / width;
          width = MAX_WIDTH;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw image
        ctx.drawImage(img, 0, 0, width, height);
        
        // Get Pixel Data
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        // Apply Grayscale & Contrast
        for (let i = 0; i < data.length; i += 4) {
          // Grayscale (Luminosity method)
          const avg = 0.21 * data[i] + 0.72 * data[i + 1] + 0.07 * data[i + 2];
          
          // Contrast (Simple Thresholding)
          // If darker than 128 -> black, else white (Binarization)
          // Using 140 as threshold to catch faint text
          const color = avg < 140 ? 0 : 255;
          
          data[i] = color;     // R
          data[i + 1] = color; // G
          data[i + 2] = color; // B
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // Return blob
        canvas.toBlob((blob) => {
            resolve(blob);
        }, 'image/jpeg', 0.95);
      };
      
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
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

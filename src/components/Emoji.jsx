import React from 'react';
import { emojiManager } from '../data/emoji-manager';

const Emoji = ({ name, size = '1.2em', style = {}, className = '', fallback }) => {
  const url = emojiManager.getUrl(name);

  if (url) {
    return (
      <img 
        src={url} 
        alt={name} 
        className={`animated-emoji ${className}`} 
        style={{ 
          height: size, 
          width: 'auto', 
          verticalAlign: 'text-bottom', // Better alignment with text
          display: 'inline-block',
          ...style 
        }} 
      />
    );
  }

  // Fallback to static text/emoji if not found
  return <span className={`static-emoji ${className}`} style={{ fontSize: size, ...style }}>{fallback || name}</span>;
};

export default Emoji;

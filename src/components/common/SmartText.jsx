import React, { useMemo } from 'react';
import { useGlossary } from '../../hooks/useGlossary';
import { useGlossaryContext } from '../../context/GlossaryContext';

const SmartText = ({ children }) => {
  const { sortedTerms, termMap } = useGlossary();
  const { openTerm } = useGlossaryContext();

  const processedContent = useMemo(() => {
    if (!children || typeof children !== 'string' || sortedTerms.length === 0) {
      return children;
    }

    // Escape special regex characters in terms
    const escapedTerms = sortedTerms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    
    // Create a massive regex to match any of the terms, word boundary enforced
    // "gi" for global and case-insensitive
    const regex = new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi');

    const parts = children.split(regex);
    
    return parts.map((part, index) => {
      // Check if this part is a term (case-insensitive check)
      const lowerPart = part.toLowerCase();
      if (termMap.has(lowerPart)) {
        const termData = termMap.get(lowerPart);
        // Display the original text (part) but use the canonical term data for the popup
        return (
          <span 
            key={index} 
            className="glossary-term" 
            onClick={(e) => {
              e.stopPropagation();
              openTerm(termData);
            }}
            title="Click for definition"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  }, [children, sortedTerms, termMap, openTerm]);

  return <>{processedContent}</>;
};

export default SmartText;

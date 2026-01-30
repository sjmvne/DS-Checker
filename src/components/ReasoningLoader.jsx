import React, { useState, useEffect } from 'react';
import Emoji from './Emoji';

const ReasoningLoader = () => {
  const steps = [
    { text: "Mi connetto al cervello neurale...", emoji: "🧠" },
    { text: "Trascrivo i dati del prodotto...", emoji: "📝" },
    { text: "Cerco nei database globali...", emoji: "🌍" },
    { text: "Analizzo gli ingredienti...", emoji: "🔬" },
    { text: "Confronto con la letteratura scientifica...", emoji: "📚" },
    { text: "Formulo il verdetto finale...", emoji: "⚖️" }
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000); // Change step every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="reasoning-loader fade-in">
        <div className="reasoning-icon bounce">
            <Emoji name="Step Icon" fallback={steps[currentStep].emoji} />
        </div>
        <p className="reasoning-text keyframe-fade-in">
            {steps[currentStep].text}
        </p>
        <div className="reasoning-progress">
             <div className="reasoning-bar" style={{width: `${((currentStep + 1) / steps.length) * 100}%`}}></div>
        </div>
    </div>
  );
};

export default ReasoningLoader;

import { useEffect } from 'react';

export function useBuyMeCoffeeButton() {
  useEffect(() => {
    // Remove any existing button containers
    const existingContainer = document.getElementById('bmc-wl-container');
    if (existingContainer) {
      existingContainer.remove();
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js';
    script.dataset.name = 'bmc-button';
    script.dataset.slug = 'jeemok';
    script.dataset.color = '#FF5F5F';
    script.dataset.emoji = '🀄';
    script.dataset.font = 'Bree';
    script.dataset.text = 'Huat ah!';
    script.dataset.outlineColor = '#000000';
    script.dataset.fontColor = '#ffffff';
    script.dataset.coffeeColor = '#FFDD00';
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      const container = document.getElementById('bmc-wl-container');
      if (container) {
        container.remove();
      }
    };
  }, []);
}
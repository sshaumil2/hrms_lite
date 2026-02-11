import { useEffect } from 'react';

export const useButtonHoverEffect = () => {
  useEffect(() => {
    const handleMouseEnter = (e) => {
      const parentOffset = e.currentTarget.getBoundingClientRect();
      const relX = e.clientX - parentOffset.left;
      const relY = e.clientY - parentOffset.top;
      const span = e.currentTarget.querySelector('span');
      if (span) {
        span.style.top = `${relY}px`;
        span.style.left = `${relX}px`;
      }
    };

    const handleMouseOut = (e) => {
      const parentOffset = e.currentTarget.getBoundingClientRect();
      const relX = e.clientX - parentOffset.left;
      const relY = e.clientY - parentOffset.top;
      const span = e.currentTarget.querySelector('span');
      if (span) {
        span.style.top = `${relY}px`;
        span.style.left = `${relX}px`;
      }
    };

    const attachListeners = () => {
      const buttons = document.querySelectorAll('.default-btn');
      if (buttons.length > 0) {
        buttons.forEach((button) => {
          button.addEventListener('mouseenter', handleMouseEnter);
          button.addEventListener('mouseout', handleMouseOut);
        });
      }
    };

    // Attach listeners after DOM updates
    const observer = new MutationObserver(() => {
      attachListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial attachment
    attachListeners();

    return () => {
      // Clean up listeners
      const buttons = document.querySelectorAll('.default-btn');
      if (buttons.length > 0) {
        buttons.forEach((button) => {
          button.removeEventListener('mouseenter', handleMouseEnter);
          button.removeEventListener('mouseout', handleMouseOut);
        });
      }

      // Disconnect observer
      observer.disconnect();
    };
  }, []);
};

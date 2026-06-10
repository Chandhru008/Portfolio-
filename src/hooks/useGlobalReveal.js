import { useEffect } from 'react';

export function useGlobalReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1, 
      rootMargin: '0px 0px -50px 0px' 
    });

    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal:not(.reveal-visible)');
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }); // Run on every render to catch dynamically added elements (like filtered certs)
}

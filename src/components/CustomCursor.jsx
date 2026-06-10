import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    
    let animationFrameId;
    
    const onMouseMove = (e) => {
      setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };
    
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    
    const onMouseOver = (e) => {
      const target = e.target;
      try {
        const isClickable = 
          target.tagName.toLowerCase() === 'a' ||
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') ||
          target.closest('button') ||
          window.getComputedStyle(target).cursor === 'pointer';
          
        setIsHovering(isClickable);
      } catch (err) {
        // Ignore cross-origin stylesheet issues with getComputedStyle
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', onMouseOver);

    const render = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div 
        className={`custom-cursor-dot ${isVisible ? 'visible' : ''}`}
        ref={dotRef}
      ></div>
      <div 
        className={`custom-cursor-ring ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
        ref={ringRef}
      >
        <div className="ring-highlight"></div>
      </div>
    </>
  );
}

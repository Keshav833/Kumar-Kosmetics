import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitText = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars', // 'chars', 'words', 'lines' (lines not fully supported in simple manual split without layout calc)
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  style = {},
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !fontsLoaded) return;
      const el = ref.current;
      
      // Select all elements with class 'split-char' or 'split-word' depending on splitType
      // For this simple implementation, we'll target the spans we created
      const targets = el.querySelectorAll('.split-target');

      if (targets.length === 0) return;

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4
          },
          onComplete: () => {
            onLetterAnimationComplete?.();
          },
          willChange: 'transform, opacity',
          force3D: true
        }
      );
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete
      ],
      scope: ref
    }
  );

  const renderContent = () => {
    if (!text) return null;

    // Simple manual split implementation
    // Note: This is a basic implementation. Complex splitting (like lines) requires more advanced logic or the paid plugin.
    
    if (splitType.includes('chars')) {
      return text.split('').map((char, i) => (
        <span 
          key={i} 
          className="split-target inline-block whitespace-pre"
          style={{ willChange: 'transform, opacity' }}
        >
          {char}
        </span>
      ));
    }
    
    if (splitType.includes('words')) {
      return text.split(' ').map((word, i) => (
        <span 
          key={i} 
          className="split-target inline-block whitespace-pre"
          style={{ willChange: 'transform, opacity' }}
        >
          {word + (i < text.split(' ').length - 1 ? ' ' : '')}
        </span>
      ));
    }

    // Fallback for lines or other types: treat as words or just wrap content
    return (
        <span className="split-target inline-block">
            {text}
        </span>
    );
  };

  const mergedStyle = {
    textAlign,
    wordWrap: 'break-word',
    ...style
  };
  
  const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;
  
  const Tag = tag;

  return (
    <Tag ref={ref} style={mergedStyle} className={classes}>
      {renderContent()}
    </Tag>
  );
};

export default SplitText;

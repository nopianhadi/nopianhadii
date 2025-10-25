import { useEffect } from 'react';

interface UseSmoothScrollOptions {
  offset?: number;
  duration?: number;
}

export function useSmoothScroll({ offset = 80, duration = 800 }: UseSmoothScrollOptions = {}) {
  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      
      if (target.tagName === 'A' && target.href.includes('#')) {
        const url = new URL(target.href);
        const hash = url.hash;
        
        if (hash && url.pathname === window.location.pathname) {
          e.preventDefault();
          
          const element = document.querySelector(hash);
          if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            // Update URL without triggering navigation
            history.pushState(null, '', hash);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [offset, duration]);
}
import { useEffect } from 'react';

export const useScrollAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px',
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          // Add visible class for scroll animations
          if (element.classList.contains('scroll-fade-in')) {
            element.classList.add('visible');
          }
          if (element.classList.contains('scroll-slide-left')) {
            element.classList.add('visible');
          }
          if (element.classList.contains('scroll-slide-right')) {
            element.classList.add('visible');
          }
          
          // Legacy reveal animation
          if (element.classList.contains('reveal')) {
            element.classList.add('animate');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all elements with animation classes
    const elementsToObserve = document.querySelectorAll(
      '.reveal, .scroll-fade-in, .scroll-slide-left, .scroll-slide-right'
    );
    
    elementsToObserve.forEach((element) => observer.observe(element));

    // Cleanup
    return () => {
      elementsToObserve.forEach((element) => observer.unobserve(element));
    };
  }, []);
};
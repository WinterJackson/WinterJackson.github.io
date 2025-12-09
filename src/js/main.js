import { initAnimations } from './components/animations.js';
import { initContact } from './components/contact.js';
import { initLoadingOverlay } from './components/loading-overlay.js';
import { initNavigation } from './components/navigation.js';
import { initPortfolio } from './components/portfolio.js';
import { initSidebar } from './components/sidebar.js';
import { initTestimonials } from './components/testimonials.js';

document.addEventListener('DOMContentLoaded', () => {
   initLoadingOverlay();
   initSidebar();
   initTestimonials();
   initPortfolio();
   initContact();
   initNavigation();
   initAnimations();

   // Register Service Worker
   if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
       navigator.serviceWorker.register('/sw.js').then(registration => {
         console.log('SW registered: ', registration);
       }).catch(registrationError => {
         console.log('SW registration failed: ', registrationError);
       });
     });
   }
});

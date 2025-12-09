export function initLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  
  // 5 seconds delay as requested (updated from 15s)
  const DELAY_MS = 5000; 

  if (overlay) {
    const startFadeOut = () => {
        console.log('Overlay: Starting 15s timer');
        setTimeout(() => {
            console.log('Overlay: Fading out');
            overlay.classList.add('fade-out');
            setTimeout(() => {
                console.log('Overlay: Removing from display');
                overlay.style.display = 'none';
            }, 1000); 
        }, DELAY_MS);
    };

    console.log('Overlay: Initialized. ReadyState:', document.readyState);
    if (document.readyState === 'complete') {
        startFadeOut();
    } else {
        window.addEventListener('load', startFadeOut);
    }
  }
}

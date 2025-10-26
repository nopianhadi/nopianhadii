import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Register service worker for caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Remove loading screen when React app is ready
const loadingScreen = document.querySelector('.loading-screen');
if (loadingScreen) {
  loadingScreen.remove();
}

// Optimize rendering with concurrent features
const root = createRoot(document.getElementById("root")!, {
  // Enable concurrent features for better performance
  identifierPrefix: 'hadi-origin-'
});

root.render(<App />);

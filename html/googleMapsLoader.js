import CONFIG from './googleConfig.js';

async function loadGoogleMapsApi() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${CONFIG.GOOGLE_MAPS_API_KEY}&libraries=places`;
  script.defer = true;
  script.onload = () => console.log("Google Maps API loaded");
  document.head.appendChild(script);
}

loadGoogleMapsApi();

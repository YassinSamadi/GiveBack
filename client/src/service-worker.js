if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(`${window.location.origin}/service-worker.js`);
}

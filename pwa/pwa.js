async function registrarServiceWorker() {
  if (navigator.serviceWorker) {
    try {
      await navigator.serviceWorker.register("pwa-serviceWorker.js");
    } catch (e) {
      console.error(`Erro ao registrar o service worker: ${e}`);
    }
  }
}

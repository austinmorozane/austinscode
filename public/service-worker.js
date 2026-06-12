const CACHE_NAME = "austinscode-cache-v2";

// Define a function to fetch asset list from the JSON file
const fetchAssetList = async () => {
  try {
    const response = await fetch("/assets-to-cache.json");
    return response.json();
  } catch (error) {
    console.error("Failed to fetch assets:", error);
    return [];
  }
};

// Fetch assets and cache them during installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const assetsToCache = await fetchAssetList();
        console.log("Caching assets:", assetsToCache);
        return cache.addAll(assetsToCache);
      } catch (error) {
        console.error("Failed to cache assets:", error);
      }
    })()
  );
});

// Handle network requests and serve cached resources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        const response = await fetch(event.request);
        return response.clone();
      } catch (error) {
        console.error("Failed to fetch resource:", error);
        return Response.fromText('Network request failed');
      }
    })
  );
});

// Clean up old caches when the Service Worker is activated
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Clearing old cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

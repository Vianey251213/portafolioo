const CACHE_NAME = "cache";

const urlsToCache = ["/", "index.html"];

self.addEventListener("install", (event) => {

    event.waitUntil(

        caches.open(CACHE_NAME).then((cache) => {
            console.log("ARCHIVOS CACHEADOS");

            return cache.addAll(urlsToCache);
        })

    );
});

self.addEventListener("activate", (event) => {

 const cacheWhiteList = [CACHE_NAME];

 event.waitUntil(

     caches.keys().then((cacheNAMES) => {
    return Promise.all(

        cacheNAMES.map((cacheNAME) => {

            if (cacheWhiteList.indexOf(cacheNAME) === -1){
                return caches.delete(cacheNAME);
            }
        })
    );
 })

 );

});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if(response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});




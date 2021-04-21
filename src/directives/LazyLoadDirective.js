import Vue from 'vue'
Vue.directive('lazyload', {
    inserted: el => {
        function loadImage() {
            const imageElement = Array.from(el.children).find(
                el => el.nodeName === "IMG"
            );
            if (imageElement) {
                imageElement.addEventListener("load", () => {
                    setTimeout(() => el.classList.add("loaded"), 3000);
                });
                imageElement.addEventListener("error", () => console.log("error"));
                imageElement.src = imageElement.dataset.url;
            }
            const videoElement = Array.from(el.children).find(
                el => el.nodeName === "VIDEO"
            );
            if (videoElement) {
                videoElement.addEventListener("load", () => {
                    setTimeout(() => el.classList.add("loaded"), 3000);
                });
                videoElement.addEventListener("error", () => console.log("error"));
                videoElement.children[0].src = videoElement.children[0].dataset.url;
            }
        }

        function handleIntersect(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage();
                    observer.unobserve(el);
                }
            });
        }

        function createObserver() {
            const options = {
                root: null,
                threshold: "0"
            };
            const observer = new IntersectionObserver(handleIntersect, options);
            observer.observe(el);
        }
        if (window["IntersectionObserver"]) {
            createObserver();
        } else {
            loadImage();
        }
    }
});
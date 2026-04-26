(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('customjs-loaded');
    if (!window.IntersectionObserver) {
      console.warn('IntersectionObserver is not supported by this browser.');
      return;
    }

    var lazyloadImages;
    if ('IntersectionObserver' in window) {
      lazyloadImages = document.querySelectorAll('.come-out,.animate-out');
      var imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var image = entry.target;

            if (image.localName) {
              image.classList.add('come-in');
            }
            imageObserver.unobserve(image);
          }
        });
      });
      lazyloadImages.forEach(function (image) {
        imageObserver.observe(image);
      });
    }
  });
})();

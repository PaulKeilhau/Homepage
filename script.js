/* Paul Keilhau — small progressive enhancements. Site works without JS. */

(function () {
  'use strict';

  /* Current year in the footer */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Video facades: nothing is loaded from YouTube or Vimeo until you click */
  document.querySelectorAll('.facade').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wrap = document.createElement('div');
      wrap.className = 'embed';

      var frame = document.createElement('iframe');
      frame.src = btn.dataset.video;
      frame.title = btn.dataset.title || 'Video';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;
      frame.loading = 'lazy';

      wrap.appendChild(frame);
      btn.replaceWith(wrap);
      frame.focus();
    });
  });

  /* Top bar gets a background once you leave the hero */
  var bar = document.getElementById('bar');
  var hero = document.querySelector('.hero');
  if (bar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      bar.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }, { rootMargin: '-72px 0px 0px 0px' }).observe(hero);
  }

  /* Sections fade in on first sight */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.section__head, .work, .listen, .about, .contact');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px' });

    targets.forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }
})();

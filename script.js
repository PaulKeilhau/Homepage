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

  /* Contact form hands the message over to the visitor's mail app */
  var cform = document.getElementById('cform');
  if (cform) {
    cform.addEventListener('submit', function (e) {
      e.preventDefault();
      var from = cform.querySelector('#cf-email').value.trim();
      var msg = cform.querySelector('#cf-message').value.trim();
      if (!from || !msg) return;

      var body = msg + '\n\n\u2014\nReply to: ' + from;
      window.location.href = 'mailto:contact@paulkeilhau.com'
        + '?subject=' + encodeURIComponent('Via paulkeilhau.com')
        + '&body=' + encodeURIComponent(body);

      var done = cform.querySelector('.cform__done');
      if (!done) {
        done = document.createElement('p');
        done.className = 'cform__done';
        done.setAttribute('role', 'status');
        cform.appendChild(done);
      }
      done.textContent = 'Your mail app should be opening. If nothing happens, write to contact@paulkeilhau.com directly.';
    });
  }

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

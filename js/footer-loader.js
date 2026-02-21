(function () {
  var path = window.location.pathname.toLowerCase();
  var page = 'home';
  if (path.indexOf('about-us') !== -1 || path.indexOf('about-us.html') !== -1) {
    page = 'about';
  } else if (path.indexOf('contact-us') !== -1 || path.indexOf('contact-us.html') !== -1) {
    page = 'contact';
  } else if (path.indexOf('rooms') !== -1 || path.indexOf('rooms.html') !== -1) {
    page = 'rooms';
  }
  function markCurrent(container) {
    var links = container.querySelectorAll('[data-footer-nav]');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var key = link.getAttribute('data-footer-nav');
      if (key === page) {
        link.classList.add('w--current');
        link.setAttribute('aria-current', 'page');
      }
    }
  }
  function injectFooter() {
    var host = document.getElementById('site-footer');
    if (!host) {
      return;
    }
    fetch('footer.html')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to load footer.html');
        }
        return response.text();
      })
      .then(function (html) {
        host.innerHTML = html;
        markCurrent(host);
      })
      .catch(function () {
        host.innerHTML = '<!-- Shared footer failed to load -->';
      });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
  } else {
    injectFooter();
  }
})();

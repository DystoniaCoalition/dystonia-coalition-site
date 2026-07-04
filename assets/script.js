// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Publications page: client-side search + sort (only runs if elements exist)
  var searchInput = document.getElementById('pub-search');
  var sortSelect = document.getElementById('pub-sort');
  var list = document.getElementById('pub-list');
  if (list) {
    var items = Array.prototype.slice.call(list.querySelectorAll('.pub'));

    function applyFilter() {
      var q = (searchInput && searchInput.value || '').toLowerCase().trim();
      items.forEach(function (item) {
        var text = item.textContent.toLowerCase();
        item.style.display = q === '' || text.indexOf(q) !== -1 ? '' : 'none';
      });
    }

    function applySort() {
      var mode = sortSelect ? sortSelect.value : 'year-desc';
      var sorted = items.slice().sort(function (a, b) {
        if (mode === 'year-desc' || mode === 'year-asc') {
          var ya = parseInt(a.getAttribute('data-year'), 10);
          var yb = parseInt(b.getAttribute('data-year'), 10);
          return mode === 'year-desc' ? yb - ya : ya - yb;
        }
        if (mode === 'author') {
          return a.getAttribute('data-author').localeCompare(b.getAttribute('data-author'));
        }
        return 0;
      });
      sorted.forEach(function (el) { list.appendChild(el); });
    }

    if (searchInput) searchInput.addEventListener('input', applyFilter);
    if (sortSelect) sortSelect.addEventListener('change', applySort);
  }
});

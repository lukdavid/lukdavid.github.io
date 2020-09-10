function addActiveClass(e) {
  if (document.querySelector('nav ul li a.active') !== null) {
    document.querySelector('nav ul li a.active').classList.remove('active');
  }
  e.target.className = "active";
}
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // Scroll down
    navbar.style.top = '-100px'; // Adjust based on your navbar height
  } else {
    // Scroll up
    navbar.style.top = '0';
  }
  lastScrollTop = scrollTop;
});
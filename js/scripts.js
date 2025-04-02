document.addEventListener("DOMContentLoaded", () => {
  // ===========================
  // Navbar Shrinking on Scroll
  // ===========================
 /* window.onscroll = function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('shrink-navbar');
    } else {
      navbar.classList.remove('shrink-navbar');
    }
  };
*/
  // ===========================
  // Mobile Menu Toggle (Unified)
  // ===========================
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  const faBars = document.querySelector(".fa-bars");
  const faTimes = document.querySelector(".fa-arrow-left");
  if (faBars && navLinks) {
    faBars.addEventListener("click", () => {
      navLinks.style.right = "0";
    });
  }
  if (faTimes && navLinks) {
    faTimes.addEventListener("click", () => {
      navLinks.style.right = "-200px";
    });
  }

  // ===========================
  // Carousel with Auto & Manual Controls
  // ===========================
  let slides = document.querySelectorAll('.carousel img');
  let buttons = document.querySelectorAll('.control-btn');
  let currentIndex = 0;
  let interval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
    });
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  window.changeSlide = function (index) {
    clearInterval(interval);
    showSlide(index);
    startAutoSlide();
  };

  function startAutoSlide() {
    interval = setInterval(showNextSlide, 5000);
  }

  if (slides.length > 0) {
    showSlide(currentIndex);
    startAutoSlide();
  }

  // ===========================
  // Equal Heights Script
  // ===========================
  (function(){
    $.fn.fitHeights = function() {
      var items = $(this);
      function setHeights() {
        var currentTallest = 0;
        items.css({ 'min-height' : currentTallest });
        items.each(function(){
          if( $(this).height() > currentTallest ) { currentTallest = $(this).height(); }
        });
        items.css({ 'min-height' : currentTallest });
      }
      setHeights();
      $(window).on('resize', setHeights);
      return this;
    };
  })(jQuery);

  $(window).on("load", function(){
    $('.grid-testimonials p').fitHeights();
  });
});

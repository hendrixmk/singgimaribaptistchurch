document.addEventListener("DOMContentLoaded", () => {
  // ===========================
  // Navbar Shrinking on Scroll
  // ===========================
  window.onscroll = function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('shrink-navbar');
    } else {
      navbar.classList.remove('shrink-navbar');
    }
  };

  // ===========================
  // Mobile Menu Toggle (Unified)
  // ===========================
  // Adjust the ID as needed. Here, we assume the sliding menu uses "navLinks".
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Slide-out menu controls using Font Awesome icons
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

  // Show slide based on index
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
    });
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  // Change to next slide automatically
  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  // Manual slide change (make it global so HTML onclick works)
  window.changeSlide = function (index) {
    clearInterval(interval); // Stop auto-slide on manual click
    showSlide(index);
    startAutoSlide(); // Restart auto-slide after manual change
  };

  // Start auto-slide
  function startAutoSlide() {
    interval = setInterval(showNextSlide, 5000); // Slide every 5 seconds
  }

  // Initialize carousel if slides exist
  if (slides.length > 0) {
    showSlide(currentIndex);
    startAutoSlide();
  }
});

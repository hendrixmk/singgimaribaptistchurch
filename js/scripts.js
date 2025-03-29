window.onscroll = function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shrink-navbar');
    } else {
        navbar.classList.remove('shrink-navbar');
    }
};

document.getElementById("menu-toggle").addEventListener("click", function () {
    var nav = document.getElementById("nav-links");
        nav.classList.toggle("active");
    });

window.onscroll = function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
            navbar.classList.add('shrink-navbar');
    } else {
            navbar.classList.remove('shrink-navbar');
        }
    };
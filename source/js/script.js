const navToggle = document.querySelector(".header-toggle");
const headNav = document.querySelector(".header-nav");
const themeButton = document.querySelector('.theme-button');

navToggle.addEventListener("click", (function(){
    headNav.classList.contains(".header-btn") 
    ? (headNav.classList.remove(".header-btn"),headNav.classList.add(".header-btn--close")) 
    : (headNav.classList.remove(".header-btn--close"),headNav.classList.add(".header-btn"));
}));

themeButton.onclick = function() {
    navToggle.classList.toggle('line-theme');
    navToggle.classList.toggle('x-theme');
};



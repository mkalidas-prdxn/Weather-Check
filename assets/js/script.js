//=> Hamburger menu functionality
var hamburger = document.getElementById("hamburger"),
    hamMenuOpen = document.querySelector(".menu"),
    menuBarBackground = document.querySelector(".main-bar-url");
hamburger.addEventListener("click", cross);
//Hambuger functiom to open and close menu
function cross() {
  document.body.classList.toggle("body"); //to stop scrolling when menu open
  hamburger.classList.toggle("activeHam");
  hamMenuOpen.classList.toggle("hamMenuOpen");
  menuBarBackground.classList.toggle("menuBarBackground");
}

(function () {
  const burgerButton = document.querySelector(".gh-burger");
  const menu = document.querySelector(".gh-head-menu");

  function toggleMenu() {
    burgerButton.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  }

  burgerButton.addEventListener("click", toggleMenu);
})();

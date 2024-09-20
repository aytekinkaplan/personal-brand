document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const items = carousel.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".carousel-button.prev");
  const nextBtn = document.querySelector(".carousel-button.next");
  let currentIndex = 0;

  function showSlide(index) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
});

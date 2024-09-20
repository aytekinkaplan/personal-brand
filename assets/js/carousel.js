document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const items = carousel.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".carousel-button.prev");
  const nextBtn = document.querySelector(".carousel-button.next");

  let currentIndex = 0;
  let itemsPerSlide = window.innerWidth > 768 ? 3 : 1;
  let totalSlides = Math.ceil(items.length / itemsPerSlide);

  function showSlide(index) {
    const offset = -(index * (100 / itemsPerSlide));
    carousel.style.transform = `translateX(${offset}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }

  function updateCarouselLayout() {
    itemsPerSlide = window.innerWidth > 768 ? 3 : 1;
    totalSlides = Math.ceil(items.length / itemsPerSlide);
    currentIndex = 0;
    showSlide(currentIndex);

    items.forEach((item) => {
      item.style.flex = `0 0 calc(${100 / itemsPerSlide}% - 20px)`;
    });
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Responsive behavior
  window.addEventListener("resize", updateCarouselLayout);

  // Initial setup
  updateCarouselLayout();
});

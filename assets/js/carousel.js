class Carousel {
  constructor(element, options = {}) {
    this.carousel = element;
    this.items = this.carousel.querySelectorAll(".carousel-item");
    this.options = {
      itemWidth: 300,
      autoPlay: false,
      autoPlayInterval: 5000,
      infinite: true,
      ...options,
    };

    this.currentIndex = 0;
    this.itemsPerSlide = Math.floor(
      this.carousel.offsetWidth / this.options.itemWidth
    );
    this.totalSlides = this.options.infinite
      ? this.items.length
      : this.items.length - this.itemsPerSlide + 1;

    this.init();
  }

  init() {
    this.createControls();
    this.bindEvents();
    if (this.options.autoPlay) {
      this.startAutoPlay();
    }
    this.updateButtonStates();
  }

  createControls() {
    this.prevButton =
      this.carousel.querySelector(".carousel-button.prev") ||
      this.createButton("prev");
    this.nextButton =
      this.carousel.querySelector(".carousel-button.next") ||
      this.createButton("next");
  }

  createButton(type) {
    const button = document.createElement("button");
    button.className = `carousel-button ${type}`;
    button.textContent = type === "prev" ? "←" : "→";
    this.carousel.parentNode.appendChild(button);
    return button;
  }

  bindEvents() {
    this.nextButton.addEventListener("click", () => this.move(1));
    this.prevButton.addEventListener("click", () => this.move(-1));

    this.carousel.addEventListener("mouseover", () => this.stopAutoPlay());
    this.carousel.addEventListener("mouseout", () => this.startAutoPlay());

    window.addEventListener(
      "resize",
      this.debounce(() => this.handleResize(), 250)
    );
  }

  move(direction) {
    this.currentIndex =
      (this.currentIndex + direction + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
  }

  updateCarousel() {
    const translateX = -this.currentIndex * this.options.itemWidth;
    this.carousel.style.transform = `translateX(${translateX}px)`;
    this.updateButtonStates();
  }

  updateButtonStates() {
    if (!this.options.infinite) {
      this.prevButton.disabled = this.currentIndex === 0;
      this.nextButton.disabled = this.currentIndex === this.totalSlides - 1;
    }
  }

  handleResize() {
    this.itemsPerSlide = Math.floor(
      this.carousel.offsetWidth / this.options.itemWidth
    );
    this.totalSlides = this.options.infinite
      ? this.items.length
      : this.items.length - this.itemsPerSlide + 1;
    this.currentIndex = Math.min(this.currentIndex, this.totalSlides - 1);
    this.updateCarousel();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(
      () => this.move(1),
      this.options.autoPlayInterval
    );
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }

  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const carouselElements = document.querySelectorAll(".carousel-container");
  carouselElements.forEach((element) => {
    new Carousel(element.querySelector(".carousel"), {
      itemWidth: 300,
      autoPlay: true,
      autoPlayInterval: 5000,
      infinite: true,
    });
  });
});

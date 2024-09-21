class Carousel {
  constructor(element, options = {}) {
    this.carousel = element;
    this.items = this.carousel.querySelectorAll(".carousel-item");
    this.options = {
      itemWidth: options.itemWidth || 300,
      autoPlay: options.autoPlay || false,
      autoPlayInterval: options.autoPlayInterval || 5000,
      infinite: options.infinite || true,
    };

    this.currentIndex = 0;
    this.itemsPerSlide = Math.floor(
      this.carousel.offsetWidth / this.options.itemWidth
    );
    this.totalSlides = this.items.length;

    this.init();
  }

  init() {
    this.createControls();
    this.bindEvents();
    if (this.options.autoPlay) {
      this.startAutoPlay();
    }
    this.updateCarousel();
  }

  createControls() {
    this.prevButton =
      this.carousel.parentNode.querySelector(".carousel-button.prev") ||
      this.createButton("prev");
    this.nextButton =
      this.carousel.parentNode.querySelector(".carousel-button.next") ||
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

    if (this.options.autoPlay) {
      this.carousel.addEventListener("mouseover", () => this.stopAutoPlay());
      this.carousel.addEventListener("mouseout", () => this.startAutoPlay());
    }

    window.addEventListener(
      "resize",
      this.debounce(() => this.handleResize(), 250)
    );
  }

  move(direction) {
    if (this.options.infinite) {
      this.currentIndex =
        (this.currentIndex + direction + this.totalSlides) % this.totalSlides;
    } else {
      this.currentIndex = Math.max(
        0,
        Math.min(
          this.currentIndex + direction,
          this.totalSlides - this.itemsPerSlide
        )
      );
    }
    this.updateCarousel();
  }

  updateCarousel() {
    const translateX = -this.currentIndex * (this.options.itemWidth + 20); // Adjust for padding/margin
    this.carousel.style.transform = `translateX(${translateX}px)`;
    this.updateButtonStates();
  }

  updateButtonStates() {
    if (!this.options.infinite) {
      this.prevButton.disabled = this.currentIndex === 0;
      this.nextButton.disabled =
        this.currentIndex >= this.totalSlides - this.itemsPerSlide;
    }
  }

  handleResize() {
    this.itemsPerSlide = Math.floor(
      this.carousel.offsetWidth / (this.options.itemWidth + 20) // Adjust for item margin
    );
    this.updateCarousel();
  }

  startAutoPlay() {
    this.autoPlayIntervalId = setInterval(
      () => this.move(1),
      this.options.autoPlayInterval
    );
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayIntervalId);
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
    const carouselInstance = new Carousel(element.querySelector(".carousel"), {
      itemWidth: 300,
      autoPlay: true,
      autoPlayInterval: 5000,
      infinite: true,
    });

    // Bind buttons for each carousel independently
    const prevButton = element.querySelector(".carousel-button.prev");
    const nextButton = element.querySelector(".carousel-button.next");

    if (prevButton) {
      prevButton.addEventListener("click", () => carouselInstance.move(-1));
    }
    if (nextButton) {
      nextButton.addEventListener("click", () => carouselInstance.move(1));
    }
  });
});

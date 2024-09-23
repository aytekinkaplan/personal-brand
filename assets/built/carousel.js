// carousel.js

document.addEventListener("DOMContentLoaded", () => {
    const slide = document.querySelector(".carousel-slide");
    const items = document.querySelectorAll(".carousel-item");
    const prevButton = document.querySelector(".carousel-button.left");
    const nextButton = document.querySelector(".carousel-button.right");

    if (!slide || items.length === 0 || !prevButton || !nextButton) {
        console.warn(
            "Carousel yapılandırması eksik. Lütfen gerekli HTML elemanlarının olduğundan emin olun."
        );
        return;
    }

    let currentIndex = 0;
    const maxIndex = items.length - 3; // Aynı anda 3 post görüntüleniyor

    function updateSlidePosition() {
        slide.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
    }

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlidePosition();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlidePosition();
        }
    });
});

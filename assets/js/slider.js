export function initSliders() {
    // Select all sliders on the page
    const sliders = document.querySelectorAll(".gh-slider");

    sliders.forEach((slider, index) => {
        // Get the navigation buttons for the current slider
        const prevBtn = slider.parentElement.querySelector(".prev-btn");
        const nextBtn = slider.parentElement.querySelector(".next-btn");
        const sliderItems = Array.from(
            slider.querySelectorAll(".gh-slider-item")
        );

        // Exit if any necessary element is missing
        if (!slider || !prevBtn || !nextBtn || sliderItems.length === 0) return;

        // Configuration for the slider
        const itemsVisible = 3;
        const itemWidth = 100 / itemsVisible;
        const totalItems = sliderItems.length;
        const maxIndex = totalItems - itemsVisible;
        let currentIndex = 0;
        let autoSlideInterval;

        // Sort slider items by date (newest first)
        sliderItems.sort(
            (a, b) => new Date(b.dataset.date) - new Date(a.dataset.date)
        );

        // Clear and append sorted items
        slider.innerHTML = "";
        sliderItems.forEach((item) => {
            item.style.width = `${itemWidth}%`; // Set item width based on visibility
            slider.appendChild(item);
        });

        updateSlider();

        // Add event listeners
        nextBtn.addEventListener("click", moveNext);
        prevBtn.addEventListener("click", movePrev);
        window.addEventListener("resize", updateSlider); // Update slider on window resize
        addSwipeEvents(slider);
        addKeyboardNavigation();
        startAutoSlide();

        function moveNext() {
            if (currentIndex < maxIndex) currentIndex++;
            updateSlider();
        }

        function movePrev() {
            if (currentIndex > 0) currentIndex--;
            updateSlider();
        }

        function updateSlider() {
            const offset = currentIndex * itemWidth;
            slider.style.transform = `translateX(-${offset}%)`;
            slider.style.transition = "transform 0.6s ease-in-out";

            // Toggle visibility of navigation buttons
            prevBtn.style.display = currentIndex === 0 ? "none" : "flex";
            nextBtn.style.display = currentIndex >= maxIndex ? "none" : "flex";
        }

        function addSwipeEvents(sliderElement) {
            let startX = 0;
            let isDragging = false;

            sliderElement.addEventListener("touchstart", (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
                clearInterval(autoSlideInterval); // Stop auto-slide while dragging
            });

            sliderElement.addEventListener("touchmove", (e) => {
                if (!isDragging) return;
                const touchX = e.touches[0].clientX;
                const diffX = startX - touchX;
                const translateX =
                    (-currentIndex * slider.clientWidth) / itemsVisible - diffX;
                slider.style.transform = `translateX(${translateX}px)`;
            });

            sliderElement.addEventListener("touchend", (e) => {
                isDragging = false;
                const endX = e.changedTouches[0].clientX;
                const threshold = 50; // Minimum swipe distance

                if (startX - endX > threshold && currentIndex < maxIndex)
                    moveNext();
                else if (endX - startX > threshold && currentIndex > 0)
                    movePrev();
                else updateSlider();

                startAutoSlide(); // Restart auto-slide after touch event
            });
        }

        function addKeyboardNavigation() {
            document.addEventListener("keydown", (e) => {
                if (e.key === "ArrowLeft") movePrev();
                if (e.key === "ArrowRight") moveNext();
            });
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                if (currentIndex >= maxIndex) currentIndex = 0;
                else currentIndex++;
                updateSlider();
            }, 5000); // Slide every 5 seconds
        }
    });
}

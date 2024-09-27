export function initSliders() {
    document.addEventListener("DOMContentLoaded", () => {
        // Select all sliders on the page
        const sliders = document.querySelectorAll(".gh-slider");

        if (sliders.length === 0) {
            console.error("No sliders found on the page.");
            return;
        }

        sliders.forEach((slider) => {
            // Get the navigation buttons
            const prevBtn = slider
                .closest(".gh-postfeed-slider")
                .querySelector(".prev-btn");
            const nextBtn = slider
                .closest(".gh-postfeed-slider")
                .querySelector(".next-btn");
            const sliderItems = Array.from(
                slider.querySelectorAll(".gh-slider-item")
            );

            if (!slider || sliderItems.length === 0) return;

            // Configuration
            let itemsVisible = calculateVisibleItems(); // Calculate visible items based on screen width
            let itemWidth = 100 / itemsVisible;
            const totalItems = sliderItems.length;
            let currentIndex = 0;
            let autoSlideInterval;

            // Ensure the latest items are displayed on page load
            currentIndex = Math.max(0, totalItems - itemsVisible);

            // Set item width for all items
            sliderItems.forEach((item) => {
                item.style.width = `${itemWidth}%`;
                slider.appendChild(item);
            });

            updateSlider();

            // Event listeners for buttons
            nextBtn.addEventListener("click", moveNext);
            prevBtn.addEventListener("click", movePrev);
            window.addEventListener("resize", handleResize); // Adjust on resize
            addSwipeEvents(slider);
            addKeyboardNavigation();

            function moveNext() {
                if (currentIndex < totalItems - itemsVisible) {
                    currentIndex++;
                    updateSlider();
                } else {
                    currentIndex = 0; // Go back to the first item for infinite loop
                    updateSlider();
                }
            }

            function movePrev() {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                } else {
                    currentIndex = totalItems - itemsVisible; // Go to the last item
                    updateSlider();
                }
            }

            function updateSlider() {
                const offset = currentIndex * itemWidth;
                slider.style.transform = `translateX(-${offset}%)`;
                slider.style.transition = "transform 0.6s ease-in-out";

                // Update button visibility based on position
                prevBtn.style.display = currentIndex === 0 ? "none" : "flex";
                nextBtn.style.display =
                    currentIndex >= totalItems - itemsVisible ? "none" : "flex";
            }

            function handleResize() {
                itemsVisible = calculateVisibleItems();
                itemWidth = 100 / itemsVisible;
                sliderItems.forEach(
                    (item) => (item.style.width = `${itemWidth}%`)
                );
                updateSlider();
            }

            function calculateVisibleItems() {
                const containerWidth = slider.clientWidth;
                if (containerWidth >= 1200) return 3; // Show 3 items on large screens
                if (containerWidth >= 768) return 2; // Show 2 items on medium screens
                return 1; // Show 1 item on small screens
            }

            function addSwipeEvents(sliderElement) {
                let startX = 0;
                let isDragging = false;

                sliderElement.addEventListener("touchstart", (e) => {
                    startX = e.touches[0].clientX;
                    isDragging = true;
                });

                sliderElement.addEventListener("touchmove", (e) => {
                    if (!isDragging) return;
                    const touchX = e.touches[0].clientX;
                    const diffX = startX - touchX;
                    const translateX =
                        -(currentIndex * slider.clientWidth) - diffX;
                    slider.style.transform = `translateX(${translateX}px)`;
                });

                sliderElement.addEventListener("touchend", (e) => {
                    isDragging = false;
                    const endX = e.changedTouches[0].clientX;
                    const threshold = 50;

                    if (startX - endX > threshold) moveNext();
                    else if (endX - startX > threshold) movePrev();
                    else updateSlider();
                });
            }

            function addKeyboardNavigation() {
                document.addEventListener("keydown", (e) => {
                    if (e.key === "ArrowLeft") movePrev();
                    if (e.key === "ArrowRight") moveNext();
                });
            }
        });
    });
}

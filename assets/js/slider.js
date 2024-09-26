export function initSlider() {
    const slider = document.querySelector(".gh-slider");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const sliderItems = Array.from(
        document.querySelectorAll(".gh-slider-item")
    );

    // Elemanların mevcut olup olmadığını kontrol et
    if (!slider || !prevBtn || !nextBtn || sliderItems.length === 0) return;

    const itemsVisible = 3; // Aynı anda görüntülenen slayt sayısı
    const itemWidth = 100 / itemsVisible; // Her elemanın slider içindeki yüzdesel genişliği
    const totalItems = sliderItems.length; // Toplam eleman sayısı
    const maxIndex = totalItems - itemsVisible; // maxIndex değeri
    let currentIndex = 0; // Slider'ın ilk konumu

    // Slider öğelerini tarihe göre sıralayalım (en güncel tarih ilk olacak şekilde)
    sliderItems.sort((a, b) => {
        const dateA = new Date(a.getAttribute("data-date"));
        const dateB = new Date(b.getAttribute("data-date"));
        return dateB - dateA;
    });

    // Slider içeriğini temizleyip sıralanmış elemanları ekle
    slider.innerHTML = "";
    sliderItems.forEach((item) => slider.appendChild(item));

    // Başlangıçta slider'ı güncelle
    updateSlider();

    // Sağ ok tıklama
    nextBtn.addEventListener("click", () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    // Sol ok tıklama
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    function updateSlider() {
        const offset = currentIndex * itemWidth;
        slider.style.transform = `translateX(-${offset}%)`;
        slider.style.transition = "transform 0.5s ease";

        // Sol ve sağ ok butonlarının görünürlüğünü kontrol et
        prevBtn.style.display = currentIndex === 0 ? "none" : "flex";
        nextBtn.style.display = currentIndex >= maxIndex ? "none" : "flex";
    }

    // Mobile swipe hareketi için touch desteği ekleme
    let startX = 0;
    let currentTranslateX = 0;
    let isDragging = false;

    slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        slider.style.transition = "none"; // Kaydırma sırasında geçiş efekti olmasın
    });

    slider.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const touchX = e.touches[0].clientX;
        const diffX = startX - touchX;

        // Hesaplanan offset değeri ile slider'ı hareket ettir
        const translateX =
            (-currentIndex * slider.clientWidth) / itemsVisible - diffX;
        slider.style.transform = `translateX(${translateX}px)`;
    });

    slider.addEventListener("touchend", (e) => {
        isDragging = false;
        slider.style.transition = "transform 0.5s ease";
        const endX = e.changedTouches[0].clientX;
        const threshold = 50; // 50px'lik bir kaydırma eşiği belirlendi

        // Eğer belirli bir eşiği geçerse kaydırmayı gerçekleştir
        if (startX - endX > threshold && currentIndex < maxIndex) {
            currentIndex++;
        } else if (endX - startX > threshold && currentIndex > 0) {
            currentIndex--;
        }

        updateSlider();
    });
}

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
    const maxIndex = totalItems - itemsVisible; // maxIndex değeri: Tüm elemanlar eksi görünür eleman sayısı
    let currentIndex = 0; // Başlangıç olarak en güncel 3 post zaten gösterildiğinden, currentIndex = 0 olarak ayarlıyoruz

    // Slider öğelerini tarihe göre sıralayalım (en güncel tarih ilk olacak şekilde)
    sliderItems.sort((a, b) => {
        const dateA = new Date(a.getAttribute("data-date")); // "data-date" özelliğini kullanarak tarih alıyoruz
        const dateB = new Date(b.getAttribute("data-date"));
        return dateB - dateA; // En güncel tarih önce gelir
    });

    // Slider içindeki elemanları temizleyip, sıralanmış elemanları ekliyoruz
    slider.innerHTML = ""; // Mevcut slider içeriğini temizle
    sliderItems.forEach((item) => slider.appendChild(item)); // Tüm postları slider'a ekle

    // Sayfa yüklendiğinde slider'ı güncelle
    updateSlider();

    // Sağ oka tıklama işlemi
    nextBtn.addEventListener("click", () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    // Sol oka tıklama işlemi
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    function updateSlider() {
        // Offset, slaytın ne kadar kayacağını belirler
        const offset = currentIndex * itemWidth; // Her seferde %33.33 kayma yerine itemWidth kullandık
        slider.style.transform = `translateX(-${offset}%)`;

        // Sol ok butonu başlangıçta gizli olacak
        prevBtn.style.display = currentIndex === 0 ? "none" : "flex";

        // Sağ ok butonu en son postta gizlenecek
        nextBtn.style.display = currentIndex >= maxIndex ? "none" : "flex";
    }
}

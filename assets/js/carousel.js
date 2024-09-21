document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const carouselItems = document.querySelectorAll(".carousel-item");
  let index = 0;
  const intervalTime = 3000; // 3 saniyede bir kaydırma
  let autoSlide = true;

  // Carousel çalıştırmak için bir sonraki slide fonksiyonu
  const nextSlide = () => {
    if (carouselItems.length > 0) {
      carouselItems[index].classList.remove("active");
      index = (index + 1) % carouselItems.length;
      carouselItems[index].classList.add("active");
      carousel.scrollLeft = carouselItems[index].offsetLeft;
    }
  };

  // Otomatik kaydırma ayarı
  if (autoSlide && carouselItems.length > 0) {
    setInterval(nextSlide, intervalTime);
  }

  // Sol ve sağa navigasyon butonları
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      if (carouselItems.length > 0) {
        carouselItems[index].classList.remove("active");
        index = (index - 1 + carouselItems.length) % carouselItems.length;
        carouselItems[index].classList.add("active");
        carousel.scrollLeft = carouselItems[index].offsetLeft;
      }
    });

    nextButton.addEventListener("click", () => {
      nextSlide();
    });
  }

  // "Load More" fonksiyonunu ekleyelim
  function loadMorePosts() {
    fetch(
      "{{@site.url}}/ghost/api/v3/content/posts/?key=YOUR_API_KEY&limit=7&offset=7"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Veri yapısını kontrol edin
        const postGrid = document.querySelector(".post-grid");

        // Eklenecek içerikler varsa kontrol et
        if (data && data.posts && data.posts.length > 0) {
          data.posts.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.classList.add("post-card");
            postElement.innerHTML = `
                          <a href="${post.url}">
                              <img src="${post.feature_image}" alt="${
              post.title
            }">
                              <h3>${post.title}</h3>
                              <p>${new Date(
                                post.published_at
                              ).toLocaleDateString()}</p>
                          </a>`;
            postGrid.appendChild(postElement);
          });
        } else {
          console.log("Daha fazla gönderi yok.");
          document.getElementById("load-more").disabled = true; // Yükle butonunu devre dışı bırak
        }
      })
      .catch((error) => console.error("Error loading more posts:", error));
  }

  // "Load More" butonuna tıklama olayını ekleyelim
  const loadMoreButton = document.getElementById("load-more");
  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", loadMorePosts);
  }
});

// Livereload Script - Geliştirme aşamasında tarayıcı yenilemesi için
(function (document, self) {
  if (document && !document.getElementById("livereloadscript")) {
      let script = document.createElement("script");
      script.async = true;
      script.src = "//" + (self.location.host || "localhost").split(":")[0] + ":35730/livereload.js?snipver=1";
      script.id = "livereloadscript";
      document.getElementsByTagName("head")[0].appendChild(script);
  }
})(self.document, self);

// Infinite Scroll ve Burger Menü
(function () {
  "use strict";

  // 'next' linkini al
  let nextLink = document.querySelector('link[rel="next"]')?.getAttribute("href");

  // Burger menü tıklama işlemi
  const burgerButton = document.querySelector(".gh-burger");
  if (burgerButton) {
      burgerButton.addEventListener("click", function () {
          document.body.classList.toggle("gh-head-open");
      });
  }

  // Sonsuz kaydırma işlevi
  function initInfiniteScroll() {
      if (!nextLink) return;

      // Intersection Observer başlat
      const observer = new IntersectionObserver(async (entries) => {
          try {
              entries.forEach(async (entry) => {
                  if (entry.isIntersecting && nextLink) {
                      const response = await fetchPageContent(nextLink);
                      if (response) {
                          const { posts, newNextLink } = response;
                          posts.forEach(post => document.querySelector(".gh-postfeed").append(post));

                          if (newNextLink) {
                              nextLink = newNextLink;
                              observer.observe(document.querySelector(".post:last-of-type"));
                          } else {
                              observer.disconnect();
                          }
                      }
                  }
              });
          } catch (error) {
              console.error("Infinite scroll error:", error);
          }
      }, {
          rootMargin: "150px"
      });

      observer.observe(document.querySelector(".post:last-of-type"));
  }

  // Sayfa içeriğini çekme fonksiyonu
  async function fetchPageContent(url) {
      try {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Sayfa alınamadı");

          const htmlText = await response.text();
          const parser = new DOMParser();
          const parsedDocument = parser.parseFromString(htmlText, "text/html");

          const posts = parsedDocument.querySelectorAll(".post");
          const newNextLink = parsedDocument.querySelector('link[rel="next"]')?.getAttribute("href");

          return {
              posts,
              newNextLink
          };
      } catch (error) {
          console.error("fetchPageContent error:", error);
          return null;
      }
  }

  // Infinite Scroll işlevini başlat
  initInfiniteScroll();
})();

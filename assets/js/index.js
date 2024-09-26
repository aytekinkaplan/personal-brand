// index.js

// Import CSS
import "../css/index.css";

// Import JS
import menuOpen from "./menuOpen";
import infiniteScroll from "./infiniteScroll";
import { initSlider } from "./slider"; // Slider fonksiyonunu import ettik

// Call the menu, infinite scroll, and slider functions
menuOpen();
infiniteScroll();
initSlider(); // Slider fonksiyonunu başlat

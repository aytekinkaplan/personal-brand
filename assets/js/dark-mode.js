(function () {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const body = document.body;

  function setDarkMode(isDark) {
    if (isDark) {
      body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }

  function toggleDarkMode() {
    setDarkMode(!body.classList.contains("dark-mode"));
  }

  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "enabled") {
    setDarkMode(true);
  }

  darkModeToggle.addEventListener("click", toggleDarkMode);
})();

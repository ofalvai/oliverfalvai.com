(() => {
  // Theme switch
  const applyTheme = (theme) => document.body.setAttribute("data-theme", theme);
  const saveTheme = (theme) => localStorage.setItem("theme", theme);
  const invert = (old) => old == "light" ? "dark" : "light";

  const systemTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return "dark";
    } else {
      return "light";
    }
  }

  const syncSystemTheme = () => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const newSystemTheme = e.matches ? "dark" : "light";
      applyTheme(newSystemTheme);
    });
  }

  const initTheme = () => {
    const local = localStorage.getItem("theme");
    const system = systemTheme();

    if (local) {
      applyTheme(local);
    } else {
      applyTheme(system);
    }

    syncSystemTheme();
  };

  const toggleTheme = () => {
    const local = localStorage.getItem("theme");
    if (local) {
      const newTheme = invert(local);
      saveTheme(newTheme);
      applyTheme(newTheme);
    } else {
      const newTheme = invert(systemTheme());
      saveTheme(newTheme);
      applyTheme(newTheme);
    }
  };

  initTheme();
  document.getElementById("mode").addEventListener("click", toggleTheme);

  // Blur the content when the menu is open
  const cbox = document.getElementById("menu-trigger");

  cbox.addEventListener("change", function () {
    const area = document.querySelector(".wrapper");
    this.checked
      ? area.classList.add("blurry")
      : area.classList.remove("blurry");
  });
})();

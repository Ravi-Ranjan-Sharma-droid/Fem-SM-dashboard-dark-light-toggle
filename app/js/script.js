/* 
The first time the page is loaded, the color mode set on the preference 
is used and set as 'default' in the local storage. 
Changing the default preferences works the same way as changing the 
color mode using the buttons, if the page is loaded.
When the page is reloaded, whatever is the value set on the local storage
has precedence over the values in the preference. If the preference
changed after the page was visited - and the page is not loaded - 
the last value saved on the local storage is loaded. 
*/

const darkButton = document.getElementById("dark");
const lightButton = document.getElementById("light");

// Enhance transitions for a smoother visual experience
const addTransition = () => {
  const body = document.querySelector("body");
  body.style.transition =
    "background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1), color 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s ease-out";
  body.style.willChange = "background-color, color, transform";
};

const animateBody = () => {
  const body = document.querySelector("body");
  body.style.transform = "scale(1.02)";
  body.style.opacity = "0.9";
  setTimeout(() => {
    body.style.transform = "scale(1)";
    body.style.opacity = "1";
  }, 300);
};

const setDarkMode = () => {
  const body = document.querySelector("body");
  addTransition();
  animateBody();
  body.classList.remove("light");
  body.classList.add("dark");
  localStorage.setItem("colorMode", "dark");
};

const setLightMode = () => {
  const body = document.querySelector("body");
  addTransition();
  animateBody();
  body.classList.remove("dark");
  body.classList.add("light");
  localStorage.setItem("colorMode", "light");
};

const colorModeFromLocalStorage = () => {
  return localStorage.getItem("colorMode");
};

const colorModeFromPreferences = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const loadAndUpdateColor = () => {
  const color = colorModeFromLocalStorage() || colorModeFromPreferences();
  color === "dark" ? darkButton.click() : lightButton.click();
};

const radioButtons = document.querySelectorAll(".toggle__wrapper input");
radioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    darkButton.checked ? setDarkMode() : setLightMode();
  });
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    event.matches ? darkButton.click() : lightButton.click();
  });

loadAndUpdateColor();

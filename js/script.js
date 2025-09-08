const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Lógica para la tarjeta de spoiler
const spoilerCard = document.querySelector(".spoiler-card");

if (spoilerCard) {
  spoilerCard.addEventListener(
    "click",
    () => {
      spoilerCard.classList.add("is-revealed");
    },
    { once: true }
  ); // El evento solo se disparará una vez para que no se pueda volver a ocultar
}

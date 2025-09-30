const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const dropdownToggle = document.querySelector(".dropdown-toggle");
const submenuToggle = document.querySelector(".nav-item-submenu > a"); // Este selector es problemático, lo corregiremos más adelante.

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.body.classList.toggle("no-scroll"); // Evita el scroll del body cuando el menú está abierto
});

document.querySelectorAll(".nav-link").forEach((n) => {
  // Evitamos que los toggles de los dropdowns cierren el menú móvil
  if (
    !n.classList.contains("dropdown-toggle") &&
    !n.parentElement.classList.contains("nav-item-submenu")
  ) {
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("no-scroll"); // Permite el scroll de nuevo al cerrar el menú
    });
  }
});

// Lógica para tarjetas de personajes en dispositivos táctiles
const characterCards = document.querySelectorAll(".character-card");
characterCards.forEach((card) => {
  // No aplicar al spoiler card que tiene su propia lógica de click
  if (!card.classList.contains("spoiler-card")) {
    card.addEventListener("touchstart", (e) => {
      // Previene que el navegador simule un click y otros eventos
      e.preventDefault();
      card.classList.add("is-touched");
    });

    card.addEventListener("touchend", () => {
      card.classList.remove("is-touched");
    });
  }
});

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

// Lógica para spoilers en la página de capítulos
const spoilerItems = document.querySelectorAll(".spoiler-item");
spoilerItems.forEach((item) => {
  item.addEventListener(
    "click",
    () => {
      item.classList.add("is-revealed");
    },
    { once: true }
  );
});

// Lógica para el acordeón de volúmenes
const accordionTriggers = document.querySelectorAll(".accordion-trigger");
accordionTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    trigger.classList.toggle("active");
    const content = trigger.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// Lógica para el menú desplegable en móvil
if (dropdownToggle) {
  dropdownToggle.addEventListener("click", (e) => {
    // Prevenir que el enlace '#' navegue
    e.preventDefault();
    // Solo activar en vista móvil (cuando el menú hamburguesa es visible)
    if (window.getComputedStyle(hamburger).display !== "none") {
      const dropdownMenu = dropdownToggle.nextElementSibling;
      dropdownToggle.parentElement.classList.toggle("active");
    }
  });
}

// Lógica para el submenú en móvil
document.querySelectorAll(".nav-item-submenu > a").forEach((submenuLink) => {
  submenuLink.addEventListener("click", (e) => {
    // Solo activar en vista móvil (cuando el menú hamburguesa es visible)
    if (window.getComputedStyle(hamburger).display !== "none") {
      // Prevenir que el enlace principal navegue si es un enlace de submenú
      if (submenuLink.nextElementSibling && submenuLink.nextElementSibling.classList.contains("submenu")) {
        e.preventDefault();
      }
      submenuLink.parentElement.classList.toggle("active");
    } 
  });
});

// Lógica para posicionamiento dinámico del submenú
document.querySelectorAll(".nav-item-submenu").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const submenu = item.querySelector(".submenu");
    if (submenu) {
      const parentRect = item.getBoundingClientRect();
      const submenuWidth = submenu.offsetWidth;
      const spaceOnRight = window.innerWidth - parentRect.right;

      if (submenuWidth > spaceOnRight && parentRect.left > submenuWidth) {
        submenu.classList.add("opens-left");
      } else {
        submenu.classList.remove("opens-left");
      }
    }
  });
});

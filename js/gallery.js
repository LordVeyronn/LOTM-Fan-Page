// Lógica para la galería Lightbox
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona los elementos de la galería solo si estamos en una página que los contiene.
  const galleryItems = document.querySelectorAll(".gallery-item");
  if (galleryItems.length === 0) return; // No hacer nada si no hay galería en la página

  const lightbox = document.getElementById("lightbox");
  // Asegurarse de que el lightbox existe antes de continuar
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxCounter = lightbox.querySelector(".lightbox-counter");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const lightboxClose = lightbox.querySelector(".lightbox-close");
  const lightboxPrev = lightbox.querySelector(".lightbox-prev");
  const lightboxNext = lightbox.querySelector(".lightbox-next");

  const images = Array.from(galleryItems).map((item) => ({
    src: item.href,
    title: item.dataset.title,
  }));
  let currentIndex = 0;

  const showImage = (index) => {
    const imgData = images[index];
    lightboxImg.src = imgData.src;
    lightboxCaption.textContent = imgData.title;
    lightboxCounter.textContent = `${index + 1} / ${images.length}`;
    currentIndex = index;
  };

  const openLightbox = (index) => {
    lightbox.classList.add("active");
    showImage(index);
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
  };

  const showPrevImage = () =>
    showImage((currentIndex - 1 + images.length) % images.length);
  const showNextImage = () => showImage((currentIndex + 1) % images.length);

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", showPrevImage);
  lightboxNext.addEventListener("click", showNextImage);

  lightbox.addEventListener(
    "click",
    (e) => e.target === lightbox && closeLightbox()
  );

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "ArrowLeft") showPrevImage();
    if (e.key === "ArrowRight") showNextImage();
    if (e.key === "Escape") closeLightbox();
  });
});

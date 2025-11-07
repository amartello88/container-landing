document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  // Toggle del menú
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    document.querySelector(".logo").classList.toggle("hide");
  });

  // 🔹 Cierra el menú al hacer clic en cualquier link del nav
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  // LIGHTBOX
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const images = document.querySelectorAll(".gallery-item");
  let currentIndex = 0;

  // 🔹 Abre el lightbox y bloquea el scroll
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      currentIndex = index;
      document.body.style.overflow = "hidden"; // 🚫 bloquea scroll
    });
  });

  // 🔹 Cierra el lightbox y habilita el scroll
  const cerrarLightbox = () => {
    lightbox.style.display = "none";
    document.body.style.overflow = ""; // ✅ restaura scroll
  };

  closeBtn.addEventListener("click", cerrarLightbox);

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  });

  // 🔹 Cierra el lightbox haciendo clic fuera de la imagen
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) cerrarLightbox();
  });
});

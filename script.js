document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  // 🔹 Toggle del menú
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

  // 🔹 LIGHTBOX
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const images = document.querySelectorAll(".gallery-item");
  let currentIndex = 0;
  let scrollY = 0;

  // 🔹 Abre el lightbox y bloquea scroll
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      currentIndex = index;

      scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    });
  });

  // 🔹 Cierra el lightbox y restaura scroll
  const cerrarLightbox = () => {
    lightbox.style.display = "none";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollY);
  };

  closeBtn.addEventListener("click", cerrarLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) cerrarLightbox();
  });

  // 🔹 Cambiar imagen con pre-carga (evita parpadeo)
  function cambiarImagen(index) {
    const nuevaSrc = images[index].src;
    lightboxImg.classList.add("fade-out");

    const imgTemp = new Image();
    imgTemp.src = nuevaSrc;
    imgTemp.onload = () => {
      setTimeout(() => {
        lightboxImg.src = nuevaSrc;
        lightboxImg.classList.remove("fade-out");
      }, 150);
    };
  }

  // 🔹 Botones siguiente y anterior
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    cambiarImagen(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    cambiarImagen(currentIndex);
  });

  // 🔹 Swipe táctil con fade (para móviles)
  let startX = 0;

  lightboxImg.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  lightboxImg.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const swipeDistance = endX - startX;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance < 0) {
        // Izquierda → siguiente
        currentIndex = (currentIndex + 1) % images.length;
      } else {
        // Derecha → anterior
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      }
      cambiarImagen(currentIndex);
    }
  });
});

// 🔹 Fade-in de la galería al cargar las imágenes
document.querySelectorAll('.gallery-item').forEach(img => {
  img.addEventListener('load', () => {
    img.classList.add('loaded');
  });
});

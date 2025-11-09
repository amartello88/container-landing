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
  let scrollY = 0; // guardamos la posición actual del scroll

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

  nextBtn.addEventListener("click", () => {
    lightboxImg.classList.add("fade-out");
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.classList.remove("fade-out");
    }, 200);
  });

  prevBtn.addEventListener("click", () => {
    lightboxImg.classList.add("fade-out");
    setTimeout(() => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.classList.remove("fade-out");
    }, 200);
  });

  // 🔹 Cierra el lightbox haciendo clic fuera de la imagen
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) cerrarLightbox();
  });

  // 🔹 Swipe táctil con fade (para móviles)
  let startX = 0;
  let endX = 0;

  lightboxImg.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  lightboxImg.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  lightboxImg.addEventListener("touchend", () => {
    const swipeDistance = endX - startX;

    if (Math.abs(swipeDistance) > 50) {
      lightboxImg.classList.add("fade-out");

      setTimeout(() => {
        if (swipeDistance < 0) {
          // Izquierda → siguiente
          currentIndex = (currentIndex + 1) % images.length;
        } else {
          // Derecha → anterior
          currentIndex = (currentIndex - 1 + images.length) % images.length;
        }

        lightboxImg.src = images[currentIndex].src;
        lightboxImg.classList.remove("fade-out");
      }, 200);
    }

    startX = 0;
    endX = 0;
  });
});

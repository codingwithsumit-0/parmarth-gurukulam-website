document.addEventListener("DOMContentLoaded", () => {
  // Footer में अपने आप वर्तमान वर्ष दिखाना
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // मोबाइल मेन्यू
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "मेन्यू बंद करें" : "मेन्यू खोलें"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // किसी सेक्शन पर क्लिक करने के बाद मेन्यू बंद करें
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "मेन्यू खोलें");
        menuToggle.textContent = "☰";
      });
    });
  }

  // फोटो गैलरी
  const galleryButtons = Array.from(
    document.querySelectorAll(".galleryitem")
  );

  const lightbox = document.getElementById("lightbox");
  const bigImage = document.getElementById("bigImage");
  const closeBox = document.getElementById("closeBox");
  const prevBox = document.getElementById("prevBox");
  const nextBox = document.getElementById("nextBox");

  let currentIndex = 0;

  function showImage(index) {
    if (!galleryButtons.length || !bigImage) return;

    currentIndex =
      (index + galleryButtons.length) % galleryButtons.length;

    const image = galleryButtons[currentIndex].querySelector("img");

    if (!image) return;

    bigImage.src = image.src;
    bigImage.alt = image.alt || "गुरुकुलम की तस्वीर";
  }

  function openLightbox(index) {
    if (!lightbox) return;

    showImage(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (closeBox) closeBox.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  galleryButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  if (closeBox) {
    closeBox.addEventListener("click", closeLightbox);
  }

  if (prevBox) {
    prevBox.addEventListener("click", () => {
      showImage(currentIndex - 1);
    });
  }

  if (nextBox) {
    nextBox.addEventListener("click", () => {
      showImage(currentIndex + 1);
    });
  }

  // फोटो के बाहर क्लिक करने पर बंद करें
  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // कीबोर्ड से फोटो बदलना और बंद करना
  document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("open")) return;

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowRight") {
      showImage(currentIndex + 1);
    } else if (event.key === "ArrowLeft") {
      showImage(currentIndex - 1);
    }
  });
});
/* =========================================
   PARMARTH GURUKULAM
   Website JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "मेन्यू बंद करें" : "मेन्यू खोलें"
      );
    });

    // Close menu after clicking a navigation link
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "मेन्यू खोलें");
      });
    });

    // Close menu when Escape is pressed
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "मेन्यू खोलें");
      }
    });
  }

  // Automatically update copyright year
  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Gallery Lightbox
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeButton = document.getElementById("lightboxClose");
  const previousButton = document.getElementById("lightboxPrev");
  const nextButton = document.getElementById("lightboxNext");

  let currentImageIndex = 0;

  function showImage(index) {
    if (!galleryItems.length || !lightboxImage) return;

    currentImageIndex =
      (index + galleryItems.length) % galleryItems.length;

    const item = galleryItems[currentImageIndex];
    const image = item.querySelector("img");

    if (!image) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "परमार्थ गुरुकुलम गैलरी फोटो";
  }

  function openLightbox(index) {
    if (!lightbox || !galleryItems.length) return;

    showImage(index);
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (closeButton) closeButton.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
      openLightbox(index);
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
  }

  if (previousButton) {
    previousButton.addEventListener("click", function () {
      showImage(currentImageIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      showImage(currentImageIndex + 1);
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Gallery keyboard controls
  document.addEventListener("keydown", function (event) {
    if (!lightbox || !lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showImage(currentImageIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showImage(currentImageIndex + 1);
    }
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Reveal elements when they enter the viewport
  const revealElements = document.querySelectorAll(
    ".about-grid, .education-card, .acharya-grid, .gallery-item, .contact-item"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(function (element) {
      element.classList.add("reveal");
      observer.observe(element);
    });
  }
});
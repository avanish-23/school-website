const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const toast = document.getElementById("toast");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const navbar = document.getElementById("navbar");

const typedWords = [
  "अनुशासन और संस्कार",
  "आधुनिक शिक्षा वातावरण",
  "प्रेरणादायी विद्यालय परिसर",
  "उज्ज्वल भविष्य की मजबूत नींव"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Persist the selected theme so the site keeps the same look on revisit.
function setTheme(mode) {
  if (mode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem("school-site-theme", mode);
}

function initTheme() {
  const savedTheme = localStorage.getItem("school-site-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme || (prefersDark ? "dark" : "light"));
}

function toggleMenu() {
  const isOpen = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark text-lg"></i>'
    : '<i class="fa-solid fa-bars text-lg"></i>';
}

function closeMenu() {
  mobileMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.innerHTML = '<i class="fa-solid fa-bars text-lg"></i>';
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function validatePhone(value) {
  return /^[6-9]\d{9}$/.test(value.trim());
}

function markFieldState(field, isValid) {
  field.classList.toggle("error", !isValid);
}

// Shared validator keeps both UI forms simple and consistent.
function attachFormValidation(form, onSuccess) {
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const fields = Array.from(form.querySelectorAll("input, select, textarea"));
    let isFormValid = true;

    fields.forEach((field) => {
      let valid = true;
      const value = field.value.trim();

      if (field.hasAttribute("required") && !value) {
        valid = false;
      }

      if (field.name === "phone" && value) {
        valid = validatePhone(value);
      }

      markFieldState(field, valid);
      if (!valid) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      showToast("कृपया सभी आवश्यक जानकारी सही तरीके से भरें।");
      return;
    }

    onSuccess(formData, form);
  });
}

function typeEffect() {
  const typedText = document.getElementById("typedText");
  if (!typedText) return;

  const currentWord = typedWords[wordIndex];
  const displayedText = currentWord.slice(0, charIndex);
  typedText.textContent = displayedText;

  if (!isDeleting) {
    charIndex += 1;
    if (charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1300);
      return;
    }
  } else {
    charIndex -= 1;
    if (charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typedWords.length;
      charIndex = 0;
    }
  }

  const delay = isDeleting ? 45 : 95;
  setTimeout(typeEffect, delay);
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      lightboxImage.src = item.dataset.full;
      lightboxCaption.textContent = item.dataset.caption || "";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  };

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}

function initScrollStates() {
  const toggleScrolledState = () => {
    const isScrolled = window.scrollY > 18;
    navbar.classList.toggle("scrolled", isScrolled);
    scrollTopBtn.classList.toggle("show", window.scrollY > 350);
  };

  window.addEventListener("scroll", toggleScrolledState, { passive: true });
  toggleScrolledState();

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initSwiper() {
  new Swiper(".hero-swiper", {
    loop: true,
    speed: 900,
    effect: "slide",
    autoplay: {
      delay: 3200,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  });
}

function initAOS() {
  AOS.init({
    duration: 850,
    easing: "ease-out-cubic",
    once: true,
    offset: 40
  });
}

function initHeroImageFallback() {
  const heroImage = document.getElementById("heroMainImage");
  const heroStatus = document.getElementById("heroImageStatus");
  if (!heroImage || !heroStatus) return;

  heroImage.addEventListener("error", () => {
    heroStatus.classList.remove("hidden");
  });
  heroImage.addEventListener("load", () => {
    heroStatus.classList.add("hidden");
  });
}

function initHeroShowcase() {
  const heroImage = document.getElementById("heroMainImage");
  const heroEyebrow = document.getElementById("heroMainEyebrow");
  const heroTitle = document.getElementById("heroMainTitle");
  const thumbs = Array.from(document.querySelectorAll(".hero-thumb"));
  if (!heroImage || !heroEyebrow || !heroTitle || !thumbs.length) return;

  let activeIndex = thumbs.findIndex((thumb) => thumb.classList.contains("is-active"));
  if (activeIndex < 0) activeIndex = 0;

  const applySlide = (index) => {
    const thumb = thumbs[index];
    thumbs.forEach((item) => item.classList.remove("is-active"));
    thumb.classList.add("is-active");
    heroImage.src = thumb.dataset.image || "";
    heroImage.alt = thumb.dataset.alt || "";
    heroEyebrow.textContent = thumb.dataset.eyebrow || "";
    heroTitle.textContent = thumb.dataset.title || "";
    activeIndex = index;
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      applySlide(index);
    });
  });

  window.setInterval(() => {
    const nextIndex = (activeIndex + 1) % thumbs.length;
    applySlide(nextIndex);
  }, 3500);
}

menuToggle?.addEventListener("click", toggleMenu);
mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.classList.contains("dark") ? "light" : "dark";
  setTheme(nextTheme);
});

attachFormValidation(document.getElementById("admissionForm"), (formData, form) => {
  const studentName = formData.get("studentName")?.toString().trim() || "";
  const guardianName = formData.get("guardianName")?.toString().trim() || "";
  const phone = formData.get("phone")?.toString().trim() || "";
  const className = formData.get("className")?.toString().trim() || "";
  const message = formData.get("message")?.toString().trim() || "कोई अतिरिक्त संदेश नहीं";

  const whatsappText = encodeURIComponent(
    `नमस्ते, मैं प्रवेश के लिए रुचि दर्ज करना चाहता/चाहती हूँ।%0A%0Aविद्यार्थी का नाम: ${studentName}%0Aअभिभावक का नाम: ${guardianName}%0Aमोबाइल नंबर: ${phone}%0Aप्रवेश कक्षा: ${className}%0Aसंदेश: ${message}`
  );

  showToast("आपको WhatsApp पर redirect किया जा रहा है...");
  form.reset();
  window.open(`https://wa.me/919450874431?text=${whatsappText}`, "_blank", "noopener");
});

attachFormValidation(document.getElementById("contactForm"), (formData, form) => {
  const name = formData.get("name")?.toString().trim() || "";
  const phone = formData.get("phone")?.toString().trim() || "";
  const message = formData.get("message")?.toString().trim() || "";

  const whatsappText = encodeURIComponent(
    `नमस्ते, मैं ${name} बोल रहा/रही हूँ। मेरा नंबर ${phone} है। ${message}`
  );

  showToast("आपको WhatsApp पर redirect किया जा रहा है...");
  form.reset();
  window.open(`https://wa.me/919450874431?text=${whatsappText}`, "_blank", "noopener");
});

initTheme();
initAOS();
initHeroShowcase();
initHeroImageFallback();
initLightbox();
initScrollStates();
typeEffect();

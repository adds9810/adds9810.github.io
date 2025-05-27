// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".grid.grid-3");

  projectData.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="project-image" />
    <div class="project-content">
      <h3 class="project-title">${project.title}</h3>
      <h3 class="project-period">${project.period}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-tags">
        ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <div class="project-links">
        ${project.buttons
          .map(
            (btn) => `
            <a href="${btn.url}" class="btn ${btn.style}" target="_blank">${btn.label}</a>
          `
          )
          .join("")}
      </div>
    </div>
  `;

    container.appendChild(card);
  });
});

// Scroll Progress Bar and Scroll to Top Button
function updateScrollProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById("scrollProgress").style.width = scrollPercent + "%";

  // Show/hide scroll to top button
  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (scrollTop > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
  // Update scroll spy
  updateScrollSpy();
}

// Scroll Spy functionality
function updateScrollSpy() {
  const scrollTop = window.pageYOffset;
  const headerHeight = document.getElementById("header").offsetHeight;
  const sections = [
    "hero",
    "about",
    "skills",
    "portfolio",
    "experience",
    "contact",
  ];
  sections.forEach((sectionId, index) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const sectionTop = section.offsetTop - headerHeight - 300;
    const sectionBottom = sectionTop + section.offsetHeight / 2;

    if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
      // Update header navigation
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      const activeNavLink = document.querySelector(
        `.nav-link[href="#${sectionId}"]`
      );
      if (activeNavLink) {
        activeNavLink.classList.add("active");
      }

      // Update floating navigation
      document.querySelectorAll(".floating-nav-item").forEach((item) => {
        item.classList.remove("active");
      });
      const activeFloatingItem = document.querySelector(
        `.floating-nav-item[href="#${sectionId}"]`
      );
      if (activeFloatingItem) {
        activeFloatingItem.classList.add("active");
      }
    }
  });
}

// Scroll to Top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add event listener for scroll to top button
document.getElementById("scrollToTop").addEventListener("click", scrollToTop);

// Custom Cursor and Trail
let cursorTrails = [];
const maxTrails = 10;

function createCursorTrail() {
  if (prefersReducedMotion) return;

  for (let i = 0; i < maxTrails; i++) {
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    document.body.appendChild(trail);
    cursorTrails.push(trail);
  }
}

function updateCursor(e) {
  if (prefersReducedMotion) return;

  const cursor = document.getElementById("cursor");
  cursor.style.left = e.clientX - 10 + "px";
  cursor.style.top = e.clientY - 10 + "px";

  // Update trails
  cursorTrails.forEach((trail, index) => {
    setTimeout(() => {
      trail.style.left = e.clientX - 3 + "px";
      trail.style.top = e.clientY - 3 + "px";
      trail.style.opacity = ((maxTrails - index) / maxTrails) * 0.7;
    }, index * 50);
  });
}

// Particle Background
function createParticles() {
  if (prefersReducedMotion) return;

  const container = document.getElementById("particlesContainer");
  const particleCount = window.innerWidth < 768 ? 30 : 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = Math.random() * 4 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 4 + 4 + "s";

    container.appendChild(particle);
  }
}

// Typing Animation
function typeWriter() {
  if (prefersReducedMotion) return;

  const texts = [
    "웹 퍼블리셔",
    "프론트엔드 개발자",
    "UI/UX 전문가",
    "웹 접근성 전문가",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById("typingText");

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 150;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Enhanced Skills Animation
function animateSkills() {
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("animate");

      const progressBar = item.querySelector(".skill-progress");
      const width = item.getAttribute("data-width");

      setTimeout(() => {
        progressBar.style.width = width + "%";
        progressBar.classList.add("animate");
      }, 200);
    }, index * 100);
  });
}

// Loading Screen Management
const loadingScreen = document.getElementById("loadingScreen");
const mainContent = document.getElementById("mainContent");
const loadingStatus = document.getElementById("loadingStatus");

let loadingProgress = 0;
const loadingMessages = [
  "리소스를 불러오는 중...",
  "컴포넌트를 초기화하는 중...",
  "스타일을 적용하는 중...",
  "애니메이션을 준비하는 중...",
  "거의 완료되었습니다...",
];

function updateLoadingMessage() {
  const messageIndex = Math.floor(loadingProgress / 20);
  if (messageIndex < loadingMessages.length) {
    document.querySelector(".loading-text").textContent =
      loadingMessages[messageIndex];
    loadingStatus.textContent = loadingMessages[messageIndex];
  }
}

function simulateLoading() {
  const interval = setInterval(() => {
    loadingProgress += Math.random() * 15 + 5;
    updateLoadingMessage();

    if (loadingProgress >= 100) {
      clearInterval(interval);
      finishLoading();
    }
  }, 200);
}

function finishLoading() {
  document.querySelector(".loading-text").textContent = "완료!";
  loadingStatus.textContent = "페이지 로딩이 완료되었습니다";

  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    document.body.style.opacity = "1";
    mainContent.classList.add("loaded");

    // Initialize animations after loading
    if (!prefersReducedMotion) {
      createCursorTrail();
      createParticles();
      typeWriter();
    }

    setTimeout(() => {
      if (loadingScreen.parentNode) {
        loadingScreen.parentNode.removeChild(loadingScreen);
      }
    }, 500);
  }, 500);
}

if (prefersReducedMotion) {
  finishLoading();
} else {
  simulateLoading();
}

const maxLoadingTime = setTimeout(() => {
  finishLoading();
}, 5000);

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);
themeIcon.textContent = currentTheme === "dark" ? "☀️" : "🌙";

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

const mobileMenuLinks = mobileMenu.querySelectorAll("a");
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const isClickInsideMenu = mobileMenu.contains(e.target);
  const isClickOnToggle = mobileMenuToggle.contains(e.target);

  if (
    !isClickInsideMenu &&
    !isClickOnToggle &&
    mobileMenu.classList.contains("active")
  ) {
    mobileMenu.classList.remove("active");
  }
});

// Close mobile menu on touch outside (for mobile devices)
document.addEventListener("touchstart", (e) => {
  const isClickInsideMenu = mobileMenu.contains(e.target);
  const isClickOnToggle = mobileMenuToggle.contains(e.target);

  if (
    !isClickInsideMenu &&
    !isClickOnToggle &&
    mobileMenu.classList.contains("active")
  ) {
    mobileMenu.classList.remove("active");
  }
});

// Header scroll effect
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  updateScrollProgress();

  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      if (entry.target.id === "skills") {
        setTimeout(() => {
          animateSkills();
        }, 300);
      }
    }
  });
}, observerOptions);

const sections = document.querySelectorAll(".section");
sections.forEach((section) => {
  observer.observe(section);
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Mouse events
if (!prefersReducedMotion) {
  document.addEventListener("mousemove", updateCursor);

  // Cursor hover effects
  const interactiveElements = document.querySelectorAll(
    "a, button, .card, .project-card"
  );
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      document.getElementById("cursor").style.transform = "scale(1.5)";
    });
    element.addEventListener("mouseleave", () => {
      document.getElementById("cursor").style.transform = "scale(1)";
    });
  });
}

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    mobileMenu.classList.remove("active");
  }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Error handling for images
const images = document.querySelectorAll("img");
images.forEach((img) => {
  img.addEventListener("error", function () {
    this.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+";
    this.alt = "Image not available";
  });
});

// Preload critical images
function preloadImages() {
  const imageUrls = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&h=300&fit=crop",
  ];

  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

// Start preloading images
preloadImages();

// Page visibility API to pause animations when tab is not active
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.body.style.animationPlayState = "paused";
  } else {
    document.body.style.animationPlayState = "running";
  }
});

// Resize handler for particles
window.addEventListener(
  "resize",
  debounce(() => {
    if (!prefersReducedMotion) {
      // Recreate particles on resize
      const container = document.getElementById("particlesContainer");
      container.innerHTML = "";
      createParticles();
    }
  }, 250)
);

// Initialize scroll progress on load
updateScrollProgress();

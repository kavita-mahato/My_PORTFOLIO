// Mobile nav toggle
const navToggleButton = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
if (navToggleButton && primaryNav) {
  navToggleButton.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Close menu when clicking a link on mobile
primaryNav?.querySelectorAll('a')?.forEach((anchor) => {
  anchor.addEventListener('click', () => {
    if (primaryNav.classList.contains('open')) {
      primaryNav.classList.remove('open');
      navToggleButton?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Update footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Advanced typing effect for hero title with HTML support
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = '';
  const plainText = 'Hi, I\'m ';
  const highlightedName = 'Kavita Mahato';
  
  function type() {
    if (i < plainText.length) {
      element.innerHTML += plainText.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (i < plainText.length + highlightedName.length) {
      if (i === plainText.length) {
        element.innerHTML += '<span class="highlight">';
      }
      element.innerHTML += highlightedName.charAt(i - plainText.length);
      if (i === plainText.length + highlightedName.length - 1) {
        element.innerHTML += '</span>';
      }
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.querySelector('.typing-text');
  const cursorElement = document.querySelector('.cursor');
  
  if (typingElement && cursorElement) {
    const textToType = typingElement.getAttribute('data-text');
    
    // Start typing after delay
    setTimeout(() => {
      typeWriter(typingElement, textToType, 80);
    }, 500);
    
    // Hide cursor when typing is complete
    setTimeout(() => {
      cursorElement.style.opacity = '0';
    }, (textToType.length * 80) + 1500);
  }
});

// Lazy loading with intersection observer
const lazyLoadObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        lazyLoadObserver.unobserve(entry.target);
      }
    });
  },
  { 
    root: null, 
    rootMargin: '0px 0px -50px 0px', 
    threshold: 0.1 
  }
);

// Observe all lazy load elements
document.querySelectorAll('.lazy-load, .lazy-load-left, .lazy-load-right, .lazy-load-scale, .lazy-load-fade').forEach((el) => {
  lazyLoadObserver.observe(el);
});

// Active section highlighting on scroll
const sectionIds = ['about','skills','experience','projects','education','activities','contact'];
const navLinks = sectionIds.map((id) => ({ id, el: document.querySelector(`nav.primary-nav a[href="#${id}"]`) }));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = navLinks.find((l) => `#${l.id}` === `#${entry.target.id}`)?.el;
      if (!link) return;
      if (entry.isIntersecting) {
        document.querySelectorAll('nav.primary-nav a.active').forEach((a) => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  },
  { root: null, rootMargin: '0px 0px -70% 0px', threshold: 0.2 }
);

sectionIds.forEach((id) => {
  const el = document.getElementById(id);
  if (el) navObserver.observe(el);
});

// Back to top button functionality
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
  // Show/hide button based on scroll position
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          backToTopButton.style.opacity = '0';
          backToTopButton.style.visibility = 'hidden';
        } else {
          backToTopButton.style.opacity = '1';
          backToTopButton.style.visibility = 'visible';
        }
      });
    },
    { 
      root: null, 
      rootMargin: '0px 0px -100% 0px', 
      threshold: 0 
    }
  );

  // Create a target element at the top of the page
  const topTarget = document.getElementById('top') || document.querySelector('.hero');
  if (topTarget) {
    scrollObserver.observe(topTarget);
  }

  // Smooth scroll to top when clicked
  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Update focus for accessibility
    document.getElementById('top')?.focus();
  });
}

// Enhanced scroll-based back to top button visibility
let ticking = false;
function updateBackToTopVisibility() {
  if (!backToTopButton) return;
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 300) {
    backToTopButton.style.opacity = '1';
    backToTopButton.style.visibility = 'visible';
    backToTopButton.style.transform = 'translateY(0)';
  } else {
    backToTopButton.style.opacity = '0';
    backToTopButton.style.visibility = 'hidden';
    backToTopButton.style.transform = 'translateY(10px)';
  }
  
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateBackToTopVisibility);
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick, { passive: true });

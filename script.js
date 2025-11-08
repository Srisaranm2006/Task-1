/* Portfolio interactions:
   - Mobile nav toggle
   - Typewriter effect
   - Scroll reveal for sections
   - Set current year
*/

document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => navLinks.classList.toggle('show'));
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // close mobile nav
          navLinks.classList.remove('show');
        }
      }
    });
  });

  // Typewriter animation
  const words = ["Web Developer", "Python Enthusiast", "IoT Innovator"];
  let wIndex = 0, charIndex = 0, deleting = false;
  const typeEl = document.getElementById('typewriter');

  function type() {
    if (!typeEl) return;
    const current = words[wIndex];
    if (!deleting) {
      charIndex++;
      typeEl.textContent = current.substring(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1300);
        return;
      }
    } else {
      charIndex--;
      typeEl.textContent = current.substring(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wIndex = (wIndex + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 60 : 110);
  }
  type();

  // Scroll reveal - IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.fade-section, .fade-up').forEach(el => observer.observe(el));
});

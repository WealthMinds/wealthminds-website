/* ============================================================
   WealthMinds — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. ACCESSIBILITY: Restore saved settings on every page ── */
  const root = document.documentElement;

  // High contrast
  if (localStorage.getItem('wm-contrast') === 'high') {
    root.setAttribute('data-contrast', 'high');
  }

  // Font scale
  const savedScale = parseFloat(localStorage.getItem('wm-font-scale') || '1');
  root.style.setProperty('--font-scale', savedScale);

  /* ── 2. DOM READY ── */
  document.addEventListener('DOMContentLoaded', function () {

    /* ── Accessibility Widget ── */
    const contrastBtn  = document.getElementById('contrast-toggle');
    const fontIncrease = document.getElementById('font-increase');
    const fontDecrease = document.getElementById('font-decrease');
    const fontReset    = document.getElementById('font-reset');

    let currentScale = savedScale;

    function updateContrastBtn() {
      if (!contrastBtn) return;
      const isHigh = root.getAttribute('data-contrast') === 'high';
      contrastBtn.classList.toggle('active', isHigh);
      contrastBtn.setAttribute('aria-pressed', String(isHigh));
    }

    function applyScale(s) {
      currentScale = Math.min(1.35, Math.max(0.85, s));
      root.style.setProperty('--font-scale', currentScale);
      localStorage.setItem('wm-font-scale', currentScale);
    }

    if (contrastBtn) {
      updateContrastBtn();
      contrastBtn.addEventListener('click', function () {
        const isHigh = root.getAttribute('data-contrast') === 'high';
        if (isHigh) {
          root.removeAttribute('data-contrast');
          localStorage.removeItem('wm-contrast');
        } else {
          root.setAttribute('data-contrast', 'high');
          localStorage.setItem('wm-contrast', 'high');
        }
        updateContrastBtn();
      });
    }

    if (fontIncrease) fontIncrease.addEventListener('click', () => applyScale(currentScale + 0.1));
    if (fontDecrease) fontDecrease.addEventListener('click', () => applyScale(currentScale - 0.1));
    if (fontReset)    fontReset.addEventListener('click',    () => applyScale(1));

    /* ── Mobile Navigation ── */
    const hamburger  = document.getElementById('hamburger');
    const mobileNav  = document.getElementById('mobile-nav');

    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', function () {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      });

      // Close on nav link click
      mobileNav.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileNav.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });

      // Close on outside click
      document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
          mobileNav.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
          mobileNav.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.setAttribute('aria-label', 'Open navigation menu');
          hamburger.focus();
        }
      });
    }

    /* ── Sticky Header Shadow ── */
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
      let rafPending = false;
      const onScroll = function () {
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(function () {
          siteHeader.classList.toggle('scrolled', window.scrollY > 10);
          rafPending = false;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ── Scroll Reveal (IntersectionObserver) ── */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0 && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (el) { observer.observe(el); });
    } else {
      // Fallback: show all immediately
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ── Hero Word Animation (Home page only) ── */
    const heroWords = document.querySelectorAll('.hero-home h1 .word');
    if (heroWords.length > 0) {
      // Stagger each word
      heroWords.forEach(function (word, i) {
        setTimeout(function () {
          word.classList.add('visible');
        }, 200 + i * 150);
      });
    }

    /* ── Contact Form (Formspree AJAX) ── */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {

      function setFieldError(input, msg) {
        const group = input.closest('.form-group');
        if (!group) return;
        group.classList.add('has-error');
        let err = group.querySelector('.field-error');
        if (!err) {
          err = document.createElement('span');
          err.className = 'field-error';
          err.setAttribute('role', 'alert');
          group.appendChild(err);
        }
        err.textContent = msg;
      }

      function clearFieldError(input) {
        const group = input.closest('.form-group');
        if (!group) return;
        group.classList.remove('has-error');
        const err = group.querySelector('.field-error');
        if (err) err.remove();
      }

      function validateContactForm() {
        let valid = true;
        const nameEl    = contactForm.querySelector('#name');
        const emailEl   = contactForm.querySelector('#email');
        const phoneEl   = contactForm.querySelector('#phone');
        const subjectEl = contactForm.querySelector('#subject');
        const messageEl = contactForm.querySelector('#message');

        [nameEl, emailEl, subjectEl, messageEl].forEach(clearFieldError);
        if (phoneEl) clearFieldError(phoneEl);

        if (!nameEl.value.trim()) {
          setFieldError(nameEl, 'Please enter your full name.');
          valid = false;
        }

        const emailVal = emailEl.value.trim();
        if (!emailVal) {
          setFieldError(emailEl, 'Please enter your email address.');
          valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
          setFieldError(emailEl, 'Please enter a valid email address.');
          valid = false;
        }

        if (phoneEl && phoneEl.value.trim()) {
          const digits = phoneEl.value.replace(/[\s\-().+]/g, '');
          if (!/^\d{10,13}$/.test(digits)) {
            setFieldError(phoneEl, 'Please enter a valid phone number (10–13 digits).');
            valid = false;
          }
        }

        if (!subjectEl.value.trim()) {
          setFieldError(subjectEl, 'Please enter a subject.');
          valid = false;
        }

        if (!messageEl.value.trim()) {
          setFieldError(messageEl, 'Please enter your message.');
          valid = false;
        } else if (messageEl.value.trim().length < 10) {
          setFieldError(messageEl, 'Message must be at least 10 characters.');
          valid = false;
        }

        if (!valid) {
          const firstErr = contactForm.querySelector('.has-error input, .has-error textarea');
          if (firstErr) firstErr.focus();
        }
        return valid;
      }

      contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (!validateContactForm()) return;

        const submitBtn = contactForm.querySelector('[type="submit"]');
        const successMsg = document.getElementById('form-success');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;

        try {
          const data = new FormData(contactForm);
          const response = await fetch(contactForm.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            contactForm.reset();
            contactForm.querySelectorAll('.has-error').forEach(function (g) { g.classList.remove('has-error'); });
            contactForm.querySelectorAll('.field-error').forEach(function (e) { e.remove(); });
            if (successMsg) {
              successMsg.style.display = 'block';
              successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          } else {
            throw new Error('Server error');
          }
        } catch (err) {
          alert('Sorry, something went wrong. Please email us directly at investor@wealthminds.co.in');
        } finally {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      });
    }

    /* ── Back-to-Top Button ── */
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      window.addEventListener('scroll', function () {
        backToTop.classList.toggle('visible', window.scrollY > 300);
      }, { passive: true });
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ── Dismissible Disclaimer Banners ── */
    document.querySelectorAll('.disclaimer-close').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const banner = btn.closest('.disclaimer-banner');
        if (banner) banner.remove();
      });
    });

    /* ── Set active nav link based on current page ── */
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav-link[data-page]').forEach(function (link) {
      const page = link.getAttribute('data-page');
      const path = currentPath.split('/').pop() || 'index.html';

      let isActive = false;
      if (page === 'home' && (path === '' || path === 'index.html')) isActive = true;
      else if (page === 'about' && path === 'about.html') isActive = true;
      else if (page === 'services' && (path === 'services.html' || path.startsWith('services'))) isActive = true;
      else if (page === 'policies' && path === 'policies.html') isActive = true;
      else if (page === 'investor-charter' && path === 'investor-charter.html') isActive = true;
      else if (page === 'complaint-data' && path === 'complaint-data.html') isActive = true;
      else if (page === 'contact' && path === 'contact.html') isActive = true;

      if (isActive) link.classList.add('active');
    });

  });
})();

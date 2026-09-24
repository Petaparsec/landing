'use strict';
const menu = document.querySelector('#mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
function closeMenu() { menu.close(); }
menuToggle.addEventListener('click', () => {
  menu.showModal();
  menuToggle.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
});
menu.querySelector('.menu-close').addEventListener('click', closeMenu);
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
menu.addEventListener('close', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
});
const desktop = matchMedia('(min-width:761px)');
desktop.addEventListener('change', event => { if (event.matches && menu.open) closeMenu(); });
const video = document.querySelector('video');
const videoButton = document.querySelector('.video-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
function updateVideoButton() {
  videoButton.textContent = video.paused ? 'Play ↗' : 'Pause Ⅱ';
  videoButton.setAttribute('aria-label', (video.paused ? 'Play' : 'Pause') + ' background video');
}
video.addEventListener('play', updateVideoButton);
video.addEventListener('pause', updateVideoButton);
videoButton.addEventListener('click', () => { if(video.paused) video.play().catch(updateVideoButton); else video.pause(); });
if (!reducedMotion.matches) video.play().catch(updateVideoButton);
reducedMotion.addEventListener('change', event => { if(event.matches) video.pause(); });
const form = document.querySelector('form');
const status = form.querySelector('.form-status');
const submit = form.querySelector('[type="submit"]');
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submit.disabled) return;
  submit.disabled = true;
  submit.textContent = 'Sending…';
  status.textContent = '';
  status.classList.remove('error');
  try {
    const response = await fetch(form.action, { method:'POST', body:new FormData(form), headers:{Accept:'application/json'} });
    if (!response.ok) throw new Error('Unable to send');
    status.textContent = 'Thanks — we’ll be in touch shortly.';
    form.reset();
  } catch {
    status.classList.add('error');
    status.textContent = 'Your message could not be sent. Please try again or email hello@petaparsec.com.';
  } finally {
    submit.disabled = false;
    submit.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
  }
});

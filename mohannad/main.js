/* =============================================
   MAIN.JS — Interactions
   Mohannad A.J. vCard
   ============================================= */

'use strict';

// ── Toast ──────────────────────────────────────
function showToast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function () { t.classList.remove('show'); }, 2800);
}

// ── Save Contact (.vcf) ────────────────────────
function downloadVCard() {
  var lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Mohannad A.J.',
    'N:A.J.;Mohannad;;;',
    'TITLE:Visual Storyteller',
    'TEL;TYPE=CELL:+201061422479',
    'URL;TYPE=Portfolio:https://mohannadalij.github.io/portfolio/index.html',
    'X-SOCIALPROFILE;type=instagram:https://www.instagram.com/mhndalij/',
    'X-SOCIALPROFILE;type=facebook:https://www.facebook.com/mohannadesigns',
    'END:VCARD'
  ].join('\r\n');

  var blob = new Blob([lines], { type: 'text/vcard;charset=utf-8' });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href = url;
  a.download = 'mohannad-aj.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Contact saved ✓');
}

// ── Avatar fallback ────────────────────────────
function initAvatar() {
  var img = document.getElementById('avatar-img');
  var ini = document.getElementById('avatar-initial');
  if (!img) return;
  img.addEventListener('load',  function () { img.style.display = 'block'; ini.style.display = 'none'; });
  img.addEventListener('error', function () { img.style.display = 'none';  ini.style.display = 'block'; });
  if (img.complete && img.naturalWidth) { img.dispatchEvent(new Event('load')); }
  else if (img.complete)                { img.dispatchEvent(new Event('error')); }
}

// ── Phone — copy on desktop, call on mobile ────
function initPhone() {
  var link = document.getElementById('phone-link');
  if (!link) return;
  link.addEventListener('click', function (e) {
    if ('ontouchstart' in window) return; // let tel: work on mobile
    e.preventDefault();
    navigator.clipboard.writeText('+201061422479')
      .then(function () { showToast('Phone number copied!'); })
      .catch(function () { window.location.href = link.href; });
  });
}

// ── Init ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  initAvatar();
  initPhone();
  var btn = document.getElementById('save-btn');
  if (btn) btn.addEventListener('click', downloadVCard);
});

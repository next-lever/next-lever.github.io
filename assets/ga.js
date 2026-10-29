/* GA4 for nextleverhq.com. Set the Measurement ID below (G-...). */
(function(){
  var ID = 'G-8DXVSVQ9C3';
  if (!/^G-[A-Z0-9]{6,}$/.test(ID) || ID.indexOf('XXXX') > -1) return;
  /* gtag base snippet is inline in each page <head>; this file adds events only */
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) { window.gtag = function(){ dataLayer.push(arguments); }; gtag('js', new Date()); gtag('config', ID); }
  if (/^\/booked(\.html)?\/?$/.test(location.pathname)) gtag('event', 'booked');
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a'); if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h === '#audit' || a.classList.contains('btn')) gtag('event', 'audit_click', {link_text: (a.textContent||'').trim().slice(0,60)});
    else if (h.indexOf('sms:') === 0 || h.indexOf('tel:') === 0) gtag('event', 'text_click');
  }, true);
  document.addEventListener('submit', function(e){
    gtag('event', 'form_submit', {form_id: (e.target && e.target.id) || ''});
  }, true);
})();

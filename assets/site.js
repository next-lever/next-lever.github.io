/* Next Lever site behaviour. Reads window.SITE_CONFIG (assets/config.js). No external libraries. */
(function () {
  var C = window.SITE_CONFIG || {};
  var isPlaceholder = function (v) { return !v || /REPLACE_/.test(v); };

  // 1. VSL embed (privacy-enhanced youtube-nocookie)
  var v = document.getElementById("vsl");
  if (v && !v.dataset.self && C.YOUTUBE_VIDEO_ID && !isPlaceholder(C.YOUTUBE_VIDEO_ID)) {
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(C.YOUTUBE_VIDEO_ID) + "?rel=0&modestbranding=1&playsinline=1";
    f.title = C.VIDEO_TITLE || "Next Lever video";
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    f.setAttribute("allowfullscreen", "");
    f.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    v.appendChild(f);
  }

  // 2. Text AUDIT link (static HTML already has the same values; this keeps config the single source)
  if (C.TEXT_AUDIT_NUMBER_E164) {
    [].forEach.call(document.querySelectorAll("a.gv"), function (a) {
      a.setAttribute("href", "sms:" + C.TEXT_AUDIT_NUMBER_E164 + "?&body=AUDIT");
      var n = a.querySelector(".gvnum");
      if (n && C.TEXT_AUDIT_NUMBER_DISPLAY) n.textContent = C.TEXT_AUDIT_NUMBER_DISPLAY;
    });
  }

  // 3. Booking calendar (thank-you.html)
  var cal = document.getElementById("calendar");
  if (cal) {
    if (!isPlaceholder(C.BOOKING_EMBED_URL)) {
      cal.innerHTML = "";
      var i = document.createElement("iframe");
      i.src = C.BOOKING_EMBED_URL;
      i.title = "Book your free 15-minute audit";
      i.loading = "lazy";
      cal.appendChild(i);
    }
    var link = document.getElementById("cal-link");
    if (link) {
      if (C.BOOKING_PAGE_URL) { link.href = C.BOOKING_PAGE_URL; link.hidden = false; link.parentNode.hidden = false; }
    }
  }

  // 4. Booked page video slot (placeholder until BOOKED_VIDEO_ID is set)
  var bv = document.getElementById("booked-video");
  if (bv && !bv.dataset.self && C.BOOKED_VIDEO_ID && !isPlaceholder(C.BOOKED_VIDEO_ID)) {
    bv.innerHTML = "";
    var bs = document.getElementById("booked-video-section"); if (bs) bs.hidden = false;
    var bf = document.createElement("iframe");
    bf.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(C.BOOKED_VIDEO_ID) + "?rel=0&modestbranding=1&playsinline=1";
    bf.title = "You're booked";
    bf.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    bf.setAttribute("allowfullscreen", "");
    bf.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    bv.appendChild(bf);
  }

  // 5. Forms: AJAX to Formspree (works on the free tier; free tier has NO custom redirect, so we redirect in JS)
  [].forEach.call(document.querySelectorAll("form[data-endpoint]"), function (form) {
    var status = form.querySelector(".status");
    var btn = form.querySelector("button[type=submit]");
    var endpoint = C[form.getAttribute("data-endpoint")];
    // Plain (no-JS) fallback target
    if (!isPlaceholder(endpoint)) form.setAttribute("action", endpoint);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var say = function (msg, cls) { if (status) { status.textContent = msg; status.className = "status " + cls; } };
      if (isPlaceholder(endpoint)) {
        say("Preview mode: this form is not connected yet, so nothing was sent.", "err");
        return;
      }
      // honeypot: if filled, pretend success and drop it
      var hp = form.querySelector("[name=_gotcha]");
      var next = form.getAttribute("data-next");
      if (hp && hp.value) { window.location.href = next; return; }

      var subjField = form.querySelector("[name=_subject]");
      var tpl = form.getAttribute("data-subject");
      var src = form.querySelector("[name=" + (form.getAttribute("data-subject-field") || "business") + "]");
      if (subjField && tpl) subjField.value = tpl.replace(/\{(business|name|email)\}/g, (src && src.value.trim()) || "(not given)");

      var data = new FormData(form);
      if (btn) { btn.disabled = true; btn.setAttribute("data-label", btn.textContent); btn.textContent = "Sending..."; }
      say("", "");
      fetch(endpoint, { method: "POST", body: data, headers: { "Accept": "application/json" } })
        .then(function (r) {
          if (r.ok) { window.location.href = next; return; }
          return r.json().then(function (j) { throw new Error((j && j.errors && j.errors.map(function (x) { return x.message; }).join(", ")) || "Something went wrong."); });
        })
        .catch(function (err) {
          if (btn) { btn.disabled = false; btn.textContent = btn.getAttribute("data-label"); }
          say((err && err.message ? err.message + " " : "") + "Please try again, or text AUDIT to " + (C.TEXT_AUDIT_NUMBER_DISPLAY || "us") + ".", "err");
        });
    });
  });
})();
/* Self-hosted hero video: Tap for sound unmutes and restarts from 0 */
(function(){
  var vid=document.getElementById("hero-video"),b=document.getElementById("sound-btn");
  if(!vid||!b)return;
  b.addEventListener("click",function(){
    vid.muted=false;vid.loop=false;vid.currentTime=0;vid.controls=true;
    var pr=vid.play();if(pr&&pr.catch)pr.catch(function(){});
    b.style.display="none";
    if(window.gtag)gtag("event","video_sound_on");
  });
})();

/* Booked page video: plays with sound on tap */
(function(){
  var v=document.getElementById("booked-vid"),b=document.getElementById("booked-play");
  if(!v||!b)return;
  b.addEventListener("click",function(){
    v.muted=false;v.currentTime=0;v.controls=true;var p=v.play();if(p&&p.catch)p.catch(function(){});
    b.style.display="none";if(window.gtag)gtag("event","booked_video_play");
  });
})();

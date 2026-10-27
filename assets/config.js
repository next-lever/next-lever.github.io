/* =====================================================================
   NEXT LEVER SITE CONFIG: the ONLY place external values live.
   Every page loads this file first. Swap the REPLACE_* values later.
   Nothing here is a secret (Formspree form URLs and calendar embed
   URLs are public by design).
   ===================================================================== */
window.SITE_CONFIG = {
  // Canonical origin (no trailing slash). Used to build the absolute prep link.
  SITE_ORIGIN: "https://nextleverhq.com",

  // Unlisted YouTube VSL: "Next Lever: Find what's costing you money"
  // https://youtu.be/SafUp0nY31A  (confirmed by Michael's agent, Oct 27 2026)
  YOUTUBE_VIDEO_ID: "SafUp0nY31A",
  VIDEO_TITLE: "Next Lever: Find what's costing you money",

  // Booked page video (30-second clip, unlisted YouTube ID). Leave as REPLACE_BOOKED_VIDEO_ID until it exists.
  BOOKED_VIDEO_ID: "REPLACE_BOOKED_VIDEO_ID",

  // Formspree FREE tier endpoints. Create 2 forms at formspree.io, paste the full URLs.
  // PLACEHOLDER: forms refuse to submit (and say so) until these are replaced.
  FORMSPREE_LEAD_URL: "https://formspree.io/f/xoeedype",   // step 1 form on index.html
  FORMSPREE_PREP_URL: "https://formspree.io/f/mgaakrpk",   // booked.html (6 questions)

  // Booking calendar shown on thank-you.html.
  // Google Calendar appointment schedule: Calendar > open the schedule > Share >
  //   Website embed > Inline booking page > copy the iframe src, e.g.
  //   https://calendar.google.com/calendar/appointments/schedules/XXXX?gv=true
  // Calendly inline embed instead: use https://calendly.com/YOUR-NAME/15min?embed_domain=nextleverhq.com&embed_type=Inline
  //   (the same iframe slot works for both; see DEPLOY-STEPS.md).
  // PLACEHOLDER: thank-you.html shows a "calendar goes here" box until this is replaced.
  BOOKING_EMBED_URL: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3wOlnObb9aKkI9JvPZo-gMv8Ev2dBP2LgGNHrlM47EVp6dvjF5w8lDwudQuh2MDVfDHVy5W6fk?gv=true",
  // Optional plain link to the booking page (new-tab fallback). Leave "" to hide.
  BOOKING_PAGE_URL: "https://calendar.app.google/8gJg1hUnuPm61eKw7",

  // Text AUDIT line (kept as-is; swap to the Twilio number only after Nov 19 + A2P approval)
  TEXT_AUDIT_NUMBER_E164: "+17867911735",
  TEXT_AUDIT_NUMBER_DISPLAY: "(786) 791-1735"
};

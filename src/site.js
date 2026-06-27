// Central brand + contact details. Replace the placeholders below with the
// real handles/numbers before going live — everything (Contact form quick
// actions, Footer, etc.) reads from here.
export const SITE = {
  name: "Nagpur Socialize",
  tagline: "Experiential marketing, hospitality & events",
  email: "nagpursocialize@gmail.com",
  // Display number + the digits-only version used for tel:/WhatsApp links.
  phone: "+91 99999 99999",
  phoneDigits: "919999999999", // ← REPLACE with the real number
  whatsappDigits: "919999999999", // ← REPLACE with the real WhatsApp number
  instagram: "https://instagram.com/nagpur_socialize_",
  youtube: "#",
  facebook : "https://facebook.com/profile.php?id=61578965233011",
  location: "Nagpur, Maharashtra, India",
};

export const telHref = `tel:+${SITE.phoneDigits}`;
export const mailHref = `mailto:${SITE.email}`;
export const waHref = (msg = "Hi Nagpur Socialize, I'd like to plan something.") =>
  `https://wa.me/${SITE.whatsappDigits}?text=${encodeURIComponent(msg)}`;

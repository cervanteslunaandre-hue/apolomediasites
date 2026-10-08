/* ====== CONFIGURACIÓN ======
   Cambia estos valores con los datos reales de Apolo Media. */
const CONFIG = {
  whatsapp: "5215500000000", // número con código de país, sin + ni espacios
  email: "hola@apolomedia.com",
};

// Enlace de WhatsApp
const waLink = document.getElementById("waLink");
if (waLink) {
  const msg = encodeURIComponent("Hola Apolo Media, quiero cotizar un sitio web.");
  waLink.href = `https://wa.me/${CONFIG.whatsapp}?text=${msg}`;
}

// Año en footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// Animaciones al hacer scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Contadores
const counters = document.querySelectorAll("[data-count]");
const counterIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
counters.forEach((c) => counterIO.observe(c));

// Formulario: valida y envía por WhatsApp (sin backend)
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let valid = true;
  form.querySelectorAll("[required]").forEach((field) => {
    const ok = field.checkValidity() && field.value.trim() !== "";
    field.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    note.textContent = "Revisa los campos marcados en rojo.";
    note.classList.remove("success");
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries());
  const text =
    `Hola Apolo Media, quiero una cotización.%0A` +
    `*Nombre:* ${data.nombre}%0A` +
    `*Teléfono:* ${data.telefono}%0A` +
    `*Correo:* ${data.correo}%0A` +
    `*Servicio:* ${data.servicio}%0A` +
    `*Mensaje:* ${data.mensaje || "-"}`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${text}`, "_blank", "noopener");
  note.textContent = "¡Listo! Te abrimos WhatsApp con tu solicitud. Respondemos en menos de 24 h.";
  note.classList.add("success");
  form.reset();
});

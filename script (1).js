const scene           = document.getElementById("scene");
const sealBtn         = document.getElementById("sealBtn");
const opening         = document.getElementById("opening");
const hint            = document.getElementById("hint");
const finalInvitation = document.getElementById("finalInvitation");
const langToggle      = document.getElementById("langToggle");
const textContent     = document.getElementById("textContent");

/* ---- Contenu bilingue ---- */
const content = {
  fr: {
    btn: "AR",
    title: "Faire-part de mariage",
    parents: "Monsieur et Madame BOUDEKAK ont la joie et le plaisir de vous faire part du mariage de leur fille",
    name: "Nour El Houda",
    message: "Et vous prient de bien vouloir honorer de votre présence la cérémonie qui aura lieu en cette heureuse occasion.",
    date: "📅 Lundi 10 août 2026",
    time: "🕑 À partir de 14h00",
    place: "📍 Salle des fêtes Reine de Saba, Rouiba - Alger",
    warning: "⚠ Pour des raisons liées au règlement de la salle des fêtes, la présence des enfants est strictement interdite.",
    map: "Voir la localisation"
  },
  ar: {
    btn: "FR",
    title: "دعوة زفاف",
    parents: "يتشرف السيد والسيدة بودكاك بدعوتكم لحضور حفل زفاف ابنتهما",
    name: "نور الهدى",
    message: "وذلك بمناسبة هذا اليوم السعيد، راجين منكم تشريفنا بحضوركم الكريم.",
    date: "📅 الإثنين 10 أوت 2026",
    time: "🕑 ابتداءً من الساعة 14:00",
    place: "📍 قاعة الحفلات ملكة سبأ، رويبة - الجزائر",
    warning: "⚠ تنبيه: يمنع حضور الأطفال منعًا باتًا حسب قانون قاعة الحفلات.",
    map: "عرض الموقع"
  }
};

let currentLang = "fr";
let opened = false;

/* ---- Animation d'ouverture ---- */
sealBtn.addEventListener("click", () => {
  if (opened) return;
  opened = true;

  hint.textContent = "Ouverture de l'invitation...";
  hint.classList.add("fade");

  // Phase 1 : enveloppe fermée monte + disparaît → enveloppe ouverte révélée
  scene.classList.add("step-open");

  // Phase 2 : carte monte (après que l'enveloppe ouverte soit visible)
  setTimeout(() => {
    scene.classList.add("step-card");
  }, 800);

  // Phase 3 : pétales
  setTimeout(spawnPetals, 1000);

  // Phase 4 : transition vers invitation finale
  setTimeout(() => opening.classList.add("fade-out"), 2500);

  setTimeout(() => {
    opening.style.display = "none";
    document.body.style.overflow = "auto";
    finalInvitation.classList.add("show");
  }, 3300);
});

/* ---- Pétales ---- */
function spawnPetals() {
  const petals = ["🌸","🌺","✿","🌷","💐","🌼","❀"];
  for (let i = 0; i < 24; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "petal";
      el.textContent = petals[Math.floor(Math.random() * petals.length)];
      el.style.left   = Math.random() * 100 + "vw";
      el.style.top    = "-40px";
      el.style.fontSize = (11 + Math.random() * 13) + "px";
      el.style.animationDuration = (3.5 + Math.random() * 3.5) + "s";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 8000);
    }, i * 100);
  }
}

/* ---- Langue ---- */
langToggle.addEventListener("click", () => {
  currentLang = currentLang === "fr" ? "ar" : "fr";
  changeLanguage(currentLang);
});

function changeLanguage(lang) {
  const t = content[lang];
  langToggle.textContent = t.btn;
  document.getElementById("title").textContent   = t.title;
  document.getElementById("parents").textContent = t.parents;
  document.getElementById("name").textContent    = t.name;
  document.getElementById("message").textContent = t.message;
  document.getElementById("date").textContent    = t.date;
  document.getElementById("time").textContent    = t.time;
  document.getElementById("place").textContent   = t.place;
  document.getElementById("warning").textContent = t.warning;
  document.getElementById("mapBtn").textContent  = t.map;
  textContent.dir = lang === "ar" ? "rtl" : "ltr";
}

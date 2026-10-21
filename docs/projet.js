// Comportement des pages projet : onglets, repères sur les captures, agrandissement.
document.documentElement.classList.add("js");

// Repères : leur position est donnée en pourcentage de la capture (data-gauche, data-haut).
document.querySelectorAll(".repere").forEach((repere) => {
  repere.style.left = repere.dataset.gauche + "%";
  repere.style.top = repere.dataset.haut + "%";
});

// Lien entre un repère et son explication, dans chaque panneau.
document.querySelectorAll(".panneau").forEach((panneau) => {
  const activer = (numero) => {
    panneau.querySelectorAll("[data-note]").forEach((el) =>
      el.classList.toggle("actif", el.dataset.note === numero));
  };
  panneau.querySelectorAll("[data-note]").forEach((el) => {
    el.addEventListener("click", () => activer(el.dataset.note));
    el.addEventListener("mouseenter", () => activer(el.dataset.note));
  });
  panneau.querySelectorAll(".repere").forEach((repere) => {
    const titre = panneau.querySelector(`.note[data-note="${repere.dataset.note}"] strong`);
    if (titre) repere.setAttribute("aria-label", `Repère ${repere.dataset.note} : ${titre.textContent}`);
  });
});

// Onglets : clic et flèches du clavier.
const onglets = [...document.querySelectorAll(".onglet")];
const choisir = (onglet) => {
  onglets.forEach((o) => {
    const actif = o === onglet;
    o.setAttribute("aria-selected", actif);
    o.tabIndex = actif ? 0 : -1;
    document.getElementById(o.getAttribute("aria-controls")).hidden = !actif;
  });
  onglet.focus();
};
onglets.forEach((onglet, i) => {
  onglet.addEventListener("click", () => choisir(onglet));
  onglet.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") choisir(onglets[(i + 1) % onglets.length]);
    if (e.key === "ArrowLeft") choisir(onglets[(i - 1 + onglets.length) % onglets.length]);
  });
});

// Agrandissement de la capture.
const fenetre = document.getElementById("agrandissement");
if (fenetre) {
  const grande = fenetre.querySelector("img");
  document.querySelectorAll(".agrandir").forEach((bouton) => {
    bouton.addEventListener("click", () => {
      const image = bouton.closest(".panneau").querySelector(".capture img");
      grande.src = image.src;
      grande.alt = image.alt;
      fenetre.showModal();
    });
  });
  fenetre.querySelector(".fermer").addEventListener("click", () => fenetre.close());
  fenetre.addEventListener("click", (e) => { if (e.target === fenetre) fenetre.close(); });
}

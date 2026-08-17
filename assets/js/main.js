/* =========================================================
   S E T E D — Script principal
   Menu mobile · Bascule FR/EN · Animations · Compteurs
   Filtres galerie · Formulaire de devis
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. En-tête collant ---------- */
  var entete = document.querySelector(".entete");
  if (entete) {
    var majEntete = function () {
      entete.classList.toggle("defile", window.scrollY > 12);
    };
    majEntete();
    window.addEventListener("scroll", majEntete, { passive: true });
  }

  /* ---------- 2. Menu mobile ---------- */
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var ouvert = menu.classList.toggle("ouvert");
      burger.classList.toggle("ouvert", ouvert);
      burger.setAttribute("aria-expanded", ouvert ? "true" : "false");
      document.body.style.overflow = ouvert ? "hidden" : "";
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && menu.classList.contains("ouvert")) {
        menu.classList.remove("ouvert");
        burger.classList.remove("ouvert");
        document.body.style.overflow = "";
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("ouvert")) burger.click();
    });
  }

  /* ---------- 3. Bascule de langue FR / EN ---------- */
  /* Principe : le HTML est écrit en français.
     Chaque élément traduisible porte un attribut data-en (texte anglais).
     Pour les champs de formulaire : data-en-ph (placeholder anglais). */
  var LANG_CLE = "seted_langue";
  var elements = Array.prototype.slice.call(document.querySelectorAll("[data-en]"));
  var placeholders = Array.prototype.slice.call(document.querySelectorAll("[data-en-ph]"));

  elements.forEach(function (el) { el.dataset.frOrig = el.innerHTML; });
  placeholders.forEach(function (el) { el.dataset.frPh = el.getAttribute("placeholder") || ""; });

  function appliquerLangue(lang) {
    var en = lang === "en";
    elements.forEach(function (el) {
      el.innerHTML = en ? el.getAttribute("data-en") : el.dataset.frOrig;
    });
    placeholders.forEach(function (el) {
      el.setAttribute("placeholder", en ? el.getAttribute("data-en-ph") : el.dataset.frPh);
    });
    document.documentElement.setAttribute("lang", en ? "en" : "fr");
    var titre = document.querySelector("title[data-en-title]");
    if (titre) {
      if (!titre.dataset.frTitle) titre.dataset.frTitle = document.title;
      document.title = en ? titre.getAttribute("data-en-title") : titre.dataset.frTitle;
    }
    document.querySelectorAll(".langues button").forEach(function (b) {
      b.classList.toggle("actif", b.dataset.lang === lang);
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
    try { localStorage.setItem(LANG_CLE, lang); } catch (e) { /* mode privé */ }
  }

  document.querySelectorAll(".langues button").forEach(function (b) {
    b.addEventListener("click", function () { appliquerLangue(b.dataset.lang); });
  });

  var langueInitiale = "fr";
  try { langueInitiale = localStorage.getItem(LANG_CLE) || "fr"; } catch (e) { }
  appliquerLangue(langueInitiale);

  /* ---------- 4. Apparition au défilement ---------- */
  var cibles = document.querySelectorAll(".anim");
  if ("IntersectionObserver" in window && cibles.length) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("vu"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    cibles.forEach(function (c) { obs.observe(c); });
  } else {
    cibles.forEach(function (c) { c.classList.add("vu"); });
  }

  /* ---------- 5. Compteurs animés ---------- */
  var compteurs = document.querySelectorAll("[data-compteur]");
  if ("IntersectionObserver" in window && compteurs.length) {
    var obsNum = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var cible = parseFloat(el.getAttribute("data-compteur"));
        var duree = 1500, debut = null;
        function pas(t) {
          if (!debut) debut = t;
          var p = Math.min((t - debut) / duree, 1);
          var val = Math.floor((1 - Math.pow(1 - p, 3)) * cible);
          el.firstChild.nodeValue = val.toLocaleString("fr-FR");
          if (p < 1) requestAnimationFrame(pas);
          else el.firstChild.nodeValue = cible.toLocaleString("fr-FR");
        }
        requestAnimationFrame(pas);
        obsNum.unobserve(el);
      });
    }, { threshold: 0.4 });
    compteurs.forEach(function (c) { obsNum.observe(c); });
  }

  /* ---------- 6. Filtres de la galerie ---------- */
  var filtres = document.querySelectorAll(".filtres button");
  var projets = document.querySelectorAll(".galerie .projet");
  if (filtres.length && projets.length) {
    filtres.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filtres.forEach(function (b) { b.classList.remove("actif"); });
        btn.classList.add("actif");
        var f = btn.dataset.filtre;
        projets.forEach(function (p) {
          var visible = f === "tous" || p.dataset.categorie === f;
          p.style.display = visible ? "" : "none";
          if (visible) { p.classList.remove("vu"); requestAnimationFrame(function () { p.classList.add("vu"); }); }
        });
      });
    });
  }

  /* ---------- 7. Formulaire de demande de devis ----------
     Sans serveur, le formulaire ouvre le logiciel de messagerie
     avec un message pré-rempli adressé à SETED.
     Pour recevoir les demandes directement dans votre boîte,
     voir le guide de mise en ligne (option Formspree). */
  var form = document.getElementById("form-devis");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var v = function (k) { return (d.get(k) || "").toString().trim(); };
      var corps =
        "Nom / Société : " + v("nom") + "\n" +
        "E-mail : " + v("email") + "\n" +
        "Téléphone : " + v("tel") + "\n" +
        "Type de demande : " + v("sujet") + "\n" +
        "Quantité / Volume estimé : " + (v("volume") || "non précisé") + "\n" +
        "Localisation : " + (v("lieu") || "non précisée") + "\n\n" +
        "Message :\n" + v("message") + "\n\n" +
        "— Demande envoyée depuis le site seted.ci";
      var sujet = "Demande de devis — " + (v("sujet") || "SETED") + " — " + v("nom");
      var lien = "mailto:sihan.seted@gmail.com?subject=" + encodeURIComponent(sujet) +
        "&body=" + encodeURIComponent(corps);
      window.location.href = lien;
      var ok = document.querySelector(".message-ok");
      if (ok) { ok.classList.add("visible"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
      form.reset();
    });
  }

  /* ---------- 8. Année courante dans le pied de page ---------- */
  var an = document.getElementById("annee");
  if (an) an.textContent = new Date().getFullYear();
})();

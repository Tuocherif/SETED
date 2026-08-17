# Site web SETED — Guide complet

**SETED** — Sompley Entreprise des Travaux, Équipements et Divers
Abidjan Koumassi Sogefia · RCCM CI-ABJ-2018-B-33394 · CC 1869287 W

---

## 1. Ce que contient le site

| Fichier | Page | Contenu |
|---|---|---|
| `index.html` | Accueil | Hero, les 2 pôles (BTP + Riz), 6 activités complémentaires, chiffres clés, témoignages |
| `a-propos.html` | À propos | Histoire, les 7 domaines de l'objet social, valeurs, informations légales |
| `btp.html` | BTP & Travaux | 6 prestations détaillées, méthode en 4 étapes, clientèle, FAQ |
| `riz.html` | Import de riz | Offre, qualités/conditionnements, processus d'import en 4 étapes, acheteurs, FAQ |
| `realisations.html` | Réalisations | Galerie filtrable (BTP / Riz / Fournitures / Espaces verts) |
| `contact.html` | Contact | Formulaire de devis, coordonnées, carte Google Maps, FAQ |
| `assets/css/style.css` | — | Toute la mise en forme |
| `assets/js/main.js` | — | Menu mobile, bascule FR/EN, animations, compteurs, filtres, formulaire |
| `assets/img/logo-seted.png` | — | Votre logo (extrait de votre papier en-tête) |
| `robots.txt` / `sitemap.xml` | — | Référencement Google |

**Fonctionnalités incluses :** bilingue FR/EN (bouton en haut à droite), bouton WhatsApp flottant vers le 07 07 82 35 82, formulaire de devis, galerie filtrable, compteurs animés, entièrement responsive (mobile, tablette, ordinateur).

---

## 2. Voir le site tout de suite

Double-cliquez sur `index.html`. Il s'ouvre dans votre navigateur, sans rien installer. Tout fonctionne en local sauf la carte Google Maps, qui a besoin d'internet.

---

## 3. ⚠️ À personnaliser AVANT la mise en ligne

Trois éléments sont des **exemples** que j'ai mis en place pour que le site soit complet. Remplacez-les par vos vraies données — sinon vous publiez des informations qui ne sont pas les vôtres.

### a) Les chiffres clés (`index.html`)
Cherchez `data-compteur` :

```html
<span data-compteur="45">0</span>   <!-- Chantiers et commandes livrés -->
<span data-compteur="30">0</span>   <!-- Clients qui nous font confiance -->
```

Remplacez `45` et `30` par vos chiffres réels. (Les deux autres — **2018** et **7 domaines** — sont exacts, ils viennent de votre RCCM et de votre objet social.)

### b) Les témoignages (`index.html`)
Section « Ce que disent nos clients » : trois avis d'exemple signés K. Adou, M. Traoré et S. Bamba. **Remplacez-les par de vrais avis** de clients qui vous autorisent à les citer, ou supprimez la section entière (le bloc `<section>` entre les commentaires `TÉMOIGNAGES` et `CTA`).

### c) Les réalisations (`realisations.html`)
Six fiches d'exemple. Modifiez les titres, descriptions et lieux pour vos vrais chantiers.

---

## 4. Ajouter vos photos

Le site utilise des blocs colorés à la place des photos (visibles avec la mention « Remplacez ce bloc par une photo… »).

**Étape 1** — Placez vos photos dans `assets/img/` (format `.jpg`, largeur 1200 px, poids < 400 Ko idéalement).

**Étape 2** — Remplacez un bloc `<div class="visuel …">…</div>` par :

```html
<img src="assets/img/chantier-bureaux.jpg" alt="Réfection de bureaux à Abidjan"
     style="border-radius:22px;box-shadow:var(--ombre-l);width:100%;height:100%;object-fit:cover">
```

**Pour la galerie** (`realisations.html`), remplacez le contenu de `<div class="projet__img">` par :

```html
<div class="projet__img">
  <span class="projet__etiquette">Réfection</span>
  <img src="assets/img/projet-1.jpg" alt="Description du chantier"
       style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0">
</div>
```

> Écrivez toujours un `alt` descriptif : Google l'utilise pour le référencement.

---

## 5. Mise en ligne sur GitHub Pages (gratuit)

Votre dépôt : **https://github.com/Tuocherif/SETED.git**
Adresse finale du site : **https://tuocherif.github.io/SETED/**

### Option A — Par l'interface web (le plus simple, sans commande)

1. Ouvrez https://github.com/Tuocherif/SETED
2. Cliquez sur **Add file → Upload files**
3. Glissez **le contenu** du dossier `site-seted` (les 6 fichiers `.html`, `robots.txt`, `sitemap.xml`, et le dossier `assets`) — pas le dossier `site-seted` lui-même
4. En bas : **Commit changes**
5. Allez dans **Settings → Pages**
6. Sous *Source*, choisissez **Deploy from a branch**, branche **main**, dossier **/ (root)** → **Save**
7. Attendez 1 à 2 minutes, puis ouvrez **https://tuocherif.github.io/SETED/**

### Option B — En ligne de commande

```bash
cd chemin/vers/site-seted
git init
git add .
git commit -m "Site web SETED"
git branch -M main
git remote add origin https://github.com/Tuocherif/SETED.git
git push -u origin main
```

Puis faites les étapes 5 à 7 de l'option A.

### Mettre le site à jour ensuite

```bash
git add .
git commit -m "Mise à jour des réalisations"
git push
```
Le site se met à jour tout seul en 1 à 2 minutes.

---

## 6. Utiliser votre propre nom de domaine (ex. `seted.ci`)

1. Achetez le domaine (`.ci` chez un registrar ivoirien, ou `.com` chez Namecheap / OVH / Hostinger)
2. Chez votre registrar, créez ces enregistrements **A** pour `@` :
   `185.199.108.153` · `185.199.109.153` · `185.199.110.153` · `185.199.111.153`
   et un enregistrement **CNAME** pour `www` → `tuocherif.github.io`
3. Sur GitHub : **Settings → Pages → Custom domain**, saisissez `seted.ci` → **Save**
4. Cochez **Enforce HTTPS** (disponible après quelques minutes)
5. Dans `robots.txt` et `sitemap.xml`, remplacez `https://tuocherif.github.io/SETED/` par `https://seted.ci/`

---

## 7. Recevoir les demandes de devis par e-mail

**Actuellement :** le formulaire ouvre le logiciel de messagerie du visiteur avec la demande pré-remplie, adressée à `sihan.seted@gmail.com`. Ça marche partout, mais le visiteur doit cliquer une fois de plus pour envoyer.

**Pour recevoir directement dans votre boîte** (gratuit jusqu'à 50 demandes/mois) :

1. Créez un compte sur **https://formspree.io** avec `sihan.seted@gmail.com`
2. Créez un formulaire → copiez l'identifiant (ex. `xbjkqwer`)
3. Dans `contact.html`, remplacez :
   ```html
   <form class="formulaire" id="form-devis" novalidate>
   ```
   par :
   ```html
   <form class="formulaire" action="https://formspree.io/f/VOTRE_ID" method="POST">
   ```
   (retirez `id="form-devis"` pour désactiver l'envoi par messagerie)

**Alternatives :** Web3Forms (gratuit, illimité), Netlify Forms si vous hébergez sur Netlify.

---

## 8. Modifier les textes

Chaque texte traduisible porte un attribut `data-en` avec la version anglaise :

```html
<h3 data-en="Building renovation">Réfection de bâtiments</h3>
```

Le texte **entre les balises** est le français, l'attribut `data-en` est l'anglais. **Modifiez toujours les deux**, sinon le bouton EN affichera l'ancienne version.

Pour les champs de formulaire, l'anglais du texte d'exemple est dans `data-en-ph`.

---

## 9. Changer les couleurs

Tout est en haut de `assets/css/style.css` :

```css
--vert: #92bf1e;    /* vert du logo */
--bleu: #00aedf;    /* bleu du logo */
--nuit: #0b2239;    /* bleu foncé des fonds sombres */
```

Modifiez ces trois valeurs et tout le site suit automatiquement.

---

## 10. Coordonnées présentes sur le site

À changer partout si elles évoluent (utilisez Rechercher/Remplacer dans tous les fichiers) :

- Téléphone : `+225 07 07 82 35 82` — également dans les liens `tel:+2250707823582` et `wa.me/2250707823582`
- E-mail : `sihan.seted@gmail.com`
- Adresse : Abidjan Koumassi Sogefia — 06 BP 607 Abidjan 06
- RCCM : CI-ABJ-2018-B-33394 · CC : 1869287 W

---

## 11. Après la mise en ligne — référencement Google

1. **Google Search Console** (https://search.google.com/search-console) : ajoutez votre site, soumettez `sitemap.xml`
2. **Fiche Google Business Profile** : indispensable en Côte d'Ivoire pour apparaître dans « BTP Abidjan » ou « import riz Abidjan ». Gratuit, à créer sur https://business.google.com
3. **Page Facebook / LinkedIn** avec le lien du site dans la bio
4. Les titres et descriptions de chaque page sont déjà optimisés pour des recherches comme *« réfection bâtiment Abidjan »*, *« import riz Côte d'Ivoire »*, *« fournitures de bureau Abidjan »*

---

*Site conçu pour SETED — août 2026. Aucune dépendance payante, aucun abonnement : les fichiers vous appartiennent entièrement.*

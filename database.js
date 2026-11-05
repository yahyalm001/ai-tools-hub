/* Les tarifs sont indicatifs : vérifier les conditions sur chaque site officiel. */
const tools = [
  {
    "id": 1,
    "name": "ChatGPT",
    "description": "Assistant IA pour expliquer une notion, préparer des questions et améliorer un brouillon.",
    "category": "etudes",
    "price": "freemium",
    "url": "https://chatgpt.com/",
    "needs": [
      "résumé",
      "rédaction",
      "maths"
    ],
    "image": "https://chatgpt.com/favicon.ico",
    "note": "Vérifie les réponses et les références proposées."
  },
  {
    "id": 2,
    "name": "Gemini",
    "description": "Assistant IA pour explorer un sujet, reformuler un texte et préparer des révisions.",
    "category": "etudes",
    "price": "freemium",
    "url": "https://gemini.google.com/",
    "needs": [
      "résumé",
      "rédaction",
      "traduction"
    ],
    "image": "https://gemini.google.com/favicon.ico",
    "note": "Les fonctionnalités accessibles dépendent du compte et de la formule."
  },
  {
    "id": 3,
    "name": "Perplexity",
    "description": "Recherche assistée par IA avec des liens vers des sources à consulter.",
    "category": "etudes",
    "price": "freemium",
    "url": "https://www.perplexity.ai/",
    "needs": [
      "résumé",
      "rédaction"
    ],
    "image": "https://www.perplexity.ai/favicon.ico",
    "note": "Ouvre les sources : une citation ne garantit pas une réponse exacte."
  },
  {
    "id": 4,
    "name": "Gamma",
    "description": "Outil pour préparer une première version de présentation à partir de tes idées.",
    "category": "presentation",
    "price": "freemium",
    "url": "https://gamma.app/",
    "needs": [
      "présentation"
    ],
    "image": "https://gamma.app/favicon.ico",
    "note": "Relis le contenu et vérifie les conditions d’export."
  },
  {
    "id": 5,
    "name": "Canva",
    "description": "Éditeur visuel pour présentations, CV, affiches et documents de cours.",
    "category": "presentation",
    "price": "freemium",
    "url": "https://www.canva.com/",
    "needs": [
      "présentation",
      "rédaction"
    ],
    "image": "https://www.canva.com/favicon.ico",
    "note": "Certains modèles, éléments et fonctions IA sont payants."
  },
  {
    "id": 6,
    "name": "DeepL",
    "description": "Outil de traduction pour comparer des formulations et travailler les langues.",
    "category": "traduction",
    "price": "freemium",
    "url": "https://www.deepl.com/",
    "needs": [
      "traduction"
    ],
    "image": "https://www.deepl.com/favicon.ico",
    "note": "Relis les termes techniques et les passages importants."
  },
  {
    "id": 7,
    "name": "Google Translate",
    "description": "Traduction en ligne pour comprendre des mots, phrases et textes.",
    "category": "traduction",
    "price": "free",
    "url": "https://translate.google.com/",
    "needs": [
      "traduction"
    ],
    "image": "https://translate.google.com/favicon.ico",
    "note": "Une traduction automatique peut perdre le contexte."
  },
  {
    "id": 8,
    "name": "Wolfram Alpha",
    "description": "Moteur de calcul pour explorer des problèmes de maths et vérifier des résultats.",
    "category": "maths",
    "price": "freemium",
    "url": "https://www.wolframalpha.com/",
    "needs": [
      "maths"
    ],
    "image": "https://www.wolframalpha.com/favicon.ico",
    "note": "Certaines explications détaillées nécessitent une offre payante."
  },
  {
    "id": 9,
    "name": "Notion",
    "description": "Espace de notes et de projets pour organiser tes cours et ton travail.",
    "category": "organisation",
    "price": "freemium",
    "url": "https://www.notion.so/",
    "needs": [
      "organisation"
    ],
    "image": "https://www.notion.so/favicon.ico",
    "note": "La formule gratuite ne signifie pas que toutes les fonctions IA sont incluses."
  },
  {
    "id": 10,
    "name": "Google Keep",
    "description": "Notes rapides et listes pour retenir tes idées et suivre tes tâches.",
    "category": "organisation",
    "price": "free",
    "url": "https://keep.google.com/",
    "needs": [
      "organisation"
    ],
    "image": "https://keep.google.com/favicon.ico",
    "note": "Ce service de notes n’est pas présenté ici comme un outil IA."
  },
  {
    "id": 11,
    "name": "Grammarly",
    "description": "Assistant de rédaction pour relire et améliorer des textes, notamment en anglais.",
    "category": "redaction",
    "price": "freemium",
    "url": "https://www.grammarly.com/",
    "needs": [
      "rédaction"
    ],
    "image": "https://www.grammarly.com/favicon.ico",
    "note": "Les corrections proposées doivent respecter le sens de ton texte."
  },
  {
    "id": 12,
    "name": "QuillBot",
    "description": "Outils de reformulation et de résumé pour travailler un texte.",
    "category": "redaction",
    "price": "freemium",
    "url": "https://quillbot.com/",
    "needs": [
      "rédaction",
      "résumé"
    ],
    "image": "https://quillbot.com/favicon.ico",
    "note": "Reformuler ne dispense pas de citer la source originale."
  },
  {
    "id": 13,
    "name": "Todoist",
    "description": "Listes de tâches et projets pour planifier devoirs et révisions.",
    "category": "organisation",
    "price": "freemium",
    "url": "https://todoist.com/",
    "needs": [
      "organisation"
    ],
    "image": "https://todoist.com/favicon.ico",
    "note": "Certaines fonctions avancées dépendent de la formule."
  },
  {
    "id": 14,
    "name": "Claude",
    "description": "Assistant IA pour discuter de documents, clarifier des idées et travailler un brouillon.",
    "category": "etudes",
    "price": "freemium",
    "url": "https://claude.ai/",
    "needs": [
      "résumé",
      "rédaction"
    ],
    "image": "https://claude.ai/favicon.ico",
    "note": "Les quotas et fonctionnalités varient selon la formule."
  },
  {
    "id": 15,
    "name": "Microsoft Copilot",
    "description": "Assistant IA en ligne pour poser des questions et développer des idées.",
    "category": "etudes",
    "price": "freemium",
    "url": "https://copilot.microsoft.com/",
    "needs": [
      "résumé",
      "rédaction"
    ],
    "image": "https://copilot.microsoft.com/favicon.ico",
    "note": "Les fonctions Microsoft 365 dépendent de licences distinctes."
  },
  {
    "id": 16,
    "name": "Gemini Notebook (NotebookLM)",
    "description": "Assistant de recherche fondé sur les documents et sources que tu ajoutes.",
    "category": "etudes",
    "price": "freemium",
    "url": "https://notebooklm.google.com/",
    "needs": [
      "résumé",
      "organisation"
    ],
    "image": "https://notebooklm.google.com/favicon.ico",
    "note": "Contrôle les passages cités dans les documents d’origine."
  },
  {
    "id": 17,
    "name": "GeoGebra",
    "description": "Calculateurs interactifs pour explorer algèbre, géométrie et représentations 3D.",
    "category": "maths",
    "price": "free",
    "url": "https://www.geogebra.org/",
    "needs": [
      "maths"
    ],
    "image": "https://www.geogebra.org/favicon.ico",
    "note": "Gratuit pour un usage éducatif non commercial ; consulte la licence."
  },
  {
    "id": 18,
    "name": "Desmos",
    "description": "Calculateurs graphiques pour tracer des fonctions et explorer les mathématiques.",
    "category": "maths",
    "price": "free",
    "url": "https://www.desmos.com/",
    "needs": [
      "maths"
    ],
    "image": "https://www.desmos.com/favicon.ico",
    "note": "Utilise les graphiques pour comprendre, pas seulement obtenir un résultat."
  },
  {
    "id": 19,
    "name": "Zotero",
    "description": "Gestionnaire de références pour collecter, organiser et citer tes sources.",
    "category": "etudes",
    "price": "free",
    "url": "https://www.zotero.org/",
    "needs": [
      "rédaction",
      "organisation"
    ],
    "image": "https://www.zotero.org/favicon.ico",
    "note": "Le logiciel est gratuit ; le stockage de fichiers en ligne supplémentaire est payant."
  },
  {
    "id": 20,
    "name": "LanguageTool",
    "description": "Correcteur multilingue pour orthographe, grammaire et suggestions de style.",
    "category": "redaction",
    "price": "freemium",
    "url": "https://languagetool.org/",
    "needs": [
      "rédaction",
      "traduction"
    ],
    "image": "https://languagetool.org/favicon.ico",
    "note": "Les corrections avancées sont réservées à Premium."
  }
];

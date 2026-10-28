/* =========================================
   STUDYNOVA — database.js
   أضف أدوات جديدة بنفس الشكل
========================================= */

const aiTools = [
  {
    name: "ChatGPT",
    company: "OpenAI",
    description: "Assistant IA pour expliquer les cours, rédiger, réviser et créer des quiz.",
    website: "https://chatgpt.com",
    image: "https://www.google.com/s2/favicons?domain=chatgpt.com&sz=128",
    category: "etudes",
    pricing: "freemium",
    affiliateUrl: ""
  },
  {
    name: "Gamma",
    company: "Gamma",
    description: "Crée rapidement des présentations modernes à partir d’un sujet ou d’un texte.",
    website: "https://gamma.app",
    image: "https://www.google.com/s2/favicons?domain=gamma.app&sz=128",
    category: "presentation",
    pricing: "freemium",
    affiliateUrl: ""
  },
  {
    name: "Canva",
    company: "Canva",
    description: "Design facile pour présentations, CV, affiches et projets scolaires.",
    website: "https://www.canva.com",
    image: "https://www.google.com/s2/favicons?domain=canva.com&sz=128",
    category: "presentation",
    pricing: "freemium",
    affiliateUrl: ""
  },
  {
    name: "DeepL",
    company: "DeepL",
    description: "Traduction de haute qualité, utile pour les cours et documents en français ou anglais.",
    website: "https://www.deepl.com",
    image: "https://www.google.com/s2/favicons?domain=deepl.com&sz=128",
    category: "traduction",
    pricing: "freemium",
    affiliateUrl: ""
  },
  {
    name: "Notion",
    company: "Notion",
    description: "Organise tes cours, révisions, projets et deadlines dans un seul espace.",
    website: "https://www.notion.so",
    image: "https://www.google.com/s2/favicons?domain=notion.so&sz=128",
    category: "organisation",
    pricing: "freemium",
    affiliateUrl: ""
  },
  {
    name: "Wolfram Alpha",
    company: "Wolfram",
    description: "Résout des problèmes de maths et explique des calculs étape par étape.",
    website: "https://www.wolframalpha.com",
    image: "https://www.google.com/s2/favicons?domain=wolframalpha.com&sz=128",
    category: "maths",
    pricing: "freemium",
    affiliateUrl: ""
  },
  {
    name: "Grammarly",
    company: "Grammarly",
    description: "Améliore l’orthographe, la clarté et le style de tes textes en anglais.",
    website: "https://www.grammarly.com",
    image: "https://www.google.com/s2/favicons?domain=grammarly.com&sz=128",
    category: "redaction",
    pricing: "freemium",
    affiliateUrl: ""
  },
  {
    name: "QuillBot",
    company: "QuillBot",
    description: "Reformule et améliore tes textes tout en gardant le sens principal.",
    website: "https://quillbot.com",
    image: "https://www.google.com/s2/favicons?domain=quillbot.com&sz=128",
    category: "redaction",
    pricing: "freemium",
    affiliateUrl: ""
  },
  {
    name: "Perplexity",
    company: "Perplexity AI",
    description: "Moteur de réponse IA avec sources, utile pour la recherche et la vérification.",
    website: "https://www.perplexity.ai",
    image: "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128",
    category: "etudes",
    pricing: "freemium",
    affiliateUrl: ""
  }
];
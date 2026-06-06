"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// ==========================================
// TYPES & DATA STRUCTURES
// ==========================================

export type PlanType = "free" | "pro" | "business";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: PlanType;
  credits: number; // For AI photo / Career Coach
  joinedDate: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  address: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
  achievements: string[]; // Quantified results
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Expert";
  category: string;
}

export interface Language {
  id: string;
  name: string;
  level: string; // e.g., "A1", "C2", "Bilingue", "Langue maternelle"
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  link?: string;
  description: string;
}

export interface CV {
  id: string;
  title: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
  projects: Project[];
  interests: string[];
  templateSettings: {
    layoutId: string;    // 10 layouts (standard, sidebar-left, etc.)
    styleId: string;     // 3 styles (modern, classic, creative)
    colorTheme: string;  // corporate, luxury, tech, startup, minimalist
    fontSize: "sm" | "md" | "lg";
    margins: "compact" | "normal" | "wide";
  };
  scores: {
    ats: number;
    recruiter: number;
    leadership: number;
    tech: number;
    suggestions: string[];
  };
}

export interface JobMatchResult {
  jobTitle: string;
  company: string;
  compatibilityScore: number;
  missingKeywords: string[];
  matchedKeywords: string[];
  tailoredSummary: string;
  tailoredExperiences: { experienceId: string; updatedDescription: string }[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "recruiter";
  text: string;
  timestamp: string;
  feedback?: string; // Feedback from AI coach on user response
}

// ==========================================
// INITIAL MOCK DATA
// ==========================================

const INITIAL_CV: CV = {
  id: "cv-1",
  title: "CV Senior Product Manager",
  updatedAt: "2026-06-06T12:00:00Z",
  personalInfo: {
    firstName: "Jean-Baptiste",
    lastName: "Lafont",
    title: "Senior Product Manager",
    email: "jb.lafont@cvgenius.ai",
    phone: "+33 6 12 34 56 78",
    website: "jblafont.dev",
    linkedin: "linkedin.com/in/jblafont",
    address: "Paris, France",
    summary: "Product Manager passionné avec plus de 7 ans d'expérience dans la conception et le lancement de produits SaaS B2B et B2C à forte croissance. Spécialisé dans l'intelligence artificielle, l'optimisation des parcours utilisateurs et le management d'équipes cross-fonctionnelles.",
  },
  experiences: [
    {
      id: "exp-1",
      company: "TechScale Solutions",
      position: "Lead Product Manager - AI Integrations",
      startDate: "2023-01",
      endDate: "Présent",
      current: true,
      location: "Paris (Hybride)",
      description: "Responsable de la roadmap produit pour la suite d'outils d'IA générative à destination des entreprises.",
      achievements: [
        "Augmentation du taux de conversion d'activation produit de 35% grâce à une refonte de l'onboarding utilisateur basée sur l'analyse de données.",
        "Lancement d'une fonctionnalité IA de recherche sémantique générant 1.2M€ d'ARR additionnels en moins de 6 mois.",
        "Management d'une équipe de 5 Product Managers et collaboration étroite avec 15 ingénieurs et designers."
      ]
    },
    {
      id: "exp-2",
      company: "InnovApp Labs",
      position: "Product Manager Mobile",
      startDate: "2020-03",
      endDate: "2022-12",
      current: false,
      location: "Lyon (France)",
      description: "Gestion du cycle de vie des applications mobiles de livraison à forte audience (2M+ utilisateurs actifs).",
      achievements: [
        "Réduction du taux d'attrition (churn) de 14% via l'optimisation des flux de paiement et de recommandation.",
        "Co-conception d'un algorithme de dispatching réduisant le temps d'attente moyen de livraison de 4 minutes."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "HEC Paris",
      degree: "Master en Management de l'Innovation",
      fieldOfStudy: "Product & Business Strategy",
      startDate: "2017",
      endDate: "2019",
      current: false,
      location: "Jouy-en-Josas, France",
      description: "Major de promotion. Focus sur les modèles économiques SaaS et l'entrepreneuriat technologique."
    },
    {
      id: "edu-2",
      school: "Sorbonne Université",
      degree: "Licence en Informatique",
      fieldOfStudy: "Génie Logiciel",
      startDate: "2014",
      endDate: "2017",
      current: false,
      location: "Paris, France",
      description: "Bases solides en algorithmique, structures de données et génie logiciel."
    }
  ],
  skills: [
    { id: "sk-1", name: "Product Strategy & Roadmap", level: "Expert", category: "Product Management" },
    { id: "sk-2", name: "IA Générative (LLM, Prompt Eng.)", level: "Expert", category: "Technique" },
    { id: "sk-3", name: "Data Analytics (Amplitude, SQL)", level: "Expert", category: "Analytique" },
    { id: "sk-4", name: "UX/UI Design (Figma)", level: "Avancé", category: "Design" },
    { id: "sk-5", name: "Agile (Scrum / Kanban)", level: "Expert", category: "Méthodologie" }
  ],
  languages: [
    { id: "lan-1", name: "Français", level: "Langue maternelle" },
    { id: "lan-2", name: "Anglais", level: "Bilingue (TOEIC 990)" },
    { id: "lan-3", name: "Espagnol", level: "Intermédiaire (B2)" }
  ],
  certifications: [
    { id: "cert-1", name: "Product Focus Certified PM", issuer: "Product Focus", date: "2021" },
    { id: "cert-2", name: "Certified Scrum Product Owner (CSPO)", issuer: "Scrum Alliance", date: "2019" }
  ],
  projects: [
    { id: "proj-1", name: "SaaS Automate-AI", role: "Créateur Indépendant", description: "Side project de génération de posts marketing via IA, revendu en 2025." }
  ],
  interests: ["Design génératif", "Randonnée en haute montagne", "Échecs"],
  templateSettings: {
    layoutId: "sidebar-left",
    styleId: "modern",
    colorTheme: "tech",
    fontSize: "md",
    margins: "normal"
  },
  scores: {
    ats: 82,
    recruiter: 88,
    leadership: 75,
    tech: 90,
    suggestions: [
      "Ajoutez des chiffres clés sur vos rôles précédents chez InnovApp Labs.",
      "Incluez plus de mots-clés liés au management de produit comme 'Product Backlog' ou 'KPIs'.",
      "Développez la section certifications en ajoutant la date de validité."
    ]
  }
};

// ==========================================
// CONTEXT IMPLEMENTATION
// ==========================================

interface AppContextType {
  // Auth
  user: User | null;
  login: (provider: "google" | "linkedin" | "facebook") => Promise<void>;
  logout: () => void;
  updateUserPlan: (plan: PlanType) => void;

  // CV Builder
  cvs: CV[];
  activeCv: CV | null;
  setActiveCv: (cv: CV) => void;
  createNewCv: (title: string) => void;
  updateCv: (updatedCv: CV) => void;
  deleteCv: (cvId: string) => void;

  // AI Recruiter Assistant
  refreshCvScores: () => void;
  generateAISummary: () => Promise<string>;
  enhanceAchievements: (experienceId: string) => Promise<string[]>;

  // Job Matcher
  jobMatchResult: JobMatchResult | null;
  matchJobOffer: (text: string) => Promise<void>;
  applyJobTailoring: () => void;

  // Interview Simulator
  chatMessages: ChatMessage[];
  sendInterviewMessage: (text: string) => Promise<void>;
  resetInterview: () => void;

  // Portfolio
  portfolioSubdomain: string;
  setPortfolioSubdomain: (sub: string) => void;
  generatePortfolio: () => Promise<string>;

  // Photo Professional
  photoUrl: string | null;
  transformPhoto: (file: File, style: "linkedin" | "corporate" | "executive") => Promise<string>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // 1. Auth state
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("cga_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (provider: "google" | "linkedin" | "facebook") => {
    // Simulated Login
    const mockUser: User = {
      id: "usr-" + Math.random().toString(36).substring(2, 9),
      name: provider === "google" ? "Pierre Durand" : provider === "linkedin" ? "Jean-Baptiste Lafont" : "Sarah Martin",
      email: provider === "google" ? "pierre.durand@gmail.com" : "jb.lafont@cvgenius.ai",
      avatar: "",
      plan: "free",
      credits: 3,
      joinedDate: new Date().toISOString().split("T")[0]
    };
    setUser(mockUser);
    localStorage.setItem("cga_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cga_user");
  };

  const updateUserPlan = (plan: PlanType) => {
    if (user) {
      const updated = { ...user, plan, credits: plan === "business" ? 15 : plan === "pro" ? 5 : 2 };
      setUser(updated);
      localStorage.setItem("cga_user", JSON.stringify(updated));
    }
  };

  // 2. CV builder state
  const [cvs, setCvs] = useState<CV[]>([]);
  const [activeCv, setActiveCvState] = useState<CV | null>(null);

  // Load CVs from localStorage
  useEffect(() => {
    const savedCvs = localStorage.getItem("cga_cvs");
    if (savedCvs) {
      const parsed = JSON.parse(savedCvs);
      setCvs(parsed);
      if (parsed.length > 0) setActiveCvState(parsed[0]);
    } else {
      setCvs([INITIAL_CV]);
      setActiveCvState(INITIAL_CV);
      localStorage.setItem("cga_cvs", JSON.stringify([INITIAL_CV]));
    }
  }, []);

  const updateCv = (updatedCv: CV) => {
    const updatedCvs = cvs.map((c) => (c.id === updatedCv.id ? { ...updatedCv, updatedAt: new Date().toISOString() } : c));
    setCvs(updatedCvs);
    localStorage.setItem("cga_cvs", JSON.stringify(updatedCvs));
    if (activeCv && activeCv.id === updatedCv.id) {
      setActiveCvState({ ...updatedCv, updatedAt: new Date().toISOString() });
    }
  };

  const createNewCv = (title: string) => {
    // Check limits
    if (!user || (user.plan === "free" && cvs.length >= 2)) {
      alert("Limite atteinte ! Le compte gratuit est limité à 2 CVs. Passez au forfait supérieur.");
      return;
    }

    const newCv: CV = {
      ...INITIAL_CV,
      id: "cv-" + Math.random().toString(36).substring(2, 9),
      title: title,
      updatedAt: new Date().toISOString(),
      experiences: [],
      education: [],
      skills: [],
      languages: [],
      certifications: [],
      projects: [],
      interests: [],
      scores: {
        ats: 20,
        recruiter: 25,
        leadership: 10,
        tech: 15,
        suggestions: ["Remplissez vos informations personnelles.", "Ajoutez au moins une expérience professionnelle.", "Ajoutez vos compétences clés."]
      }
    };
    const newCvs = [...cvs, newCv];
    setCvs(newCvs);
    setActiveCvState(newCv);
    localStorage.setItem("cga_cvs", JSON.stringify(newCvs));
  };

  const deleteCv = (cvId: string) => {
    const remaining = cvs.filter((c) => c.id !== cvId);
    setCvs(remaining);
    localStorage.setItem("cga_cvs", JSON.stringify(remaining));
    if (activeCv && activeCv.id === cvId) {
      setActiveCvState(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const setActiveCv = (cv: CV) => {
    setActiveCvState(cv);
  };

  // 3. AI Recruiter Assistant
  const refreshCvScores = () => {
    if (!activeCv) return;
    
    // Simulate real calculation based on elements present
    const expCount = activeCv.experiences.length;
    const skillCount = activeCv.skills.length;
    const langCount = activeCv.languages.length;
    const hasSummary = activeCv.personalInfo.summary.length > 30;

    let ats = 30;
    let recruiter = 30;
    let leadership = 20;
    let tech = 25;

    if (hasSummary) { ats += 15; recruiter += 15; }
    ats += Math.min(expCount * 15, 30);
    recruiter += Math.min(expCount * 15, 30);
    tech += Math.min(skillCount * 10, 40);
    leadership += Math.min(expCount * 15, 40);
    
    // Cap at 98%
    ats = Math.min(ats, 98);
    recruiter = Math.min(recruiter, 97);
    leadership = Math.min(leadership, 95);
    tech = Math.min(tech, 99);

    const suggestions: string[] = [];
    if (!hasSummary) suggestions.push("Rédigez un résumé professionnel percutant de 3-4 lignes.");
    if (expCount < 2) suggestions.push("Ajoutez au moins 2 expériences professionnelles pour prouver votre parcours.");
    if (skillCount < 5) suggestions.push("Ajoutez des compétences techniques spécifiques pertinentes pour votre secteur.");
    if (activeCv.experiences.some(e => e.achievements.length === 0)) suggestions.push("Ajoutez des réalisations quantifiées (ex: +20%, 50K€ économisés) dans vos expériences.");

    const updated = {
      ...activeCv,
      scores: { ats, recruiter, leadership, tech, suggestions }
    };
    updateCv(updated);
  };

  const generateAISummary = async (): Promise<string> => {
    if (!activeCv) return "";
    // Mock AI Call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return `Expert chevronné en ${activeCv.personalInfo.title || "mon domaine"}, fort d'une expérience reconnue chez ${activeCv.experiences[0]?.company || "plusieurs entreprises leaders"}. Orienté résultats, j'ai piloté des projets stratégiques majeurs combinant innovation et rigueur opérationnelle. Passionné par l'apprentissage continu et l'excellence produit.`;
  };

  const enhanceAchievements = async (experienceId: string): Promise<string[]> => {
    if (!activeCv) return [];
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const exp = activeCv.experiences.find(e => e.id === experienceId);
    if (!exp) return [];

    return [
      `Optimisation des processus opérationnels de l'équipe chez ${exp.company}, générant un gain de productivité mesuré à +25%.`,
      `Direction et supervision de 3 chantiers majeurs menés dans le respect des délais et avec un budget maîtrisé (-10% d'économies).`,
      `Développement d'outils d'automatisation clés, éliminant les tâches répétitives et réorientant 10h/semaine vers la recherche stratégique.`
    ];
  };

  // 4. Job Matcher State
  const [jobMatchResult, setJobMatchResult] = useState<JobMatchResult | null>(null);

  const matchJobOffer = async (text: string) => {
    if (!activeCv) return;
    await new Promise((resolve) => setTimeout(resolve, 1800));

    // Simulated matching logic
    const score = Math.floor(Math.random() * 25) + 65; // between 65% and 90%
    setJobMatchResult({
      jobTitle: "Senior Product & Technical Manager",
      company: "Aura AI",
      compatibilityScore: score,
      missingKeywords: ["Agile Product Backlog", "SaaS Pricing Strategy", "Stakeholder Management", "Python"],
      matchedKeywords: ["IA Générative", "Product Strategy", "Figma", "Data Analytics", "Roadmap"],
      tailoredSummary: `Senior Product Manager passionné doté d'une forte culture technique. Spécialisé dans les méthodologies Agiles et l'analyse de données, j'ai une solide expertise en intégrations IA et stratégie de tarification SaaS, alignée avec les ambitions de Aura AI.`,
      tailoredExperiences: [
        {
          experienceId: "exp-1",
          updatedDescription: "Responsable de la roadmap produit pour la suite d'outils d'IA générative et de l'alignement stratégique avec les parties prenantes (Stakeholders)."
        }
      ]
    });
  };

  const applyJobTailoring = () => {
    if (!activeCv || !jobMatchResult) return;

    const updatedInfo = {
      ...activeCv.personalInfo,
      summary: jobMatchResult.tailoredSummary
    };

    const updatedExperiences = activeCv.experiences.map((exp) => {
      const match = jobMatchResult.tailoredExperiences.find(t => t.experienceId === exp.id);
      return match ? { ...exp, description: match.updatedDescription } : exp;
    });

    const updated = {
      ...activeCv,
      personalInfo: updatedInfo,
      experiences: updatedExperiences,
      title: `${activeCv.title} (Adapté pour ${jobMatchResult.company})`
    };
    updateCv(updated);
    setJobMatchResult(null);
  };

  // 5. Interview Simulator
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const resetInterview = () => {
    if (!activeCv) return;
    const name = activeCv.personalInfo.firstName;
    setChatMessages([
      {
        id: "msg-init",
        sender: "recruiter",
        text: `Bonjour ${name}. Merci de prendre le temps de passer cet entretien virtuel aujourd'hui pour le poste de ${activeCv.personalInfo.title}. \n\nPour commencer, pourriez-vous vous présenter brièvement et m'expliquer ce qui vous motive à postuler à cette opportunité ?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const sendInterviewMessage = async (text: string) => {
    const newMessage: ChatMessage = {
      id: "msg-user-" + Math.random().toString(36).substring(2, 9),
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newMessage]);

    // Simulate AI thinking and replying
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const recruiterResponses = [
      "Très intéressant. Vous mentionnez votre expérience en gestion de projet. Comment gérez-vous une situation où vos équipes techniques et vos designers ne s'accordent pas sur la direction d'une fonctionnalité clé ?",
      "C'est une excellente réponse. Concernant le poste en question, nous accordons une grande importance à la culture axée sur la donnée. Pouvez-vous me décrire un échec produit récent et la manière dont vous avez analysé les métriques pour corriger le tir ?",
      "Parfait. Et enfin, si vous deviez convaincre notre comité de direction de débloquer du budget additionnel pour implémenter de l'IA dans notre produit phare, quel serait votre argumentaire ?",
      "Merci beaucoup pour ces détails. C'est la fin de notre simulation d'entretien. Dans l'ensemble, vos réponses démontrent un leadership structuré et une bonne technicité. N'hésitez pas à télécharger votre rapport de conseils personnalisés !"
    ];

    const feedBacks = [
      "Excellente accroche, mais veillez à structurer votre présentation personnelle avec la méthode STAR (Situation, Tâche, Action, Résultat).",
      "Très bonne gestion du conflit démontrée. Vous auriez pu ajouter un chiffre d'équipe pour renforcer la crédibilité.",
      "Bonne capacité d'analyse, l'explication des métriques d'erreur était très limpide.",
      "Votre conclusion est convaincante et montre un bon profil business."
    ];

    const nextIndex = Math.min(chatMessages.length - 1, recruiterResponses.length - 1);

    // Update user message with feedback
    setChatMessages((prev) => {
      return prev.map(msg => msg.id === newMessage.id ? { ...msg, feedback: feedBacks[nextIndex] } : msg);
    });

    const recruiterReply: ChatMessage = {
      id: "msg-recruiter-" + Math.random().toString(36).substring(2, 9),
      sender: "recruiter",
      text: recruiterResponses[nextIndex],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, recruiterReply]);
  };

  // 6. Portfolio
  const [portfolioSubdomain, setPortfolioSubdomain] = useState("");
  const generatePortfolio = async (): Promise<string> => {
    if (!activeCv) return "";
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const sub = `${activeCv.personalInfo.firstName.toLowerCase()}${activeCv.personalInfo.lastName.toLowerCase()}`;
    setPortfolioSubdomain(sub);
    return `https://${sub}.cvgenius.ai`;
  };

  // 7. Professional photo
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const transformPhoto = async (file: File, style: "linkedin" | "corporate" | "executive"): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    let mockUrl = "";
    if (style === "linkedin") mockUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=350&auto=format&fit=crop"; // professional headshot
    if (style === "corporate") mockUrl = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=350&auto=format&fit=crop";
    if (style === "executive") mockUrl = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=350&auto=format&fit=crop";

    setPhotoUrl(mockUrl);
    return mockUrl;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        updateUserPlan,
        cvs,
        activeCv,
        setActiveCv,
        createNewCv,
        updateCv,
        deleteCv,
        refreshCvScores,
        generateAISummary,
        enhanceAchievements,
        jobMatchResult,
        matchJobOffer,
        applyJobTailoring,
        chatMessages,
        sendInterviewMessage,
        resetInterview,
        portfolioSubdomain,
        setPortfolioSubdomain,
        generatePortfolio,
        photoUrl,
        transformPhoto
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

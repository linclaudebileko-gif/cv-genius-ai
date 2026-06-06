"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useTheme } from "@/context/ThemeContext";
import { 
  Sun, Moon, Sparkles, Check, ArrowRight, Star, Shield, 
  User as UserIcon, LogIn, ChevronDown, CheckCircle, Cpu, 
  Briefcase, Award, FileText, Send, Globe, Camera 
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { user, login, logout } = useApp();
  const { theme, toggleTheme } = useTheme();

  // Component UI States
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const handleMockLogin = async (provider: "google" | "linkedin" | "facebook") => {
    await login(provider);
    setShowLoginModal(false);
  };

  const faqData = [
    {
      q: "Comment fonctionne l'optimisation ATS de CV Genius AI ?",
      a: "Notre algorithme IA analyse la structure de votre CV, son formatage et la densité des mots-clés. Il compare votre texte avec les standards des systèmes de suivi des candidats (ATS) pour s'assurer que votre CV ne soit jamais rejeté automatiquement par un robot recruteur."
    },
    {
      q: "Puis-je exporter mon CV au format PDF ?",
      a: "Absolument. Tous nos modèles premium sont conçus avec des feuilles de style d'impression hautement optimisées. Vous pouvez exporter vos CV en PDF d'un seul clic avec un rendu parfait, sans coupure de page maladroite."
    },
    {
      q: "Qu'est-ce que le simulateur d'entretien IA ?",
      a: "C'est un chatbot vocal/texte qui simule un recruteur senior. Il pose des questions spécifiques adaptées à votre domaine et à votre niveau d'expérience, analyse vos réponses en temps réel, puis vous donne des notes et conseils d'amélioration (méthode STAR)."
    },
    {
      q: "Puis-je me désabonner à tout moment ?",
      a: "Oui, sans aucun engagement. Vous pouvez mettre à niveau, rétrograder ou annuler votre abonnement à tout moment directement depuis votre espace utilisateur. En cas d'annulation, vous conservez vos accès jusqu'à la fin de la période payée."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      
      {/* ==========================================
          HEADER / NAVIGATION
          ========================================== */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200/50 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
              CV Genius <span className="text-indigo-500">AI</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            <a href="#features" className="hover:text-indigo-500 transition-colors">Fonctionnalités</a>
            <a href="#templates" className="hover:text-indigo-500 transition-colors">Modèles</a>
            <a href="#pricing" className="hover:text-indigo-500 transition-colors">Tarifs</a>
            <a href="#faq" className="hover:text-indigo-500 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Auth Link */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  href="/dashboard" 
                  className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/10 transition-all hover:scale-102"
                >
                  Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
                <button 
                  onClick={logout}
                  className="text-xs font-semibold text-zinc-500 hover:text-red-500 transition-colors px-2 py-1"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-1.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/10 transition-all hover:scale-102"
              >
                <LogIn className="w-4 h-4" /> Commencer
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24 border-b border-gray-100 dark:border-zinc-900/50">
        {/* Ambient background blur */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30 mb-6">
            <Sparkles className="w-3.5 h-3.5" /> « Votre prochain emploi commence par un CV exceptionnel. »
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Propulsez votre carrière avec un CV propulsé par{" "}
            <span className="text-gradient">l'Intelligence Artificielle</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Générez des CV modernes, optimisés ATS en 1 clic. Évaluez votre profil avec nos scores de recrutement IA, adaptez votre candidature aux offres d'emploi et simulez vos entretiens d'embauche.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => user ? window.location.href = "/dashboard" : setShowLoginModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:scale-102 transition-all text-base"
            >
              Créer mon CV Gratuitement <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="#features"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 hover:bg-gray-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold px-8 py-4 rounded-2xl transition-all text-base"
            >
              Découvrir les fonctionnalités
            </a>
          </div>

          {/* Social Proof stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-10 border-t border-gray-200/50 dark:border-zinc-800/80">
            <div>
              <p className="text-3xl font-extrabold text-indigo-500">98%</p>
              <p className="text-xs text-zinc-500 mt-1">Compatibilité ATS</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-indigo-500">10x</p>
              <p className="text-xs text-zinc-500 mt-1">Plus rapide à rédiger</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-indigo-500">15k+</p>
              <p className="text-xs text-zinc-500 mt-1">Candidats recrutés</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-indigo-500">30+</p>
              <p className="text-xs text-zinc-500 mt-1">Modèles Premium</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          FEATURES SECTION
          ========================================== */}
      <section id="features" className="py-20 lg:py-28 bg-zinc-50/50 dark:bg-zinc-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Tout ce dont vous avez besoin pour décrocher votre job de rêve
            </h2>
            <p className="mt-4 text-zinc-500">
              Des outils experts conçus avec des recruteurs professionnels pour doubler vos invitations en entretien.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-effect rounded-3xl p-8 flex flex-col gap-5 hover:translate-y-[-4px] transition-transform shadow-md hover:shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Génération CV IA Intelligente</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                  L'IA structure et rédige vos expériences de manière dynamique en valorisant vos accomplissements clés et en ajoutant des verbes d'action percutants.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass-effect rounded-3xl p-8 flex flex-col gap-5 hover:translate-y-[-4px] transition-transform shadow-md hover:shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Assistant Recruteur & Score ATS</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                  Obtenez en temps réel des notes d'évaluation sur 4 dimensions : Score ATS, Score Recruteur, Leadership, et Compétences techniques.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass-effect rounded-3xl p-8 flex flex-col gap-5 hover:translate-y-[-4px] transition-transform shadow-md hover:shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Adaptation aux Offres</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                  Collez l'annonce de l'offre d'emploi. L'IA réécrit votre CV pour intégrer les mots-clés ATS pertinents et affiche le taux d'adéquation en %.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="glass-effect rounded-3xl p-8 flex flex-col gap-5 hover:translate-y-[-4px] transition-transform shadow-md hover:shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Lettre de Motivation IA</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                  Générez instantanément des lettres de motivation dans différents styles (Classique, Moderne, International ou Startup) adaptées à l'offre.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="glass-effect rounded-3xl p-8 flex flex-col gap-5 hover:translate-y-[-4px] transition-transform shadow-md hover:shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Simulateur d'Entretien IA</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                  Entraînez-vous avec notre chatbot recruteur virtuel. Obtenez un retour d'évaluation immédiat sur vos réponses pour être prêt le jour J.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="glass-effect rounded-3xl p-8 flex flex-col gap-5 hover:translate-y-[-4px] transition-transform shadow-md hover:shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Portfolio & Photo IA</h3>
                <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                  Créez automatiquement un mini-site personnel hébergé pour votre profil et transformez une photo standard en portrait professionnel LinkedIn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          PRICING SECTION
          ========================================== */}
      <section id="pricing" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Des forfaits simples pour tous les profils de carrière
            </h2>
            <p className="mt-4 text-zinc-500">
              Choisissez le plan adapté à vos ambitions professionnelles. Modifiable ou annulable à tout moment.
            </p>

            {/* Pricing toggle */}
            <div className="mt-8 inline-flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800">
              <button 
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${billingPeriod === "monthly" ? "bg-white dark:bg-zinc-800 text-indigo-500 shadow-sm" : "text-zinc-500"}`}
              >
                Facturation mensuelle
              </button>
              <button 
                onClick={() => setBillingPeriod("yearly")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${billingPeriod === "yearly" ? "bg-white dark:bg-zinc-800 text-indigo-500 shadow-sm" : "text-zinc-500"}`}
              >
                Facturation annuelle <span className="text-xxs text-green-500 ml-1 font-extrabold">(-20%)</span>
              </button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Plan 1: Free */}
            <div className="glass-effect rounded-3xl p-8 border border-gray-200 dark:border-zinc-800 flex flex-col justify-between shadow-md">
              <div>
                <h3 className="text-lg font-bold text-zinc-500">Gratuit</h3>
                <p className="text-sm text-zinc-400 mt-1">Pour débuter</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold">0€</span>
                  <span className="text-sm text-zinc-500 ml-1">/ mois</span>
                </div>

                <ul className="mt-8 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Jusqu'à 2 CV enregistrés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Modèles de CV basiques</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Score de lisibilité ATS standard</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-400 dark:text-zinc-600 line-through">
                    <Check className="w-4.5 h-4.5 shrink-0" />
                    <span>Adaptation aux offres d'emploi</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-400 dark:text-zinc-600 line-through">
                    <Check className="w-4.5 h-4.5 shrink-0" />
                    <span>Simulateur d'entretien IA</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => user ? window.location.href = "/dashboard" : setShowLoginModal(true)}
                className="mt-8 w-full py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm"
              >
                {user ? "Accéder à mon espace" : "Créer un compte"}
              </button>
            </div>

            {/* Plan 2: Pro */}
            <div className="rounded-3xl p-8 border-2 border-indigo-600 dark:border-indigo-500 bg-white dark:bg-zinc-950 flex flex-col justify-between shadow-xl relative transform scale-102">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-full text-xxs font-extrabold bg-indigo-600 text-white uppercase tracking-wider">
                Recommandé
              </div>
              <div>
                <h3 className="text-lg font-bold text-indigo-500">Pro</h3>
                <p className="text-sm text-zinc-400 mt-1">Pour les chercheurs actifs</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold">
                    {billingPeriod === "monthly" ? "9€" : "7.20€"}
                  </span>
                  <span className="text-sm text-zinc-500 ml-1">/ mois</span>
                </div>

                <ul className="mt-8 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">CV illimités</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Accès complet aux 30 modèles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Optimisation ATS avancée par IA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Lettres de motivation illimitées</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Adaptation aux offres d'emploi</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => user ? window.location.href = "/dashboard?upgrade=pro" : setShowLoginModal(true)}
                className="mt-8 w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shadow-lg shadow-indigo-600/10 text-sm"
              >
                S'abonner au plan Pro
              </button>
            </div>

            {/* Plan 3: Business */}
            <div className="glass-effect rounded-3xl p-8 border border-gray-200 dark:border-zinc-800 flex flex-col justify-between shadow-md">
              <div>
                <h3 className="text-lg font-bold text-zinc-500">Business</h3>
                <p className="text-sm text-zinc-400 mt-1">Accompagnement de carrière</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold">
                    {billingPeriod === "monthly" ? "19€" : "15.20€"}
                  </span>
                  <span className="text-sm text-zinc-500 ml-1">/ mois</span>
                </div>

                <ul className="mt-8 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Tout le plan Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">Portfolio en ligne IA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">Simulateur d'entretien IA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Amélioration de photo de profil</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
                    <span>Support prioritaire 24/7</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => user ? window.location.href = "/dashboard?upgrade=business" : setShowLoginModal(true)}
                className="mt-8 w-full py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm"
              >
                S'abonner au plan Business
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          FAQ SECTION
          ========================================== */}
      <section id="faq" className="py-20 lg:py-28 bg-zinc-50/50 dark:bg-zinc-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight">Questions Fréquentes</h2>
            <p className="mt-3 text-zinc-500">Tout ce que vous devez savoir sur notre plateforme de recrutement IA.</p>
          </div>

          <div className="mt-12 space-y-4">
            {faqData.map((item, idx) => (
              <div 
                key={idx} 
                className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden transition-all shadow-sm"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-sm sm:text-base text-zinc-800 dark:text-zinc-200"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${activeFaq === idx ? "transform rotate-180" : ""}`} />
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === idx ? "pb-6 max-h-[200px]" : "max-h-0"}`}
                >
                  <p className="text-sm text-zinc-500 leading-relaxed border-t border-gray-100 dark:border-zinc-800/80 pt-4">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          FOOTER
          ========================================== */}
      <footer className="mt-auto border-t border-gray-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight">
              CV Genius <span className="text-indigo-500">AI</span>
            </span>
          </div>

          <p className="text-xs text-zinc-400">
            &copy; 2026 CV Genius AI. Tous droits réservés.
          </p>

          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <a href="#" className="hover:underline">Conditions d'utilisation</a>
            <a href="#" className="hover:underline">Confidentialité</a>
            <a href="#" className="hover:underline">Support</a>
          </div>
        </div>
      </footer>

      {/* ==========================================
          LOGIN / SIGNUP MODAL (SIMULATED)
          ========================================== */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-white text-xl font-semibold"
            >
              &times;
            </button>

            <div className="text-center">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto text-indigo-500">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mt-4">Bienvenue sur CV Genius AI</h3>
              <p className="text-sm text-zinc-500 mt-1">Inscrivez-vous ou connectez-vous en un clic.</p>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleMockLogin("google")}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-bold transition-all text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Se connecter avec Google
              </button>

              <button 
                onClick={() => handleMockLogin("linkedin")}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-bold transition-all text-sm"
              >
                <svg className="w-4 h-4" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                Se connecter avec LinkedIn
              </button>

              <button 
                onClick={() => handleMockLogin("facebook")}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-bold transition-all text-sm"
              >
                <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Se connecter avec Facebook
              </button>
            </div>

            <p className="text-xxs text-zinc-400 text-center leading-relaxed">
              En continuant, vous acceptez nos conditions générales et notre politique de confidentialité.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

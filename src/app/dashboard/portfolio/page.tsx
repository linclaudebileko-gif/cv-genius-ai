"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Globe, Sparkles, RefreshCw, CheckCircle, ExternalLink, 
  Settings, Award, Palette, Eye, ArrowRight, ChevronRight
} from "lucide-react";

export default function PortfolioPage() {
  const { user, activeCv, portfolioSubdomain, setPortfolioSubdomain, generatePortfolio, updateUserPlan } = useApp();
  const [customSub, setCustomSub] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const isBusiness = user?.plan === "business";

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = await generatePortfolio();
    setGeneratedUrl(url);
    setLoading(false);
  };

  // Gate check
  if (!isBusiness) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[70vh]">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-6">
          <Globe className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-extrabold tracking-tight">Générateur de Portfolio IA</h2>
        <p className="text-sm text-zinc-500 max-w-md mt-2">
          Transformez votre CV en un mini-site personnel et portfolio professionnel hébergé en ligne sur un sous-domaine personnalisé.
        </p>

        <div className="mt-8 p-6 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 max-w-sm flex flex-col gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Hébergement en ligne gratuit</p>
              <p className="text-[10px] text-zinc-400">ex: prenomnom.cvgenius.ai</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Styles graphiques Premium</p>
              <p className="text-[10px] text-zinc-400">Notion, Minimalist, Corporate ou Creative Grid.</p>
            </div>
          </div>

          <button
            onClick={() => updateUserPlan("business")}
            className="mt-2 w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            Activer le forfait Business <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* LEFT PANEL: CONFIG */}
      <div className="lg:col-span-1 bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-6 no-print">
        <div>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" /> Portfolio IA Builder
          </span>
          <h3 className="text-lg font-bold mt-2">Publier mon Portfolio</h3>
          <p className="text-xxs text-zinc-400 mt-1">Configurez votre sous-domaine de site personnel et publiez-le instantanément.</p>
        </div>

        <form onSubmit={handleGenerate} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-500 uppercase">Sous-domaine personnalisé</label>
            <div className="flex rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <input 
                type="text" 
                required
                value={customSub || (activeCv ? `${activeCv.personalInfo.firstName.toLowerCase()}-${activeCv.personalInfo.lastName.toLowerCase()}` : "")}
                onChange={(e) => setCustomSub(e.target.value)}
                placeholder="prenom-nom"
                className="flex-1 py-2.5 px-3 bg-transparent text-xs focus:outline-none focus:border-indigo-500"
              />
              <span className="py-2.5 px-3 text-xxs font-bold text-zinc-400 border-l border-zinc-200 dark:border-zinc-800 flex items-center bg-zinc-100 dark:bg-zinc-900">
                .cvgenius.ai
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-500 uppercase">Style de Site Web</label>
            <select
              defaultValue="notion"
              className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-xs"
            >
              <option value="notion">Notion Clean (Minimalist)</option>
              <option value="apple">Apple Premium (Grilles fluides)</option>
              <option value="linkedin">LinkedIn Style (Socio-professionnel)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Publication en cours...
              </>
            ) : (
              <>
                <Globe className="w-4 h-4" /> Publier mon site web
              </>
            )}
          </button>
        </form>

        {generatedUrl && (
          <div className="p-4 rounded-xl border border-green-500/10 bg-green-500/5 flex flex-col gap-2">
            <p className="text-xxs font-bold text-green-500 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Site web publié avec succès !
            </p>
            <p className="text-[10px] text-zinc-400">Votre portfolio est désormais en ligne à l'adresse suivante :</p>
            <a 
              href={generatedUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-bold text-indigo-500 hover:text-indigo-600 flex items-center gap-1 hover:underline break-all mt-1"
            >
              {generatedUrl} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      {/* RIGHT PANEL: LIVE MOCK SITE PREVIEW */}
      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-6 overflow-hidden">
        <h3 className="font-bold text-sm text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
          <Eye className="w-4 h-4 text-indigo-500" /> Aperçu Mobile / Desktop de votre site
        </h3>

        {activeCv ? (
          <div className="flex-1 border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-inner flex flex-col h-[500px]">
            {/* Mock browser top bar */}
            <div className="h-10 border-b border-gray-100 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-950 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 max-w-md bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-md text-center py-0.5 text-[10px] text-zinc-400 font-mono select-none">
                {generatedUrl || `https://${customSub || "votre-nom"}.cvgenius.ai`}
              </div>
            </div>

            {/* Mock website content wrapper */}
            <div className="flex-1 overflow-y-auto p-8 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 font-sans flex flex-col gap-8">
              {/* Landing header */}
              <div className="flex flex-col gap-3 text-center sm:text-left">
                <h1 className="text-2xl font-black">{activeCv.personalInfo.firstName} {activeCv.personalInfo.lastName}</h1>
                <p className="text-sm font-semibold text-indigo-500">{activeCv.personalInfo.title}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xxs text-zinc-400 mt-1">
                  <span>📍 {activeCv.personalInfo.address}</span>
                  <span>📧 {activeCv.personalInfo.email}</span>
                  <span>🔗 {activeCv.personalInfo.website}</span>
                </div>
              </div>

              {/* Bio summary */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <p className="text-xs leading-relaxed italic text-zinc-600 dark:text-zinc-400">{activeCv.personalInfo.summary}</p>
              </div>

              {/* Grid: Experiences & Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Exp timeline */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Expérience</h2>
                  <div className="flex flex-col gap-4 border-l border-zinc-100 dark:border-zinc-800 pl-4 relative">
                    {activeCv.experiences.slice(0, 2).map((exp) => (
                      <div key={exp.id} className="relative flex flex-col gap-0.5">
                        <span className="absolute -left-6.5 top-1 w-2.5 h-2.5 rounded-full bg-indigo-500" />
                        <h4 className="font-bold text-xs">{exp.position}</h4>
                        <span className="text-[10px] font-semibold text-zinc-400">{exp.company} | {exp.startDate} - {exp.current ? "Présent" : exp.endDate}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects grid */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Projets Récents</h2>
                  <div className="grid grid-cols-1 gap-3">
                    {activeCv.projects.map((proj) => (
                      <div key={proj.id} className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/20 dark:bg-zinc-900/10">
                        <h4 className="font-bold text-xs">{proj.name}</h4>
                        <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 border border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl text-center flex flex-col items-center justify-center gap-3 h-64">
            <Globe className="w-10 h-10 text-zinc-300" />
            <p className="text-xs font-semibold text-zinc-400">Aucun CV actif disponible pour l'aperçu du site.</p>
          </div>
        )}

      </div>

    </div>
  );
}

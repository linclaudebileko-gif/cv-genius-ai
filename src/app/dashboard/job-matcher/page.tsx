"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Sparkles, CheckCircle, AlertTriangle, ArrowRight, 
  ChevronRight, BrainCircuit, RefreshCw, FileText, Check, Plus
} from "lucide-react";

export default function JobMatcherPage() {
  const { activeCv, jobMatchResult, matchJobOffer, applyJobTailoring } = useApp();
  const [jobText, setJobText] = useState("");
  const [loading, setLoading] = useState(false);
  const [successApplied, setSuccessApplied] = useState(false);

  if (!activeCv) {
    return (
      <div className="p-8 text-center text-sm text-zinc-400">
        Aucun CV actif sélectionné. Veuillez retourner au tableau de bord.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobText.trim()) return;
    setLoading(true);
    setSuccessApplied(false);
    await matchJobOffer(jobText);
    setLoading(false);
  };

  const handleApply = () => {
    applyJobTailoring();
    setSuccessApplied(true);
    setTimeout(() => {
      setSuccessApplied(false);
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* LEFT: JOB DESCRIPTION FORM */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
        <div>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-500" /> Analyseur de Compatibilité ATS
          </span>
          <h3 className="text-lg font-bold mt-2">Détails de l'offre d'emploi</h3>
          <p className="text-xxs text-zinc-400 mt-1">Collez la description complète de l'offre d'emploi pour adapter votre CV en temps réel.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-500 uppercase">Description du poste (Texte ou PDF)</label>
            <textarea 
              rows={8}
              required
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Collez l'annonce ici (ex: 'Nous recherchons un Senior Product Manager avec une expérience solide en IA, méthodologie Agile Scrum, Amplitude...')"
              className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-indigo-500 bg-transparent leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/10 hover:scale-101 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Comparaison et analyse IA...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Lancer l'Analyse d'Adéquation
              </>
            )}
          </button>
        </form>
      </div>

      {/* RIGHT: COMPARISON RESULTS */}
      <div className="flex flex-col gap-6">
        
        {jobMatchResult ? (
          <div className="bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
            
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-zinc-800 dark:text-zinc-200">Rapport d'adéquation</h4>
                <p className="text-[10px] text-zinc-400 mt-0.5">Poste cible détecté : {jobMatchResult.jobTitle} chez {jobMatchResult.company}</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-indigo-500">{jobMatchResult.compatibilityScore}%</span>
                <span className="text-[8px] font-bold text-zinc-400 uppercase mt-0.5">Compatibilité</span>
              </div>
            </div>

            {/* Keyword lists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-gray-100 dark:border-zinc-800/80 py-4">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1">
                  <Check className="w-3 h-3" /> Mots-clés Présents ({jobMatchResult.matchedKeywords.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {jobMatchResult.matchedKeywords.map((kw, idx) => (
                    <span key={idx} className="text-xxs px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-full font-medium border border-emerald-100 dark:border-emerald-900/30">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-bold text-red-500 uppercase tracking-wider flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Mots-clés Manquants ({jobMatchResult.missingKeywords.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {jobMatchResult.missingKeywords.map((kw, idx) => (
                    <span key={idx} className="text-xxs px-2 py-0.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-full font-medium border border-red-100 dark:border-red-900/30">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Draft comparisons */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Reformulations Proposées par l'IA</span>
              
              <div className="p-3.5 rounded-xl border border-zinc-50 dark:border-zinc-800/80 bg-zinc-50/20 dark:bg-zinc-900/10 flex flex-col gap-2">
                <span className="text-[9px] font-bold text-indigo-500 uppercase">Résumé optimisé</span>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-normal italic">{jobMatchResult.tailoredSummary}</p>
              </div>

              <div className="p-3.5 rounded-xl border border-zinc-50 dark:border-zinc-800/80 bg-zinc-50/20 dark:bg-zinc-900/10 flex flex-col gap-2">
                <span className="text-[9px] font-bold text-indigo-500 uppercase">Expériences adaptées</span>
                {jobMatchResult.tailoredExperiences.map((exp, idx) => (
                  <p key={idx} className="text-xs text-zinc-600 dark:text-zinc-400 leading-normal italic">
                    • {exp.updatedDescription}
                  </p>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApply}
              disabled={successApplied}
              className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                successApplied 
                  ? "bg-green-600 text-white" 
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10"
              }`}
            >
              {successApplied ? (
                <>
                  <Check className="w-4 h-4" /> Modifications appliquées au CV actif !
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Appliquer l'Optimisation au CV
                </>
              )}
            </button>

          </div>
        ) : (
          <div className="p-8 border border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl text-center flex flex-col items-center justify-center gap-3 h-64">
            <FileText className="w-10 h-10 text-zinc-300" />
            <p className="text-xs font-semibold text-zinc-400 max-w-xs">Collez une offre d'emploi à gauche et lancez l'analyse pour voir les optimisations IA ici.</p>
          </div>
        )}

      </div>

    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Award, Sparkles, RefreshCw, CheckCircle, ShieldAlert, 
  BookOpen, Star, HelpCircle, Activity
} from "lucide-react";

export default function AiRecruiterPage() {
  const { activeCv, refreshCvScores } = useApp();
  const [analyzing, setAnalyzing] = useState(false);

  if (!activeCv) {
    return (
      <div className="p-8 text-center text-sm text-zinc-400">
        Aucun CV actif sélectionnez. Veuillez retourner au tableau de bord.
      </div>
    );
  }

  const handleRecalculate = async () => {
    setAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    refreshCvScores();
    setAnalyzing(false);
  };

  const getScoreColorClass = (score: number) => {
    if (score >= 85) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 70) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-red-500 bg-red-500/10 border-red-500/20";
  };

  const getEmployabilityStatus = (score: number) => {
    if (score >= 85) return { text: "Excellente", desc: "Votre profil est hautement attractif et optimisé pour les recruteurs. Vos chances d'être convoqué en entretien sont très élevées.", color: "text-emerald-500" };
    if (score >= 70) return { text: "Intermédiaire", desc: "Votre profil est bon, mais quelques ajustements clés (chiffres d'impact, mots-clés manquants) doubleraient votre taux de retour.", color: "text-amber-500" };
    return { text: "Faible", desc: "Votre CV manque d'éléments essentiels ou n'est pas structuré correctement pour passer les filtres ATS. Veuillez suivre nos suggestions ci-dessous.", color: "text-red-500" };
  };

  const averageScore = Math.round(
    (activeCv.scores.ats + activeCv.scores.recruiter + activeCv.scores.leadership + activeCv.scores.tech) / 4
  );

  const status = getEmployabilityStatus(averageScore);

  return (
    <div className="flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-zinc-400">Assistant IA RH & Expert Recrutement Senior</p>
          <h1 className="text-xl font-extrabold tracking-tight mt-1">Analyseur de CV Intelligent</h1>
        </div>

        <button
          onClick={handleRecalculate}
          disabled={analyzing}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4.5 py-3 rounded-xl shadow-lg shadow-indigo-600/10 hover:scale-102 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${analyzing ? "animate-spin" : ""}`} />
          {analyzing ? "Analyse en cours..." : "Recalculer les Scores"}
        </button>
      </div>

      {/* Main Analysis Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
        
        {/* Overall Employability Report */}
        <div className="lg:col-span-1 glass-effect p-6 rounded-3xl border border-gray-200/50 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-500" /> Diagnostic Global
            </span>

            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-32 h-32 rounded-full border-8 border-indigo-500/10 flex flex-col items-center justify-center relative">
                <span className="text-3xl font-black">{averageScore}%</span>
                <span className="text-[10px] font-semibold text-zinc-400 mt-0.5">Score Moyen</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm font-bold">
                Employabilité : <span className={status.color}>{status.text}</span>
              </p>
              <p className="text-xxs text-zinc-500 leading-relaxed mt-2 max-w-xs mx-auto">
                {status.desc}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Score Gauges */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* ATS Score */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-5 rounded-2xl flex flex-col justify-between gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">Score de compatibilité ATS</h3>
                <p className="text-[10px] text-zinc-400 mt-0.5">Capacité du CV à passer les robots logiciels recruteurs.</p>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${getScoreColorClass(activeCv.scores.ats)}`}>
                {activeCv.scores.ats}%
              </span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${activeCv.scores.ats}%` }} />
            </div>
          </div>

          {/* Recruiter Score */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-5 rounded-2xl flex flex-col justify-between gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">Intérêt Recruteur (RH)</h3>
                <p className="text-[10px] text-zinc-400 mt-0.5">Attractivité visuelle, clarté et lisibilité à première vue.</p>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${getScoreColorClass(activeCv.scores.recruiter)}`}>
                {activeCv.scores.recruiter}%
              </span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div className="bg-pink-500 h-full rounded-full transition-all duration-1000" style={{ width: `${activeCv.scores.recruiter}%` }} />
            </div>
          </div>

          {/* Leadership Score */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-5 rounded-2xl flex flex-col justify-between gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">Impact & Leadership</h3>
                <p className="text-[10px] text-zinc-400 mt-0.5">Mise en valeur d'initiatives et de chiffres d'affaires/gains.</p>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${getScoreColorClass(activeCv.scores.leadership)}`}>
                {activeCv.scores.leadership}%
              </span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${activeCv.scores.leadership}%` }} />
            </div>
          </div>

          {/* Technical Score */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-5 rounded-2xl flex flex-col justify-between gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">Adéquation Technique</h3>
                <p className="text-[10px] text-zinc-400 mt-0.5">Pertinence et description des compétences professionnelles.</p>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${getScoreColorClass(activeCv.scores.tech)}`}>
                {activeCv.scores.tech}%
              </span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: `${activeCv.scores.tech}%` }} />
            </div>
          </div>

        </div>
      </div>

      {/* Detailed Recommendations Checklist */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200/60 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
        <h3 className="font-bold text-sm text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" /> Recommandations d'Amélioration de l'IA
        </h3>

        <div className="flex flex-col gap-3">
          {activeCv.scores.suggestions.map((suggestion, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl border border-zinc-50 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/10 flex items-start gap-3.5 hover:border-indigo-200/50 dark:hover:border-indigo-900/50 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{suggestion}</p>
                <p className="text-[10px] text-zinc-400 mt-1 leading-normal">
                  {idx === 0 && "Intégrer des chiffres concrets (ex: 'Management de projet budget 120k€') rassure le recruteur sur votre légitimité financière."}
                  {idx === 1 && "Les filtres ATS scannent prioritairement la densité de mots-clés du domaine. Ajoutez des compétences cibles."}
                  {idx >= 2 && "Le titre et le résumé forment le 'dessus de la pile' qui décide du sort de votre CV en moins de 6 secondes."}
                </p>
              </div>
            </div>
          ))}

          {activeCv.scores.suggestions.length === 0 && (
            <div className="p-8 text-center text-xs text-zinc-400 flex flex-col items-center gap-2">
              <CheckCircle className="w-10 h-10 text-green-500" />
              <p className="font-semibold text-zinc-500">Aucune faiblesse majeure détectée !</p>
              <p className="text-zinc-400">Votre CV est optimisé au maximum pour vos futures candidatures.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

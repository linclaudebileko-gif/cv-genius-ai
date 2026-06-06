"use client";

import React, { useState } from "react";
import { useApp, CV } from "@/context/AppContext";
import { 
  Plus, Edit, Trash2, Award, Sparkles, Clock, FileText, 
  ArrowRight, ShieldAlert, Cpu, Heart, Share2, Eye
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { cvs, activeCv, setActiveCv, createNewCv, deleteCv, user } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleCreateCv = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createNewCv(newTitle);
    setNewTitle("");
    setShowCreateModal(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-500 border-emerald-500/20 bg-emerald-500/10";
    if (score >= 70) return "text-amber-500 border-amber-500/20 bg-amber-500/10";
    return "text-red-500 border-red-500/20 bg-red-500/10";
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Welcome & Stats Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Bonjour, {user?.name.split(" ")[0]} 👋</h1>
          <p className="text-xs text-zinc-400 mt-1">Gérez vos candidatures, optimisez vos CV et suivez vos performances.</p>
        </div>

        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4.5 py-3 rounded-xl shadow-lg shadow-indigo-600/10 hover:scale-102 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Nouveau CV IA
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-effect p-5 rounded-2xl border border-gray-200/50 dark:border-zinc-800/80 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xxs font-bold text-zinc-400 uppercase">Total de CVs</p>
            <p className="text-lg font-black mt-0.5">{cvs.length} <span className="text-xs text-zinc-400 font-semibold">/ {user?.plan === "free" ? "2" : "∞"}</span></p>
          </div>
        </div>

        <div className="glass-effect p-5 rounded-2xl border border-gray-200/50 dark:border-zinc-800/80 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xxs font-bold text-zinc-400 uppercase">Score ATS Moyen</p>
            <p className="text-lg font-black mt-0.5">
              {cvs.length > 0 
                ? `${Math.round(cvs.reduce((acc, curr) => acc + curr.scores.ats, 0) / cvs.length)}%` 
                : "N/A"
              }
            </p>
          </div>
        </div>

        <div className="glass-effect p-5 rounded-2xl border border-gray-200/50 dark:border-zinc-800/80 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xxs font-bold text-zinc-400 uppercase">Crédits IA Restants</p>
            <p className="text-lg font-black mt-0.5">{user?.credits} <span className="text-xs text-zinc-400 font-semibold">crédits</span></p>
          </div>
        </div>

        <div className="glass-effect p-5 rounded-2xl border border-gray-200/50 dark:border-zinc-800/80 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xxs font-bold text-zinc-400 uppercase">Statut d'Abonnement</p>
            <p className="text-xs font-bold capitalize text-amber-600 mt-1">{user?.plan} plan</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        
        {/* CV List Section */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <h3 className="font-bold text-sm text-zinc-400 uppercase tracking-wider">Mes CVs Générés</h3>
          
          <div className="flex flex-col gap-4">
            {cvs.map((cv) => {
              const isActive = activeCv?.id === cv.id;
              return (
                <div 
                  key={cv.id} 
                  onClick={() => setActiveCv(cv)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isActive 
                      ? "bg-white dark:bg-zinc-900 border-indigo-500 shadow-md shadow-indigo-500/[0.03]" 
                      : "bg-white dark:bg-zinc-900 border-gray-200/60 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 flex items-center justify-center text-zinc-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-zinc-800 dark:text-zinc-200">{cv.title}</h4>
                      <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Modifié le {new Date(cv.updatedAt).toLocaleDateString("fr-FR")} à {new Date(cv.updatedAt).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 capitalize">
                      {cv.templateSettings.colorTheme}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${getScoreColor(cv.scores.ats)}`}>
                      ATS : {cv.scores.ats}%
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Link 
                        href="/dashboard/cv-builder" 
                        className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-indigo-500 transition-colors"
                        title="Éditer le CV"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteCv(cv.id); }}
                        className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-red-500 transition-colors"
                        title="Supprimer le CV"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {cvs.length === 0 && (
              <div className="p-8 border border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl text-center flex flex-col items-center gap-3">
                <FileText className="w-10 h-10 text-zinc-300" />
                <p className="text-sm font-semibold text-zinc-400">Aucun CV créé pour le moment</p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="text-xs text-indigo-500 font-bold hover:underline"
                >
                  Créer un CV maintenant
                </button>
              </div>
            )}
          </div>
        </div>

        {/* AI Scores Summary Sidebar */}
        <div className="flex flex-col gap-5">
          <h3 className="font-bold text-sm text-zinc-400 uppercase tracking-wider">Analyse CV Actif</h3>
          
          {activeCv ? (
            <div className="glass-effect rounded-3xl border border-gray-200/50 dark:border-zinc-800/80 p-6 shadow-sm flex flex-col gap-6">
              <div>
                <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">{activeCv.title}</h4>
                <p className="text-xxs text-zinc-400 mt-1">Résumé des scores calculés par notre intelligence artificielle.</p>
              </div>

              {/* Grid of Scores */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-white/40 dark:bg-zinc-950/20 text-center">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Score ATS</span>
                  <p className="text-lg font-black mt-1 text-indigo-500">{activeCv.scores.ats}%</p>
                </div>
                <div className="p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-white/40 dark:bg-zinc-950/20 text-center">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Recruteur</span>
                  <p className="text-lg font-black mt-1 text-pink-500">{activeCv.scores.recruiter}%</p>
                </div>
                <div className="p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-white/40 dark:bg-zinc-950/20 text-center">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Leadership</span>
                  <p className="text-lg font-black mt-1 text-emerald-500">{activeCv.scores.leadership}%</p>
                </div>
                <div className="p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-white/40 dark:bg-zinc-950/20 text-center">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Technique</span>
                  <p className="text-lg font-black mt-1 text-amber-500">{activeCv.scores.tech}%</p>
                </div>
              </div>

              {/* Quick improvements suggestions */}
              <div className="border-t border-gray-100 dark:border-zinc-900 pt-5 flex flex-col gap-3">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-500" /> Améliorations Recommandées
                </span>
                <ul className="text-xxs text-zinc-500 leading-normal space-y-2 flex flex-col">
                  {activeCv.scores.suggestions.slice(0, 3).map((sug, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <span>{sug}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/dashboard/ai-recruiter"
                  className="mt-2 text-xxs font-bold text-indigo-500 hover:text-indigo-600 flex items-center gap-1"
                >
                  Voir l'assistant de recrutement <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="glass-effect rounded-3xl border border-gray-200/50 dark:border-zinc-800/80 p-6 text-center text-xs text-zinc-400">
              Sélectionnez un CV pour voir l'analyse IA.
            </div>
          )}
        </div>
      </div>

      {/* ==========================================
          CREATE NEW CV MODAL
          ========================================== */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-fade-in">
          <form 
            onSubmit={handleCreateCv}
            className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl flex flex-col gap-5"
          >
            <div>
              <h3 className="text-lg font-bold">Nouveau CV Intelligent</h3>
              <p className="text-xxs text-zinc-400 mt-0.5">Donnez un titre à votre CV pour l'identifier facilement.</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase">Titre du document</label>
              <input 
                type="text" 
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="ex: CV Lead Product Manager - TechScale"
                className="w-full py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex gap-3 mt-2">
              <button 
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl text-xs font-bold"
              >
                Annuler
              </button>
              <button 
                type="submit"
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
              >
                Créer et Éditer
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

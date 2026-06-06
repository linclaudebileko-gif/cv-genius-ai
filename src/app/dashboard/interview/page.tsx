"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Send, Sparkles, RefreshCw, ShieldAlert, Award, 
  MessageSquare, User as UserIcon, UserCheck, ChevronRight
} from "lucide-react";

export default function InterviewPage() {
  const { user, chatMessages, sendInterviewMessage, resetInterview, activeCv, updateUserPlan } = useApp();
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [recruiterPersona, setRecruiterPersona] = useState<"tech" | "ceo" | "consultant">("tech");

  const isBusiness = user?.plan === "business";

  const personas = {
    tech: { name: "Marie Chen", title: "Responsable Recrutement Tech", avatar: "MC", desc: "Spécialisée dans les profils de développeurs, PMs et ingénieurs. Questions directes, pragmatiques et orientées méthodes Agiles." },
    ceo: { name: "Marc Aubert", title: "CEO & Fondateur (Startup SaaS)", avatar: "MA", desc: "Cherche des profils autonomes avec une forte culture entrepreneuriale et d'initiative. Focus sur la croissance et la culture d'entreprise." },
    consultant: { name: "Jean de Lattre", title: "Partner Senior en Management", avatar: "JL", desc: "Exigeant sur la structure logique, la communication et l'analyse stratégique. Focus sur les modèles économiques et KPIs." }
  };

  const activePersona = personas[recruiterPersona];

  const handleStart = () => {
    resetInterview();
    setStarted(true);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;

    const text = inputText;
    setInputText("");
    setLoading(true);
    await sendInterviewMessage(text);
    setLoading(false);
  };

  // Scroll to bottom of chat
  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatMessages, loading]);

  // Gate check
  if (!isBusiness) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[70vh]">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-6">
          <MessageSquare className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-extrabold tracking-tight">Simulateur d'Entretien IA</h2>
        <p className="text-sm text-zinc-500 max-w-md mt-2">
          Entraînez-vous avec des recruteurs virtuels, obtenez des retours instantanés et structurez vos réponses avec le forfait **Business**.
        </p>

        <div className="mt-8 p-6 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 max-w-sm flex flex-col gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Rapport de Conseils IA</p>
              <p className="text-[10px] text-zinc-400">Analyses détaillées basées sur la méthode STAR.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">3 Personas de Recruteurs</p>
              <p className="text-[10px] text-zinc-400">Préparez-vous à tous les styles de management.</p>
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch h-[calc(100vh-140px)]">
      
      {/* LEFT PANEL: CONFIGURATION */}
      <div className="lg:col-span-1 bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-6 no-print">
        <div>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" /> Simulateur d'Entretien IA Premium
          </span>
          <h3 className="text-lg font-bold mt-2">Configuration de la simulation</h3>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-[10px] font-bold text-zinc-500 uppercase">Choisissez votre Recruteur</label>
          <div className="flex flex-col gap-3">
            {(Object.keys(personas) as Array<keyof typeof personas>).map((key) => {
              const pers = personas[key];
              const isSelected = recruiterPersona === key;
              return (
                <div
                  key={key}
                  onClick={() => !started && setRecruiterPersona(key)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-3.5 items-start ${
                    isSelected 
                      ? "border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/20" 
                      : "border-gray-200/60 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 bg-transparent"
                  } ${started ? "opacity-45 pointer-events-none" : ""}`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md">
                    {pers.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-zinc-800 dark:text-zinc-200">{pers.name}</h4>
                    <p className="text-[9px] font-semibold text-indigo-500 mt-0.5">{pers.title}</p>
                    <p className="text-[10px] text-zinc-400 leading-normal mt-1">{pers.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {!started ? (
          <button
            onClick={handleStart}
            className="w-full mt-auto py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-indigo-600/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Démarrer la Simulation
          </button>
        ) : (
          <button
            onClick={() => setStarted(false)}
            className="w-full mt-auto py-3.5 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Arrêter la Simulation
          </button>
        )}
      </div>

      {/* RIGHT PANEL: INTERACTIVE CHATROOM */}
      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/80 rounded-3xl shadow-sm flex flex-col justify-between overflow-hidden relative">
        
        {started ? (
          <>
            {/* Header info */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-800/80 flex items-center gap-3 bg-zinc-50/40 dark:bg-zinc-950/20 shrink-0">
              <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-xs">
                {activePersona.avatar}
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{activePersona.name}</p>
                <span className="text-[9px] font-semibold text-zinc-400 capitalize">{activePersona.title}</span>
              </div>
            </div>

            {/* Chat list */}
            <div 
              id="chat-container"
              className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 bg-zinc-50/20 dark:bg-zinc-950/5"
            >
              {chatMessages.map((msg) => {
                const isRecruiter = msg.sender === "recruiter";
                return (
                  <div key={msg.id} className="flex flex-col gap-2">
                    <div className={`flex gap-3 max-w-[85%] ${isRecruiter ? "self-start" : "self-end flex-row-reverse"}`}>
                      {/* Avatar */}
                      <div className={`w-7.5 h-7.5 rounded-full text-xxs font-bold flex items-center justify-center shrink-0 shadow-sm ${
                        isRecruiter 
                          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-500" 
                          : "bg-indigo-600 text-white"
                      }`}>
                        {isRecruiter ? activePersona.avatar : "ME"}
                      </div>
                      
                      {/* Text box */}
                      <div className={`p-4.5 rounded-2xl text-xs leading-relaxed ${
                        isRecruiter 
                          ? "bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300 rounded-tl-none" 
                          : "bg-indigo-600 text-white rounded-tr-none"
                      }`}>
                        {msg.text.split("\n").map((para, i) => <p key={i} className={i > 0 ? "mt-2" : ""}>{para}</p>)}
                      </div>
                    </div>

                    {/* AI Coach Feedback block */}
                    {!isRecruiter && msg.feedback && (
                      <div className="self-end max-w-[80%] mr-10 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xxs text-amber-700 dark:text-amber-400 flex items-start gap-2 animate-fade-in">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Analyse Coach de Carrière :</span> {msg.feedback}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {loading && (
                <div className="flex gap-3 max-w-[85%] self-start items-center">
                  <div className="w-7.5 h-7.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-xxs">
                    {activePersona.avatar}
                  </div>
                  <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce delay-200" />
                  </div>
                </div>
              )}
            </div>

            {/* Input form */}
            <form 
              onSubmit={handleSend}
              className="p-4 border-t border-gray-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/20 flex gap-3 shrink-0"
            >
              <input 
                type="text"
                required
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Saisissez votre réponse ici..."
                className="flex-1 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:border-indigo-500"
              />
              <button 
                type="submit"
                className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
            <MessageSquare className="w-12 h-12 text-zinc-300" />
            <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">Simulation d'entretien inactive</h4>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Sélectionnez votre profil de recruteur à gauche et cliquez sur le bouton de démarrage pour lancer la préparation d'entretien.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}

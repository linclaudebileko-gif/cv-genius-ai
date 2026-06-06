"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Camera, Sparkles, Upload, RefreshCw, CheckCircle, 
  ArrowRight, Download, Award, ChevronRight, Image as ImageIcon
} from "lucide-react";

export default function AiPhotosPage() {
  const { user, photoUrl, transformPhoto, updateUserPlan } = useApp();
  const [selectedStyle, setSelectedStyle] = useState<"linkedin" | "corporate" | "executive">("linkedin");
  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<boolean>(false);

  const isBusiness = user?.plan === "business";

  const styles = [
    { id: "linkedin", name: "Portrait LinkedIn", desc: "Arrière-plan épuré de bureau moderne, éclairage doux, posture neutre." },
    { id: "corporate", name: "Costume Corporate", desc: "Remplacement automatique des vêtements par un costume ou tailleur professionnel." },
    { id: "executive", name: "Portrait Executive", desc: "Rendu haut de gamme, arrière-plan de centre d'affaires flouté en extérieur." }
  ];

  const handleUploadClick = () => {
    setUploadedFile(true);
  };

  const handleTransform = async () => {
    if (!uploadedFile) return;
    setLoading(true);
    setProgressStep(1);

    // Simulate multi-step processing progress
    setTimeout(() => setProgressStep(2), 700);
    setTimeout(() => setProgressStep(3), 1400);
    setTimeout(() => setProgressStep(4), 2000);

    const mockFile = new File([""], "portrait.jpg", { type: "image/jpeg" });
    await transformPhoto(mockFile, selectedStyle);
    
    setLoading(false);
    setProgressStep(0);
  };

  // Gate check
  if (!isBusiness) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[70vh]">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-6">
          <Camera className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-extrabold tracking-tight">Portrait Professionnel IA</h2>
        <p className="text-sm text-zinc-500 max-w-md mt-2">
          Transformez un simple selfie pris avec votre smartphone en une photo de profil LinkedIn digne d'un studio professionnel.
        </p>

        <div className="mt-8 p-6 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 max-w-sm flex flex-col gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Génération de vêtements pros</p>
              <p className="text-[10px] text-zinc-400">Habille automatiquement votre portrait en costume.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Éclairage de studio IA</p>
              <p className="text-[10px] text-zinc-400">Corrige l'ombre, les reflets et le flou d'arrière-plan.</p>
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* CONFIGURATION & UPLOAD PANEL (LEFT) */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-6 no-print">
        <div>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" /> Studio Photo IA Premium
          </span>
          <h3 className="text-lg font-bold mt-2">Générer une photo pro</h3>
          <p className="text-xxs text-zinc-400 mt-1">Sélectionnez un style et importez un selfie ordinaire pour lancer l'intelligence artificielle.</p>
        </div>

        {/* Upload box */}
        <div 
          onClick={handleUploadClick}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
            uploadedFile 
              ? "border-green-500 bg-green-500/5" 
              : "border-gray-200 dark:border-zinc-800 hover:border-indigo-500 bg-zinc-50/50 dark:bg-zinc-950/20"
          }`}
        >
          {uploadedFile ? (
            <>
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-xs font-bold text-green-600">Selfie_Uploader.jpg importé !</p>
                <p className="text-[10px] text-zinc-400 mt-1">Prêt pour la transformation.</p>
              </div>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-zinc-300" />
              <div>
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Importer un selfie / photo existante</p>
                <p className="text-[10px] text-zinc-400 mt-1">Glissez-déposez ou cliquez pour parcourir les fichiers.</p>
              </div>
            </>
          )}
        </div>

        {/* Style Selection */}
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-bold text-zinc-500 uppercase">Style Graphique Cible</label>
          <div className="flex flex-col gap-2">
            {styles.map((style) => {
              const isSelected = selectedStyle === style.id;
              return (
                <div
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id as any)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex gap-3 items-center ${
                    isSelected 
                      ? "border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/20" 
                      : "border-gray-100 dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700"
                  }`}
                >
                  <input 
                    type="radio" 
                    checked={isSelected} 
                    readOnly
                    className="text-indigo-500"
                  />
                  <div>
                    <h4 className="font-bold text-zinc-800 dark:text-zinc-200">{style.name}</h4>
                    <p className="text-[10px] text-zinc-400 leading-normal mt-0.5">{style.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleTransform}
          disabled={!uploadedFile || loading}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Génération du portrait...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Lancer la transformation IA
            </>
          )}
        </button>
      </div>

      {/* GALLERY PREVIEW PANEL (RIGHT) */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-6 overflow-hidden">
        <h3 className="font-bold text-sm text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
          <ImageIcon className="w-4 h-4 text-indigo-500" /> Galerie & Rendu final
        </h3>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-16">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center animate-spin">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                {progressStep === 1 && "Alignement et détection des repères faciaux..."}
                {progressStep === 2 && "Suppression de l'arrière-plan..."}
                {progressStep === 3 && "Génération de la tenue vestimentaire..."}
                {progressStep === 4 && "Application de l'éclairage de studio..."}
              </p>
              <p className="text-[10px] text-zinc-400 mt-1">Veuillez patienter quelques secondes.</p>
            </div>
          </div>
        ) : photoUrl ? (
          <div className="flex flex-col gap-6 items-center">
            {/* Show results */}
            <div className="w-64 h-64 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md">
              <img 
                src={photoUrl} 
                alt="Portrait professionnel généré par IA" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center max-w-xs">
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Portrait haute définition prêt !</p>
              <p className="text-[10px] text-zinc-400 leading-normal mt-1">Vous pouvez maintenant télécharger cette image et l'utiliser sur LinkedIn ou sur votre CV.</p>
            </div>

            <a
              href={photoUrl}
              download="photo-professionnelle.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 font-bold rounded-xl text-xs transition-colors shadow-md flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Télécharger en Haute Définition
            </a>
          </div>
        ) : (
          <div className="p-8 border border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl text-center flex flex-col items-center justify-center gap-3 h-64">
            <Camera className="w-10 h-10 text-zinc-300" />
            <p className="text-xs font-semibold text-zinc-400 max-w-xs leading-normal">
              Importez une photo et cliquez sur le bouton de transformation pour voir votre portrait professionnel généré s'afficher ici.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

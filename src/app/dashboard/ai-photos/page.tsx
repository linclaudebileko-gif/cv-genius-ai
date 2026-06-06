"use client";

import React, { useState, useRef, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Camera, Sparkles, Upload, RefreshCw, CheckCircle, 
  Download, Award, ChevronRight, Image as ImageIcon, X
} from "lucide-react";

export default function AiPhotosPage() {
  const { user, photoUrl, transformPhoto, updateUserPlan } = useApp();
  const [selectedStyle, setSelectedStyle] = useState<"linkedin" | "corporate" | "executive">("linkedin");
  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Ref vers l'input file caché
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isBusiness = user?.plan === "business";

  const styles = [
    { id: "linkedin", name: "Portrait LinkedIn", desc: "Arrière-plan épuré de bureau moderne, éclairage doux, posture neutre." },
    { id: "corporate", name: "Costume Corporate", desc: "Remplacement automatique des vêtements par un costume ou tailleur professionnel." },
    { id: "executive", name: "Portrait Executive", desc: "Rendu haut de gamme, arrière-plan de centre d'affaires flouté en extérieur." }
  ];

  // Ouvre le sélecteur de fichiers natif du système
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Traite le fichier sélectionné (depuis l'input ou le drag & drop)
  const processFile = useCallback((file: File) => {
    // Vérifier que c'est bien une image
    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner un fichier image (JPG, PNG, WEBP, etc.).");
      return;
    }
    // Limiter à 10 Mo
    if (file.size > 10 * 1024 * 1024) {
      alert("La photo ne doit pas dépasser 10 Mo.");
      return;
    }

    setSelectedFile(file);

    // Générer un aperçu local via URL.createObjectURL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  }, [previewUrl]);

  // Gestion du changement de fichier via l'input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    // Réinitialiser la valeur pour permettre de re-sélectionner le même fichier
    e.target.value = "";
  };

  // Supprime le fichier sélectionné
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  // Gestion du drag & drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleTransform = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setProgressStep(1);

    // Simulation des étapes de progression
    setTimeout(() => setProgressStep(2), 700);
    setTimeout(() => setProgressStep(3), 1400);
    setTimeout(() => setProgressStep(4), 2000);

    // Passage du fichier réel à la fonction de transformation
    await transformPhoto(selectedFile, selectedStyle);
    
    setLoading(false);
    setProgressStep(0);
  };

  // Formatage de la taille du fichier
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  };

  // Gate check — plan requis
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
          <p className="text-xs text-zinc-400 mt-1">Sélectionnez un style et importez un selfie ordinaire pour lancer l'intelligence artificielle.</p>
        </div>

        {/* Input file caché — déclenché par le clic sur la zone */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          aria-label="Sélectionner une photo depuis votre ordinateur"
        />

        {/* Zone d'upload drag & drop */}
        <div 
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleUploadClick()}
          aria-label="Zone d'import de photo — cliquez ou glissez-déposez"
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 relative ${
            isDragging
              ? "border-indigo-500 bg-indigo-500/5 scale-[1.01]"
              : selectedFile 
                ? "border-green-500 bg-green-500/5" 
                : "border-gray-200 dark:border-zinc-800 hover:border-indigo-400 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/10 bg-zinc-50/50 dark:bg-zinc-950/20"
          }`}
        >
          {selectedFile ? (
            <>
              {/* Aperçu de la photo sélectionnée */}
              {previewUrl && (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-green-400 shadow-md">
                  <img
                    src={previewUrl}
                    alt="Aperçu de la photo sélectionnée"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  <p className="text-xs font-bold text-green-600 truncate max-w-[180px]">{selectedFile.name}</p>
                </div>
                <p className="text-[10px] text-zinc-400">{formatFileSize(selectedFile.size)} · Prêt pour la transformation</p>
              </div>
              {/* Bouton pour retirer le fichier */}
              <button
                onClick={handleRemoveFile}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-red-100 dark:hover:bg-red-900/40 text-zinc-500 hover:text-red-500 flex items-center justify-center transition-colors"
                aria-label="Retirer la photo sélectionnée"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isDragging ? "bg-indigo-500/20" : "bg-zinc-100 dark:bg-zinc-800"}`}>
                <Upload className={`w-6 h-6 transition-colors ${isDragging ? "text-indigo-500" : "text-zinc-400"}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {isDragging ? "Déposez votre photo ici" : "Importer une photo"}
                </p>
                <p className="text-[10px] text-zinc-400 mt-1">
                  Cliquez pour parcourir ou glissez-déposez · JPG, PNG, WEBP · Max 10 Mo
                </p>
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
                  onClick={() => setSelectedStyle(style.id as "linkedin" | "corporate" | "executive")}
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
                    className="text-indigo-500 accent-indigo-600"
                    aria-label={style.name}
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
          disabled={!selectedFile || loading}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
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
          <ImageIcon className="w-4 h-4 text-indigo-500" /> Galerie &amp; Rendu final
        </h3>

        {loading ? (
          /* ── État : transformation en cours ── */
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-8">
            {/* Aperçu de la photo originale avec overlay de chargement */}
            {previewUrl && (
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-lg">
                <img
                  src={previewUrl}
                  alt="Photo en cours de transformation"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-950/40 backdrop-blur-sm">
                  <RefreshCw className="w-8 h-8 text-indigo-300 animate-spin mb-2" />
                  <span className="text-[10px] text-indigo-200 font-bold">IA en cours...</span>
                </div>
              </div>
            )}
            <div className="text-center">
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                {progressStep === 1 && "Alignement et détection des repères faciaux..."}
                {progressStep === 2 && "Suppression de l'arrière-plan..."}
                {progressStep === 3 && "Génération de la tenue vestimentaire..."}
                {progressStep === 4 && "Application de l'éclairage de studio..."}
              </p>
              <p className="text-[10px] text-zinc-400 mt-1">Veuillez patienter quelques secondes.</p>
            </div>
            {/* Barre de progression */}
            <div className="w-full max-w-xs bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${(progressStep / 4) * 100}%` }}
              />
            </div>
          </div>
        ) : photoUrl ? (
          /* ── État : transformation terminée — comparatif avant/après ── */
          <div className="flex flex-col gap-5 items-center">
            <div className="w-full grid grid-cols-2 gap-3">
              {/* AVANT */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-zinc-400 uppercase text-center">Avant</span>
                <div className="aspect-square rounded-xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 shadow-sm">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Photo originale importée"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-zinc-300" />
                    </div>
                  )}
                </div>
              </div>

              {/* APRÈS */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-indigo-500 uppercase text-center flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" /> Après IA
                </span>
                <div className="aspect-square rounded-xl overflow-hidden border-2 border-indigo-400 shadow-md ring-2 ring-indigo-500/20">
                  <img
                    src={photoUrl}
                    alt="Portrait professionnel généré par IA"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="text-center max-w-xs">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Award className="w-4 h-4 text-amber-500" />
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Portrait haute définition prêt !</p>
              </div>
              <p className="text-[10px] text-zinc-400 leading-normal">Utilisez cette image sur votre CV, LinkedIn ou portfolio.</p>
            </div>

            <a
              href={photoUrl}
              download="photo-professionnelle.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Télécharger en Haute Définition
            </a>
          </div>
        ) : previewUrl ? (
          /* ── État : photo importée, pas encore transformée ── */
          <div className="flex flex-col gap-4 items-center">
            <div className="relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden border-2 border-green-400 shadow-md">
              <img
                src={previewUrl}
                alt="Photo importée prête à transformer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
                <p className="text-[10px] text-white font-bold truncate">{selectedFile?.name}</p>
                <p className="text-[9px] text-white/70">{selectedFile ? formatFileSize(selectedFile.size) : ""}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Photo importée avec succès</p>
              </div>
              <p className="text-[10px] text-zinc-400 max-w-xs leading-normal">
                Choisissez un style et cliquez sur <strong>"Lancer la transformation IA"</strong> pour générer votre portrait professionnel.
              </p>
            </div>
          </div>
        ) : (
          /* ── État : vide ── */
          <div className="p-8 border border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl text-center flex flex-col items-center justify-center gap-3 h-64">
            <Camera className="w-10 h-10 text-zinc-300" />
            <p className="text-xs font-semibold text-zinc-400 max-w-xs leading-normal">
              Importez une photo depuis votre ordinateur pour la voir apparaître ici avant transformation.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

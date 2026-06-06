"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Sparkles, FileText, Copy, Printer, Check, 
  RefreshCw, BrainCircuit, Landmark, Flame, Compass
} from "lucide-react";

export default function CoverLetterPage() {
  const { activeCv } = useApp();
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [letterStyle, setLetterStyle] = useState<"classic" | "modern" | "international" | "startup">("modern");
  const [loading, setLoading] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!activeCv) {
    return (
      <div className="p-8 text-center text-sm text-zinc-400">
        Aucun CV actif sélectionné. Veuillez retourner au tableau de bord.
      </div>
    );
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim() || !companyName.trim()) return;
    setLoading(true);

    // Mock AI call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const name = `${activeCv.personalInfo.firstName} ${activeCv.personalInfo.lastName}`;
    const contact = `${activeCv.personalInfo.email} | ${activeCv.personalInfo.phone}`;

    let letter = "";

    if (letterStyle === "classic") {
      letter = `${name}\n${contact}\n\nÀ l'attention du service des ressources humaines\n${companyName}\n\nObjet : Candidature au poste de ${jobTitle}\n\nMadame, Monsieur,\n\nC'est avec un grand intérêt que j'ai pris connaissance de votre offre d'emploi pour le poste de ${jobTitle} au sein de votre entreprise ${companyName}. Mon parcours professionnel m'a permis d'acquérir des compétences solides en gestion de projet, ainsi qu'une expertise approfondie dans mon domaine d'activité.\n\nLors de mes précédentes fonctions chez ${activeCv.experiences[0]?.company || "mon dernier employeur"}, j'ai eu l'opportunité de mener à bien des projets d'envergure, notamment en orchestrant le lancement de solutions innovantes et en optimisant les indicateurs clés de performance.\n\nIntégrer ${companyName} représente pour moi l'opportunité de mettre mon dynamisme et mon sens des responsabilités au service de vos objectifs stratégiques. Je serais ravi de vous rencontrer lors d'un entretien pour vous exposer plus en détail mes motivations.\n\nJe vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.\n\n${name}`;
    } else if (letterStyle === "modern") {
      letter = `${name}\n${contact}\n\nObjet : Pourquoi mon profil correspond au poste de ${jobTitle} chez ${companyName}\n\nBonjour,\n\nPassionné par l'innovation et les défis complexes, j'ai tout de suite été attiré par l'opportunité de rejoindre ${companyName} en tant que ${jobTitle}.\n\nAvec plus de 7 ans d'expérience, j'ai développé une double compétence : la gestion stratégique de produit et l'exécution technique. Mon rôle de Lead Product Manager chez ${activeCv.experiences[0]?.company || "mon employeur actuel"} m'a permis de piloter des roadmaps ambitieuses et de générer de la valeur ajoutée (ex: +35% de conversion d'activation).\n\nCe qui me motive chez ${companyName} ? Votre vision axée sur l'excellence utilisateur et l'innovation technologique. Je suis convaincu que mon approche structurée et ma capacité à fédérer des équipes transverses seront des atouts majeurs pour accélérer vos lancements futurs.\n\nDiscutons-en lors d'un échange informel.\n\nCordialement,\n\n${name}`;
    } else if (letterStyle === "international") {
      letter = `${name}\n${contact}\n\nSubject: Application for ${jobTitle} position at ${companyName}\n\nDear Hiring Team,\n\nI am writing to express my enthusiastic interest in the ${jobTitle} position currently open at ${companyName}. With a solid track record of driving product growth and alignment in competitive environments, I am eager to bring my skills to your international team.\n\nDuring my tenure at ${activeCv.experiences[0]?.company || "my last company"}, I successfully coordinated cross-functional initiatives resulting in major performance increases. I excel at translating complex requirements into simple, high-impact solutions, which aligns directly with the goals of ${companyName}.\n\nJoining ${companyName} is an exciting opportunity to contribute to a brand recognized for its global vision. I welcome the opportunity to discuss how my background and experience can add value to your organization.\n\nThank you for your time and consideration.\n\nSincerely,\n\n${name}`;
    } else {
      // Startup
      letter = `${name}\n${contact}\n\nHello l'équipe ${companyName} !\n\nJ'ai vu passer votre offre pour le poste de ${jobTitle} et je me suis dit : \"C'est exactement le type de challenge que je cherche !\"\n\nPourquoi ? Parce que j'aime quand ça bouge, que j'adore l'autonomie et que je crois fermement à l'impact des outils intelligents. Chez ${activeCv.experiences[0]?.company || "ma boîte précédente"}, j'ai géré le produit en mode itératif rapide, testant et optimisant en continu pour passer de 0 à 1M€ d'ARR.\n\nJe veux apporter cette énergie entrepreneuriale chez ${companyName} et vous aider à construire des fonctionnalités exceptionnelles.\n\nPrêt à caler un café virtuel pour en parler ?\n\nÀ très vite,\n\n${name}`;
    }

    setGeneratedLetter(letter);
    setLoading(false);
  };

  const handleCopy = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* CONFIG PANEL (LEFT) */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-6 no-print">
        <div>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" /> Rédacteur de Lettre de Motivation IA
          </span>
          <h3 className="text-lg font-bold mt-2">Détails de la Candidature</h3>
          <p className="text-xxs text-zinc-400 mt-1">Saisissez l'entreprise et le poste visé pour générer un texte sur-mesure.</p>
        </div>

        <form onSubmit={handleGenerate} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase">Poste visé</label>
              <input 
                type="text" 
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="ex: Senior Product Manager"
                className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase">Entreprise cible</label>
              <input 
                type="text" 
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="ex: TechScale"
                className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Letter style selection */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold text-zinc-500 uppercase">Style de rédaction</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "classic", name: "Classique", icon: Landmark },
                { id: "modern", name: "Moderne", icon: Compass },
                { id: "international", name: "Internationale (EN)", icon: BrainCircuit },
                { id: "startup", name: "Startup / Casual", icon: Flame }
              ].map((style) => {
                const Icon = style.icon;
                const isSelected = letterStyle === style.id;
                return (
                  <div
                    key={style.id}
                    onClick={() => setLetterStyle(style.id as any)}
                    className={`p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
                      isSelected 
                        ? "border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/20 text-indigo-500" 
                        : "border-gray-100 dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{style.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Rdaction par l'IA...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Générer la Lettre de Motivation
              </>
            )}
          </button>
        </form>
      </div>

      {/* RESULT PANEL (RIGHT) */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-5 overflow-hidden">
        <div className="flex justify-between items-center shrink-0 no-print">
          <h3 className="font-bold text-sm text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-indigo-500" /> Lettre Générée
          </h3>

          {generatedLetter && (
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopy}
                className="p-2 rounded-lg border border-zinc-150 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 hover:text-indigo-500 transition-all cursor-pointer"
                title="Copier le texte"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <button 
                onClick={handlePrint}
                className="p-2 rounded-lg border border-zinc-150 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 hover:text-indigo-500 transition-all cursor-pointer"
                title="Imprimer"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {generatedLetter ? (
          <div className="flex-1 overflow-y-auto p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/10 dark:bg-zinc-950/15 leading-relaxed text-xs font-mono text-zinc-700 dark:text-zinc-300 font-medium whitespace-pre-wrap select-text print-letter-layout">
            {generatedLetter}
          </div>
        ) : (
          <div className="p-8 border border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl text-center flex flex-col items-center justify-center gap-3 h-64">
            <FileText className="w-10 h-10 text-zinc-300" />
            <p className="text-xs font-semibold text-zinc-400 max-w-xs leading-normal">
              Remplissez les détails du poste à gauche et lancez la génération pour voir votre lettre s'afficher ici.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

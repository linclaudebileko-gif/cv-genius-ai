"use client";

import React, { useState } from "react";
import { useApp, Experience, Education, Skill, Language, Certification, Project } from "@/context/AppContext";
import CvRenderer from "@/components/CvRenderer";
import { 
  Sparkles, Plus, Trash2, Printer, ChevronDown, Check,
  User as UserIcon, Briefcase, BookOpen, Cpu, Settings, Globe, Award, FileText
} from "lucide-react";

export default function CvBuilderPage() {
  const { activeCv, updateCv, generateAISummary, enhanceAchievements } = useApp();
  const [activeTab, setActiveTab] = useState<"personal" | "experience" | "education" | "skills" | "settings">("personal");
  const [aiLoading, setAiLoading] = useState(false);
  const [enhancingExpId, setEnhancingExpId] = useState<string | null>(null);

  if (!activeCv) {
    return (
      <div className="p-8 text-center text-sm text-zinc-400">
        Aucun CV actif sélectionné. Veuillez retourner au tableau de bord pour en créer un.
      </div>
    );
  }

  // Helper to update personal info field
  const updatePersonalInfo = (field: string, value: string) => {
    updateCv({
      ...activeCv,
      personalInfo: {
        ...activeCv.personalInfo,
        [field]: value
      }
    });
  };

  // Helper to trigger AI Summary Generation
  const handleAISummary = async () => {
    setAiLoading(true);
    try {
      const summary = await generateAISummary();
      updatePersonalInfo("summary", summary);
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  // Helper to enhance achievements via AI
  const handleEnhanceAchievements = async (expId: string) => {
    setEnhancingExpId(expId);
    try {
      const enhanced = await enhanceAchievements(expId);
      const updatedExp = activeCv.experiences.map((exp) => 
        exp.id === expId ? { ...exp, achievements: enhanced } : exp
      );
      updateCv({
        ...activeCv,
        experiences: updatedExp
      });
    } catch (err) {
      console.error(err);
    } finally {
      setEnhancingExpId(null);
    }
  };

  // Add Item Helpers
  const addExperience = () => {
    const newExp: Experience = {
      id: "exp-" + Math.random().toString(36).substring(2, 9),
      company: "Nouvelle Entreprise",
      position: "Poste Occupé",
      startDate: "2024",
      endDate: "Présent",
      current: true,
      location: "Lieu",
      description: "Description de vos missions",
      achievements: []
    };
    updateCv({
      ...activeCv,
      experiences: [...activeCv.experiences, newExp]
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: "edu-" + Math.random().toString(36).substring(2, 9),
      school: "Nouvelle École",
      degree: "Diplôme",
      fieldOfStudy: "Domaine d'études",
      startDate: "2022",
      endDate: "2024",
      current: false,
      location: "Lieu",
      description: ""
    };
    updateCv({
      ...activeCv,
      education: [...activeCv.education, newEdu]
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: "sk-" + Math.random().toString(36).substring(2, 9),
      name: "Nouvelle compétence",
      level: "Avancé",
      category: "Général"
    };
    updateCv({
      ...activeCv,
      skills: [...activeCv.skills, newSkill]
    });
  };

  // Delete Item Helpers
  const deleteExperience = (id: string) => {
    updateCv({
      ...activeCv,
      experiences: activeCv.experiences.filter((exp) => exp.id !== id)
    });
  };

  const deleteEducation = (id: string) => {
    updateCv({
      ...activeCv,
      education: activeCv.education.filter((edu) => edu.id !== id)
    });
  };

  const deleteSkill = (id: string) => {
    updateCv({
      ...activeCv,
      skills: activeCv.skills.filter((sk) => sk.id !== id)
    });
  };

  // Edit Item Helpers
  const updateExperienceField = (id: string, field: keyof Experience, value: any) => {
    const updated = activeCv.experiences.map((exp) => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateCv({ ...activeCv, experiences: updated });
  };

  const updateEducationField = (id: string, field: keyof Education, value: any) => {
    const updated = activeCv.education.map((edu) => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateCv({ ...activeCv, education: updated });
  };

  const updateSkillField = (id: string, field: keyof Skill, value: any) => {
    const updated = activeCv.skills.map((sk) => 
      sk.id === id ? { ...sk, [field]: value } : sk
    );
    updateCv({ ...activeCv, skills: updated });
  };

  // PDF Export Trigger
  const handlePrint = () => {
    window.print();
  };

  // Config variables
  const layouts = [
    { id: "standard", name: "Standard (Empilé)" },
    { id: "sidebar-left", name: "Sidebar à gauche" },
    { id: "sidebar-right", name: "Sidebar à droite" },
    { id: "two-column", name: "Double colonne" },
    { id: "header-bold", name: "En-tête colorée" },
  ];

  const styles = [
    { id: "modern", name: "Moderne (Sans-serif)" },
    { id: "classic", name: "Classique (Serif)" },
    { id: "creative", name: "Créatif (Gradients)" },
  ];

  const themes = [
    { id: "tech", name: "Indigo Tech" },
    { id: "corporate", name: "Navy Corporate" },
    { id: "luxury", name: "Burgundy & Gold" },
    { id: "startup", name: "Emerald Startup" },
    { id: "minimalist", name: "Minimalist Slate" },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start h-[calc(100vh-140px)]">
      
      {/* ==========================================
          EDIT PANEL (LEFT)
          ========================================== */}
      <div className="flex flex-col bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/80 rounded-2xl h-full shadow-sm overflow-hidden no-print">
        
        {/* Tab Headers */}
        <div className="flex border-b border-gray-100 dark:border-zinc-800 overflow-x-auto shrink-0 bg-zinc-50/50 dark:bg-zinc-900/50">
          {[
            { id: "personal", name: "Infos", icon: UserIcon },
            { id: "experience", name: "Expérience", icon: Briefcase },
            { id: "education", name: "Formation", icon: BookOpen },
            { id: "skills", name: "Compétences", icon: Cpu },
            { id: "settings", name: "Design", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4.5 py-4 border-b-2 text-xs font-bold shrink-0 transition-all ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-500 bg-white dark:bg-zinc-900"
                    : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.name}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          
          {/* 1. PERSONAL INFO TAB */}
          {activeTab === "personal" && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase">Prénom</label>
                  <input 
                    type="text" 
                    value={activeCv.personalInfo.firstName}
                    onChange={(e) => updatePersonalInfo("firstName", e.target.value)}
                    className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-indigo-500 bg-transparent"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase">Nom</label>
                  <input 
                    type="text" 
                    value={activeCv.personalInfo.lastName}
                    onChange={(e) => updatePersonalInfo("lastName", e.target.value)}
                    className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-indigo-500 bg-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase">Titre Professionnel</label>
                <input 
                  type="text" 
                  value={activeCv.personalInfo.title}
                  onChange={(e) => updatePersonalInfo("title", e.target.value)}
                  placeholder="ex: Lead Product Manager"
                  className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-indigo-500 bg-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase">Email</label>
                  <input 
                    type="email" 
                    value={activeCv.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-indigo-500 bg-transparent"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase">Téléphone</label>
                  <input 
                    type="text" 
                    value={activeCv.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-indigo-500 bg-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase">LinkedIn</label>
                  <input 
                    type="text" 
                    value={activeCv.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                    className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-indigo-500 bg-transparent"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase">Adresse / Pays</label>
                  <input 
                    type="text" 
                    value={activeCv.personalInfo.address}
                    onChange={(e) => updatePersonalInfo("address", e.target.value)}
                    className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-indigo-500 bg-transparent"
                  />
                </div>
              </div>

              {/* Professional Summary + AI rewrite */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase">Résumé Professionnel</label>
                  <button
                    onClick={handleAISummary}
                    disabled={aiLoading}
                    className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 flex items-center gap-1 hover:underline disabled:opacity-40"
                  >
                    <Sparkles className="w-3 h-3 animate-pulse" /> {aiLoading ? "Génération..." : "Rédiger via IA"}
                  </button>
                </div>
                <textarea 
                  rows={4}
                  value={activeCv.personalInfo.summary}
                  onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                  placeholder="Décrivez votre profil en quelques lignes..."
                  className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-indigo-500 bg-transparent leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* 2. EXPERIENCE TAB */}
          {activeTab === "experience" && (
            <div className="flex flex-col gap-6">
              {activeCv.experiences.map((exp, index) => (
                <div key={exp.id} className="p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col gap-3 relative">
                  <button 
                    onClick={() => deleteExperience(exp.id)}
                    className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <h4 className="font-bold text-xs text-zinc-400">Poste #{index + 1}</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-zinc-400">Entreprise</label>
                      <input 
                        type="text" 
                        value={exp.company}
                        onChange={(e) => updateExperienceField(exp.id, "company", e.target.value)}
                        className="py-2 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-zinc-400">Intitulé de poste</label>
                      <input 
                        type="text" 
                        value={exp.position}
                        onChange={(e) => updateExperienceField(exp.id, "position", e.target.value)}
                        className="py-2 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-zinc-400">Période (Début - Fin)</label>
                      <div className="flex items-center gap-1.5">
                        <input 
                          type="text" 
                          placeholder="AAAA-MM"
                          value={exp.startDate}
                          onChange={(e) => updateExperienceField(exp.id, "startDate", e.target.value)}
                          className="w-1/2 py-2 px-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent text-center"
                        />
                        <input 
                          type="text" 
                          placeholder="AAAA-MM"
                          value={exp.endDate}
                          disabled={exp.current}
                          onChange={(e) => updateExperienceField(exp.id, "endDate", e.target.value)}
                          className="w-1/2 py-2 px-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent text-center disabled:opacity-40"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4.5">
                      <input 
                        type="checkbox" 
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onChange={(e) => updateExperienceField(exp.id, "current", e.target.checked)}
                        className="rounded border-zinc-300 text-indigo-500"
                      />
                      <label htmlFor={`current-${exp.id}`} className="text-xxs font-bold text-zinc-500 uppercase">Poste actuel</label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-zinc-400">Description des missions</label>
                    <textarea 
                      rows={3}
                      value={exp.description}
                      onChange={(e) => updateExperienceField(exp.id, "description", e.target.value)}
                      className="py-2 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent leading-relaxed"
                    />
                  </div>

                  {/* Achievements section + AI Enhance */}
                  <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-3 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase">Réalisations Clés / Chiffres</span>
                      <button
                        onClick={() => handleEnhanceAchievements(exp.id)}
                        disabled={enhancingExpId === exp.id}
                        className="text-[9px] font-bold text-indigo-500 hover:text-indigo-600 flex items-center gap-1 hover:underline disabled:opacity-40"
                      >
                        <Sparkles className="w-2.5 h-2.5" /> {enhancingExpId === exp.id ? "Optimisation..." : "Quantifier par IA"}
                      </button>
                    </div>
                    
                    {exp.achievements.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {exp.achievements.map((ach, idx) => (
                          <input 
                            key={idx}
                            type="text"
                            value={ach}
                            onChange={(e) => {
                              const newAch = [...exp.achievements];
                              newAch[idx] = e.target.value;
                              updateExperienceField(exp.id, "achievements", newAch);
                            }}
                            className="py-1.5 px-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent"
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-zinc-400 italic">Aucune réalisation listée. Cliquez sur le bouton IA pour en générer automatiquement.</p>
                    )}
                  </div>
                </div>
              ))}

              <button 
                onClick={addExperience}
                className="w-full py-3 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800/20 text-zinc-500 hover:text-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" /> Ajouter une expérience
              </button>
            </div>
          )}

          {/* 3. EDUCATION TAB */}
          {activeTab === "education" && (
            <div className="flex flex-col gap-6">
              {activeCv.education.map((edu, index) => (
                <div key={edu.id} className="p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col gap-3 relative">
                  <button 
                    onClick={() => deleteEducation(edu.id)}
                    className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <h4 className="font-bold text-xs text-zinc-400">Formation #{index + 1}</h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-zinc-400">École</label>
                      <input 
                        type="text" 
                        value={edu.school}
                        onChange={(e) => updateEducationField(edu.id, "school", e.target.value)}
                        className="py-2 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-zinc-400">Diplôme</label>
                      <input 
                        type="text" 
                        value={edu.degree}
                        onChange={(e) => updateEducationField(edu.id, "degree", e.target.value)}
                        className="py-2 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-zinc-400">Domaine d'études</label>
                      <input 
                        type="text" 
                        value={edu.fieldOfStudy}
                        onChange={(e) => updateEducationField(edu.id, "fieldOfStudy", e.target.value)}
                        className="py-2 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold text-zinc-400">Période (Début - Fin)</label>
                      <div className="flex gap-1">
                        <input 
                          type="text" 
                          placeholder="Début"
                          value={edu.startDate}
                          onChange={(e) => updateEducationField(edu.id, "startDate", e.target.value)}
                          className="w-1/2 py-2 px-2 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent text-center"
                        />
                        <input 
                          type="text" 
                          placeholder="Fin"
                          value={edu.endDate}
                          onChange={(e) => updateEducationField(edu.id, "endDate", e.target.value)}
                          className="w-1/2 py-2 px-2 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button 
                onClick={addEducation}
                className="w-full py-3 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800/20 text-zinc-500 hover:text-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" /> Ajouter une formation
              </button>
            </div>
          )}

          {/* 4. SKILLS TAB */}
          {activeTab === "skills" && (
            <div className="flex flex-col gap-4">
              {activeCv.skills.map((sk) => (
                <div key={sk.id} className="p-3.5 rounded-xl border border-gray-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between gap-3 relative">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      value={sk.name}
                      onChange={(e) => updateSkillField(sk.id, "name", e.target.value)}
                      className="py-1.5 px-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent font-medium"
                    />
                    <select
                      value={sk.level}
                      onChange={(e) => updateSkillField(sk.id, "level", e.target.value)}
                      className="py-1.5 px-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent"
                    >
                      <option value="Débutant">Débutant</option>
                      <option value="Intermédiaire">Intermédiaire</option>
                      <option value="Avancé">Avancé</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>

                  <button 
                    onClick={() => deleteSkill(sk.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <button 
                onClick={addSkill}
                className="w-full py-3 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800/20 text-zinc-500 hover:text-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" /> Ajouter une compétence
              </button>
            </div>
          )}

          {/* 5. DESIGN SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase">Structure de mise en page</label>
                <select
                  value={activeCv.templateSettings.layoutId}
                  onChange={(e) => updateCv({
                    ...activeCv,
                    templateSettings: {
                      ...activeCv.templateSettings,
                      layoutId: e.target.value
                    }
                  })}
                  className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent"
                >
                  {layouts.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase">Style Graphique (Thème)</label>
                <select
                  value={activeCv.templateSettings.styleId}
                  onChange={(e) => updateCv({
                    ...activeCv,
                    templateSettings: {
                      ...activeCv.templateSettings,
                      styleId: e.target.value
                    }
                  })}
                  className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent"
                >
                  {styles.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase">Palette de couleurs</label>
                <select
                  value={activeCv.templateSettings.colorTheme}
                  onChange={(e) => updateCv({
                    ...activeCv,
                    templateSettings: {
                      ...activeCv.templateSettings,
                      colorTheme: e.target.value
                    }
                  })}
                  className="w-full py-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent"
                >
                  {themes.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase">Taille Police</label>
                  <div className="flex border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                    {["sm", "md", "lg"].map((size) => (
                      <button
                        key={size}
                        onClick={() => updateCv({
                          ...activeCv,
                          templateSettings: { ...activeCv.templateSettings, fontSize: size as any }
                        })}
                        className={`flex-1 py-2 text-xxs font-bold uppercase transition-colors ${
                          activeCv.templateSettings.fontSize === size
                            ? "bg-indigo-500 text-white"
                            : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase">Marges</label>
                  <select
                    value={activeCv.templateSettings.margins}
                    onChange={(e) => updateCv({
                      ...activeCv,
                      templateSettings: { ...activeCv.templateSettings, margins: e.target.value as any }
                    })}
                    className="w-full py-2 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs bg-transparent"
                  >
                    <option value="compact">Compactes</option>
                    <option value="normal">Normales</option>
                    <option value="wide">Larges</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ==========================================
          LIVE PREVIEW PANEL (RIGHT)
          ========================================== */}
      <div className="flex flex-col h-full bg-zinc-100/30 dark:bg-zinc-900/10 rounded-2xl overflow-hidden">
        
        {/* Controls bar */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200/50 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-md shrink-0 no-print">
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Aperçu du Rendu PDF
            </span>
          </div>

          <button 
            onClick={handlePrint}
            className="flex items-center gap-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Imprimer / PDF
          </button>
        </div>

        {/* Renderer output */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 flex justify-center bg-zinc-100 dark:bg-zinc-950/50 print-preview-area">
          <div className="w-full max-w-[800px] shadow-lg shadow-black/5 dark:shadow-none print-layout-fix">
            <CvRenderer cv={activeCv} isPrintMode={false} />
          </div>
        </div>
      </div>

    </div>
  );
}

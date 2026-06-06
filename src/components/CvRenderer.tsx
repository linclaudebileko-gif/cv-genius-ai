"use client";

import React from "react";
import { CV, Experience, Education, Skill, Language, Certification, Project } from "@/context/AppContext";
import { Mail, Phone, MapPin, Globe, Calendar, Award, BookOpen, Briefcase, Heart, Cpu } from "lucide-react";

// Custom LinkedIn SVG Icon to avoid missing icon builds
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);


interface CvRendererProps {
  cv: CV;
  isPrintMode?: boolean;
}

export default function CvRenderer({ cv, isPrintMode = false }: CvRendererProps) {
  const { personalInfo, experiences, education, skills, languages, certifications, projects, interests, templateSettings } = cv;
  const { layoutId, styleId, colorTheme, fontSize, margins } = templateSettings;

  // ==========================================
  // STYLING MAPS & RESOLVERS
  // ==========================================

  // Font Size Resolver
  const fontSizeClass = {
    sm: "text-xs leading-normal",
    md: "text-sm leading-relaxed",
    lg: "text-base leading-loose"
  }[fontSize];

  // Margin Resolver
  const marginClass = {
    compact: isPrintMode ? "p-4 gap-3" : "p-6 gap-4",
    normal: isPrintMode ? "p-8 gap-5" : "p-10 gap-6",
    wide: isPrintMode ? "p-10 gap-6" : "p-12 gap-8"
  }[margins];

  // Font Family Resolver based on Style
  const fontFamilyClass = {
    modern: "font-sans",
    classic: "font-serif",
    creative: "font-sans tracking-wide"
  }[styleId];

  // Color Theme Configuration
  const colors: Record<string, { primary: string; secondary: string; textPrimary: string; bgLight: string; border: string }> = {
    corporate: {
      primary: "bg-blue-800 text-white",
      secondary: "text-blue-800",
      textPrimary: "text-blue-900",
      bgLight: "bg-blue-50/50 dark:bg-blue-950/20",
      border: "border-blue-200 dark:border-blue-900"
    },
    luxury: {
      primary: "bg-amber-900 text-amber-100",
      secondary: "text-amber-700",
      textPrimary: "text-amber-900",
      bgLight: "bg-amber-50/40 dark:bg-amber-950/10",
      border: "border-amber-200 dark:border-amber-900"
    },
    tech: {
      primary: "bg-indigo-600 text-white",
      secondary: "text-indigo-600",
      textPrimary: "text-indigo-950",
      bgLight: "bg-indigo-50/50 dark:bg-indigo-950/20",
      border: "border-indigo-100 dark:border-indigo-900"
    },
    startup: {
      primary: "bg-emerald-600 text-white",
      secondary: "text-emerald-600",
      textPrimary: "text-emerald-950",
      bgLight: "bg-emerald-50/40 dark:bg-emerald-950/10",
      border: "border-emerald-100 dark:border-emerald-900"
    },
    minimalist: {
      primary: "bg-zinc-800 text-white",
      secondary: "text-zinc-800",
      textPrimary: "text-zinc-900",
      bgLight: "bg-zinc-50/80 dark:bg-zinc-900/40",
      border: "border-zinc-200 dark:border-zinc-800"
    }
  };

  const activeColors = colors[colorTheme] || colors.tech;

  // Header/Section Underlines or styles based on theme
  const getSectionHeaderStyle = () => {
    if (styleId === "classic") {
      return `border-b ${activeColors.border} pb-1 uppercase tracking-wider font-semibold text-xs mb-3`;
    }
    if (styleId === "creative") {
      return `flex items-center gap-2 font-bold tracking-tight text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500`;
    }
    // Modern
    return `flex items-center gap-2 font-bold tracking-tight text-base mb-3 border-l-4 pl-2.5 ${activeColors.border}`;
  };

  const getCardStyle = () => {
    if (styleId === "creative") {
      return `rounded-xl p-4 border border-gray-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 hover:shadow-md transition-shadow`;
    }
    return "";
  };

  // ==========================================
  // COMPONENT RENDERING FRAGMENTS
  // ==========================================

  // Personal Info Block
  const RenderPersonalInfo = ({ compact = false }) => (
    <div className={`flex flex-col ${compact ? "gap-2" : "gap-4"}`}>
      <div>
        <h1 className={`text-2xl sm:text-3xl font-extrabold ${styleId === "classic" ? "font-serif text-zinc-900 dark:text-zinc-100" : "tracking-tight"}`}>
          {personalInfo.firstName} <span className={styleId === "creative" ? "text-indigo-500" : activeColors.secondary}>{personalInfo.lastName}</span>
        </h1>
        <p className={`text-base sm:text-lg font-semibold tracking-wide mt-1 ${styleId === "creative" ? "text-pink-500" : activeColors.secondary}`}>
          {personalInfo.title}
        </p>
      </div>

      <div className={`grid ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"} gap-2 text-xs text-zinc-600 dark:text-zinc-400`}>
        {personalInfo.email && (
          <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:underline">
            <Mail className="w-3.5 h-3.5" /> {personalInfo.email}
          </a>
        )}
        {personalInfo.phone && (
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> {personalInfo.phone}
          </div>
        )}
        {personalInfo.address && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> {personalInfo.address}
          </div>
        )}
        {personalInfo.linkedin && (
          <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
            <LinkedinIcon className="w-3.5 h-3.5" /> {personalInfo.linkedin}
          </a>
        )}
        {personalInfo.website && (
          <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
            <Globe className="w-3.5 h-3.5" /> {personalInfo.website}
          </a>
        )}
      </div>
    </div>
  );

  // Experiences List
  const RenderExperiences = () => {
    if (experiences.length === 0) return null;
    return (
      <div className="flex flex-col gap-4">
        <h2 className={getSectionHeaderStyle()}>
          {styleId !== "classic" && <Briefcase className={`w-4 h-4 ${styleId === "creative" ? "text-pink-500" : activeColors.secondary}`} />}
          Expérience Professionnelle
        </h2>
        <div className="flex flex-col gap-4">
          {experiences.map((exp) => (
            <div key={exp.id} className={`${getCardStyle()} flex flex-col gap-1`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="font-bold text-zinc-800 dark:text-zinc-200">{exp.position}</h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 font-medium bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full w-fit">
                  <Calendar className="w-3 h-3" /> {exp.startDate} - {exp.current ? "Présent" : exp.endDate}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className={activeColors.secondary}>{exp.company}</span>
                <span className="text-zinc-500 font-normal">{exp.location}</span>
              </div>
              <p className="text-xs mt-1 text-zinc-600 dark:text-zinc-400 font-normal">{exp.description}</p>
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-xs text-zinc-600 dark:text-zinc-400 gap-1 flex flex-col font-normal pl-1.5">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx} className="leading-relaxed"><span className="pl-1">{ach}</span></li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Education List
  const RenderEducation = () => {
    if (education.length === 0) return null;
    return (
      <div className="flex flex-col gap-4">
        <h2 className={getSectionHeaderStyle()}>
          {styleId !== "classic" && <BookOpen className={`w-4 h-4 ${styleId === "creative" ? "text-pink-500" : activeColors.secondary}`} />}
          Formation
        </h2>
        <div className="flex flex-col gap-4">
          {education.map((edu) => (
            <div key={edu.id} className={`${getCardStyle()} flex flex-col gap-1`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="font-bold text-zinc-800 dark:text-zinc-200">{edu.degree}</h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 font-medium bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full w-fit">
                  <Calendar className="w-3 h-3" /> {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className={activeColors.secondary}>{edu.school}</span>
                <span className="text-zinc-500 font-normal">{edu.location}</span>
              </div>
              {edu.description && (
                <p className="text-xs mt-1 text-zinc-500 dark:text-zinc-400 font-normal">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Skills Block
  const RenderSkills = () => {
    if (skills.length === 0) return null;
    return (
      <div className="flex flex-col gap-3">
        <h2 className={getSectionHeaderStyle()}>
          {styleId !== "classic" && <Cpu className={`w-4 h-4 ${styleId === "creative" ? "text-pink-500" : activeColors.secondary}`} />}
          Compétences
        </h2>
        {styleId === "classic" ? (
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-700 dark:text-zinc-300">
            {skills.map((sk) => (
              <span key={sk.id} className="font-medium">
                {sk.name} <span className="text-zinc-400 font-normal">({sk.level})</span>
              </span>
            ))}
          </div>
        ) : styleId === "creative" ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((sk) => (
              <div key={sk.id} className="text-xs px-2.5 py-1 rounded-lg bg-gradient-to-r from-indigo-50/50 to-pink-50/50 dark:from-indigo-950/20 dark:to-pink-950/20 border border-indigo-100/50 dark:border-indigo-900/30 text-indigo-950 dark:text-indigo-300 font-medium">
                {sk.name}
              </div>
            ))}
          </div>
        ) : (
          // Modern
          <div className="flex flex-wrap gap-2">
            {skills.map((sk) => (
              <span key={sk.id} className={`text-xs px-2.5 py-1 rounded-md ${activeColors.bgLight} ${activeColors.secondary} border ${activeColors.border} font-medium`}>
                {sk.name}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Languages Block
  const RenderLanguages = () => {
    if (languages.length === 0) return null;
    return (
      <div className="flex flex-col gap-3">
        <h2 className={getSectionHeaderStyle()}>
          {styleId !== "classic" && <Globe className={`w-4 h-4 ${styleId === "creative" ? "text-pink-500" : activeColors.secondary}`} />}
          Langues
        </h2>
        <div className="flex flex-col gap-1.5">
          {languages.map((lang) => (
            <div key={lang.id} className="flex justify-between items-center text-xs">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">{lang.name}</span>
              <span className="text-zinc-500 text-xxs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Certifications Block
  const RenderCertifications = () => {
    if (certifications.length === 0) return null;
    return (
      <div className="flex flex-col gap-3">
        <h2 className={getSectionHeaderStyle()}>
          {styleId !== "classic" && <Award className={`w-4 h-4 ${styleId === "creative" ? "text-pink-500" : activeColors.secondary}`} />}
          Certifications
        </h2>
        <div className="flex flex-col gap-2">
          {certifications.map((cert) => (
            <div key={cert.id} className="text-xs">
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">{cert.name}</p>
              <p className="text-xxs text-zinc-500 flex justify-between mt-0.5">
                <span>{cert.issuer}</span>
                <span>{cert.date}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Projects Block
  const RenderProjects = () => {
    if (projects.length === 0) return null;
    return (
      <div className="flex flex-col gap-4">
        <h2 className={getSectionHeaderStyle()}>
          {styleId !== "classic" && <Cpu className={`w-4 h-4 ${styleId === "creative" ? "text-pink-500" : activeColors.secondary}`} />}
          Projets
        </h2>
        <div className="flex flex-col gap-3">
          {projects.map((proj) => (
            <div key={proj.id} className={getCardStyle()}>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xs text-zinc-800 dark:text-zinc-200">
                  {proj.name} <span className="font-normal text-zinc-500">({proj.role})</span>
                </h3>
                {proj.link && (
                  <a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer" className={`text-xxs hover:underline ${activeColors.secondary}`}>
                    Lien du projet
                  </a>
                )}
              </div>
              <p className="text-xs mt-1 text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">{proj.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Interests Block
  const RenderInterests = () => {
    if (interests.length === 0) return null;
    return (
      <div className="flex flex-col gap-3">
        <h2 className={getSectionHeaderStyle()}>
          {styleId !== "classic" && <Heart className={`w-4 h-4 ${styleId === "creative" ? "text-pink-500" : activeColors.secondary}`} />}
          Centres d'Intérêt
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {interests.map((int, idx) => (
            <span key={idx} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded font-normal">
              {int}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // ==========================================
  // STRUCTURE LAYOUT GENERATION
  // ==========================================

  // 1. Sidebar Left Layout
  const LayoutSidebarLeft = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 h-full">
      {/* Sidebar (Left) */}
      <div className={`md:col-span-1 flex flex-col gap-6 md:border-r ${activeColors.border} md:pr-6 md:h-full`}>
        <RenderPersonalInfo compact={true} />
        <RenderSkills />
        <RenderLanguages />
        <RenderCertifications />
        <RenderInterests />
      </div>

      {/* Main Panel (Right) */}
      <div className="md:col-span-2 flex flex-col gap-6">
        {personalInfo.summary && (
          <div className="flex flex-col gap-2">
            <h2 className={getSectionHeaderStyle()}>Résumé Professionnel</h2>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}
        <RenderExperiences />
        <RenderEducation />
        <RenderProjects />
      </div>
    </div>
  );

  // 2. Sidebar Right Layout
  const LayoutSidebarRight = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 h-full">
      {/* Main Panel (Left) */}
      <div className="md:col-span-2 flex flex-col gap-6 md:border-r ${activeColors.border} md:pr-6">
        <div className="flex flex-col gap-4">
          <h1 className={`text-2xl sm:text-3xl font-extrabold ${styleId === "classic" ? "font-serif text-zinc-900 dark:text-zinc-100" : "tracking-tight"}`}>
            {personalInfo.firstName} <span className={styleId === "creative" ? "text-indigo-500" : activeColors.secondary}>{personalInfo.lastName}</span>
          </h1>
          <p className={`text-base sm:text-lg font-semibold tracking-wide ${styleId === "creative" ? "text-pink-500" : activeColors.secondary}`}>
            {personalInfo.title}
          </p>
          {personalInfo.summary && (
            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed border-t border-gray-100 dark:border-zinc-800 pt-3">{personalInfo.summary}</p>
          )}
        </div>
        <RenderExperiences />
        <RenderEducation />
        <RenderProjects />
      </div>

      {/* Sidebar (Right) */}
      <div className="md:col-span-1 flex flex-col gap-6">
        <RenderPersonalInfo compact={true} />
        <RenderSkills />
        <RenderLanguages />
        <RenderCertifications />
        <RenderInterests />
      </div>
    </div>
  );

  // 3. Two-Column Layout
  const LayoutTwoColumn = () => (
    <div className="flex flex-col gap-6">
      <div className="border-b pb-4"><RenderPersonalInfo /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="flex flex-col gap-6">
          {personalInfo.summary && (
            <div className="flex flex-col gap-2">
              <h2 className={getSectionHeaderStyle()}>Résumé Professionnel</h2>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}
          <RenderExperiences />
        </div>
        <div className="flex flex-col gap-6">
          <RenderEducation />
          <RenderSkills />
          <RenderProjects />
          <RenderLanguages />
          <RenderCertifications />
          <RenderInterests />
        </div>
      </div>
    </div>
  );

  // 4. Header Bold Layout
  const LayoutHeaderBold = () => (
    <div className="flex flex-col gap-6">
      {/* Large Solid Header block */}
      <div className={`-mx-4 sm:-mx-8 md:-mx-10 lg:-mx-12 -mt-4 sm:-mt-8 md:-mt-10 lg:-mt-12 p-6 sm:p-10 ${styleId === "creative" ? "bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white" : activeColors.primary} rounded-t-xl`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-lg font-medium opacity-90 mt-1">
              {personalInfo.title}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-1.5 text-xs opacity-90">
            {personalInfo.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {personalInfo.phone}</span>}
            {personalInfo.address && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {personalInfo.address}</span>}
          </div>
        </div>
      </div>

      {/* Main body content */}
      <div className="flex flex-col gap-6 mt-2">
        {personalInfo.summary && (
          <p className="text-xs text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed italic border-l-2 pl-3 py-0.5">{personalInfo.summary}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col gap-6">
            <RenderExperiences />
            <RenderProjects />
          </div>
          <div className="md:col-span-1 flex flex-col gap-6">
            <RenderEducation />
            <RenderSkills />
            <RenderLanguages />
            <RenderCertifications />
            <RenderInterests />
          </div>
        </div>
      </div>
    </div>
  );

  // 5. Standard Timeline/Academic Stack Layout
  const LayoutStandardStack = () => (
    <div className="flex flex-col gap-6">
      <RenderPersonalInfo />
      {personalInfo.summary && (
        <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-zinc-800 pt-4">
          <h2 className={getSectionHeaderStyle()}>Résumé Professionnel</h2>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}
      <RenderExperiences />
      <RenderEducation />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RenderSkills />
        <div className="flex flex-col gap-6">
          <RenderLanguages />
          <RenderCertifications />
          <RenderInterests />
        </div>
      </div>
      <RenderProjects />
    </div>
  );

  // Main selector for structural templates
  const renderLayout = () => {
    switch (layoutId) {
      case "sidebar-left":
        return <LayoutSidebarLeft />;
      case "sidebar-right":
        return <LayoutSidebarRight />;
      case "two-column":
        return <LayoutTwoColumn />;
      case "header-bold":
        return <LayoutHeaderBold />;
      case "standard":
      case "minimalist-clean":
      case "compact":
      case "creative-grid":
      case "timeline":
      case "academic":
      default:
        return <LayoutStandardStack />;
    }
  };

  return (
    <div className={`w-full h-full bg-white dark:bg-zinc-950/40 rounded-xl border border-gray-200/50 dark:border-zinc-800/80 shadow-lg ${fontFamilyClass} ${fontSizeClass} ${marginClass} flex flex-col`}>
      {renderLayout()}
    </div>
  );
}

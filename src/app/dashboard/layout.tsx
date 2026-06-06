"use client";

import React, { useEffect, useState } from "react";
import { useApp, PlanType } from "@/context/AppContext";
import { useTheme } from "@/context/ThemeContext";
import { 
  Sparkles, Sun, Moon, LogOut, LayoutDashboard, FileText, 
  Award, Briefcase, Send, Globe, Camera, ShieldAlert,
  User as UserIcon, Check, CreditCard, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, login, logout, updateUserPlan } = useApp();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradePlan, setUpgradePlan] = useState<PlanType>("pro");

  // Auto-login as guest PM if not logged in
  useEffect(() => {
    if (!user) {
      login("linkedin");
    }
  }, [user]);

  // Handle URL query for upgrade triggers
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const upgrade = params.get("upgrade") as PlanType | null;
      if (upgrade && (upgrade === "pro" || upgrade === "business")) {
        setUpgradePlan(upgrade);
        setShowUpgradeModal(true);
        // Clean URL parameter
        router.replace(pathname);
      }
    }
  }, [pathname, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center animate-spin">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm text-zinc-500 font-medium">Chargement de votre espace...</span>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: "Vue d'ensemble", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Mon CV (Éditeur)", icon: FileText, path: "/dashboard/cv-builder" },
    { name: "Assistant Recruteur", icon: Award, path: "/dashboard/ai-recruiter" },
    { name: "Adaptation Offre", icon: Briefcase, path: "/dashboard/job-matcher" },
    { name: "Lettre de Motivation", icon: FileText, path: "/dashboard/cover-letter" },
    { name: "Simulateur d'Entretien", icon: Send, path: "/dashboard/interview" },
    { name: "Portfolio IA", icon: Globe, path: "/dashboard/portfolio" },
    { name: "Photo Pro IA", icon: Camera, path: "/dashboard/ai-photos" },
    { name: "Administration", icon: ShieldAlert, path: "/dashboard/admin" },
  ];

  const handleCheckoutSubmit = () => {
    updateUserPlan(upgradePlan);
    setShowUpgradeModal(false);
    alert(`Félicitations ! Vous êtes désormais abonné au plan ${upgradePlan.toUpperCase()}. Vos limites ont été mises à jour.`);
  };

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-950/40 text-foreground transition-colors duration-300">
      
      {/* ==========================================
          SIDEBAR NAVIGATION
          ========================================== */}
      <aside className="w-64 border-r border-gray-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 flex flex-col justify-between shrink-0">
        <div className="flex flex-col gap-6 p-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-extrabold text-base tracking-tight">
              CV Genius <span className="text-indigo-500">AI</span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1 mt-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive 
                      ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 font-bold" 
                      : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:text-zinc-800 dark:hover:text-zinc-300"
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 ${isActive ? "text-indigo-500" : "text-zinc-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-gray-100 dark:border-zinc-900 flex flex-col gap-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 line-clamp-1">{user.name}</span>
              <span className="text-[10px] font-semibold text-zinc-400 capitalize">{user.plan} account</span>
            </div>
          </div>
          <button
            onClick={() => { logout(); router.push("/"); }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-gray-100 dark:border-zinc-800 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 dark:hover:text-red-400 transition-colors text-xs font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* ==========================================
          MAIN CONTENT AREA
          ========================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 border-b border-gray-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 flex items-center justify-between px-6 shrink-0">
          <h2 className="font-bold text-lg capitalize">
            {menuItems.find(m => m.path === pathname)?.name || "Dashboard"}
          </h2>

          <div className="flex items-center gap-4">
            {/* Upgrade CTA */}
            {user.plan === "free" && (
              <button
                onClick={() => { setUpgradePlan("pro"); setShowUpgradeModal(true); }}
                className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg shadow-indigo-600/10 hover:scale-102 hover:shadow-indigo-600/20 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" /> Passer au Plan Pro
              </button>
            )}

            {user.plan === "pro" && (
              <button
                onClick={() => { setUpgradePlan("business"); setShowUpgradeModal(true); }}
                className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg shadow-indigo-600/10 hover:scale-102 hover:shadow-indigo-600/20 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" /> Accès Business
              </button>
            )}

            {/* Plan Badge */}
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-500">
              Plan {user.plan}
            </span>

            {/* Theme switch */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-zinc-50/50 dark:bg-zinc-950/10">
          {children}
        </main>
      </div>

      {/* ==========================================
          UPGRADE / CHECKOUT MODAL (SIMULATED)
          ========================================== */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 relative">
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-white text-xl font-bold"
            >
              &times;
            </button>

            <div>
              <span className="text-[10px] font-extrabold bg-indigo-500/10 text-indigo-500 px-3 py-1.5 rounded-full uppercase tracking-wider">
                Paiement Sécurisé
              </span>
              <h3 className="text-xl font-bold mt-3">Passer à la vitesse supérieure</h3>
              <p className="text-xs text-zinc-400 mt-1">Choisissez votre moyen de paiement et validez votre abonnement.</p>
            </div>

            {/* Plan details box */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 capitalize">Plan {upgradePlan}</p>
                <p className="text-xxs text-zinc-400 mt-0.5">Accès instantané à toutes les fonctionnalités premium</p>
              </div>
              <p className="text-base font-extrabold text-indigo-500">
                {upgradePlan === "pro" ? "9.00€" : "19.00€"} <span className="text-[10px] text-zinc-400 font-normal">/ mois</span>
              </p>
            </div>

            {/* Gateway Toggle */}
            <div className="flex gap-2.5">
              <button className="flex-1 py-3 px-4 rounded-xl border-2 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 text-xs font-bold flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4 text-indigo-500" /> Lemon Squeezy
              </button>
              <button className="flex-1 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold flex items-center justify-center gap-2 opacity-55 hover:opacity-100 transition-opacity">
                PayPal
              </button>
              <button className="flex-1 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold flex items-center justify-center gap-2 opacity-55 hover:opacity-100 transition-opacity">
                Flutterwave
              </button>
            </div>

            {/* Mock Card form */}
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-500 uppercase">Numéro de carte</label>
                <input 
                  type="text" 
                  value="4242 •••• •••• 4242" 
                  disabled
                  className="w-full py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-sm font-medium text-zinc-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">Expiration</label>
                  <input 
                    type="text" 
                    value="12 / 2029" 
                    disabled
                    className="w-full py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-sm font-medium text-zinc-400"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">CVC</label>
                  <input 
                    type="text" 
                    value="•••" 
                    disabled
                    className="w-full py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-sm font-medium text-zinc-400"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckoutSubmit}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/10 transition-colors text-sm flex items-center justify-center gap-2"
            >
              Débloquer mon plan maintenant <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

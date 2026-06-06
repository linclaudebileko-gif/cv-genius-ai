"use client";

import React, { useState } from "react";
import { useApp, PlanType } from "@/context/AppContext";
import { 
  Users, DollarSign, Activity, Percent, ArrowUpRight, 
  Search, ShieldCheck, Mail, Star, Settings, UserMinus
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: PlanType;
  joined: string;
  status: "active" | "suspended";
}

export default function AdminPage() {
  const { user } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<string>("all");

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    { id: "u-1", name: "Marc Aubert", email: "marc.aubert@gmail.com", plan: "business", joined: "2026-06-01", status: "active" },
    { id: "u-2", name: "Sophie Martin", email: "s.martin@yahoo.fr", plan: "pro", joined: "2026-06-02", status: "active" },
    { id: "u-3", name: "David Dupont", email: "david.dupont@outlook.com", plan: "free", joined: "2026-06-03", status: "active" },
    { id: "u-4", name: "Elena Rostova", email: "elena.r@cvgenius.ai", plan: "business", joined: "2026-06-04", status: "active" },
    { id: "u-5", name: "Thomas Durand", email: "thomas.durand@gmail.com", plan: "free", joined: "2026-06-05", status: "active" },
    { id: "u-6", name: "Julie Laurent", email: "j.laurent@wanadoo.fr", plan: "pro", joined: "2026-06-05", status: "active" },
  ]);

  const handleTogglePlan = (userId: string) => {
    const updated = adminUsers.map((u) => {
      if (u.id === userId) {
        const nextPlan: PlanType = u.plan === "free" ? "pro" : u.plan === "pro" ? "business" : "free";
        return { ...u, plan: nextPlan };
      }
      return u;
    });
    setAdminUsers(updated);
  };

  const handleToggleStatus = (userId: string) => {
    const updated = adminUsers.map((u) => {
      if (u.id === userId) {
        return { ...u, status: u.status === "active" ? "suspended" : "active" as any };
      }
      return u;
    });
    setAdminUsers(updated);
  };

  const filteredUsers = adminUsers.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = selectedPlanFilter === "all" || u.plan === selectedPlanFilter;
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="flex flex-col gap-8">
      
      {/* Header */}
      <div>
        <p className="text-xs text-zinc-400">CV Genius AI SaaS Administration Suite</p>
        <h1 className="text-xl font-extrabold tracking-tight mt-1 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-500" /> Panneau d'Administration
        </h1>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xxs font-bold text-zinc-400 uppercase">Revenu Mensuel (MRR)</p>
            <p className="text-lg font-black mt-1">12 450 €</p>
            <span className="text-[9px] text-green-500 font-bold flex items-center gap-0.5 mt-1">
              +14.2% ce mois <ArrowUpRight className="w-2.5 h-2.5" />
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xxs font-bold text-zinc-400 uppercase">Inscriptions Totales</p>
            <p className="text-lg font-black mt-1">3 240</p>
            <span className="text-[9px] text-green-500 font-bold flex items-center gap-0.5 mt-1">
              +8.5% cette semaine <ArrowUpRight className="w-2.5 h-2.5" />
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xxs font-bold text-zinc-400 uppercase">Taux de Conversion</p>
            <p className="text-lg font-black mt-1">4.82%</p>
            <span className="text-[9px] text-zinc-400 font-semibold flex items-center gap-0.5 mt-1">
              Moyenne marché : 2.5%
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center">
            <Percent className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xxs font-bold text-zinc-400 uppercase">Consommation API IA</p>
            <p className="text-lg font-black mt-1">342.15 $</p>
            <span className="text-[9px] text-red-500 font-bold flex items-center gap-0.5 mt-1">
              Coûts LLM optimisés (-5%)
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Grid: Revenue Chart & User Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        
        {/* User directory */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">Annuaire des Utilisateurs</h3>
            
            {/* Search and Filters */}
            <div className="flex gap-2.5">
              <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 px-2 bg-zinc-50/50 dark:bg-zinc-950/20">
                <Search className="w-3.5 h-3.5 text-zinc-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="py-1.5 px-2 bg-transparent text-xxs focus:outline-none w-28 sm:w-36"
                />
              </div>

              <select
                value={selectedPlanFilter}
                onChange={(e) => setSelectedPlanFilter(e.target.value)}
                className="py-1.5 px-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xxs bg-transparent"
              >
                <option value="all">Tous les plans</option>
                <option value="free">Gratuit</option>
                <option value="pro">Pro</option>
                <option value="business">Business</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 font-bold uppercase text-[9px] tracking-wider">
                  <th className="pb-3 pl-2">Nom / Contact</th>
                  <th className="pb-3">Forfait</th>
                  <th className="pb-3">Date d'inscription</th>
                  <th className="pb-3">Statut</th>
                  <th className="pb-3 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b border-zinc-50 dark:border-zinc-800/40 hover:bg-zinc-50/30 dark:hover:bg-zinc-800/10">
                    <td className="py-3.5 pl-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-800 dark:text-zinc-200">{u.name}</span>
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5"><Mail className="w-3 h-3" /> {u.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                        u.plan === "business" 
                          ? "bg-purple-100 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border border-purple-200/50" 
                          : u.plan === "pro" 
                          ? "bg-indigo-100 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                      }`}>
                        {u.plan}
                      </span>
                    </td>
                    <td className="py-3.5 text-zinc-500 font-medium">
                      {new Date(u.joined).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="py-3.5">
                      <span className={`text-[9px] font-bold uppercase ${u.status === "active" ? "text-green-500" : "text-red-500"}`}>
                        ● {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right pr-2">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleTogglePlan(u.id)}
                          className="text-[10px] font-extrabold text-indigo-500 hover:underline px-2 py-1 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded"
                          title="Faire évoluer le plan"
                        >
                          Plan
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(u.id)}
                          className={`text-[10px] font-bold px-2 py-1 rounded border ${
                            u.status === "active" 
                              ? "border-red-200/50 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20" 
                              : "border-green-200/50 text-green-500 hover:bg-green-50 dark:hover:bg-green-950/20"
                          }`}
                        >
                          {u.status === "active" ? "Suspendre" : "Activer"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-zinc-400 font-semibold italic">
                      Aucun utilisateur ne correspond aux critères.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: CHART SIDEBAR */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
          <div>
            <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">Croissance des Revenus</h3>
            <p className="text-xxs text-zinc-400 mt-1">Évolution mensuelle du MRR en milliers d'euros (k€).</p>
          </div>

          {/* Simple custom Bar Chart in CSS */}
          <div className="flex justify-between items-end h-44 gap-4 px-2 pt-4 border-b border-zinc-100 dark:border-zinc-800">
            {[
              { val: 30, label: "Jan" },
              { val: 45, label: "Fév" },
              { val: 58, label: "Mar" },
              { val: 78, label: "Avr" },
              { val: 95, label: "Mai" },
              { val: 120, label: "Juin" },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                {/* Popover indicator */}
                <span className="text-[8px] font-extrabold text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity mb-[-4px]">
                  {bar.val / 10}k€
                </span>
                
                {/* Bar */}
                <div 
                  style={{ height: `${bar.val}%` }} 
                  className={`w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-indigo-400 group-hover:from-pink-500 group-hover:to-pink-400 transition-all shadow-md`}
                />
                <span className="text-[8px] font-bold text-zinc-400 select-none">{bar.label}</span>
              </div>
            ))}
          </div>

          {/* Legend and stats */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-xxs font-semibold">
              <span className="text-zinc-400">Chiffre d'Affaires Cumulé 2026 :</span>
              <span className="text-zinc-800 dark:text-zinc-200">42.6 k€</span>
            </div>
            <div className="flex justify-between items-center text-xxs font-semibold">
              <span className="text-zinc-400">Dépenses serveur & IA globales :</span>
              <span className="text-zinc-800 dark:text-zinc-200">1.8 k€</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

"use client";

import { Stethoscope, CalendarDays } from "lucide-react";

export function HeroHeader() {
  const fecha = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="w-full px-8 pt-8 pb-14"
      style={{ background: "linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #fbbf24 100%)" }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2" style={{ color: "#fce4ec" }}>
            <CalendarDays className="w-3.5 h-3.5" />
            <span className="text-xs capitalize font-medium">{fecha}</span>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">
            Sistema de Prescripción Médica
          </h1>
          <p className="text-sm" style={{ color: "#f8bbd0" }}>
            Crea recetas de forma rápida, segura y sin errores
          </p>
        </div>
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)" }}
        >
          <Stethoscope className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

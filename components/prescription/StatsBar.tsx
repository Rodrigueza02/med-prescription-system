"use client";

import { Pill, ClipboardList, Clock, ShieldCheck, LucideIcon } from "lucide-react";

interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string;
  iconColor: string;
  iconBg: string;
  valuColor: string;
}

const STATS: StatItem[] = [
  { icon: Pill,          label: "Medicamentos", value: "12",    iconColor: "text-pink-600",    iconBg: "bg-pink-50",    valuColor: "text-gray-900"    },
  { icon: ClipboardList, label: "Recetas hoy",  value: "0",     iconColor: "text-pink-600",    iconBg: "bg-pink-50",    valuColor: "text-gray-900"    },
  { icon: Clock,         label: "Tiempo aprox", value: "2 min", iconColor: "text-pink-600",    iconBg: "bg-pink-50",    valuColor: "text-gray-900" },
  { icon: ShieldCheck,   label: "Precisión",    value: "100%",  iconColor: "text-pink-600",    iconBg: "bg-pink-50",    valuColor: "text-gray-900"     },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {STATS.map(({ icon: Icon, label, value, iconColor, iconBg, valuColor }) => (
        <div
          key={label}
          className="bg-white rounded-2xl p-4 flex flex-col gap-2.5 shadow-sm"
          style={{ border: "1px solid #f0d6de" }}
        >
          <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
            <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
          </div>
          <div>
            <p className={`text-2xl font-bold leading-none ${valuColor}`}>{value}</p>
            <p className="text-xs mt-1 font-medium text-gray-600">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue, SelectGroup, SelectLabel,
} from "@/components/ui/select";

const FRECUENCIAS = [
  "Cada 4 horas", "Cada 6 horas", "Cada 8 horas",
  "Cada 12 horas", "Una vez al día", "Dos veces al día", "Tres veces al día",
];

const DURACIONES = [
  "3 días", "5 días", "7 días", "10 días",
  "14 días", "21 días", "30 días", "Uso continuo",
];

interface Props {
  paciente: string;
  medico: string;
  frecuencia: string;
  duracion: string;
  notas: string;
  errors: Record<string, string>;
  onChange: (campo: string, valor: string) => void;
}

export function PatientPanel({ paciente, medico, frecuencia, duracion, notas, errors, onChange }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: "1px solid #f0d6de" }}>
      <PanelHeader icon={User} title="Datos del paciente" color="#c2185b" />

      <FieldGroup className="p-5">
        <Field>
          <FieldLabel htmlFor="paciente">Nombre del paciente</FieldLabel>
          <Input
            id="paciente"
            placeholder="Ej: Juan García"
            value={paciente}
            onChange={(e) => onChange("paciente", e.target.value)}
            className={`bg-white text-gray-900 placeholder:text-gray-400 ${errors.paciente ? "border-red-400" : ""}`}
          />
          {errors.paciente && <FieldDescription className="text-red-500">{errors.paciente}</FieldDescription>}
        </Field>

        <Field>
          <FieldLabel htmlFor="medico">Médico tratante</FieldLabel>
          <Input
            id="medico"
            placeholder="Ej: Dr. Ana López"
            value={medico}
            onChange={(e) => onChange("medico", e.target.value)}
            className={`bg-white text-gray-900 placeholder:text-gray-400 ${errors.medico ? "border-red-400" : ""}`}
          />
          {errors.medico && <FieldDescription className="text-red-500">{errors.medico}</FieldDescription>}
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="frecuencia">Frecuencia</FieldLabel>
            <Select value={frecuencia} onValueChange={(v) => onChange("frecuencia", v)}>
              <SelectTrigger id="frecuencia" className={`bg-white text-gray-900 ${errors.frecuencia ? "border-red-400" : ""}`}>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>Frecuencia de administración</SelectLabel>
                  {FRECUENCIAS.map((f) => (
                    <SelectItem key={f} value={f} className="text-gray-900">{f}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.frecuencia && <FieldDescription className="text-red-500">{errors.frecuencia}</FieldDescription>}
          </Field>

          <Field>
            <FieldLabel htmlFor="duracion">Duración</FieldLabel>
            <Select value={duracion} onValueChange={(v) => onChange("duracion", v)}>
              <SelectTrigger id="duracion" className={`bg-white text-gray-900 ${errors.duracion ? "border-red-400" : ""}`}>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>Duración del tratamiento</SelectLabel>
                  {DURACIONES.map((d) => (
                    <SelectItem key={d} value={d} className="text-gray-900">{d}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.duracion && <FieldDescription className="text-red-500">{errors.duracion}</FieldDescription>}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="notas">Indicaciones adicionales</FieldLabel>
          <Textarea
            id="notas"
            placeholder="Ej: Tomar con alimentos, evitar alcohol..."
            value={notas}
            onChange={(e) => onChange("notas", e.target.value)}
            rows={4}
            className="resize-none bg-white text-gray-900 placeholder:text-gray-400"
          />
        </Field>
      </FieldGroup>
    </div>
  );
}

function PanelHeader({ icon: Icon, title, color }: { icon: React.ElementType; title: string; color: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5" style={{ background: "#fce4ec", borderBottom: "1px solid #f0d6de" }}>
      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: color }}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <span className="text-sm font-semibold" style={{ color: "#880e4f" }}>{title}</span>
    </div>
  );
}

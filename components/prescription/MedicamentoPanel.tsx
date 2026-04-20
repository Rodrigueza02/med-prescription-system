"use client";

import { Pill, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue, SelectGroup, SelectLabel,
} from "@/components/ui/select";
import {
  Command, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
import { Medicamento } from "@/models/Medicamento";

const CATEGORIA_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  Antibiótico:      { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  Analgésico:       { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
  Gastrointestinal: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
  Antidiabético:    { bg: "#fefce8", text: "#a16207", border: "#fde68a" },
  Antihipertensivo: { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
  Hipolipemiante:   { bg: "#faf5ff", text: "#7e22ce", border: "#e9d5ff" },
  Broncodilatador:  { bg: "#ecfeff", text: "#0e7490", border: "#a5f3fc" },
  Hormonal:         { bg: "#fdf2f8", text: "#be185d", border: "#fbcfe8" },
};

function getCatStyle(cat: string) {
  return CATEGORIA_STYLE[cat] ?? { bg: "#f9fafb", text: "#374151", border: "#e5e7eb" };
}

interface Props {
  busqueda: string;
  onBusqueda: (v: string) => void;
  resultados: Medicamento[];
  seleccionado: Medicamento | null;
  onSeleccionar: (m: Medicamento) => void;
  dosis: string;
  onDosis: (v: string) => void;
  errors: Record<string, string>;
}

export function MedicamentoPanel({
  busqueda, onBusqueda, resultados,
  seleccionado, onSeleccionar,
  dosis, onDosis, errors,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: "1px solid #f0d6de" }}>
      <PanelHeader />

      <FieldGroup className="p-5">
        {/* Medicamento seleccionado */}
        {seleccionado && (
          <SelectedMed med={seleccionado} />
        )}

        {/* Buscador */}
        <Field>
          <FieldLabel htmlFor="buscar-medicamento">Buscar medicamento</FieldLabel>
          <Command
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #f0d6de", background: "#fff" }}
          >
            <CommandInput
              id="buscar-medicamento"
              placeholder="Escribe el nombre del medicamento..."
              value={busqueda}
              onValueChange={onBusqueda}
              className="text-gray-900 placeholder:text-gray-400"
            />
            <CommandList className="max-h-52" style={{ background: "#fff" }}>
              <CommandEmpty className="py-5 text-center text-sm text-gray-400">
                No se encontraron medicamentos
              </CommandEmpty>
              <CommandGroup heading="Disponibles">
                {resultados.map((med) => {
                  const s = getCatStyle(med.categoria);
                  return (
                    <CommandItem
                      key={med.id}
                      value={med.nombre}
                      onSelect={() => onSeleccionar(med)}
                      className="cursor-pointer px-3 py-2.5 hover:bg-rose-50"
                      style={{ background: "#fff" }}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#fce4ec" }}>
                          <Pill className="w-3.5 h-3.5" style={{ color: "#c2185b" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{med.nombre}</p>
                          <p className="text-xs text-gray-500 truncate">{med.descripcion}</p>
                        </div>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
                          style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
                        >
                          {med.categoria}
                        </span>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
          {errors.medicamento && <FieldDescription className="text-red-500">{errors.medicamento}</FieldDescription>}
        </Field>

        {/* Dosis */}
        <Field>
          <FieldLabel htmlFor="dosis">Dosis</FieldLabel>
          <Select value={dosis} onValueChange={onDosis} disabled={!seleccionado}>
            <SelectTrigger
              id="dosis"
              className={`bg-white text-gray-900 ${errors.dosis ? "border-red-400" : ""} ${!seleccionado ? "opacity-60" : ""}`}
            >
              <SelectValue placeholder={seleccionado ? "Seleccionar dosis" : "Selecciona un medicamento primero"} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectLabel>Dosis disponibles</SelectLabel>
                {(seleccionado?.dosisDisponibles ?? []).map((d) => (
                  <SelectItem key={d} value={d} className="text-gray-900">{d}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.dosis && <FieldDescription className="text-red-500">{errors.dosis}</FieldDescription>}
        </Field>
      </FieldGroup>
    </div>
  );
}

function PanelHeader() {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5" style={{ background: "#fce4ec", borderBottom: "1px solid #f0d6de" }}>
      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#e91e63" }}>
        <Pill className="w-4 h-4 text-white" />
      </div>
      <span className="text-sm font-semibold" style={{ color: "#880e4f" }}>Medicamento prescrito</span>
    </div>
  );
}

function SelectedMed({ med }: { med: Medicamento }) {
  const s = getCatStyle(med.categoria);
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#fdf2f8", border: "1px solid #fbcfe8" }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#fce4ec" }}>
        <Pill className="w-4.5 h-4.5" style={{ color: "#c2185b" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{med.nombre}</p>
        <p className="text-xs text-gray-500 truncate">{med.descripcion}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
        >
          {med.categoria}
        </span>
        <CheckCircle2 className="w-4 h-4" style={{ color: "#c2185b" }} />
      </div>
    </div>
  );
}

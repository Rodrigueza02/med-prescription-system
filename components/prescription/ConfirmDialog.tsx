"use client";

import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { FormState } from "@/hooks/usePrescription";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  guardando: boolean;
  form: FormState;
}

export function ConfirmDialog({ open, onClose, onConfirm, guardando, form }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-white p-0 overflow-hidden" style={{ border: "1px solid #f0d6de" }}>
        {/* Header */}
        <div className="px-6 py-5" style={{ background: "linear-gradient(135deg, #c2185b, #e91e63)" }}>
          <DialogTitle className="text-white text-base font-bold">Confirmar receta médica</DialogTitle>
          <DialogDescription className="text-pink-100 text-sm mt-0.5">
            Revisa los datos antes de guardar
          </DialogDescription>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Paciente */}
          <InfoBlock title="Paciente">
            <InfoRow label="Nombre" value={form.paciente} />
            <InfoRow label="Médico" value={form.medico} />
          </InfoBlock>

          <Separator style={{ background: "#f0d6de" }} />

          {/* Medicamento */}
          <InfoBlock title="Medicamento">
            <p className="text-sm font-semibold text-gray-900 mb-2">
              {form.medicamentoSeleccionado?.nombre}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Dosis", value: form.dosis },
                { label: "Frecuencia", value: form.frecuencia },
                { label: "Duración", value: form.duracion },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-2.5 text-center"
                  style={{ background: "#fdf2f8", border: "1px solid #fbcfe8" }}
                >
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-xs font-semibold text-gray-900 mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
            {form.notas && (
              <p className="text-xs text-gray-500 mt-2 p-2.5 rounded-xl" style={{ background: "#fdf2f8", border: "1px solid #fbcfe8" }}>
                {form.notas}
              </p>
            )}
          </InfoBlock>
        </div>

        <DialogFooter className="px-6 pb-6 gap-2 flex-row">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={guardando}
            className="flex-1 text-gray-700 border-gray-200 hover:bg-gray-50"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            disabled={guardando}
            className="flex-1 text-white border-0 font-semibold"
            style={{ background: "linear-gradient(135deg, #c2185b, #e91e63)" }}
          >
            {guardando ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Guardando...</>
            ) : "Confirmar y guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "#c2185b" }}>{title}</p>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

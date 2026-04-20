"use client";

import { usePrescription } from "@/hooks/usePrescription";
import { StatsBar } from "./StatsBar";
import { PatientPanel } from "./PatientPanel";
import { MedicamentoPanel } from "./MedicamentoPanel";
import { RecetaExitosa } from "./RecetaExitosa";
import { ConfirmDialog } from "./ConfirmDialog";
import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";

export function PrescriptionLayout() {
  const {
    form, busqueda, setBusqueda, errors,
    dialogAbierto, setDialogAbierto, guardando,
    recetaGuardada, resultadosBusqueda,
    actualizarCampo, seleccionarMedicamento,
    confirmar, guardar, resetear,
  } = usePrescription();

  if (recetaGuardada) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <RecetaExitosa receta={recetaGuardada} onNuevaReceta={resetear} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pb-12 -mt-6 relative z-10">
      <StatsBar />

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Columna izquierda */}
        <PatientPanel
          paciente={form.paciente}
          medico={form.medico}
          frecuencia={form.frecuencia}
          duracion={form.duracion}
          notas={form.notas}
          errors={errors}
          onChange={(campo, valor) =>
            actualizarCampo(campo as keyof typeof form, valor)
          }
        />

        {/* Columna derecha */}
        <MedicamentoPanel
          busqueda={busqueda}
          onBusqueda={setBusqueda}
          resultados={resultadosBusqueda}
          seleccionado={form.medicamentoSeleccionado}
          onSeleccionar={seleccionarMedicamento}
          dosis={form.dosis}
          onDosis={(v) => actualizarCampo("dosis", v)}
          errors={errors}
        />
      </div>

      {/* CTA full width */}
      <div className="mt-5">
        <Button
          onClick={confirmar}
          size="lg"
          className="w-full h-13 text-sm font-semibold text-white rounded-2xl shadow-lg border-0"
          style={{ background: "linear-gradient(135deg, #c2185b, #e91e63)" }}
        >
          <ClipboardCheck className="w-4 h-4 mr-2" />
          Revisar y confirmar receta
        </Button>
      </div>

      <ConfirmDialog
        open={dialogAbierto}
        onClose={() => setDialogAbierto(false)}
        onConfirm={guardar}
        guardando={guardando}
        form={form}
      />
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Medicamento } from "@/models/Medicamento";
import { Receta, ItemReceta } from "@/models/Receta";
import { MedicamentoRepository } from "@/repositories/MedicamentoRepository";
import { PrescriptionService, RecetaInput } from "@/services/PrescriptionService";

const repo = new MedicamentoRepository();
const service = new PrescriptionService();

export interface FormState {
  paciente: string;
  medico: string;
  medicamentoSeleccionado: Medicamento | null;
  dosis: string;
  frecuencia: string;
  duracion: string;
  notas: string;
}

const FORM_INICIAL: FormState = {
  paciente: "",
  medico: "",
  medicamentoSeleccionado: null,
  dosis: "",
  frecuencia: "",
  duracion: "",
  notas: "",
};

export function usePrescription() {
  const [form, setForm] = useState<FormState>(FORM_INICIAL);
  const [busqueda, setBusqueda] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dialogAbierto, setDialogAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [recetaGuardada, setRecetaGuardada] = useState<Receta | null>(null);

  const medicamentos = useMemo(() => repo.getAll(), []);
  const resultadosBusqueda = useMemo(
    () => (busqueda.length > 0 ? repo.search(busqueda) : medicamentos),
    [busqueda, medicamentos]
  );

  const actualizarCampo = <K extends keyof FormState>(
    campo: K,
    valor: FormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    if (errors[campo]) setErrors((prev) => ({ ...prev, [campo]: "" }));
  };

  const seleccionarMedicamento = (med: Medicamento) => {
    setForm((prev) => ({
      ...prev,
      medicamentoSeleccionado: med,
      dosis: "",
    }));
    setBusqueda("");
    setErrors((prev) => ({ ...prev, medicamento: "" }));
  };

  const buildItem = (): ItemReceta => ({
    medicamento: form.medicamentoSeleccionado?.nombre ?? "",
    medicamentoId: form.medicamentoSeleccionado?.id ?? "",
    dosis: form.dosis,
    frecuencia: form.frecuencia,
    duracion: form.duracion,
    notas: form.notas,
  });

  const confirmar = () => {
    const input: RecetaInput = {
      paciente: form.paciente,
      medico: form.medico,
      item: buildItem(),
    };
    const result = service.validate(input);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setDialogAbierto(true);
  };

  const guardar = async () => {
    setGuardando(true);
    const input: RecetaInput = {
      paciente: form.paciente,
      medico: form.medico,
      item: buildItem(),
    };
    const receta = service.create(input);
    const guardada = await service.save(receta);
    setRecetaGuardada(guardada);
    setGuardando(false);
    setDialogAbierto(false);
    setForm(FORM_INICIAL);
  };

  const resetear = () => {
    setRecetaGuardada(null);
    setErrors({});
  };

  return {
    form,
    busqueda,
    setBusqueda,
    errors,
    dialogAbierto,
    setDialogAbierto,
    guardando,
    recetaGuardada,
    medicamentos,
    resultadosBusqueda,
    actualizarCampo,
    seleccionarMedicamento,
    confirmar,
    guardar,
    resetear,
  };
}

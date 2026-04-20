import { Receta, ItemReceta } from "@/models/Receta";

export interface RecetaInput {
  paciente: string;
  medico: string;
  item: ItemReceta;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export class PrescriptionService {
  validate(input: RecetaInput): ValidationResult {
    const errors: Record<string, string> = {};

    if (!input.paciente.trim())
      errors.paciente = "El nombre del paciente es requerido";

    if (!input.medico.trim())
      errors.medico = "El nombre del médico es requerido";

    if (!input.item.medicamentoId)
      errors.medicamento = "Debe seleccionar un medicamento";

    if (!input.item.dosis)
      errors.dosis = "Debe seleccionar una dosis";

    if (!input.item.frecuencia.trim())
      errors.frecuencia = "La frecuencia es requerida";

    if (!input.item.duracion.trim())
      errors.duracion = "La duración es requerida";

    return { valid: Object.keys(errors).length === 0, errors };
  }

  create(input: RecetaInput): Receta {
    return {
      id: crypto.randomUUID(),
      paciente: input.paciente,
      medico: input.medico,
      fecha: new Date().toISOString(),
      items: [input.item],
      estado: "confirmada",
    };
  }

  async save(receta: Receta): Promise<Receta> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { ...receta, estado: "guardada" };
  }
}

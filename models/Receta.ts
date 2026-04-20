export type EstadoReceta = "pendiente" | "confirmada" | "guardada";

export interface ItemReceta {
  medicamento: string;
  medicamentoId: string;
  dosis: string;
  frecuencia: string;
  duracion: string;
  notas: string;
}

export interface Receta {
  id: string;
  paciente: string;
  medico: string;
  fecha: string;
  items: ItemReceta[];
  estado: EstadoReceta;
}

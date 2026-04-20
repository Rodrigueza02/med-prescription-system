import { Medicamento } from "@/models/Medicamento";

const MEDICAMENTOS: Medicamento[] = [
  {
    id: "1",
    nombre: "Amoxicilina",
    descripcion: "Antibiótico de amplio espectro",
    dosisDisponibles: ["250mg", "500mg", "875mg"],
    categoria: "Antibiótico",
  },
  {
    id: "2",
    nombre: "Ibuprofeno",
    descripcion: "Antiinflamatorio no esteroideo",
    dosisDisponibles: ["200mg", "400mg", "600mg", "800mg"],
    categoria: "Analgésico",
  },
  {
    id: "3",
    nombre: "Paracetamol",
    descripcion: "Analgésico y antipirético",
    dosisDisponibles: ["325mg", "500mg", "1000mg"],
    categoria: "Analgésico",
  },
  {
    id: "4",
    nombre: "Omeprazol",
    descripcion: "Inhibidor de la bomba de protones",
    dosisDisponibles: ["10mg", "20mg", "40mg"],
    categoria: "Gastrointestinal",
  },
  {
    id: "5",
    nombre: "Metformina",
    descripcion: "Antidiabético oral biguanida",
    dosisDisponibles: ["500mg", "850mg", "1000mg"],
    categoria: "Antidiabético",
  },
  {
    id: "6",
    nombre: "Losartán",
    descripcion: "Antagonista del receptor de angiotensina II",
    dosisDisponibles: ["25mg", "50mg", "100mg"],
    categoria: "Antihipertensivo",
  },
  {
    id: "7",
    nombre: "Atorvastatina",
    descripcion: "Inhibidor de la HMG-CoA reductasa",
    dosisDisponibles: ["10mg", "20mg", "40mg", "80mg"],
    categoria: "Hipolipemiante",
  },
  {
    id: "8",
    nombre: "Azitromicina",
    descripcion: "Antibiótico macrólido de amplio espectro",
    dosisDisponibles: ["250mg", "500mg"],
    categoria: "Antibiótico",
  },
  {
    id: "9",
    nombre: "Salbutamol",
    descripcion: "Broncodilatador agonista beta-2",
    dosisDisponibles: ["2mg", "4mg", "100mcg"],
    categoria: "Broncodilatador",
  },
  {
    id: "10",
    nombre: "Diclofenaco",
    descripcion: "Antiinflamatorio no esteroideo",
    dosisDisponibles: ["25mg", "50mg", "75mg", "100mg"],
    categoria: "Analgésico",
  },
  {
    id: "11",
    nombre: "Ciprofloxacino",
    descripcion: "Antibiótico fluoroquinolona",
    dosisDisponibles: ["250mg", "500mg", "750mg"],
    categoria: "Antibiótico",
  },
  {
    id: "12",
    nombre: "Levotiroxina",
    descripcion: "Hormona tiroidea sintética",
    dosisDisponibles: ["25mcg", "50mcg", "75mcg", "100mcg"],
    categoria: "Hormonal",
  },
];

export class MedicamentoRepository {
  getAll(): Medicamento[] {
    return MEDICAMENTOS;
  }

  findById(id: string): Medicamento | undefined {
    return MEDICAMENTOS.find((m) => m.id === id);
  }

  search(query: string): Medicamento[] {
    const q = query.toLowerCase();
    return MEDICAMENTOS.filter(
      (m) =>
        m.nombre.toLowerCase().includes(q) ||
        m.categoria.toLowerCase().includes(q)
    );
  }
}

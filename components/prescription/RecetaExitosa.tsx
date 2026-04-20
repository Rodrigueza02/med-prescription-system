"use client";

import { Receta } from "@/models/Receta";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Plus } from "lucide-react";

interface Props {
  receta: Receta;
  onNuevaReceta: () => void;
}

export function RecetaExitosa({ receta, onNuevaReceta }: Props) {
  const item = receta.items[0];
  const fecha = new Date(receta.fecha).toLocaleDateString("es-CO", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #fce4ec",
        borderRadius: "1.25rem",
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(194,24,91,0.08)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #c2185b 0%, #e91e63 100%)",
          padding: "1.25rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: 44, height: 44, borderRadius: "0.875rem",
            background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <CheckCircle2 style={{ width: 22, height: 22, color: "#ffffff" }} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>
            Receta guardada exitosamente
          </p>
          <p style={{ color: "#fce4ec", fontSize: "0.75rem", margin: "2px 0 0" }}>{fecha}</p>
        </div>
        <span
          style={{
            background: "rgba(255,255,255,0.2)",
            color: "#ffffff",
            fontSize: "0.7rem",
            fontFamily: "monospace",
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: "0.5rem",
            flexShrink: 0,
          }}
        >
          #{receta.id.slice(0, 8).toUpperCase()}
        </span>
      </div>

      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Paciente */}
        <div>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", color: "#c2185b", textTransform: "uppercase", marginBottom: "0.625rem" }}>
            Paciente
          </p>
          <div
            style={{
              background: "#fff5f8",
              border: "1px solid #fce4ec",
              borderRadius: "0.875rem",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <InfoRow label="Nombre" value={receta.paciente} />
            <InfoRow label="Médico" value={receta.medico} />
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#fce4ec" }} />

        {/* Prescripción */}
        <div>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", color: "#c2185b", textTransform: "uppercase", marginBottom: "0.625rem" }}>
            Prescripción
          </p>
          <div
            style={{
              background: "#fff5f8",
              border: "1px solid #fce4ec",
              borderRadius: "0.875rem",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
            }}
          >
            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a1a2e", margin: 0 }}>
              {item.medicamento}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
              {[
                { label: "Dosis", value: item.dosis },
                { label: "Frecuencia", value: item.frecuencia },
                { label: "Duración", value: item.duracion },
              ].map((i) => (
                <div
                  key={i.label}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #fce4ec",
                    borderRadius: "0.75rem",
                    padding: "0.625rem",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontSize: "0.7rem", color: "#9e6b7e", margin: 0 }}>{i.label}</p>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1a1a2e", margin: "2px 0 0" }}>{i.value}</p>
                </div>
              ))}
            </div>
            {item.notas && (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#9e6b7e",
                  background: "#ffffff",
                  border: "1px solid #fce4ec",
                  borderRadius: "0.75rem",
                  padding: "0.625rem 0.875rem",
                  margin: 0,
                }}
              >
                {item.notas}
              </p>
            )}
          </div>
        </div>

        <Button
          onClick={onNuevaReceta}
          style={{
            background: "linear-gradient(135deg, #c2185b 0%, #e91e63 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "0.875rem",
            height: "2.75rem",
            fontWeight: 600,
            fontSize: "0.875rem",
            width: "100%",
            cursor: "pointer",
          }}
        >
          <Plus style={{ width: 16, height: 16, marginRight: 8 }} />
          Crear nueva receta
        </Button>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
      <span style={{ color: "#9e6b7e" }}>{label}</span>
      <span style={{ fontWeight: 500, color: "#1a1a2e" }}>{value}</span>
    </div>
  );
}

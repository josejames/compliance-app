/**
 * RiskSheet – Side sheet for creating / editing a risk entry.
 */
import React from "react"
import { ShieldAlertIcon } from "lucide-react"
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from "./form-sheet"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { SelectNative } from "~/components/ui/select-native"

export interface RiskSheetProps {
  trigger: React.ReactNode
  /** If provided, pre-fills the form for editing. */
  defaultValues?: Partial<RiskFormValues>
  onSubmit?: (values: RiskFormValues) => void
}

export interface RiskFormValues {
  title: string
  category: string
  description: string
  impact: string
  probability: string
  treatment: string
  owner: string
  status: string
  frameworks: string
}

const CATEGORIES = [
  "Seguridad TI",
  "Privacidad",
  "Continuidad",
  "Operacional",
  "Cumplimiento",
  "Legal",
  "Gobernanza",
  "Financiero",
  "Reputacional",
]

const TREATMENTS = [
  { value: "mitigate", label: "Mitigar" },
  { value: "accept", label: "Aceptar" },
  { value: "transfer", label: "Transferir" },
  { value: "avoid", label: "Evitar" },
]

const STATUSES = [
  { value: "open", label: "Abierto" },
  { value: "in-treatment", label: "En tratamiento" },
  { value: "accepted", label: "Aceptado" },
  { value: "closed", label: "Cerrado" },
]

export function RiskSheet({ trigger, defaultValues, onSubmit }: RiskSheetProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const values: RiskFormValues = {
      title: fd.get("title") as string,
      category: fd.get("category") as string,
      description: fd.get("description") as string,
      impact: fd.get("impact") as string,
      probability: fd.get("probability") as string,
      treatment: fd.get("treatment") as string,
      owner: fd.get("owner") as string,
      status: fd.get("status") as string,
      frameworks: fd.get("frameworks") as string,
    }
    onSubmit?.(values)
  }

  return (
    <FormSheet
      trigger={trigger}
      title={defaultValues ? "Editar Riesgo" : "Nuevo Riesgo"}
      description="Registre un nuevo riesgo identificado en la organización."
      submitLabel={defaultValues ? "Actualizar" : "Registrar Riesgo"}
      icon={<ShieldAlertIcon className="size-4" />}
      accentClass="bg-red-500"
      onSubmit={handleSubmit}
    >
      <SheetSection title="Información General">
        <SheetField label="Título del riesgo" required>
          <Input
            name="title"
            placeholder="Ej. Acceso no autorizado a sistemas críticos"
            defaultValue={defaultValues?.title}
            required
          />
        </SheetField>

        <SheetFieldRow>
          <SheetField label="Categoría" required>
            <SelectNative name="category" defaultValue={defaultValues?.category}>
              <option value="">Seleccionar…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectNative>
          </SheetField>

          <SheetField label="Responsable" required>
            <Input
              name="owner"
              placeholder="Nombre del propietario"
              defaultValue={defaultValues?.owner}
              required
            />
          </SheetField>
        </SheetFieldRow>

        <SheetField label="Descripción">
          <Textarea
            name="description"
            placeholder="Describe el riesgo, su origen y posibles consecuencias…"
            defaultValue={defaultValues?.description}
            rows={3}
          />
        </SheetField>
      </SheetSection>

      <SheetSection title="Valoración">
        <SheetFieldRow>
          <SheetField
            label="Impacto (1–5)"
            required
            hint="5 = catastrófico, 1 = insignificante"
          >
            <SelectNative name="impact" defaultValue={defaultValues?.impact ?? "3"}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </SelectNative>
          </SheetField>

          <SheetField
            label="Probabilidad (1–5)"
            required
            hint="5 = casi seguro, 1 = raro"
          >
            <SelectNative name="probability" defaultValue={defaultValues?.probability ?? "3"}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </SelectNative>
          </SheetField>
        </SheetFieldRow>

        <SheetFieldRow>
          <SheetField label="Tratamiento" required>
            <SelectNative name="treatment" defaultValue={defaultValues?.treatment ?? "mitigate"}>
              {TREATMENTS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>

          <SheetField label="Estado">
            <SelectNative name="status" defaultValue={defaultValues?.status ?? "open"}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>
        </SheetFieldRow>
      </SheetSection>

      <SheetSection title="Marcos Normativos">
        <SheetField
          label="Marcos aplicables"
          hint="Separe múltiples marcos con comas (ej. ISO 27001, GDPR, PCI DSS)"
        >
          <Input
            name="frameworks"
            placeholder="ISO 27001, GDPR…"
            defaultValue={defaultValues?.frameworks}
          />
        </SheetField>
      </SheetSection>
    </FormSheet>
  )
}

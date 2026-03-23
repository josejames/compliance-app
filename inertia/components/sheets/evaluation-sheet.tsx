/**
 * EvaluationSheet – Side sheet for creating a new risk evaluation.
 */
import React from "react"
import { ClipboardListIcon } from "lucide-react"
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from "./form-sheet"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { SelectNative } from "~/components/ui/select-native"

export interface EvaluationSheetProps {
  trigger: React.ReactNode
  defaultValues?: Partial<EvaluationFormValues>
  onSubmit?: (values: EvaluationFormValues) => void
}

export interface EvaluationFormValues {
  title: string
  scope: string
  scopeTarget: string
  framework: string
  owner: string
  startDate: string
  endDate: string
  notes: string
}

const SCOPE_OPTIONS = [
  { value: "project", label: "Proyecto" },
  { value: "area", label: "Área / Departamento" },
  { value: "asset", label: "Activo / Sistema" },
]

const FRAMEWORKS = [
  "ISO 27001",
  "GDPR / LFPDPPP",
  "SOC 2",
  "PCI DSS",
  "NIS2",
  "MAAGTICSI",
  "NOM-035-STPS",
  "ISO 9001",
  "NIST CSF",
  "Personalizado",
]

export function EvaluationSheet({
  trigger,
  defaultValues,
  onSubmit,
}: EvaluationSheetProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    onSubmit?.({
      title: fd.get("title") as string,
      scope: fd.get("scope") as string,
      scopeTarget: fd.get("scopeTarget") as string,
      framework: fd.get("framework") as string,
      owner: fd.get("owner") as string,
      startDate: fd.get("startDate") as string,
      endDate: fd.get("endDate") as string,
      notes: fd.get("notes") as string,
    })
  }

  return (
    <FormSheet
      trigger={trigger}
      title="Nueva Evaluación de Riesgo"
      description="Define el alcance, responsable y calendario de la evaluación."
      submitLabel="Crear Evaluación"
      icon={<ClipboardListIcon className="size-4" />}
      accentClass="bg-blue-500"
      onSubmit={handleSubmit}
    >
      <SheetSection title="Información General">
        <SheetField label="Título de la evaluación" required>
          <Input
            name="title"
            placeholder="Ej. Evaluación infraestructura cloud Q2 2026"
            defaultValue={defaultValues?.title}
            required
          />
        </SheetField>

        <SheetFieldRow>
          <SheetField label="Tipo de alcance" required>
            <SelectNative name="scope" defaultValue={defaultValues?.scope ?? "area"}>
              {SCOPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>

          <SheetField label="Marco normativo" required>
            <SelectNative name="framework" defaultValue={defaultValues?.framework}>
              <option value="">Seleccionar…</option>
              {FRAMEWORKS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </SelectNative>
          </SheetField>
        </SheetFieldRow>

        <SheetField label="Objetivo del alcance" required hint="Nombre del proyecto, área o activo a evaluar">
          <Input
            name="scopeTarget"
            placeholder="Ej. Departamento Legal, Portal de clientes…"
            defaultValue={defaultValues?.scopeTarget}
            required
          />
        </SheetField>

        <SheetField label="Responsable" required>
          <Input
            name="owner"
            placeholder="Nombre del responsable"
            defaultValue={defaultValues?.owner}
            required
          />
        </SheetField>
      </SheetSection>

      <SheetSection title="Calendario">
        <SheetFieldRow>
          <SheetField label="Fecha de inicio" required>
            <Input
              name="startDate"
              type="date"
              defaultValue={defaultValues?.startDate}
              required
            />
          </SheetField>

          <SheetField label="Fecha de fin estimada" required>
            <Input
              name="endDate"
              type="date"
              defaultValue={defaultValues?.endDate}
              required
            />
          </SheetField>
        </SheetFieldRow>
      </SheetSection>

      <SheetSection title="Notas">
        <SheetField label="Notas adicionales">
          <Textarea
            name="notes"
            placeholder="Contexto, requisitos previos o instrucciones especiales…"
            defaultValue={defaultValues?.notes}
            rows={3}
          />
        </SheetField>
      </SheetSection>
    </FormSheet>
  )
}

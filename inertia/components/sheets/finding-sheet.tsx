/**
 * FindingSheet – Side sheet for registering an audit finding (non-conformity,
 * observation, or improvement opportunity).
 */
import React from "react"
import { AlertTriangleIcon } from "lucide-react"
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from "./form-sheet"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { SelectNative } from "~/components/ui/select-native"

export interface FindingSheetProps {
  trigger: React.ReactNode
  defaultValues?: Partial<FindingFormValues>
  onSubmit?: (values: FindingFormValues) => void
}

export interface FindingFormValues {
  title: string
  auditRef: string
  type: string
  severity: string
  description: string
  rootCause: string
  owner: string
  dueDate: string
  controlRef: string
  evidenceRef: string
}

const FINDING_TYPES = [
  { value: "nonconformity", label: "No Conformidad" },
  { value: "observation", label: "Observación" },
  { value: "improvement", label: "Oportunidad de Mejora" },
]

const SEVERITIES = [
  { value: "critical", label: "Crítica" },
  { value: "major", label: "Mayor" },
  { value: "minor", label: "Menor" },
  { value: "info", label: "Informativa" },
]

export function FindingSheet({
  trigger,
  defaultValues,
  onSubmit,
}: FindingSheetProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    onSubmit?.({
      title: fd.get("title") as string,
      auditRef: fd.get("auditRef") as string,
      type: fd.get("type") as string,
      severity: fd.get("severity") as string,
      description: fd.get("description") as string,
      rootCause: fd.get("rootCause") as string,
      owner: fd.get("owner") as string,
      dueDate: fd.get("dueDate") as string,
      controlRef: fd.get("controlRef") as string,
      evidenceRef: fd.get("evidenceRef") as string,
    })
  }

  return (
    <FormSheet
      trigger={trigger}
      title={defaultValues ? "Editar Hallazgo" : "Nuevo Hallazgo"}
      description="Registre una no conformidad, observación u oportunidad de mejora detectada en auditoría."
      submitLabel={defaultValues ? "Actualizar" : "Registrar Hallazgo"}
      icon={<AlertTriangleIcon className="size-4" />}
      accentClass="bg-orange-500"
      onSubmit={handleSubmit}
    >
      <SheetSection title="Identificación del Hallazgo">
        <SheetField label="Título" required>
          <Input
            name="title"
            placeholder="Ej. Ausencia de MFA en accesos privilegiados"
            defaultValue={defaultValues?.title}
            required
          />
        </SheetField>

        <SheetFieldRow>
          <SheetField label="Tipo" required>
            <SelectNative name="type" defaultValue={defaultValues?.type ?? "nonconformity"}>
              {FINDING_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>

          <SheetField label="Severidad" required>
            <SelectNative name="severity" defaultValue={defaultValues?.severity ?? "minor"}>
              {SEVERITIES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>
        </SheetFieldRow>

        <SheetField label="ID de auditoría relacionada" hint="Referencia a la auditoría de origen (ej. AUD-2026-02)">
          <Input
            name="auditRef"
            placeholder="AUD-2026-02"
            defaultValue={defaultValues?.auditRef}
          />
        </SheetField>
      </SheetSection>

      <SheetSection title="Descripción y Causa Raíz">
        <SheetField label="Descripción del hallazgo" required>
          <Textarea
            name="description"
            placeholder="Describe la evidencia observada, el requisito incumplido y el impacto potencial…"
            defaultValue={defaultValues?.description}
            rows={3}
            required
          />
        </SheetField>

        <SheetField label="Causa raíz">
          <Textarea
            name="rootCause"
            placeholder="¿Qué proceso, control o comportamiento origina este hallazgo?…"
            defaultValue={defaultValues?.rootCause}
            rows={2}
          />
        </SheetField>
      </SheetSection>

      <SheetSection title="Plan de Acción">
        <SheetFieldRow>
          <SheetField label="Responsable del cierre" required>
            <Input
              name="owner"
              placeholder="Nombre del responsable"
              defaultValue={defaultValues?.owner}
              required
            />
          </SheetField>

          <SheetField label="Fecha límite de cierre" required>
            <Input
              name="dueDate"
              type="date"
              defaultValue={defaultValues?.dueDate}
              required
            />
          </SheetField>
        </SheetFieldRow>

        <SheetFieldRow>
          <SheetField label="Control relacionado" hint="Ej. CTL-001, ISO A.9.4">
            <Input
              name="controlRef"
              placeholder="CTL-001"
              defaultValue={defaultValues?.controlRef}
            />
          </SheetField>

          <SheetField label="Referencia de evidencia">
            <Input
              name="evidenceRef"
              placeholder="EVI-042"
              defaultValue={defaultValues?.evidenceRef}
            />
          </SheetField>
        </SheetFieldRow>
      </SheetSection>
    </FormSheet>
  )
}

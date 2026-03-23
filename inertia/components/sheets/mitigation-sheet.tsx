/**
 * MitigationSheet – Side sheet for creating a mitigation action linked to a risk.
 */
import React from "react"
import { TrendingDownIcon } from "lucide-react"
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from "./form-sheet"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { SelectNative } from "~/components/ui/select-native"

export interface MitigationSheetProps {
  trigger: React.ReactNode
  defaultValues?: Partial<MitigationFormValues>
  onSubmit?: (values: MitigationFormValues) => void
}

export interface MitigationFormValues {
  action: string
  description: string
  riskRef: string
  owner: string
  dueDate: string
  residualLevel: string
  linkedTaskId: string
  notes: string
}

const RESIDUAL_LEVELS = [
  { value: "critical", label: "Crítico" },
  { value: "high", label: "Alto" },
  { value: "medium", label: "Medio" },
  { value: "low", label: "Bajo" },
]

export function MitigationSheet({
  trigger,
  defaultValues,
  onSubmit,
}: MitigationSheetProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    onSubmit?.({
      action: fd.get("action") as string,
      description: fd.get("description") as string,
      riskRef: fd.get("riskRef") as string,
      owner: fd.get("owner") as string,
      dueDate: fd.get("dueDate") as string,
      residualLevel: fd.get("residualLevel") as string,
      linkedTaskId: fd.get("linkedTaskId") as string,
      notes: fd.get("notes") as string,
    })
  }

  return (
    <FormSheet
      trigger={trigger}
      title="Nueva Acción de Mitigación"
      description="Define una acción concreta para reducir la exposición de un riesgo identificado."
      submitLabel="Crear Acción"
      icon={<TrendingDownIcon className="size-4" />}
      accentClass="bg-emerald-500"
      onSubmit={handleSubmit}
    >
      <SheetSection title="Acción">
        <SheetField label="Título de la acción" required>
          <Input
            name="action"
            placeholder="Ej. Implementar MFA en todos los sistemas críticos"
            defaultValue={defaultValues?.action}
            required
          />
        </SheetField>

        <SheetField label="Descripción detallada">
          <Textarea
            name="description"
            placeholder="Describe los pasos concretos a realizar para ejecutar esta acción…"
            defaultValue={defaultValues?.description}
            rows={3}
          />
        </SheetField>
      </SheetSection>

      <SheetSection title="Riesgo y Resultado Esperado">
        <SheetField label="ID del riesgo asociado" hint="Referencia al riesgo del registro (ej. RSK-001)">
          <Input
            name="riskRef"
            placeholder="RSK-001"
            defaultValue={defaultValues?.riskRef}
          />
        </SheetField>

        <SheetField label="Nivel de riesgo residual esperado" required>
          <SelectNative name="residualLevel" defaultValue={defaultValues?.residualLevel ?? "medium"}>
            {RESIDUAL_LEVELS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </SelectNative>
        </SheetField>
      </SheetSection>

      <SheetSection title="Responsable y Plazo">
        <SheetFieldRow>
          <SheetField label="Responsable" required>
            <Input
              name="owner"
              placeholder="Nombre del responsable"
              defaultValue={defaultValues?.owner}
              required
            />
          </SheetField>

          <SheetField label="Fecha límite" required>
            <Input
              name="dueDate"
              type="date"
              defaultValue={defaultValues?.dueDate}
              required
            />
          </SheetField>
        </SheetFieldRow>

        <SheetField label="Tarea vinculada" hint="ID de tarea relacionada en el módulo de tareas (ej. TSK-045)">
          <Input
            name="linkedTaskId"
            placeholder="TSK-045"
            defaultValue={defaultValues?.linkedTaskId}
          />
        </SheetField>
      </SheetSection>

      <SheetSection title="Notas">
        <SheetField label="Notas adicionales">
          <Textarea
            name="notes"
            placeholder="Recursos necesarios, dependencias, restricciones…"
            defaultValue={defaultValues?.notes}
            rows={2}
          />
        </SheetField>
      </SheetSection>
    </FormSheet>
  )
}

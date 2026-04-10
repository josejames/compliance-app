/**
 * MitigationSheet – Side sheet for creating / editing a mitigation action linked to a risk.
 */
import React from 'react'
import { router, usePage } from '@inertiajs/react'
import { TrendingDownIcon } from 'lucide-react'
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from './form-sheet'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { SelectNative } from '~/components/ui/select-native'
import { type Data } from '@generated/data'

export interface MitigationSheetProps {
  trigger: React.ReactNode
  mitigationId?: number
  defaultValues?: Partial<MitigationFormValues>
  risks?: Data.Risk[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface MitigationFormValues {
  action: string
  description: string
  riskId: string
  owner: string
  dueDate: string
  status: string
  residualLevel: string
  residualScore: string
  linkedTaskId: string
  notes: string
}

const RESIDUAL_LEVELS = [
  { value: 'critical', label: 'Crítico' },
  { value: 'high', label: 'Alto' },
  { value: 'medium', label: 'Medio' },
  { value: 'low', label: 'Bajo' },
]

const STATUSES = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'in-progress', label: 'En curso' },
  { value: 'completed', label: 'Completada' },
  { value: 'overdue', label: 'Vencida' },
]

export function MitigationSheet({
  trigger,
  mitigationId,
  defaultValues,
  risks,
  open,
  onOpenChange,
}: MitigationSheetProps) {
  const isEditMode = mitigationId !== undefined

  const [internalOpen, setInternalOpen] = React.useState(false)
  const controlledOpen = open !== undefined ? open : internalOpen
  const handleOpenChange = (o: boolean) => {
    setInternalOpen(o)
    onOpenChange?.(o)
  }

  const { errors } = usePage<{ errors: Record<string, string> }>().props

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = {
      riskId: Number(fd.get('riskId')),
      action: fd.get('action') as string,
      description: fd.get('description') as string,
      owner: fd.get('owner') as string,
      dueDate: fd.get('dueDate') as string,
      status: fd.get('status') as string,
      progress: Number(fd.get('progress') || 0),
      residualLevel: fd.get('residualLevel') as string,
      residualScore: Number(fd.get('residualScore') || 0),
      linkedTaskId: fd.get('linkedTaskId') as string,
      notes: fd.get('notes') as string,
    }

    if (isEditMode) {
      router.put(`/riesgos/mitigacion/${mitigationId}`, data, {
        onSuccess: () => handleOpenChange(false),
      })
    } else {
      router.post('/riesgos/mitigacion', data, {
        onSuccess: () => handleOpenChange(false),
      })
    }
  }

  return (
    <FormSheet
      trigger={trigger}
      title={isEditMode ? 'Editar Acción' : 'Nueva Acción de Mitigación'}
      description="Define una acción concreta para reducir la exposición de un riesgo identificado."
      submitLabel={isEditMode ? 'Actualizar' : 'Crear Acción'}
      icon={<TrendingDownIcon className="size-4" />}
      accentClass="bg-emerald-500"
      open={controlledOpen}
      onOpenChange={handleOpenChange}
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
          {errors?.action && <p className="text-xs text-destructive mt-1">{errors.action}</p>}
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
        <SheetField label="Riesgo asociado" required>
          {risks && risks.length > 0 ? (
            <SelectNative name="riskId" defaultValue={defaultValues?.riskId}>
              <option value="">Seleccionar riesgo…</option>
              {risks.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.code} — {r.title}
                </option>
              ))}
            </SelectNative>
          ) : (
            <Input
              name="riskId"
              type="number"
              placeholder="ID del riesgo"
              defaultValue={defaultValues?.riskId}
              required
            />
          )}
          {errors?.riskId && <p className="text-xs text-destructive mt-1">{errors.riskId}</p>}
        </SheetField>

        <SheetFieldRow>
          <SheetField label="Nivel residual esperado" required>
            <SelectNative name="residualLevel" defaultValue={defaultValues?.residualLevel ?? 'medium'}>
              {RESIDUAL_LEVELS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>

          <SheetField label="Score residual (0-25)">
            <Input
              name="residualScore"
              type="number"
              min="0"
              max="25"
              defaultValue={defaultValues?.residualScore ?? '0'}
            />
          </SheetField>
        </SheetFieldRow>
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

        <SheetFieldRow>
          <SheetField label="Estado">
            <SelectNative name="status" defaultValue={defaultValues?.status ?? 'pending'}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>

          <SheetField label="Progreso (%)">
            <Input
              name="progress"
              type="number"
              min="0"
              max="100"
              defaultValue={defaultValues?.dueDate ?? '0'}
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

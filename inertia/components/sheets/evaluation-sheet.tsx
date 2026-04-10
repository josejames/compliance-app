/**
 * EvaluationSheet – Side sheet for creating / editing a risk evaluation.
 */
import React from 'react'
import { router, usePage } from '@inertiajs/react'
import { ClipboardListIcon } from 'lucide-react'
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from './form-sheet'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { SelectNative } from '~/components/ui/select-native'

export interface EvaluationSheetProps {
  trigger: React.ReactNode
  evaluationId?: number
  defaultValues?: Partial<EvaluationFormValues>
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface EvaluationFormValues {
  title: string
  scope: string
  scopeTarget: string
  framework: string
  status: string
  owner: string
  startDate: string
  endDate: string
  questionsTotal: string
  notes: string
}

const SCOPE_OPTIONS = [
  { value: 'project', label: 'Proyecto' },
  { value: 'area', label: 'Área / Departamento' },
  { value: 'asset', label: 'Activo / Sistema' },
]

const STATUS_OPTIONS = [
  { value: 'scheduled', label: 'Programada' },
  { value: 'in-progress', label: 'En curso' },
  { value: 'completed', label: 'Completada' },
]

const RISK_LEVELS = [
  { value: 'low', label: 'Bajo' },
  { value: 'medium', label: 'Medio' },
  { value: 'high', label: 'Alto' },
  { value: 'critical', label: 'Crítico' },
]

export function EvaluationSheet({
  trigger,
  evaluationId,
  defaultValues,
  open,
  onOpenChange,
}: EvaluationSheetProps) {
  const isEditMode = evaluationId !== undefined

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
      title: fd.get('title') as string,
      scope: fd.get('scope') as string,
      scopeTarget: fd.get('scopeTarget') as string,
      framework: fd.get('framework') as string,
      status: fd.get('status') as string,
      progress: Number(fd.get('progress') || 0),
      risksFound: Number(fd.get('risksFound') || 0),
      riskLevel: fd.get('riskLevel') as string,
      owner: fd.get('owner') as string,
      questionsTotal: Number(fd.get('questionsTotal') || 0),
      questionsAnswered: Number(fd.get('questionsAnswered') || 0),
      notes: fd.get('notes') as string,
      startDate: fd.get('startDate') as string,
      endDate: fd.get('endDate') as string,
    }

    if (isEditMode) {
      router.put(`/riesgos/evaluacion/${evaluationId}`, data, {
        onSuccess: () => handleOpenChange(false),
      })
    } else {
      router.post('/riesgos/evaluacion', data, {
        onSuccess: () => handleOpenChange(false),
      })
    }
  }

  return (
    <FormSheet
      trigger={trigger}
      title={isEditMode ? 'Editar Evaluación' : 'Nueva Evaluación de Riesgo'}
      description="Define el alcance, responsable y calendario de la evaluación."
      submitLabel={isEditMode ? 'Actualizar' : 'Crear Evaluación'}
      icon={<ClipboardListIcon className="size-4" />}
      accentClass="bg-blue-500"
      open={controlledOpen}
      onOpenChange={handleOpenChange}
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
          {errors?.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
        </SheetField>

        <SheetFieldRow>
          <SheetField label="Tipo de alcance" required>
            <SelectNative name="scope" defaultValue={defaultValues?.scope ?? 'area'}>
              {SCOPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>

          <SheetField label="Estado" required>
            <SelectNative name="status" defaultValue={defaultValues?.status ?? 'scheduled'}>
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
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

        <SheetFieldRow>
          <SheetField label="Responsable" required>
            <Input
              name="owner"
              placeholder="Nombre del responsable"
              defaultValue={defaultValues?.owner}
              required
            />
          </SheetField>

          <SheetField label="Marco normativo">
            <Input
              name="framework"
              placeholder="Ej. ISO 27001, GDPR…"
              defaultValue={defaultValues?.framework}
            />
          </SheetField>
        </SheetFieldRow>
      </SheetSection>

      <SheetSection title="Métricas">
        <SheetFieldRow>
          <SheetField label="Nivel de riesgo">
            <SelectNative name="riskLevel" defaultValue={defaultValues?.scope ?? 'medium'}>
              {RISK_LEVELS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>

          <SheetField label="Preguntas totales">
            <Input
              name="questionsTotal"
              type="number"
              min="0"
              placeholder="0"
              defaultValue={defaultValues?.questionsTotal ?? '0'}
            />
          </SheetField>
        </SheetFieldRow>

        <input type="hidden" name="progress" value="0" />
        <input type="hidden" name="risksFound" value="0" />
        <input type="hidden" name="questionsAnswered" value="0" />
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

/**
 * RiskSheet – Side sheet for creating / editing a risk entry.
 */
import React from 'react'
import { router, usePage } from '@inertiajs/react'
import { ShieldAlertIcon } from 'lucide-react'
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from './form-sheet'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { SelectNative } from '~/components/ui/select-native'

export interface RiskSheetProps {
  trigger: React.ReactNode
  /** If provided, pre-fills the form for editing (edit mode). */
  riskId?: number
  defaultValues?: Partial<RiskFormValues>
  /** Controlled open state (managed by parent). */
  open?: boolean
  onOpenChange?: (open: boolean) => void
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
  'Seguridad TI',
  'Privacidad',
  'Continuidad',
  'Operacional',
  'Cumplimiento',
  'Legal',
  'Gobernanza',
  'Financiero',
  'Reputacional',
]

const TREATMENTS = [
  { value: 'mitigate', label: 'Mitigar' },
  { value: 'accept', label: 'Aceptar' },
  { value: 'transfer', label: 'Transferir' },
  { value: 'avoid', label: 'Evitar' },
]

const STATUSES = [
  { value: 'open', label: 'Abierto' },
  { value: 'in-treatment', label: 'En tratamiento' },
  { value: 'accepted', label: 'Aceptado' },
  { value: 'closed', label: 'Cerrado' },
]

export function RiskSheet({ trigger, riskId, defaultValues, open, onOpenChange }: RiskSheetProps) {
  const isEditMode = riskId !== undefined

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
      category: fd.get('category') as string,
      description: fd.get('description') as string,
      impact: fd.get('impact') as string,
      probability: fd.get('probability') as string,
      treatment: fd.get('treatment') as string,
      owner: fd.get('owner') as string,
      status: fd.get('status') as string,
      frameworks: fd.get('frameworks') as string,
    }

    if (isEditMode) {
      router.put(`/riesgos/${riskId}`, data, {
        onSuccess: () => handleOpenChange(false),
      })
    } else {
      router.post('/riesgos', data, {
        onSuccess: () => handleOpenChange(false),
      })
    }
  }

  return (
    <FormSheet
      trigger={trigger}
      title={isEditMode ? 'Editar Riesgo' : 'Nuevo Riesgo'}
      description="Registre un nuevo riesgo identificado en la organización."
      submitLabel={isEditMode ? 'Actualizar' : 'Registrar Riesgo'}
      icon={<ShieldAlertIcon className="size-4" />}
      accentClass="bg-red-500"
      open={controlledOpen}
      onOpenChange={handleOpenChange}
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
          {errors?.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
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
            {errors?.category && <p className="text-xs text-destructive mt-1">{errors.category}</p>}
          </SheetField>

          <SheetField label="Responsable" required>
            <Input
              name="owner"
              placeholder="Nombre del propietario"
              defaultValue={defaultValues?.owner}
              required
            />
            {errors?.owner && <p className="text-xs text-destructive mt-1">{errors.owner}</p>}
          </SheetField>
        </SheetFieldRow>

        <SheetField label="Descripción">
          <Textarea
            name="description"
            placeholder="Describe el riesgo, su origen y posibles consecuencias…"
            defaultValue={defaultValues?.description}
            rows={3}
          />
          {errors?.description && (
            <p className="text-xs text-destructive mt-1">{errors.description}</p>
          )}
        </SheetField>
      </SheetSection>

      <SheetSection title="Valoración">
        <SheetFieldRow>
          <SheetField label="Impacto (1–5)" required hint="5 = catastrófico, 1 = insignificante">
            <SelectNative name="impact" defaultValue={defaultValues?.impact ?? '3'}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </SelectNative>
            {errors?.impact && <p className="text-xs text-destructive mt-1">{errors.impact}</p>}
          </SheetField>

          <SheetField label="Probabilidad (1–5)" required hint="5 = casi seguro, 1 = raro">
            <SelectNative name="probability" defaultValue={defaultValues?.probability ?? '3'}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </SelectNative>
            {errors?.probability && (
              <p className="text-xs text-destructive mt-1">{errors.probability}</p>
            )}
          </SheetField>
        </SheetFieldRow>

        <SheetFieldRow>
          <SheetField label="Tratamiento" required>
            <SelectNative name="treatment" defaultValue={defaultValues?.treatment ?? 'mitigate'}>
              {TREATMENTS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </SelectNative>
            {errors?.treatment && (
              <p className="text-xs text-destructive mt-1">{errors.treatment}</p>
            )}
          </SheetField>

          <SheetField label="Estado">
            <SelectNative name="status" defaultValue={defaultValues?.status ?? 'open'}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </SelectNative>
            {errors?.status && <p className="text-xs text-destructive mt-1">{errors.status}</p>}
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
          {errors?.frameworks && (
            <p className="text-xs text-destructive mt-1">{errors.frameworks}</p>
          )}
        </SheetField>
      </SheetSection>
    </FormSheet>
  )
}

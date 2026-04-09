/**
 * ControlSheet – Side sheet for creating / editing an internal control.
 */
import React, { useState } from "react"
import { router } from "@inertiajs/react"
import { ShieldCheckIcon } from "lucide-react"
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from "./form-sheet"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { SelectNative } from "~/components/ui/select-native"

export interface ControlSheetProps {
  trigger?: React.ReactNode
  controlId?: number
  defaultValues?: Partial<ControlFormValues>
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface ControlFormValues {
  title: string
  description: string
  domain: string
  owner: string
  frequency: string
  status: string
  frameworks: string
  lastReviewedAt: string
  nextReviewAt: string
}

const DOMAINS = [
  "Seguridad de Acceso",
  "Protección de Datos",
  "Gestión de Incidentes",
  "Continuidad del Negocio",
  "Seguridad Física",
  "Gestión de Proveedores",
  "Cumplimiento Legal",
  "Auditoría y Logs",
  "Seguridad en el Desarrollo",
  "Gobernanza",
  "Infraestructura",
  "Monitorización",
  "Respuesta",
  "Continuidad",
  "Cadena de Suministro",
  "Personas",
]

const FREQUENCIES = [
  { value: "continuous", label: "Continua" },
  { value: "monthly", label: "Mensual" },
  { value: "quarterly", label: "Trimestral" },
  { value: "annual", label: "Anual" },
]

const STATUSES = [
  { value: "active", label: "Activo" },
  { value: "needs-review", label: "Requiere revisión" },
  { value: "overdue", label: "Vencido" },
  { value: "inactive", label: "Inactivo" },
]

export function ControlSheet({
  trigger,
  controlId,
  defaultValues,
  open,
  onOpenChange,
}: ControlSheetProps) {
  const isEditMode = controlId !== undefined

  const [controlledOpen, setControlledOpen] = useState(open ?? false)
  const effectiveOpen = open !== undefined ? open : controlledOpen
  const handleOpenChange = (val: boolean) => {
    setControlledOpen(val)
    onOpenChange?.(val)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    const payload = {
      title: fd.get("title") as string,
      description: (fd.get("description") as string) || undefined,
      domain: fd.get("domain") as string,
      owner: fd.get("owner") as string,
      frequency: fd.get("frequency") as string,
      status: fd.get("status") as string,
      frameworks: (fd.get("frameworks") as string) || undefined,
      lastReviewedAt: (fd.get("lastReviewedAt") as string) || undefined,
      nextReviewAt: (fd.get("nextReviewAt") as string) || undefined,
    }

    if (isEditMode) {
      router.put(`/normas-controles/catalogo/${controlId}`, payload, {
        onSuccess: () => handleOpenChange(false),
      })
    } else {
      router.post(`/normas-controles/catalogo`, payload, {
        onSuccess: () => handleOpenChange(false),
      })
    }
  }

  return (
    <FormSheet
      trigger={trigger}
      title={isEditMode ? "Editar Control" : "Nuevo Control Interno"}
      description={
        isEditMode
          ? "Modifica los datos del control interno. Los cambios se aplicarán de inmediato."
          : "Registra un nuevo control interno para tu organización."
      }
      submitLabel={isEditMode ? "Actualizar Control" : "Crear Control"}
      icon={<ShieldCheckIcon className="size-4" />}
      accentClass="bg-teal-500"
      open={effectiveOpen}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit}
    >
      <SheetSection title="Identificación">
        <SheetFieldRow>
          <SheetField label="Título del control" required>
            <Input
              name="title"
              placeholder="Ej. Política de Control de Acceso"
              defaultValue={defaultValues?.title}
              required
            />
          </SheetField>

          <SheetField label="Estado">
            <SelectNative name="status" defaultValue={defaultValues?.status ?? "active"}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>
        </SheetFieldRow>

        <SheetField label="Descripción">
          <Textarea
            name="description"
            placeholder="Describe el objetivo del control, su alcance y los requisitos que cubre…"
            defaultValue={defaultValues?.description}
            rows={3}
          />
        </SheetField>
      </SheetSection>

      <SheetSection title="Clasificación">
        <SheetFieldRow>
          <SheetField label="Dominio" required>
            <SelectNative name="domain" defaultValue={defaultValues?.domain}>
              <option value="">Seleccionar…</option>
              {DOMAINS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </SelectNative>
          </SheetField>

          <SheetField label="Frecuencia de revisión" required>
            <SelectNative name="frequency" defaultValue={defaultValues?.frequency ?? "quarterly"}>
              {FREQUENCIES.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>
        </SheetFieldRow>

        <SheetField label="Responsable" required>
          <Input
            name="owner"
            placeholder="Nombre del propietario del control"
            defaultValue={defaultValues?.owner}
            required
          />
        </SheetField>
      </SheetSection>

      <SheetSection title="Revisión">
        <SheetFieldRow>
          <SheetField label="Última revisión">
            <Input
              name="lastReviewedAt"
              type="date"
              defaultValue={defaultValues?.lastReviewedAt ?? ""}
            />
          </SheetField>

          <SheetField label="Próxima revisión">
            <Input
              name="nextReviewAt"
              type="date"
              defaultValue={defaultValues?.nextReviewAt ?? ""}
            />
          </SheetField>
        </SheetFieldRow>
      </SheetSection>

      <SheetSection title="Marcos Normativos">
        <SheetField
          label="Marcos aplicables"
          hint="Separe múltiples marcos con comas (ej. ISO 27001, SOC 2, PCI DSS)"
        >
          <Input
            name="frameworks"
            placeholder="ISO 27001, SOC 2…"
            defaultValue={defaultValues?.frameworks}
          />
        </SheetField>
      </SheetSection>
    </FormSheet>
  )
}

/**
 * ControlSheet – Side sheet for creating / editing an internal control.
 */
import React from "react"
import { ShieldCheckIcon } from "lucide-react"
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from "./form-sheet"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { SelectNative } from "~/components/ui/select-native"

export interface ControlSheetProps {
  trigger: React.ReactNode
  defaultValues?: Partial<ControlFormValues>
  onSubmit?: (values: ControlFormValues) => void
}

export interface ControlFormValues {
  code: string
  title: string
  description: string
  domain: string
  owner: string
  frequency: string
  status: string
  frameworks: string
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
  defaultValues,
  onSubmit,
}: ControlSheetProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    onSubmit?.({
      code: fd.get("code") as string,
      title: fd.get("title") as string,
      description: fd.get("description") as string,
      domain: fd.get("domain") as string,
      owner: fd.get("owner") as string,
      frequency: fd.get("frequency") as string,
      status: fd.get("status") as string,
      frameworks: fd.get("frameworks") as string,
    })
  }

  return (
    <FormSheet
      trigger={trigger}
      title={defaultValues ? "Editar Control" : "Nuevo Control Interno"}
      description="Defina un control de cumplimiento con su responsable y frecuencia de revisión."
      submitLabel={defaultValues ? "Actualizar Control" : "Crear Control"}
      icon={<ShieldCheckIcon className="size-4" />}
      accentClass="bg-teal-500"
      onSubmit={handleSubmit}
    >
      <SheetSection title="Identificación">
        <SheetFieldRow>
          <SheetField label="Código" required hint="Ej. CTL-015">
            <Input
              name="code"
              placeholder="CTL-015"
              defaultValue={defaultValues?.code}
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

        <SheetField label="Título del control" required>
          <Input
            name="title"
            placeholder="Ej. Política de Control de Acceso"
            defaultValue={defaultValues?.title}
            required
          />
        </SheetField>

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

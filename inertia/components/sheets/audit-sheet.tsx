/**
 * AuditSheet – Side sheet for planning a new audit.
 */
import React from "react"
import { ClipboardCheckIcon } from "lucide-react"
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from "./form-sheet"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { SelectNative } from "~/components/ui/select-native"

export interface AuditSheetProps {
  trigger: React.ReactNode
  defaultValues?: Partial<AuditFormValues>
  onSubmit?: (values: AuditFormValues) => void
}

export interface AuditFormValues {
  name: string
  framework: string
  type: string
  scope: string
  auditor: string
  team: string
  startDate: string
  endDate: string
  notes: string
}

const FRAMEWORKS = [
  "ISO 27001",
  "SOC 2",
  "PCI DSS",
  "GDPR / LFPDPPP",
  "NIS2",
  "ISO 9001",
  "MAAGTICSI",
  "NOM-035-STPS",
  "NIST CSF",
]

const AUDIT_TYPES = [
  { value: "internal", label: "Interna" },
  { value: "external", label: "Externa" },
]

export function AuditSheet({ trigger, defaultValues, onSubmit }: AuditSheetProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    onSubmit?.({
      name: fd.get("name") as string,
      framework: fd.get("framework") as string,
      type: fd.get("type") as string,
      scope: fd.get("scope") as string,
      auditor: fd.get("auditor") as string,
      team: fd.get("team") as string,
      startDate: fd.get("startDate") as string,
      endDate: fd.get("endDate") as string,
      notes: fd.get("notes") as string,
    })
  }

  return (
    <FormSheet
      trigger={trigger}
      title="Nueva Auditoría"
      description="Planifique una auditoría interna o externa con su alcance y calendario."
      submitLabel="Crear Auditoría"
      icon={<ClipboardCheckIcon className="size-4" />}
      accentClass="bg-amber-500"
      onSubmit={handleSubmit}
    >
      <SheetSection title="Información General">
        <SheetField label="Nombre de la auditoría" required>
          <Input
            name="name"
            placeholder="Ej. ISO 27001 Auditoría Interna Q2 2026"
            defaultValue={defaultValues?.name}
            required
          />
        </SheetField>

        <SheetFieldRow>
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

          <SheetField label="Tipo" required>
            <SelectNative name="type" defaultValue={defaultValues?.type ?? "internal"}>
              {AUDIT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>
        </SheetFieldRow>

        <SheetField label="Alcance" required hint="Área, sistema o proceso que cubre la auditoría">
          <Input
            name="scope"
            placeholder="Ej. Seguridad TI, Gestión de datos…"
            defaultValue={defaultValues?.scope}
            required
          />
        </SheetField>
      </SheetSection>

      <SheetSection title="Equipo Auditor">
        <SheetFieldRow>
          <SheetField label="Auditor responsable" required>
            <Input
              name="auditor"
              placeholder="Nombre o empresa auditora"
              defaultValue={defaultValues?.auditor}
              required
            />
          </SheetField>

          <SheetField label="Equipo interno" hint="Área de soporte interno">
            <Input
              name="team"
              placeholder="Ej. IT Security, Compliance"
              defaultValue={defaultValues?.team}
            />
          </SheetField>
        </SheetFieldRow>
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
            placeholder="Instrucciones especiales, documentos requeridos, accesos necesarios…"
            defaultValue={defaultValues?.notes}
            rows={3}
          />
        </SheetField>
      </SheetSection>
    </FormSheet>
  )
}

/**
 * PolicySheet – Side sheet for creating / editing a compliance policy or procedure.
 */
import React from "react"
import { FileTextIcon } from "lucide-react"
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from "./form-sheet"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { SelectNative } from "~/components/ui/select-native"

export interface PolicySheetProps {
  trigger: React.ReactNode
  defaultValues?: Partial<PolicyFormValues>
  onSubmit?: (values: PolicyFormValues) => void
}

export interface PolicyFormValues {
  title: string
  category: string
  description: string
  frameworks: string
  owner: string
  approvedBy: string
  effectiveDate: string
  reviewDate: string
  version: string
  status: string
}

const CATEGORIES = [
  "Seguridad TI",
  "Privacidad",
  "Accesos",
  "Continuidad",
  "Operaciones",
  "RRHH",
  "Legal",
  "Gobernanza",
]

const STATUSES = [
  { value: "draft", label: "Borrador" },
  { value: "active", label: "Activa" },
  { value: "review-due", label: "Revisión pendiente" },
  { value: "retired", label: "Retirada" },
]

export function PolicySheet({
  trigger,
  defaultValues,
  onSubmit,
}: PolicySheetProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    onSubmit?.({
      title: fd.get("title") as string,
      category: fd.get("category") as string,
      description: fd.get("description") as string,
      frameworks: fd.get("frameworks") as string,
      owner: fd.get("owner") as string,
      approvedBy: fd.get("approvedBy") as string,
      effectiveDate: fd.get("effectiveDate") as string,
      reviewDate: fd.get("reviewDate") as string,
      version: fd.get("version") as string,
      status: fd.get("status") as string,
    })
  }

  return (
    <FormSheet
      trigger={trigger}
      title={defaultValues ? "Editar Política" : "Nueva Política"}
      description="Registre una política, procedimiento o norma interna de la organización."
      submitLabel={defaultValues ? "Actualizar Política" : "Crear Política"}
      icon={<FileTextIcon className="size-4" />}
      accentClass="bg-sky-500"
      onSubmit={handleSubmit}
    >
      <SheetSection title="Información General">
        <SheetField label="Título de la política" required>
          <Input
            name="title"
            placeholder="Ej. Política de Control de Accesos"
            defaultValue={defaultValues?.title}
            required
          />
        </SheetField>

        <SheetField label="Descripción">
          <Textarea
            name="description"
            placeholder="Resumen del contenido, objetivo y ámbito de aplicación de la política…"
            defaultValue={defaultValues?.description}
            rows={3}
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

          <SheetField label="Estado">
            <SelectNative name="status" defaultValue={defaultValues?.status ?? "draft"}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>
        </SheetFieldRow>
      </SheetSection>

      <SheetSection title="Aprobación y Versión">
        <SheetFieldRow>
          <SheetField label="Responsable" required>
            <Input
              name="owner"
              placeholder="Nombre del responsable"
              defaultValue={defaultValues?.owner}
              required
            />
          </SheetField>

          <SheetField label="Aprobado por">
            <Input
              name="approvedBy"
              placeholder="Ej. CISO, DPO, Legal"
              defaultValue={defaultValues?.approvedBy}
            />
          </SheetField>
        </SheetFieldRow>

        <SheetField label="Versión" hint="Ej. v1.0, v2.3">
          <Input
            name="version"
            placeholder="v1.0"
            defaultValue={defaultValues?.version}
          />
        </SheetField>
      </SheetSection>

      <SheetSection title="Vigencia">
        <SheetFieldRow>
          <SheetField label="Fecha de entrada en vigor" required>
            <Input
              name="effectiveDate"
              type="date"
              defaultValue={defaultValues?.effectiveDate}
              required
            />
          </SheetField>

          <SheetField label="Próxima revisión" required>
            <Input
              name="reviewDate"
              type="date"
              defaultValue={defaultValues?.reviewDate}
              required
            />
          </SheetField>
        </SheetFieldRow>
      </SheetSection>

      <SheetSection title="Marcos Normativos">
        <SheetField
          label="Marcos aplicables"
          hint="Separe múltiples marcos con comas (ej. ISO 27001, GDPR)"
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

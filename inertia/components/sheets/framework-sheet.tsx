/**
 * FrameworkSheet – Side sheet for creating / editing a compliance framework.
 */
import React, { useState } from "react"
import { router } from "@inertiajs/react"
import { LayersIcon } from "lucide-react"
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from "./form-sheet"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { SelectNative } from "~/components/ui/select-native"
import { FRAMEWORK_CATEGORIES, FRAMEWORK_STATUSES } from "~/lib/compliance_ui"

export interface FrameworkSheetProps {
  trigger?: React.ReactNode
  frameworkId?: number
  defaultValues?: Partial<FrameworkFormValues>
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface FrameworkFormValues {
  slug: string
  name: string
  version: string
  description: string
  category: string
  status: string
  domainsCount: number
  controlsCount: number
  compliancePercentage: number
  lastReviewDate: string
}

const CATEGORY_OPTIONS: { value: typeof FRAMEWORK_CATEGORIES[number]; label: string }[] = [
  { value: "international", label: "Internacional" },
  { value: "regional", label: "Regional" },
  { value: "sector", label: "Sectorial" },
  { value: "custom", label: "Personalizado" },
]

const STATUS_OPTIONS: { value: typeof FRAMEWORK_STATUSES[number]; label: string }[] = [
  { value: "active", label: "Activo" },
  { value: "inactive", label: "Inactivo" },
  { value: "custom", label: "Personalizado" },
]

export function FrameworkSheet({
  trigger,
  frameworkId,
  defaultValues,
  open,
  onOpenChange,
}: FrameworkSheetProps) {
  const isEditMode = frameworkId !== undefined

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
      slug: fd.get("slug") as string,
      name: fd.get("name") as string,
      version: fd.get("version") as string,
      description: fd.get("description") as string,
      category: fd.get("category") as string,
      status: fd.get("status") as string,
      domainsCount: Number(fd.get("domainsCount")),
      controlsCount: Number(fd.get("controlsCount")),
      compliancePercentage: Number(fd.get("compliancePercentage")),
      lastReviewDate: (fd.get("lastReviewDate") as string) || undefined,
    }

    if (isEditMode) {
      router.put(`/normas-controles/biblioteca/${frameworkId}`, payload, {
        onSuccess: () => handleOpenChange(false),
      })
    } else {
      router.post(`/normas-controles/biblioteca`, payload, {
        onSuccess: () => handleOpenChange(false),
      })
    }
  }

  return (
    <FormSheet
      trigger={trigger}
      title={isEditMode ? "Editar Marco Normativo" : "Nuevo Marco Normativo"}
      description={
        isEditMode
          ? "Modifica los datos del marco normativo. Los cambios se aplicarán de inmediato."
          : "Registra un nuevo marco de cumplimiento para tu organización."
      }
      submitLabel={isEditMode ? "Actualizar Marco" : "Crear Marco"}
      icon={<LayersIcon className="size-4" />}
      accentClass="bg-blue-500"
      open={effectiveOpen}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit}
    >
      <SheetSection title="Identificación">
        <SheetFieldRow>
          <SheetField label="Identificador (slug)" required hint="Ej. iso27001, gdpr">
            <Input
              name="slug"
              placeholder="iso27001"
              defaultValue={defaultValues?.slug}
              required
            />
          </SheetField>

          <SheetField label="Estado">
            <SelectNative name="status" defaultValue={defaultValues?.status ?? "active"}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>
        </SheetFieldRow>

        <SheetField label="Nombre del marco" required>
          <Input
            name="name"
            placeholder="ISO 27001"
            defaultValue={defaultValues?.name}
            required
          />
        </SheetField>

        <SheetFieldRow>
          <SheetField label="Versión" required>
            <Input
              name="version"
              placeholder="2022"
              defaultValue={defaultValues?.version}
              required
            />
          </SheetField>

          <SheetField label="Categoría">
            <SelectNative name="category" defaultValue={defaultValues?.category ?? "international"}>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>
        </SheetFieldRow>

        <SheetField label="Descripción">
          <Textarea
            name="description"
            placeholder="Descripción del marco normativo y su propósito…"
            defaultValue={defaultValues?.description}
            rows={3}
          />
        </SheetField>
      </SheetSection>

      <SheetSection title="Métricas">
        <SheetFieldRow>
          <SheetField label="Nº de dominios" required>
            <Input
              name="domainsCount"
              type="number"
              min="0"
              max="9999"
              placeholder="14"
              defaultValue={defaultValues?.domainsCount ?? 0}
              required
            />
          </SheetField>

          <SheetField label="Nº de controles" required>
            <Input
              name="controlsCount"
              type="number"
              min="0"
              max="9999"
              placeholder="114"
              defaultValue={defaultValues?.controlsCount ?? 0}
              required
            />
          </SheetField>
        </SheetFieldRow>

        <SheetFieldRow>
          <SheetField label="% Cumplimiento" required hint="0–100">
            <Input
              name="compliancePercentage"
              type="number"
              min="0"
              max="100"
              placeholder="78"
              defaultValue={defaultValues?.compliancePercentage ?? 0}
              required
            />
          </SheetField>

          <SheetField label="Última revisión">
            <Input
              name="lastReviewDate"
              type="date"
              defaultValue={defaultValues?.lastReviewDate ?? ""}
            />
          </SheetField>
        </SheetFieldRow>
      </SheetSection>
    </FormSheet>
  )
}

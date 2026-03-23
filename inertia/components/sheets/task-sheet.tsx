/**
 * TaskSheet – Side sheet for creating / editing a compliance task.
 */
import React from "react"
import { CheckSquareIcon } from "lucide-react"
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from "./form-sheet"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { SelectNative } from "~/components/ui/select-native"

export interface TaskSheetProps {
  trigger: React.ReactNode
  defaultValues?: Partial<TaskFormValues>
  onSubmit?: (values: TaskFormValues) => void
}

export interface TaskFormValues {
  title: string
  owner: string
  department: string
  dueDate: string
  priority: string
  type: string
  status: string
  control: string
  framework: string
  description: string
}

const PRIORITIES = [
  { value: "high", label: "Alta" },
  { value: "medium", label: "Media" },
  { value: "low", label: "Baja" },
]

const TASK_TYPES = [
  { value: "action", label: "Acción" },
  { value: "review", label: "Revisión" },
  { value: "evidence", label: "Evidencia" },
  { value: "training", label: "Formación" },
]

const STATUSES = [
  { value: "pending", label: "Pendiente" },
  { value: "in-progress", label: "En progreso" },
]

const FRAMEWORKS = [
  "ISO 27001",
  "GDPR / LFPDPPP",
  "SOC 2",
  "PCI DSS",
  "NIS2",
  "ISO 9001",
  "NIST CSF",
  "MAAGTICSI",
  "NOM-035-STPS",
]

export function TaskSheet({ trigger, defaultValues, onSubmit }: TaskSheetProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    onSubmit?.({
      title: fd.get("title") as string,
      owner: fd.get("owner") as string,
      department: fd.get("department") as string,
      dueDate: fd.get("dueDate") as string,
      priority: fd.get("priority") as string,
      type: fd.get("type") as string,
      status: fd.get("status") as string,
      control: fd.get("control") as string,
      framework: fd.get("framework") as string,
      description: fd.get("description") as string,
    })
  }

  return (
    <FormSheet
      trigger={trigger}
      title={defaultValues ? "Editar Tarea" : "Nueva Tarea"}
      description="Asigne una tarea de cumplimiento a un responsable con fecha límite."
      submitLabel={defaultValues ? "Actualizar Tarea" : "Crear Tarea"}
      icon={<CheckSquareIcon className="size-4" />}
      accentClass="bg-indigo-500"
      onSubmit={handleSubmit}
    >
      <SheetSection title="Información General">
        <SheetField label="Título de la tarea" required>
          <Input
            name="title"
            placeholder="Ej. Implementar cifrado AES-256 en volúmenes de BD"
            defaultValue={defaultValues?.title}
            required
          />
        </SheetField>

        <SheetField label="Descripción">
          <Textarea
            name="description"
            placeholder="Describe el trabajo a realizar y los criterios de aceptación…"
            defaultValue={defaultValues?.description}
            rows={3}
          />
        </SheetField>
      </SheetSection>

      <SheetSection title="Asignación">
        <SheetFieldRow>
          <SheetField label="Responsable" required>
            <Input
              name="owner"
              placeholder="Nombre del responsable"
              defaultValue={defaultValues?.owner}
              required
            />
          </SheetField>

          <SheetField label="Departamento">
            <Input
              name="department"
              placeholder="Ej. TI, Legal, RRHH"
              defaultValue={defaultValues?.department}
            />
          </SheetField>
        </SheetFieldRow>

        <SheetFieldRow>
          <SheetField label="Prioridad" required>
            <SelectNative name="priority" defaultValue={defaultValues?.priority ?? "medium"}>
              {PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>

          <SheetField label="Tipo" required>
            <SelectNative name="type" defaultValue={defaultValues?.type ?? "action"}>
              {TASK_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </SelectNative>
          </SheetField>
        </SheetFieldRow>

        <SheetFieldRow>
          <SheetField label="Estado inicial">
            <SelectNative name="status" defaultValue={defaultValues?.status ?? "pending"}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </SelectNative>
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
      </SheetSection>

      <SheetSection title="Contexto Normativo">
        <SheetFieldRow>
          <SheetField label="Control asociado" hint="Ej. ISO A.10.1, PCI DSS 1.3">
            <Input
              name="control"
              placeholder="ISO A.10.1"
              defaultValue={defaultValues?.control}
            />
          </SheetField>

          <SheetField label="Marco normativo">
            <SelectNative name="framework" defaultValue={defaultValues?.framework}>
              <option value="">Seleccionar…</option>
              {FRAMEWORKS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </SelectNative>
          </SheetField>
        </SheetFieldRow>
      </SheetSection>
    </FormSheet>
  )
}

/**
 * UserSheet – Side sheet for inviting / editing a system user.
 */
import React from "react"
import { router, usePage } from "@inertiajs/react"
import { UserPlusIcon, UserPenIcon } from "lucide-react"
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from "./form-sheet"
import { Input } from "~/components/ui/input"
import { SelectNative } from "~/components/ui/select-native"

export interface UserSheetProps {
  /** Element that triggers opening the sheet. Required for invite mode; optional for edit mode. */
  trigger?: React.ReactNode
  /** Existing user ID – when provided the sheet works in edit mode. */
  userId?: number
  defaultValues?: Partial<UserFormValues>
  /** Called after a successful in-page submit (invite mode only). */
  onSubmit?: (values: UserFormValues) => void
  /** Controlled open state for edit mode (managed by parent). */
  open?: boolean
  /** Callback when controlled open state changes. */
  onOpenChange?: (open: boolean) => void
}

export interface UserFormValues {
  name: string
  email: string
  role: string
  department: string
  status?: string
}

const ROLES = [
  { value: "admin", label: "Administrador" },
  { value: "ciso", label: "CISO" },
  { value: "compliance", label: "Responsable de Cumplimiento" },
  { value: "auditor", label: "Auditor" },
  { value: "employee", label: "Empleado" },
]

const STATUSES = [
  { value: "active", label: "Activo" },
  { value: "inactive", label: "Inactivo" },
  { value: "pending", label: "Pendiente" },
]

const DEPARTMENTS = [
  "TI / Seguridad",
  "Legal",
  "Cumplimiento",
  "Auditoría Interna",
  "Recursos Humanos",
  "Finanzas",
  "Operaciones",
  "Marketing",
  "Ventas",
  "Soporte",
  "Calidad",
  "Dirección",
]

const ROLE_DESCRIPTIONS: Record<string, string> = {
  admin: "Acceso total al sistema. Gestión de usuarios, configuración y logs.",
  ciso: "Aprobación final de riesgos, políticas y flujos de seguridad.",
  compliance: "Gestión de normas, controles, evidencias y flujos de aprobación.",
  auditor: "Acceso de solo lectura a evidencias, hallazgos y programas de pruebas.",
  employee: "Acceso a sus propias tareas y subida de evidencias asignadas.",
}

export function UserSheet({
  trigger,
  userId,
  defaultValues,
  onSubmit,
  open,
  onOpenChange,
}: UserSheetProps) {
  const isEditMode = userId !== undefined

  /* ── Internal open state used to close the sheet after a successful PUT ── */
  const [internalOpen, setInternalOpen] = React.useState(false)

  const controlledOpen = open !== undefined ? open : internalOpen
  const handleOpenChange = (o: boolean) => {
    setInternalOpen(o)
    onOpenChange?.(o)
  }

  const [selectedRole, setSelectedRole] = React.useState(
    defaultValues?.role ?? "employee"
  )

  /* ── Inertia validation errors (shared via InertiaMiddleware) ── */
  const { errors } = usePage<{ errors: Record<string, string> }>().props

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const values: UserFormValues = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      role: fd.get("role") as string,
      department: fd.get("department") as string,
      status: fd.get("status") as string,
    }

    if (isEditMode) {
      /* Map the form's `name` field to the API's `fullName` field. */
      router.put(`/administracion/usuarios-roles/${userId}`, {
        fullName: values.name,
        email: values.email,
        role: values.role,
        department: values.department,
        status: values.status,
      }, {
        onSuccess: () => handleOpenChange(false),
      })
    } else {
      onSubmit?.(values)
    }
  }

  return (
    <FormSheet
      trigger={trigger}
      title={isEditMode ? "Editar Usuario" : "Invitar Usuario"}
      description={
        isEditMode
          ? "Modifica los datos del usuario. Los cambios se aplicarán de inmediato."
          : "El usuario recibirá un correo de activación para configurar su contraseña."
      }
      submitLabel={isEditMode ? "Actualizar Usuario" : "Enviar Invitación"}
      icon={isEditMode ? <UserPenIcon className="size-4" /> : <UserPlusIcon className="size-4" />}
      accentClass="bg-purple-500"
      open={controlledOpen}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit}
    >
      <SheetSection title="Datos del Usuario">
        <SheetField label="Nombre completo" required>
          <Input
            name="name"
            placeholder="Ej. Ana García"
            defaultValue={defaultValues?.name}
            required
          />
          {errors?.fullName && (
            <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
          )}
        </SheetField>

        <SheetField label="Correo electrónico" required>
          <Input
            name="email"
            type="email"
            placeholder="usuario@empresa.com.mx"
            defaultValue={defaultValues?.email}
            required
          />
          {errors?.email && (
            <p className="text-xs text-destructive mt-1">{errors.email}</p>
          )}
        </SheetField>
      </SheetSection>

      <SheetSection title="Acceso y Departamento">
        <SheetFieldRow>
          <SheetField label="Rol" required>
            <SelectNative
              name="role"
              defaultValue={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </SelectNative>
            {errors?.role && (
              <p className="text-xs text-destructive mt-1">{errors.role}</p>
            )}
          </SheetField>

          <SheetField label="Departamento" required>
            <SelectNative name="department" defaultValue={defaultValues?.department}>
              <option value="">Seleccionar…</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </SelectNative>
            {errors?.department && (
              <p className="text-xs text-destructive mt-1">{errors.department}</p>
            )}
          </SheetField>
        </SheetFieldRow>

        {/* Role description hint */}
        {selectedRole && ROLE_DESCRIPTIONS[selectedRole] && (
          <p className="text-xs text-muted-foreground rounded-md bg-muted px-3 py-2 leading-relaxed">
            <span className="font-medium">Permisos: </span>
            {ROLE_DESCRIPTIONS[selectedRole]}
          </p>
        )}
      </SheetSection>

      {/* Status – only shown when editing an existing user */}
      {isEditMode && (
        <SheetSection title="Estado de la Cuenta">
          <SheetField label="Estado" required>
            <SelectNative name="status" defaultValue={defaultValues?.status ?? "active"}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </SelectNative>
            {errors?.status && (
              <p className="text-xs text-destructive mt-1">{errors.status}</p>
            )}
          </SheetField>
        </SheetSection>
      )}
    </FormSheet>
  )
}

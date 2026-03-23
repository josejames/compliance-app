/**
 * UserSheet – Side sheet for inviting / editing a system user.
 */
import React from "react"
import { UserPlusIcon } from "lucide-react"
import { FormSheet, SheetField, SheetFieldRow, SheetSection } from "./form-sheet"
import { Input } from "~/components/ui/input"
import { SelectNative } from "~/components/ui/select-native"

export interface UserSheetProps {
  trigger: React.ReactNode
  defaultValues?: Partial<UserFormValues>
  onSubmit?: (values: UserFormValues) => void
}

export interface UserFormValues {
  name: string
  email: string
  role: string
  department: string
}

const ROLES = [
  { value: "admin", label: "Administrador" },
  { value: "ciso", label: "CISO" },
  { value: "compliance", label: "Responsable de Cumplimiento" },
  { value: "auditor", label: "Auditor" },
  { value: "employee", label: "Empleado" },
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

export function UserSheet({ trigger, defaultValues, onSubmit }: UserSheetProps) {
  const [selectedRole, setSelectedRole] = React.useState(
    defaultValues?.role ?? "employee"
  )

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    onSubmit?.({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      role: fd.get("role") as string,
      department: fd.get("department") as string,
    })
  }

  return (
    <FormSheet
      trigger={trigger}
      title={defaultValues ? "Editar Usuario" : "Invitar Usuario"}
      description="El usuario recibirá un correo de activación para configurar su contraseña."
      submitLabel={defaultValues ? "Actualizar Usuario" : "Enviar Invitación"}
      icon={<UserPlusIcon className="size-4" />}
      accentClass="bg-purple-500"
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
        </SheetField>

        <SheetField label="Correo electrónico" required>
          <Input
            name="email"
            type="email"
            placeholder="usuario@empresa.com.mx"
            defaultValue={defaultValues?.email}
            required
          />
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
    </FormSheet>
  )
}

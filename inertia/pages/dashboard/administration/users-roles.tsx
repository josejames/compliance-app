import { PageHeader } from "~/components/page-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import {
  PlusIcon,
  SearchIcon,
  UserIcon,
  MailIcon,
  ShieldIcon,
  CheckCircle2Icon,
  XCircleIcon,
  CalendarIcon,
  KeyRoundIcon,
} from "lucide-react"
import { badgeCls } from "~/lib/compliance_ui"

type UserRole = "admin" | "ciso" | "compliance" | "auditor" | "employee"
type UserStatus = "active" | "inactive" | "pending"

interface SystemUser {
  id: string
  name: string
  email: string
  role: UserRole
  department: string
  lastLogin: string | null
  status: UserStatus
  mfa: boolean
}

const users: SystemUser[] = [
  { id: "USR-001", name: "Laura Martínez", email: "laura@empresa.com", role: "ciso", department: "Seguridad", lastLogin: "14 Mar 2026 08:42", status: "active", mfa: true },
  { id: "USR-002", name: "Ana García", email: "ana@empresa.com", role: "compliance", department: "Cumplimiento", lastLogin: "14 Mar 2026 09:05", status: "active", mfa: true },
  { id: "USR-003", name: "Carlos Rodríguez", email: "carlos@empresa.com", role: "employee", department: "TI", lastLogin: "14 Mar 2026 08:15", status: "active", mfa: true },
  { id: "USR-004", name: "Pablo Torres", email: "pablo@empresa.com", role: "auditor", department: "Auditoría Interna", lastLogin: "13 Mar 2026 17:30", status: "active", mfa: true },
  { id: "USR-005", name: "María González", email: "maria@empresa.com", role: "employee", department: "RRHH", lastLogin: "13 Mar 2026 16:45", status: "active", mfa: false },
  { id: "USR-006", name: "Elena Sánchez", email: "elena@empresa.com", role: "employee", department: "Legal", lastLogin: "13 Mar 2026 14:20", status: "active", mfa: true },
  { id: "USR-007", name: "Javier López", email: "javier@empresa.com", role: "employee", department: "Calidad", lastLogin: "12 Mar 2026 10:00", status: "active", mfa: false },
  { id: "USR-008", name: "Roberto Admin", email: "admin@empresa.com", role: "admin", department: "TI", lastLogin: "14 Mar 2026 07:50", status: "active", mfa: true },
  { id: "USR-009", name: "Sónia Ferreira", email: "sonia@empresa.com", role: "employee", department: "Operaciones", lastLogin: "11 Mar 2026 09:30", status: "active", mfa: false },
  { id: "USR-010", name: "Diego Morales", email: "diego@empresa.com", role: "employee", department: "Finanzas", lastLogin: "10 Mar 2026 16:15", status: "active", mfa: true },
  { id: "USR-011", name: "Claudia Ruiz", email: "claudia@empresa.com", role: "compliance", department: "Cumplimiento", lastLogin: "14 Mar 2026 08:55", status: "active", mfa: true },
  { id: "USR-012", name: "Andrés Vega", email: "andres@empresa.com", role: "auditor", department: "Auditoría Interna", lastLogin: "13 Mar 2026 11:00", status: "active", mfa: true },
  { id: "USR-013", name: "Natalia Pinto", email: "natalia@empresa.com", role: "employee", department: "Marketing", lastLogin: "05 Mar 2026 09:00", status: "inactive", mfa: false },
  { id: "USR-014", name: "Fernando Blanco", email: "fernando@empresa.com", role: "employee", department: "Ventas", lastLogin: null, status: "pending", mfa: false },
  { id: "USR-015", name: "Isabel Castro", email: "isabel@empresa.com", role: "employee", department: "Soporte", lastLogin: null, status: "pending", mfa: false },
]

const roleConfig: Record<UserRole, { label: string; cls: string }> = {
  admin: { label: "Administrador", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  ciso: { label: "CISO", cls: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400" },
  compliance: { label: "Cumplimiento", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
  auditor: { label: "Auditor", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  employee: { label: "Empleado", cls: "bg-muted text-muted-foreground" },
}

const statusConfig: Record<UserStatus, { label: string; cls: string }> = {
  active: { label: "Activo", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
  inactive: { label: "Inactivo", cls: "bg-muted text-muted-foreground" },
  pending: { label: "Pendiente", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
}

const activeCount = users.filter(u => u.status === "active").length
const pendingCount = users.filter(u => u.status === "pending").length
const noMfaCount = users.filter(u => !u.mfa && u.status === "active").length

const roleDescriptions: { role: UserRole; description: string; count: number }[] = [
  { role: "admin", description: "Acceso total al sistema. Gestión de usuarios, configuración y logs.", count: users.filter(u => u.role === "admin").length },
  { role: "ciso", description: "Aprobación final de riesgos, políticas y flujos de seguridad.", count: users.filter(u => u.role === "ciso").length },
  { role: "compliance", description: "Gestión de normas, controles, evidencias y flujos de aprobación.", count: users.filter(u => u.role === "compliance").length },
  { role: "auditor", description: "Acceso de solo lectura a evidencias, hallazgos y programas de pruebas.", count: users.filter(u => u.role === "auditor").length },
  { role: "employee", description: "Acceso a sus propias tareas y subida de evidencias asignadas.", count: users.filter(u => u.role === "employee").length },
]

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[
        { label: "Panel Principal", href: "/" },
        { label: "Administración", href: "/administracion" },
        { label: "Usuarios y Roles" },
      ]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">8.1. Gestión de Usuarios y Roles</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Alta, baja y modificación de usuarios con asignación de roles y permisos
            </p>
          </div>
          <Button size="sm"><PlusIcon /> Invitar Usuario</Button>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Usuarios</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{users.length}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className={`${badgeCls} bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400`}>{activeCount} activos</span>
                <span className={`${badgeCls} bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400`}>{pendingCount} pendientes</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Roles Definidos</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-purple-600 dark:text-purple-400">5</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Admin, CISO, Cumplimiento, Auditor, Empleado</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Sin MFA Activo</CardDescription>
              <CardTitle><span className={`text-3xl font-bold ${noMfaCount > 0 ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400"}`}>{noMfaCount}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Usuarios activos sin doble factor</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Invitaciones Pendientes</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{pendingCount}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Sin activar cuenta todavía</p></CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {/* Users table */}
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base">Usuarios del Sistema</CardTitle>
                <CardDescription className="text-xs">{users.length} cuentas registradas</CardDescription>
              </div>
              <Button variant="outline" size="sm"><SearchIcon /> Buscar</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40 text-xs text-muted-foreground uppercase tracking-wide">
                      <th className="text-left px-4 py-2.5 font-medium">Usuario</th>
                      <th className="text-left px-4 py-2.5 font-medium hidden md:table-cell">Rol</th>
                      <th className="text-left px-4 py-2.5 font-medium hidden lg:table-cell">Último acceso</th>
                      <th className="text-left px-4 py-2.5 font-medium">MFA</th>
                      <th className="text-left px-4 py-2.5 font-medium">Estado</th>
                      <th className="px-4 py-2.5" />
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {users.map((u) => {
                      const role = roleConfig[u.role]
                      const status = statusConfig[u.status]
                      return (
                        <tr key={u.id} className={`hover:bg-muted/30 transition-colors ${u.status !== "active" ? "opacity-60" : ""}`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                                <UserIcon className="size-3.5 text-muted-foreground" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium leading-tight">{u.name}</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MailIcon className="size-3 shrink-0" />
                                  <span className="truncate max-w-36">{u.email}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span className={`${badgeCls} ${role.cls}`}>{role.label}</span>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{u.department}</p>
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <div className="flex items-center gap-1 text-xs">
                              <CalendarIcon className="size-3 text-muted-foreground shrink-0" />
                              <span>{u.lastLogin ?? "Nunca"}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {u.mfa
                              ? <CheckCircle2Icon className="size-4 text-green-600 dark:text-green-400" />
                              : <XCircleIcon className="size-4 text-amber-500" />
                            }
                          </td>
                          <td className="px-4 py-3">
                            <span className={`${badgeCls} ${status.cls}`}>{status.label}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="xs">Editar</Button>
                              <Button variant="ghost" size="xs"><KeyRoundIcon /></Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Role definitions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Roles del Sistema</CardTitle>
              <CardDescription className="text-xs">Permisos y usuarios por rol</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {roleDescriptions.map((r) => {
                  const cfg = roleConfig[r.role]
                  return (
                    <div key={r.role} className="px-4 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`${badgeCls} ${cfg.cls}`}>{cfg.label}</span>
                        <span className="text-xs font-semibold">{r.count} usuario{r.count !== 1 ? "s" : ""}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

import { type Data } from "@generated/data"
import {
  CalendarIcon,
  CheckCircle2Icon,
  KeyRoundIcon,
  MailIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
  XCircleIcon
} from "lucide-react"
import { PageHeader } from "~/components/page-header"
import { UserSheet } from "~/components/sheets"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { badgeCls, roleConfig, userStatusConfig, type UserRole, type UserStatus } from "~/lib/compliance_ui"
import { InertiaProps } from "~/types"

type Props = InertiaProps<{
  roles: Data.Role[]
  users: Data.User[]
}>

function formatLastLogin(iso: string | null): string {
  if (!iso) return "Nunca"
  return new Date(iso).toLocaleString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}



export default function Page({ roles, users }: Props) {
  const activeCount = users.filter(u => u.status === "active").length
  const pendingCount = users.filter(u => u.status === "pending").length
  const noMfaCount = users.filter(u => !u.mfaEnabled && u.status === "active").length

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
          <UserSheet trigger={<Button size="sm"><PlusIcon /> Invitar Usuario</Button>} />
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
              <CardTitle><span className="text-3xl font-bold text-purple-600 dark:text-purple-400">{roles.length}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">{roles.map(r => roleConfig[r.slug as UserRole]?.label ?? r.name).join(", ")}</p></CardContent>
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
                      const role = roleConfig[u.role as UserRole]
                      const status = userStatusConfig[u.status as UserStatus]
                      return (
                        <tr key={u.id} className={`hover:bg-muted/30 transition-colors ${u.status !== "active" ? "opacity-60" : ""}`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                                <UserIcon className="size-3.5 text-muted-foreground" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium leading-tight">{u.fullName ?? u.email}</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MailIcon className="size-3 shrink-0" />
                                  <span className="truncate max-w-36">{u.email}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span className={`${badgeCls} ${role?.cls}`}>{role?.label ?? u.role}</span>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{u.department}</p>
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <div className="flex items-center gap-1 text-xs">
                              <CalendarIcon className="size-3 text-muted-foreground shrink-0" />
                              <span>{formatLastLogin(u.lastLogin)}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {u.mfaEnabled
                              ? <CheckCircle2Icon className="size-4 text-green-600 dark:text-green-400" />
                              : <XCircleIcon className="size-4 text-amber-500" />
                            }
                          </td>
                          <td className="px-4 py-3">
                            <span className={`${badgeCls} ${status?.cls}`}>{status?.label}</span>
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
                {roles.map((r) => {
                  const cfg = roleConfig[r.slug as UserRole]
                  return (
                    <div key={r.slug} className="px-4 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`${badgeCls} ${cfg?.cls}`}>{cfg?.label ?? r.name}</span>
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

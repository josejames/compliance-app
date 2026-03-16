import {
    BuildingIcon,
    CalendarIcon,
    ChevronRightIcon,
    PlugZapIcon,
    ScrollTextIcon,
    ShieldCheckIcon,
    TruckIcon,
    UsersIcon
} from "lucide-react"
import { PageHeader } from "~/components/page-header"
import { SectionNavCard } from "~/components/section-nav-card"
import { Button } from "~/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { badgeCls } from "~/lib/compliance_ui"

const sections = [
  {
    number: "8.1",
    title: "Usuarios y Roles",
    description:
      "Alta, baja y modificación de usuarios. Asignación de roles y permisos: Administrador, CISO, Responsable, Auditor, Empleado.",
    href: "/administracion/usuarios-roles",
    icon: UsersIcon,
    stats: [
      { label: "Usuarios activos", value: "18" },
      { label: "Roles definidos", value: "5" },
    ],
    accent: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    number: "8.2",
    title: "Configuración de la Organización",
    description:
      "Datos de la empresa, estructura de áreas y departamentos. Marcos normativos activos y configuración de ciclos de revisión.",
    href: "/administracion/organizacion",
    icon: BuildingIcon,
    stats: [
      { label: "Departamentos", value: "7" },
      { label: "Marcos activos", value: "5" },
    ],
    accent: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
  },
  {
    number: "8.3",
    title: "Registros de Actividad",
    description:
      "Traza inalterable de todas las acciones del sistema: quién hizo qué, cuándo y desde dónde. Filtros por usuario, acción y fecha.",
    href: "/administracion/logs",
    icon: ScrollTextIcon,
    stats: [
      { label: "Eventos hoy", value: "142" },
      { label: "Usuarios activos", value: "9" },
    ],
    accent: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
  },
  {
    number: "8.4",
    title: "Integraciones",
    description:
      "Conexiones con herramientas externas: Active Directory, Azure AD, Slack, Jira, SMTP. Estado de sincronización y gestión de tokens.",
    href: "/administracion/integraciones",
    icon: PlugZapIcon,
    stats: [
      { label: "Conectadas", value: "4" },
      { label: "Con error", value: "1" },
    ],
    accent: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
  },
  {
    number: "8.5",
    title: "Proveedores y Terceros",
    description:
      "Registro de encargados y responsables de datos personales. Control de Aviso de Privacidad, cláusula de transferencia y vencimiento de contratos (LFPDPPP Arts. 21 y 50).",
    href: "/administracion/proveedores",
    icon: TruckIcon,
    stats: [
      { label: "Proveedores", value: "8" },
      { label: "Incumplen", value: "2" },
    ],
    accent: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
  },
]

interface RecentActivity {
  user: string
  action: string
  resource: string
  time: string
  type: "create" | "update" | "delete" | "login" | "export"
}

const recentActivity: RecentActivity[] = [
  { user: "Lic. Ana García", action: "Aprobó política", resource: "Política de Contraseñas v3.1", time: "Hace 12 min", type: "update" },
  { user: "Ing. Carlos Ramírez", action: "Subió evidencia", resource: "Backup Feb 2026", time: "Hace 35 min", type: "create" },
  { user: "Lic. Laura Martínez", action: "Cerró hallazgo", resource: "HAL-003", time: "Hace 1 h", type: "update" },
  { user: "Sistema", action: "Informe generado", resource: "KPIs Mensuales PDF", time: "Hace 2 h", type: "export" },
  { user: "Ing. Pablo Torres", action: "Inicio de sesión", resource: "—", time: "Hace 3 h", type: "login" },
  { user: "María González", action: "Creó tarea", resource: "TSK-047 · Capacitación LFPDPPP", time: "Hace 4 h", type: "create" },
]

const activityTypeConfig: Record<RecentActivity["type"], { cls: string; label: string }> = {
  create: { cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400", label: "Creación" },
  update: { cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400", label: "Modificación" },
  delete: { cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", label: "Eliminación" },
  login: { cls: "bg-muted text-muted-foreground", label: "Acceso" },
  export: { cls: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400", label: "Exportación" },
}

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Panel Principal", href: "/" }, { label: "Administración" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Administración</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Configuración técnica y de usuarios del sistema — acceso restringido a administradores
          </p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Usuarios Activos</CardDescription>
              <CardTitle><span className="text-3xl font-bold">18</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className={`${badgeCls} bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400`}>16 activos</span>
                <span className={`${badgeCls} bg-muted text-muted-foreground`}>2 inactivos</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Integraciones Activas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">4</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">1 integración con error</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Eventos Hoy</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">142</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">9 usuarios activos en sesión</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Último Acceso Admin</CardDescription>
              <CardTitle><span className="text-base font-bold">Laura Martínez</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarIcon className="size-3.5" />
                <span>14 Mar 2026 · 08:42</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Nav Cards — 2×3 grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((s) => (
            <SectionNavCard key={s.number} {...s} />
          ))}
        </div>

        {/* Recent activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Actividad Reciente</CardTitle>
              <CardDescription className="text-xs mt-0.5">Últimas acciones registradas en el sistema</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="/administracion/logs">Ver todos los logs <ChevronRightIcon /></a>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentActivity.map((a, i) => {
                const type = activityTypeConfig[a.type]
                return (
                  <div key={i} className="flex items-center justify-between px-6 py-3 hover:bg-muted/40 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center shrink-0">
                        <ShieldCheckIcon className="size-3.5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          <span className="text-foreground">{a.user}</span>
                          <span className="text-muted-foreground font-normal"> — {a.action}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{a.resource}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className={`${badgeCls} ${type.cls}`}>{type.label}</span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

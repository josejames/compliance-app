import {
    CheckSquareIcon,
    ChevronRightIcon,
    ClockIcon,
    GitBranchIcon,
    ListChecksIcon,
    RefreshCwIcon,
    UserIcon
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
import { badgeCls, priorityConfig, scoreBgCls } from "~/lib/compliance_ui"

const sections = [
  {
    number: "6.1",
    title: "Gestión de Tareas",
    description:
      "Vista centralizada de todas las tareas del sistema. Filtros por responsable, estado, fecha y control asociado. Asignación y seguimiento del progreso.",
    href: "/tareas-workflows/gestion-tareas",
    icon: ListChecksIcon,
    stats: [
      { label: "Tareas activas", value: "34" },
      { label: "Vencidas", value: "7" },
    ],
    accent: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    number: "6.2",
    title: "Diseñador de Flujos",
    description:
      "Configuración de flujos de aprobación multi-etapa. Define secuencias de revisores, condiciones de escalado y notificaciones automáticas.",
    href: "/tareas-workflows/diseno-flujos",
    icon: GitBranchIcon,
    stats: [
      { label: "Flujos activos", value: "8" },
      { label: "En borrador", value: "3" },
    ],
    accent: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
  },
  {
    number: "6.3",
    title: "Tareas Recurrentes",
    description:
      "Plantillas de tareas con programación automática. Ciclos diarios, semanales, mensuales y trimestrales vinculados a controles y marcos normativos.",
    href: "/tareas-workflows/tareas-recurrentes",
    icon: RefreshCwIcon,
    stats: [
      { label: "Plantillas activas", value: "15" },
      { label: "Próximas 7 días", value: "6" },
    ],
    accent: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
  },
]

type TaskPriority = "high" | "medium" | "low"
type TaskStatus = "pending" | "in-progress" | "overdue" | "completed"

interface RecentTask {
  id: string
  title: string
  owner: string
  dueDate: string
  priority: TaskPriority
  status: TaskStatus
  control: string
}

const recentTasks: RecentTask[] = [
  { id: "TSK-041", title: "Revisar controles de acceso privilegiado", owner: "Ing. Carlos R.", dueDate: "15 Mar 2026", priority: "high", status: "overdue", control: "ISO 27001 A.9" },
  { id: "TSK-042", title: "Actualizar política de contraseñas", owner: "Lic. Ana G.", dueDate: "16 Mar 2026", priority: "high", status: "in-progress", control: "ISO 27001 A.9" },
  { id: "TSK-043", title: "Capacitación LFPDPPP — Derechos ARCO", owner: "María G.", dueDate: "20 Mar 2026", priority: "medium", status: "in-progress", control: "LFPDPPP Art. 22" },
  { id: "TSK-044", title: "Subir evidencia de backup mensual", owner: "Ing. Pablo T.", dueDate: "20 Mar 2026", priority: "medium", status: "pending", control: "ISO 27001 A.8.13" },
  { id: "TSK-045", title: "Validar cifrado en volcados de BD", owner: "Lic. Laura M.", dueDate: "22 Mar 2026", priority: "high", status: "pending", control: "PCI DSS 3.4" },
  { id: "TSK-046", title: "Cuestionario NOM-035 — área Operaciones", owner: "Javier L.", dueDate: "31 Mar 2026", priority: "medium", status: "pending", control: "NOM-035-STPS Art. 9" },
]

const taskStatusConfig: Record<TaskStatus, { label: string; cls: string }> = {
  pending: { label: "Pendiente", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
  "in-progress": { label: "En progreso", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  overdue: { label: "Vencida", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  completed: { label: "Completada", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
}

export default function Page() {
  const completionRate = 72
  return (
    <>
      <PageHeader crumbs={[{ label: "Panel Principal", href: "/" }, { label: "Tareas y Flujos de Trabajo" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tareas y Flujos de Trabajo</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Motor operativo de asignación, seguimiento y automatización de acciones de cumplimiento
          </p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Tareas Activas</CardDescription>
              <CardTitle><span className="text-3xl font-bold">34</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className={`${badgeCls} bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400`}>12 en progreso</span>
                <span className={`${badgeCls} bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400`}>22 pendientes</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Tareas Vencidas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-red-600 dark:text-red-400">7</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className={`${badgeCls} bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400`}>3 prioridad alta</span>
                <span className={`${badgeCls} bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400`}>4 media/baja</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Tasa de Completitud</CardDescription>
              <CardTitle><span className={`text-3xl font-bold ${completionRate >= 70 ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}>{completionRate}%</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-2">
                <div className={`h-2 rounded-full ${scoreBgCls(completionRate)}`} style={{ width: `${completionRate}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">89 de 123 tareas del mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Flujos Activos</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-purple-600 dark:text-purple-400">8</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className={`${badgeCls} bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400`}>15 recurrentes activas</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Nav Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {sections.map((s) => (
            <SectionNavCard key={s.number} {...s} />
          ))}
        </div>

        {/* Recent tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Tareas Recientes</CardTitle>
              <CardDescription className="text-xs mt-0.5">Últimas tareas asignadas o próximas a vencer</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="/tareas-workflows/gestion-tareas">Ver todas <ChevronRightIcon /></a>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentTasks.map((t) => {
                const status = taskStatusConfig[t.status]
                const prio = priorityConfig[t.priority]
                return (
                  <div key={t.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted/40 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex items-center justify-center w-7 h-7 rounded-md bg-muted shrink-0">
                        <CheckSquareIcon className="size-3.5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{t.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <UserIcon className="size-3" />
                          <span>{t.owner}</span>
                          <span>·</span>
                          <ClockIcon className="size-3" />
                          <span>{t.dueDate}</span>
                          <span>·</span>
                          <span className="font-mono">{t.control}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className={`${badgeCls} ${prio.cls}`}>{prio.label}</span>
                      <span className={`${badgeCls} ${status.cls}`}>{status.label}</span>
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

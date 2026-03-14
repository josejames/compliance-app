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
  DownloadIcon,
  CheckCircle2Icon,
  ClockIcon,
  UserIcon,
  LinkIcon,
  FilterIcon,
} from "lucide-react"
import { badgeCls, priorityConfig } from "~/lib/compliance_ui"

type TaskPriority = "high" | "medium" | "low"
type TaskStatus = "pending" | "in-progress" | "overdue" | "completed" | "cancelled"

interface Task {
  id: string
  title: string
  owner: string
  department: string
  dueDate: string
  priority: TaskPriority
  status: TaskStatus
  control: string
  framework: string
  type: "action" | "review" | "evidence" | "training"
}

const tasks: Task[] = [
  { id: "TSK-035", title: "Implementar cifrado AES-256 en volúmenes de BD", owner: "Carlos Rodríguez", department: "TI", dueDate: "28 Mar 2026", priority: "high", status: "in-progress", control: "ISO A.10.1", framework: "ISO 27001", type: "action" },
  { id: "TSK-036", title: "Actualizar política de contraseñas a NIST 800-63B", owner: "Ana García", department: "Seguridad", dueDate: "15 Mar 2026", priority: "high", status: "overdue", control: "ISO A.9.4", framework: "ISO 27001", type: "action" },
  { id: "TSK-037", title: "Completar formación GDPR obligatoria — batch Q1", owner: "María González", department: "RRHH", dueDate: "20 Mar 2026", priority: "medium", status: "in-progress", control: "GDPR Art. 25", framework: "GDPR", type: "training" },
  { id: "TSK-038", title: "Subir evidencia de backup mensual Feb 2026", owner: "Pablo Torres", department: "TI", dueDate: "10 Mar 2026", priority: "medium", status: "overdue", control: "SOC2 CC9.2", framework: "SOC 2", type: "evidence" },
  { id: "TSK-039", title: "Revisión de accesos privilegiados Q1", owner: "Laura Martínez", department: "Seguridad", dueDate: "31 Mar 2026", priority: "high", status: "pending", control: "SOC2 CC6.3", framework: "SOC 2", type: "review" },
  { id: "TSK-040", title: "Validar segmentación de red CDE vs corporativa", owner: "Pablo Torres", department: "TI", dueDate: "15 Abr 2026", priority: "high", status: "pending", control: "PCI DSS 1.3", framework: "PCI DSS", type: "action" },
  { id: "TSK-041", title: "Firmar DPAs con 4 proveedores pendientes", owner: "Ana García", department: "Legal", dueDate: "30 Mar 2026", priority: "medium", status: "in-progress", control: "GDPR Art. 28", framework: "GDPR", type: "action" },
  { id: "TSK-042", title: "Configurar retención de logs a 365 días en SIEM", owner: "Carlos Rodríguez", department: "TI", dueDate: "20 Mar 2026", priority: "medium", status: "pending", control: "ISO A.12.4", framework: "ISO 27001", type: "action" },
  { id: "TSK-043", title: "Planificar simulacro de DR — Marzo 2026", owner: "Pablo Torres", department: "TI", dueDate: "21 Mar 2026", priority: "high", status: "in-progress", control: "SOC2 CC9.1", framework: "SOC 2", type: "action" },
  { id: "TSK-044", title: "Revisión anual de política de privacidad web", owner: "Elena Sánchez", department: "Legal", dueDate: "01 Abr 2026", priority: "low", status: "pending", control: "GDPR Art. 13", framework: "GDPR", type: "review" },
  { id: "TSK-045", title: "Activar MFA obligatorio para acceso VPN", owner: "Javier López", department: "TI", dueDate: "25 Mar 2026", priority: "high", status: "pending", control: "NIS2 Art. 21", framework: "NIS2", type: "action" },
  { id: "TSK-046", title: "Auditoría interna procesos ISO 9001 — Q1", owner: "Javier López", department: "Calidad", dueDate: "31 Mar 2026", priority: "medium", status: "pending", control: "ISO 9001 9.2", framework: "ISO 9001", type: "review" },
  { id: "TSK-033", title: "Documentar BCP para proveedor de pagos", owner: "Elena Sánchez", department: "Operaciones", dueDate: "08 Mar 2026", priority: "high", status: "completed", control: "SOC2 CC9.1", framework: "SOC 2", type: "action" },
  { id: "TSK-034", title: "Despliegue con aprobación CAB obligatoria en CI/CD", owner: "Javier López", department: "TI", dueDate: "28 Feb 2026", priority: "medium", status: "completed", control: "ISO A.12.1", framework: "ISO 27001", type: "action" },
]

const taskStatusConfig: Record<TaskStatus, { label: string; cls: string; icon: React.ElementType }> = {
  pending: { label: "Pendiente", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400", icon: ClockIcon },
  "in-progress": { label: "En progreso", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400", icon: ClockIcon },
  overdue: { label: "Vencida", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", icon: ClockIcon },
  completed: { label: "Completada", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400", icon: CheckCircle2Icon },
  cancelled: { label: "Cancelada", cls: "bg-muted text-muted-foreground", icon: ClockIcon },
}

const typeConfig: Record<Task["type"], { label: string; cls: string }> = {
  action: { label: "Acción", cls: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400" },
  review: { label: "Revisión", cls: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400" },
  evidence: { label: "Evidencia", cls: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400" },
  training: { label: "Formación", cls: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400" },
}

import React from "react"

const totalTasks = tasks.length
const overdueTasks = tasks.filter(t => t.status === "overdue").length
const inProgressTasks = tasks.filter(t => t.status === "in-progress").length
const completedTasks = tasks.filter(t => t.status === "completed").length

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[
        { label: "Panel Principal", href: "/" },
        { label: "Tareas y Flujos de Trabajo", href: "/tareas-workflows" },
        { label: "Gestión de Tareas" },
      ]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">6.1. Gestión de Tareas</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Vista de todas las tareas del sistema con filtros avanzados
            </p>
          </div>
          <Button size="sm">
            <PlusIcon /> Nueva Tarea
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Tareas</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{totalTasks}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Activas + completadas este mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>En Progreso</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-amber-600 dark:text-amber-400">{inProgressTasks}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Asignadas y en ejecución</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Vencidas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-red-600 dark:text-red-400">{overdueTasks}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Completadas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{completedTasks}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Cerradas satisfactoriamente</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters + Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Todas las Tareas</CardTitle>
              <CardDescription className="text-xs mt-0.5">{totalTasks} tareas registradas</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm"><FilterIcon /> Filtros</Button>
              <Button variant="outline" size="sm"><SearchIcon /> Buscar</Button>
              <Button variant="outline" size="sm"><DownloadIcon /> Exportar</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40 text-xs text-muted-foreground uppercase tracking-wide">
                    <th className="text-left px-4 py-2.5 font-medium">ID</th>
                    <th className="text-left px-4 py-2.5 font-medium">Tarea</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden md:table-cell">Responsable</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden lg:table-cell">Tipo</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden lg:table-cell">Control</th>
                    <th className="text-left px-4 py-2.5 font-medium">Fecha Límite</th>
                    <th className="text-left px-4 py-2.5 font-medium">Prioridad</th>
                    <th className="text-left px-4 py-2.5 font-medium">Estado</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {tasks.map((t) => {
                    const status = taskStatusConfig[t.status]
                    const prio = priorityConfig[t.priority]
                    const type = typeConfig[t.type]
                    return (
                      <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{t.id}</td>
                        <td className="px-4 py-3 max-w-65">
                          <p className="font-medium text-sm leading-tight truncate">{t.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{t.department}</p>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div className="flex items-center gap-1.5 text-xs">
                            <UserIcon className="size-3 text-muted-foreground shrink-0" />
                            <span>{t.owner}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className={`${badgeCls} ${type.cls}`}>{type.label}</span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <div className="flex items-center gap-1 text-xs">
                            <LinkIcon className="size-3 text-muted-foreground shrink-0" />
                            <span className="font-mono">{t.control}</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{t.framework}</p>
                        </td>
                        <td className="px-4 py-3 text-xs whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <ClockIcon className={`size-3 shrink-0 ${t.status === "overdue" ? "text-red-500" : "text-muted-foreground"}`} />
                            <span className={t.status === "overdue" ? "text-red-600 dark:text-red-400 font-medium" : ""}>{t.dueDate}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`${badgeCls} ${prio.cls}`}>{prio.label}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`${badgeCls} ${status.cls}`}>{status.label}</span>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="xs" asChild>
                            <a href="#">Ver</a>
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

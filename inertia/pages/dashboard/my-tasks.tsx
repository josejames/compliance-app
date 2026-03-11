import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import { SidebarTrigger } from "~/components/ui/sidebar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import {
  CheckCircle2Icon,
  ClockIcon,
  AlertCircleIcon,
  UploadIcon,
  ListTodoIcon,
  ChevronRightIcon,
  SlidersHorizontalIcon,
} from "lucide-react"

interface Task {
  id: number
  title: string
  framework: string
  control: string
  priority: "high" | "medium" | "low"
  status: "overdue" | "in_progress" | "pending"
  dueDate: string
  daysLeft: number
  evidenceRequired: boolean
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Revisar política de control de acceso",
    framework: "ISO 27001",
    control: "A.9.1.1",
    priority: "high",
    status: "pending",
    dueDate: "12 Mar 2026",
    daysLeft: 2,
    evidenceRequired: true,
  },
  {
    id: 2,
    title: "Capacitación obligatoria GDPR – Módulo 3",
    framework: "GDPR",
    control: "Art. 39",
    priority: "medium",
    status: "in_progress",
    dueDate: "15 Mar 2026",
    daysLeft: 5,
    evidenceRequired: false,
  },
  {
    id: 3,
    title: "Subir evidencia de copias de seguridad",
    framework: "ISO 27001",
    control: "A.12.3.1",
    priority: "high",
    status: "overdue",
    dueDate: "08 Mar 2026",
    daysLeft: -2,
    evidenceRequired: true,
  },
  {
    id: 4,
    title: "Validar inventario de activos de información",
    framework: "ISO 27001",
    control: "A.8.1.1",
    priority: "medium",
    status: "pending",
    dueDate: "20 Mar 2026",
    daysLeft: 10,
    evidenceRequired: true,
  },
  {
    id: 5,
    title: "Revisar derechos de acceso de proveedores",
    framework: "SOC 2",
    control: "CC6.7",
    priority: "low",
    status: "pending",
    dueDate: "28 Mar 2026",
    daysLeft: 18,
    evidenceRequired: false,
  },
  {
    id: 6,
    title: "Actualizar registro de riesgos operacionales",
    framework: "ISO 27001",
    control: "A.6.1.2",
    priority: "medium",
    status: "overdue",
    dueDate: "05 Mar 2026",
    daysLeft: -5,
    evidenceRequired: false,
  },
  {
    id: 7,
    title: "Confirmar notificación de brecha de datos",
    framework: "GDPR",
    control: "Art. 33",
    priority: "high",
    status: "pending",
    dueDate: "14 Mar 2026",
    daysLeft: 4,
    evidenceRequired: true,
  },
]

function getPriorityBadge(p: Task["priority"]) {
  if (p === "high") return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
  if (p === "medium") return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
  return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
}

function getPriorityLabel(p: Task["priority"]) {
  return p === "high" ? "Alta" : p === "medium" ? "Media" : "Baja"
}

function getStatusStyle(s: Task["status"]) {
  if (s === "overdue")
    return {
      bg: "bg-red-50/70 border-red-200 dark:bg-red-950/20 dark:border-red-900",
      label: "Vencida",
      labelCls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    }
  if (s === "in_progress")
    return {
      bg: "bg-blue-50/70 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900",
      label: "En curso",
      labelCls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
    }
  return {
    bg: "bg-background border-border/50",
    label: "Pendiente",
    labelCls: "bg-muted text-muted-foreground",
  }
}

export default function Page() {
  const overdueCount = tasks.filter((t) => t.status === "overdue").length
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length
  const pendingCount = tasks.filter((t) => t.status === "pending").length
  const doneCount = 5 // mock

  const sorted = [...tasks].sort((a, b) => a.daysLeft - b.daysLeft)

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Panel Principal</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Mis Tareas Pendientes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mis Tareas Pendientes</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Tareas asignadas a tu usuario que requieren atención
            </p>
          </div>
          <Button variant="outline" size="sm">
            <SlidersHorizontalIcon />
            Filtrar
          </Button>
        </div>

        {/* Status summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-red-200 dark:border-red-900 bg-red-50/40 dark:bg-red-950/10">
            <CardHeader>
              <CardDescription className="text-red-600 dark:text-red-400">Vencidas</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {overdueCount}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-red-600/70 dark:text-red-400/70">
                Requieren acción inmediata
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>En Curso</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {inProgressCount}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Actualmente en progreso</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Pendientes</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {pendingCount}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Sin iniciar aún</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Completadas este mes</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {doneCount}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Tareas cerradas en marzo</p>
            </CardContent>
          </Card>
        </div>

        {/* Task list */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Tareas</CardTitle>
            <CardDescription>
              Ordenadas por fecha de vencimiento · {tasks.length} tareas activas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {sorted.map((task) => {
              const style = getStatusStyle(task.status)
              return (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors hover:bg-muted/30 ${style.bg}`}
                >
                  {/* Status icon */}
                  <div className="shrink-0">
                    {task.status === "overdue" && (
                      <AlertCircleIcon className="size-5 text-red-500" />
                    )}
                    {task.status === "in_progress" && (
                      <ClockIcon className="size-5 text-blue-500" />
                    )}
                    {task.status === "pending" && (
                      <ListTodoIcon className="size-5 text-muted-foreground" />
                    )}
                  </div>

                  {/* Task info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{task.title}</p>
                    <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground">
                      <span>{task.framework}</span>
                      <span>·</span>
                      <span className="font-mono">{task.control}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${getPriorityBadge(task.priority)}`}
                    >
                      {getPriorityLabel(task.priority)}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.labelCls}`}
                    >
                      {style.label}
                    </span>
                  </div>

                  {/* Due date */}
                  <div className="text-right min-w-20 shrink-0">
                    <p className="text-xs font-medium">{task.dueDate}</p>
                    <p
                      className={`text-[10px] tabular-nums ${
                        task.daysLeft < 0
                          ? "text-red-500 font-semibold"
                          : task.daysLeft <= 3
                            ? "text-amber-500 font-medium"
                            : "text-muted-foreground"
                      }`}
                    >
                      {task.daysLeft < 0
                        ? `${Math.abs(task.daysLeft)}d de retraso`
                        : task.daysLeft === 0
                          ? "Vence hoy"
                          : `en ${task.daysLeft}d`}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {task.evidenceRequired && (
                      <Button variant="outline" size="sm">
                        <UploadIcon />
                        Evidencia
                      </Button>
                    )}
                    <Button variant="outline" size="icon-sm" title="Marcar completada">
                      <CheckCircle2Icon />
                    </Button>
                    <Button variant="ghost" size="icon-sm" title="Ver detalles">
                      <ChevronRightIcon />
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

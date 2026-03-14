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
  RefreshCwIcon,
  ClockIcon,
  CalendarIcon,
  UserIcon,
  LinkIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  CheckCircle2Icon,
} from "lucide-react"
import { badgeCls, priorityConfig, scoreBgCls } from "~/lib/compliance_ui"

type RecurringStatus = "active" | "paused" | "completed"
type Frequency = "daily" | "weekly" | "monthly" | "quarterly" | "annual"
type TaskPriority = "high" | "medium" | "low"

interface RecurringTask {
  id: string
  name: string
  description: string
  frequency: Frequency
  nextRun: string
  lastRun: string | null
  owner: string
  control: string
  framework: string
  priority: TaskPriority
  status: RecurringStatus
  completedThisCycle: boolean
}

const recurringTasks: RecurringTask[] = [
  { id: "REC-001", name: "Revisión de accesos privilegiados", description: "Certificar y actualizar la lista de usuarios con privilegios de administrador.", frequency: "monthly", nextRun: "01 Abr 2026", lastRun: "01 Mar 2026", owner: "Laura Martínez", control: "SOC2 CC6.3", framework: "SOC 2", priority: "high", status: "active", completedThisCycle: true },
  { id: "REC-002", name: "Backup y prueba de restauración", description: "Verificar la integridad de los backups y probar el proceso de restauración.", frequency: "monthly", nextRun: "15 Mar 2026", lastRun: "15 Feb 2026", owner: "Carlos Rodríguez", control: "SOC2 CC9.2", framework: "SOC 2", priority: "high", status: "active", completedThisCycle: false },
  { id: "REC-003", name: "Análisis de vulnerabilidades de red", description: "Ejecutar escaneo de vulnerabilidades en la infraestructura perimetral.", frequency: "monthly", nextRun: "20 Mar 2026", lastRun: "20 Feb 2026", owner: "Pablo Torres", control: "ISO A.12.6", framework: "ISO 27001", priority: "high", status: "active", completedThisCycle: false },
  { id: "REC-004", name: "Revisión del plan de riesgos", description: "Actualizar el registro de riesgos y validar planes de mitigación vigentes.", frequency: "quarterly", nextRun: "01 Abr 2026", lastRun: "01 Ene 2026", owner: "Ana García", control: "ISO A.6.1", framework: "ISO 27001", priority: "medium", status: "active", completedThisCycle: false },
  { id: "REC-005", name: "Formación obligatoria en seguridad", description: "Completar el módulo de formación anual en concienciación de seguridad para todo el personal.", frequency: "annual", nextRun: "01 Ene 2027", lastRun: "01 Ene 2026", owner: "María González", control: "ISO A.7.2", framework: "ISO 27001", priority: "medium", status: "active", completedThisCycle: true },
  { id: "REC-006", name: "Simulacro de recuperación ante desastres", description: "Ejecutar el plan DR completo e identificar gaps en tiempos de recuperación.", frequency: "annual", nextRun: "15 Sep 2026", lastRun: "15 Sep 2025", owner: "Pablo Torres", control: "SOC2 CC9.1", framework: "SOC 2", priority: "high", status: "active", completedThisCycle: false },
  { id: "REC-007", name: "Auditoría interna de controles PCI DSS", description: "Revisión interna trimestral de los controles en el entorno de datos de tarjetas.", frequency: "quarterly", nextRun: "05 Abr 2026", lastRun: "05 Ene 2026", owner: "Laura Martínez", control: "PCI DSS 12.2", framework: "PCI DSS", priority: "high", status: "active", completedThisCycle: false },
  { id: "REC-008", name: "Revisión semanal de alertas de seguridad", description: "Analizar y clasificar alertas del SIEM de la semana anterior.", frequency: "weekly", nextRun: "16 Mar 2026", lastRun: "09 Mar 2026", owner: "Carlos Rodríguez", control: "ISO A.12.4", framework: "ISO 27001", priority: "medium", status: "active", completedThisCycle: true },
  { id: "REC-009", name: "Verificación diaria de disponibilidad de sistemas", description: "Confirmar disponibilidad de sistemas críticos y revisar dashboards de monitorización.", frequency: "daily", nextRun: "14 Mar 2026", lastRun: "13 Mar 2026", owner: "Carlos Rodríguez", control: "SOC2 A1.1", framework: "SOC 2", priority: "medium", status: "active", completedThisCycle: true },
  { id: "REC-010", name: "Revisión de contratos de terceros", description: "Verificar vencimientos de contratos con proveedores y actualizar cláusulas de seguridad.", frequency: "annual", nextRun: "01 Jun 2026", lastRun: "01 Jun 2025", owner: "Elena Sánchez", control: "GDPR Art. 28", framework: "GDPR", priority: "medium", status: "paused", completedThisCycle: false },
  { id: "REC-011", name: "Test de phishing simulado", description: "Ejecutar campaña de phishing simulado para medir concienciación del personal.", frequency: "quarterly", nextRun: "N/A", lastRun: "01 Dic 2025", owner: "María González", control: "ISO A.7.2", framework: "ISO 27001", priority: "low", status: "paused", completedThisCycle: false },
  { id: "REC-012", name: "Informe mensual de cumplimiento para dirección", description: "Generar y distribuir el informe ejecutivo de KPIs de cumplimiento del mes.", frequency: "monthly", nextRun: "31 Mar 2026", lastRun: "28 Feb 2026", owner: "Ana García", control: "ISO A.6.1", framework: "ISO 27001", priority: "medium", status: "active", completedThisCycle: false },
]

const frequencyConfig: Record<Frequency, { label: string; cls: string }> = {
  daily: { label: "Diaria", cls: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400" },
  weekly: { label: "Semanal", cls: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400" },
  monthly: { label: "Mensual", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
  quarterly: { label: "Trimestral", cls: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400" },
  annual: { label: "Anual", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
}

const taskStatusConfig: Record<RecurringStatus, { label: string; cls: string }> = {
  active: { label: "Activa", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
  paused: { label: "Pausada", cls: "bg-muted text-muted-foreground" },
  completed: { label: "Finalizada", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
}

const activeTasks = recurringTasks.filter(t => t.status === "active").length
const pausedTasks = recurringTasks.filter(t => t.status === "paused").length
const pendingThisCycle = recurringTasks.filter(t => t.status === "active" && !t.completedThisCycle).length
const completedThisCycle = recurringTasks.filter(t => t.status === "active" && t.completedThisCycle).length
const completionRateCycle = activeTasks > 0 ? Math.round((completedThisCycle / activeTasks) * 100) : 0

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[
        { label: "Panel Principal", href: "/" },
        { label: "Tareas y Flujos de Trabajo", href: "/tareas-workflows" },
        { label: "Tareas Recurrentes" },
      ]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">6.3. Tareas Recurrentes</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Plantillas de tareas con programación automática vinculadas a controles normativos
            </p>
          </div>
          <Button size="sm">
            <PlusIcon /> Nueva Plantilla
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Plantillas Activas</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{activeTasks}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className={`${badgeCls} bg-muted text-muted-foreground`}>{pausedTasks} pausadas</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Pendientes Este Ciclo</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-amber-600 dark:text-amber-400">{pendingThisCycle}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Sin completar en el ciclo actual</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Completadas Este Ciclo</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{completedThisCycle}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-2">
                <div className={`h-2 rounded-full ${scoreBgCls(completionRateCycle)}`} style={{ width: `${completionRateCycle}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{completionRateCycle}% de cobertura</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Próximas 7 Días</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">6</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Ejecuciones programadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Task list */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Plantillas de Tareas Recurrentes</CardTitle>
            <CardDescription className="text-xs">{recurringTasks.length} plantillas configuradas</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40 text-xs text-muted-foreground uppercase tracking-wide">
                    <th className="text-left px-4 py-2.5 font-medium">Tarea</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden md:table-cell">Frecuencia</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden lg:table-cell">Próxima Ejecución</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden lg:table-cell">Responsable</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden xl:table-cell">Control</th>
                    <th className="text-left px-4 py-2.5 font-medium">Prioridad</th>
                    <th className="text-left px-4 py-2.5 font-medium">Estado</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden md:table-cell">Ciclo actual</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recurringTasks.map((t) => {
                    const freq = frequencyConfig[t.frequency]
                    const status = taskStatusConfig[t.status]
                    const prio = priorityConfig[t.priority]
                    return (
                      <tr key={t.id} className={`hover:bg-muted/30 transition-colors ${t.status === "paused" ? "opacity-60" : ""}`}>
                        <td className="px-4 py-3 max-w-60">
                          <div className="flex items-start gap-2">
                            <RefreshCwIcon className="size-3.5 text-muted-foreground mt-0.5 shrink-0" />
                            <div className="min-w-0">
                              <p className="font-medium text-sm leading-tight truncate">{t.name}</p>
                              <p className="text-[10px] font-mono text-muted-foreground">{t.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className={`${badgeCls} ${freq.cls}`}>{freq.label}</span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <div className="flex items-center gap-1 text-xs">
                            <CalendarIcon className="size-3 text-muted-foreground shrink-0" />
                            <span>{t.nextRun}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <div className="flex items-center gap-1 text-xs">
                            <UserIcon className="size-3 text-muted-foreground shrink-0" />
                            <span>{t.owner}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden xl:table-cell">
                          <div className="flex items-center gap-1 text-xs">
                            <LinkIcon className="size-3 text-muted-foreground shrink-0" />
                            <span className="font-mono">{t.control}</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{t.framework}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`${badgeCls} ${prio.cls}`}>{prio.label}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`${badgeCls} ${status.cls}`}>{status.label}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          {t.status === "active" && (
                            t.completedThisCycle
                              ? <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400"><CheckCircle2Icon className="size-3.5" /> Completada</span>
                              : <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400"><ClockIcon className="size-3.5" /> Pendiente</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {t.status === "active"
                            ? <Button variant="ghost" size="xs"><PauseCircleIcon /> Pausar</Button>
                            : t.status === "paused"
                              ? <Button variant="ghost" size="xs"><PlayCircleIcon /> Reanudar</Button>
                              : null
                          }
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

import { PageHeader } from "~/components/page-header"
import { levelConfig } from "~/lib/compliance_ui"
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
  CheckCircle2Icon,
  ClockIcon,
  AlertCircleIcon,
  XCircleIcon,
  LinkIcon,
  TrendingDownIcon,
  UserIcon,
  CalendarIcon,
  ArrowRightIcon,
  ChevronRightIcon,
} from "lucide-react"

type ActionStatus = "completed" | "in-progress" | "pending" | "overdue"
type RiskLevel = "critical" | "high" | "medium" | "low"

interface MitigationAction {
  id: string
  riskId: string
  riskTitle: string
  currentLevel: RiskLevel
  residualLevel: RiskLevel
  action: string
  description: string
  owner: string
  dueDate: string
  daysLeft: number
  status: ActionStatus
  progress: number
  linkedTaskId: string | null
  currentScore: number
  residualScore: number
}

const actions: MitigationAction[] = [
  { id: "MIT-001", riskId: "RSK-001", riskTitle: "Acceso no autorizado a sistemas críticos", currentLevel: "critical", residualLevel: "medium", action: "Implementar MFA en todos los sistemas críticos", description: "Despliegue de autenticación multifactor en los 12 sistemas identificados como críticos.", owner: "Carlos Rodríguez", dueDate: "20 Mar 2026", daysLeft: 7, status: "in-progress", progress: 70, linkedTaskId: "TSK-045", currentScore: 20, residualScore: 8 },
  { id: "MIT-002", riskId: "RSK-001", riskTitle: "Acceso no autorizado a sistemas críticos", currentLevel: "critical", residualLevel: "low", action: "Revisar y revocar accesos privilegiados innecesarios", description: "Auditoría completa de cuentas privilegiadas y revocación de accesos no justificados.", owner: "Laura Martínez", dueDate: "15 Mar 2026", daysLeft: 2, status: "in-progress", progress: 85, linkedTaskId: "TSK-046", currentScore: 20, residualScore: 4 },
  { id: "MIT-003", riskId: "RSK-002", riskTitle: "Filtración de datos personales de clientes", currentLevel: "high", residualLevel: "low", action: "Cifrado end-to-end en base de datos de clientes", description: "Aplicar cifrado AES-256 a la base de datos CRM y auditar transferencias de datos.", owner: "Ana García", dueDate: "10 Mar 2026", daysLeft: -3, status: "overdue", progress: 50, linkedTaskId: "TSK-047", currentScore: 15, residualScore: 3 },
  { id: "MIT-004", riskId: "RSK-003", riskTitle: "Ransomware en infraestructura on-premise", currentLevel: "high", residualLevel: "medium", action: "Desplegar solución EDR en todos los endpoints", description: "Instalación y configuración de herramienta EDR con detección en tiempo real.", owner: "Pablo Torres", dueDate: "30 Mar 2026", daysLeft: 17, status: "pending", progress: 10, linkedTaskId: "TSK-051", currentScore: 15, residualScore: 6 },
  { id: "MIT-005", riskId: "RSK-004", riskTitle: "Incumplimiento GDPR por retención excesiva", currentLevel: "high", residualLevel: "low", action: "Automatizar purga de datos según política de retención", description: "Configurar pipeline de eliminación automática de datos caducados en los sistemas de RRHH y CRM.", owner: "María González", dueDate: "25 Feb 2026", daysLeft: -16, status: "overdue", progress: 30, linkedTaskId: "TSK-052", currentScore: 16, residualScore: 4 },
  { id: "MIT-006", riskId: "RSK-005", riskTitle: "Fallo de proveedor cloud principal", currentLevel: "high", residualLevel: "medium", action: "Contratar seguro de responsabilidad civil TI", description: "Negociación y contratación de póliza de ciberriesgo con cobertura de continuidad de negocio.", owner: "Elena Sánchez", dueDate: "01 Abr 2026", daysLeft: 19, status: "pending", progress: 0, linkedTaskId: null, currentScore: 12, residualScore: 6 },
  { id: "MIT-007", riskId: "RSK-006", riskTitle: "Vulnerabilidad sin parchear en aplicación web", currentLevel: "high", residualLevel: "low", action: "Aplicar parches críticos en portal e-commerce", description: "Aplicación urgente de parches CVE-2025-11872 y CVE-2025-11901 en el entorno de producción.", owner: "Pablo Torres", dueDate: "12 Mar 2026", daysLeft: -1, status: "overdue", progress: 60, linkedTaskId: "TSK-053", currentScore: 16, residualScore: 4 },
  { id: "MIT-008", riskId: "RSK-007", riskTitle: "Pérdida de datos por error humano", currentLevel: "medium", residualLevel: "low", action: "Implantar formación obligatoria en manejo de datos", description: "Programa de microlearning trimestral sobre buenas prácticas de gestión de datos sensibles.", owner: "Ana García", dueDate: "28 Feb 2026", daysLeft: 0, status: "completed", progress: 100, linkedTaskId: "TSK-040", currentScore: 12, residualScore: 3 },
  { id: "MIT-009", riskId: "RSK-008", riskTitle: "Fraude interno por empleado con acceso privilegiado", currentLevel: "high", residualLevel: "medium", action: "Implementar monitorización de comportamiento de usuarios (UBA)", description: "Despliegue de software de análisis de comportamiento de usuarios (UEBA) en sistemas críticos.", owner: "Carlos Rodríguez", dueDate: "15 Abr 2026", daysLeft: 33, status: "pending", progress: 0, linkedTaskId: null, currentScore: 10, residualScore: 6 },
  { id: "MIT-010", riskId: "RSK-009", riskTitle: "No conformidad en auditoría PCI DSS", currentLevel: "high", residualLevel: "low", action: "Remediar hallazgos del último análisis ASV", description: "Corrección de las 9 no conformidades detectadas en el último scan de vulnerabilidades PCI.", owner: "María González", dueDate: "20 Mar 2026", daysLeft: 7, status: "in-progress", progress: 45, linkedTaskId: "TSK-055", currentScore: 12, residualScore: 4 },
]

const statusConfig: Record<ActionStatus, { label: string; cls: string; icon: typeof CheckCircle2Icon; iconCls: string }> = {
  completed: { label: "Completada", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400", icon: CheckCircle2Icon, iconCls: "text-green-500" },
  "in-progress": { label: "En curso", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400", icon: ClockIcon, iconCls: "text-blue-500" },
  pending: { label: "Pendiente", cls: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", icon: AlertCircleIcon, iconCls: "text-muted-foreground" },
  overdue: { label: "Vencida", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", icon: XCircleIcon, iconCls: "text-red-500" },
}

export default function Page() {
  const counts = {
    completed: actions.filter((a) => a.status === "completed").length,
    inProgress: actions.filter((a) => a.status === "in-progress").length,
    pending: actions.filter((a) => a.status === "pending").length,
    overdue: actions.filter((a) => a.status === "overdue").length,
  }
  const avgReduction = Math.round(actions.reduce((acc, a) => acc + (a.currentScore - a.residualScore), 0) / actions.length)

  return (
    <>
      <PageHeader crumbs={[{ label: "Riesgos", href: "/riesgos" }, { label: "Plan de Mitigación" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Plan de Mitigación</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Seguimiento de acciones para reducir los riesgos identificados
            </p>
          </div>
          <Button size="sm"><PlusIcon />Nueva acción</Button>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-red-200 dark:border-red-900 bg-red-50/40 dark:bg-red-950/10">
            <CardHeader>
              <CardDescription className="text-red-600 dark:text-red-400">Acciones Vencidas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-red-600 dark:text-red-400">{counts.overdue}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-red-600/70 dark:text-red-400/70">Requieren atención inmediata</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>En Curso</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{counts.inProgress}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Activas ahora</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Completadas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{counts.completed}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-green-500" style={{ width: `${Math.round((counts.completed / actions.length) * 100)}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{Math.round((counts.completed / actions.length) * 100)}% del plan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Reducción de Riesgo Promedio</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">−{avgReduction}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground flex items-center gap-1"><TrendingDownIcon className="size-3 text-emerald-500" />puntos de score por acción</p></CardContent>
          </Card>
        </div>

        {/* Mitigation actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones de Mitigación</CardTitle>
            <CardDescription>
              {actions.length} acciones para {new Set(actions.map((a) => a.riskId)).size} riesgos · ordenadas por urgencia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[...actions]
              .sort((a, b) => {
                const order: ActionStatus[] = ["overdue", "in-progress", "pending", "completed"]
                return order.indexOf(a.status) - order.indexOf(b.status)
              })
              .map((act) => {
                const sCfg = statusConfig[act.status]
                const StatusIcon = sCfg.icon
                const currCfg = levelConfig[act.currentLevel]
                const residCfg = levelConfig[act.residualLevel]
                return (
                  <div key={act.id} className={`rounded-lg border px-4 py-4 space-y-3 ${
                    act.status === "overdue" ? "border-red-200 bg-red-50/40 dark:border-red-900 dark:bg-red-950/10" :
                    act.status === "completed" ? "border-border/40 bg-muted/10 opacity-70" : "border-border/50"
                  }`}>
                    {/* Top row */}
                    <div className="flex items-start gap-3">
                      <StatusIcon className={`size-5 shrink-0 mt-0.5 ${sCfg.iconCls}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs text-muted-foreground">{act.id}</span>
                          <span className="font-semibold text-sm">{act.action}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{act.description}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sCfg.cls}`}>{sCfg.label}</span>
                        <Button variant="ghost" size="icon-sm"><ChevronRightIcon /></Button>
                      </div>
                    </div>

                    {/* Risk context row */}
                    <div className="flex items-center gap-3 pl-8 flex-wrap">
                      <span className="text-xs text-muted-foreground">Riesgo: <span className="font-medium text-foreground">{act.riskTitle}</span></span>
                      <span className="flex items-center gap-1 text-xs">
                        <span className={`px-1.5 py-0.5 rounded font-medium text-[10px] ${currCfg.cls}`}>{currCfg.label} ({act.currentScore})</span>
                        <ArrowRightIcon className="size-3 text-muted-foreground" />
                        <span className={`px-1.5 py-0.5 rounded font-medium text-[10px] ${residCfg.cls}`}>{residCfg.label} ({act.residualScore})</span>
                      </span>
                    </div>

                    {/* Progress + meta */}
                    <div className="pl-8 space-y-2">
                      {act.status !== "pending" && act.status !== "completed" && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden max-w-xs">
                            <div className={`h-full rounded-full ${
                              act.status === "overdue" ? "bg-red-500" : "bg-blue-500"
                            }`} style={{ width: `${act.progress}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{act.progress}%</span>
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><UserIcon className="size-3" />{act.owner}</span>
                        <span className={`flex items-center gap-1 font-medium ${
                          act.daysLeft < 0 ? "text-red-600 dark:text-red-400" :
                          act.daysLeft <= 3 ? "text-amber-600 dark:text-amber-400" : ""
                        }`}>
                          <CalendarIcon className="size-3" />
                          {act.dueDate}
                          {act.daysLeft < 0 && ` · ${Math.abs(act.daysLeft)}d de retraso`}
                          {act.daysLeft >= 0 && act.status !== "completed" && ` · en ${act.daysLeft}d`}
                        </span>
                        {act.linkedTaskId && (
                          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                            <LinkIcon className="size-3" />
                            Tarea vinculada: {act.linkedTaskId}
                          </span>
                        )}
                      </div>
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

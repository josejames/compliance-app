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
  ClipboardEditIcon,
  CheckCircle2Icon,
  ClockIcon,
  PlayCircleIcon,
  BuildingIcon,
  BoxIcon,
  FolderKanbanIcon,
  ChevronRightIcon,
  CalendarIcon,
  UserIcon,
} from "lucide-react"

type EvalScope = "project" | "area" | "asset"
type EvalStatus = "completed" | "in-progress" | "scheduled"

interface Evaluation {
  id: string
  title: string
  scope: EvalScope
  scopeTarget: string
  status: EvalStatus
  progress: number
  risksFound: number
  riskLevel: "critical" | "high" | "medium" | "low"
  owner: string
  startDate: string
  endDate: string
  questionsTotal: number
  questionsAnswered: number
}

const evaluations: Evaluation[] = [
  { id: "EVA-001", title: "Evaluación infraestructura cloud Q1 2026", scope: "asset", scopeTarget: "Infraestructura AWS", status: "completed", progress: 100, risksFound: 7, riskLevel: "high", owner: "Pablo Torres", startDate: "02 Ene 2026", endDate: "20 Ene 2026", questionsTotal: 45, questionsAnswered: 45 },
  { id: "EVA-002", title: "Evaluación GDPR – Área Legal", scope: "area", scopeTarget: "Departamento Legal", status: "completed", progress: 100, risksFound: 3, riskLevel: "medium", owner: "María González", startDate: "10 Ene 2026", endDate: "28 Ene 2026", questionsTotal: 32, questionsAnswered: 32 },
  { id: "EVA-003", title: "Proyecto ERP – Análisis de riesgo", scope: "project", scopeTarget: "Proyecto ERP SAP", status: "completed", progress: 100, risksFound: 5, riskLevel: "high", owner: "Elena Sánchez", startDate: "15 Ene 2026", endDate: "05 Feb 2026", questionsTotal: 38, questionsAnswered: 38 },
  { id: "EVA-004", title: "Evaluación seguridad aplicaciones web", scope: "asset", scopeTarget: "Portal de clientes", status: "in-progress", progress: 65, risksFound: 4, riskLevel: "critical", owner: "Carlos Rodríguez", startDate: "01 Mar 2026", endDate: "20 Mar 2026", questionsTotal: 52, questionsAnswered: 34 },
  { id: "EVA-005", title: "Evaluación privacidad RRHH", scope: "area", scopeTarget: "Recursos Humanos", status: "in-progress", progress: 40, risksFound: 2, riskLevel: "medium", owner: "Ana García", startDate: "05 Mar 2026", endDate: "25 Mar 2026", questionsTotal: 28, questionsAnswered: 11 },
  { id: "EVA-006", title: "Evaluación PCI DSS – Pagos online", scope: "project", scopeTarget: "Plataforma e-commerce", status: "scheduled", progress: 0, risksFound: 0, riskLevel: "medium", owner: "Laura Martínez", startDate: "25 Mar 2026", endDate: "10 Abr 2026", questionsTotal: 60, questionsAnswered: 0 },
  { id: "EVA-007", title: "Revisión anual ISO 27001", scope: "asset", scopeTarget: "Organización completa", status: "scheduled", progress: 0, risksFound: 0, riskLevel: "low", owner: "Carlos Rodríguez", startDate: "01 Abr 2026", endDate: "30 Abr 2026", questionsTotal: 114, questionsAnswered: 0 },
]

const scopeConfig: Record<EvalScope, { icon: typeof BuildingIcon; label: string; cls: string }> = {
  project: { icon: FolderKanbanIcon, label: "Proyecto", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
  area: { icon: BuildingIcon, label: "Área", cls: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400" },
  asset: { icon: BoxIcon, label: "Activo", cls: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400" },
}

const statusConfig: Record<EvalStatus, { label: string; cls: string; icon: typeof CheckCircle2Icon }> = {
  completed: { label: "Completada", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400", icon: CheckCircle2Icon },
  "in-progress": { label: "En curso", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400", icon: PlayCircleIcon },
  scheduled: { label: "Programada", cls: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", icon: ClockIcon },
}

const levelConfig: Record<string, { label: string; cls: string }> = {
  critical: { label: "Crítico", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  high: { label: "Alto", cls: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400" },
  medium: { label: "Medio", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  low: { label: "Bajo", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
}

// Mock questionnaire for the active evaluation
const sampleQuestions = [
  { id: 1, text: "¿Existen mecanismos de autenticación multifactor en todos los accesos?", answer: "Sí", impact: 4, confidence: "high" },
  { id: 2, text: "¿Se realizan análisis de vulnerabilidades con frecuencia al menos mensual?", answer: "No", impact: 5, confidence: "high" },
  { id: 3, text: "¿Los logs de acceso se retienen durante al menos 12 meses?", answer: "Parcialmente", impact: 3, confidence: "medium" },
  { id: 4, text: "¿Existe un proceso formal de gestión de parches críticos en ≤72 h?", answer: "No", impact: 5, confidence: "high" },
  { id: 5, text: "¿El entorno de producción está aislado del entorno de desarrollo?", answer: "Sí", impact: 4, confidence: "high" },
]

const answerColors: Record<string, string> = {
  Sí: "text-green-600 dark:text-green-400",
  No: "text-red-600 dark:text-red-400",
  Parcialmente: "text-amber-600 dark:text-amber-400",
}

export default function Page() {
  const completed = evaluations.filter((e) => e.status === "completed").length
  const inProgress = evaluations.filter((e) => e.status === "in-progress").length
  const scheduled = evaluations.filter((e) => e.status === "scheduled").length

  return (
    <>
      <PageHeader crumbs={[{ label: "Riesgos", href: "/riesgos" }, { label: "Evaluación de Riesgos" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Evaluación de Riesgos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Evaluaciones por proyecto, área o activo · cuestionarios dinámicos de riesgo
            </p>
          </div>
          <Button size="sm"><PlusIcon />Nueva evaluación</Button>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Evaluaciones</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{evaluations.length}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">en el período actual</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Completadas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{completed}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground flex items-center gap-1"><CheckCircle2Icon className="size-3 text-green-500" />Con informe generado</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>En Curso</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{inProgress}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground flex items-center gap-1"><PlayCircleIcon className="size-3 text-blue-500" />Cuestionarios activos</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Programadas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-slate-600 dark:text-slate-400">{scheduled}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground flex items-center gap-1"><ClockIcon className="size-3" />Próximas a iniciar</p></CardContent>
          </Card>
        </div>

        {/* Evaluation list */}
        <Card>
          <CardHeader>
            <CardTitle>Evaluaciones</CardTitle>
            <CardDescription>Historial y estado de todas las evaluaciones de riesgo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {evaluations.map((ev) => {
              const sCfg = statusConfig[ev.status]
              const escCfg = scopeConfig[ev.scope]
              const lvlCfg = levelConfig[ev.riskLevel]
              const StatusIcon = sCfg.icon
              const ScopeIcon = escCfg.icon
              return (
                <div key={ev.id} className="flex items-center gap-4 rounded-lg border border-border/50 px-4 py-3 hover:bg-muted/20 transition-colors">
                  <StatusIcon className={`size-5 shrink-0 ${ev.status === 'completed' ? 'text-green-500' : ev.status === 'in-progress' ? 'text-blue-500' : 'text-muted-foreground'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{ev.title}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1"><ScopeIcon className="size-3" />{ev.scopeTarget}</span>
                      <span className="flex items-center gap-1"><UserIcon className="size-3" />{ev.owner}</span>
                      <span className="flex items-center gap-1"><CalendarIcon className="size-3" />{ev.startDate} → {ev.endDate}</span>
                    </div>
                    {ev.status === "in-progress" && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden max-w-xs">
                          <div className="h-full rounded-full bg-blue-500" style={{ width: `${ev.progress}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{ev.questionsAnswered}/{ev.questionsTotal} preguntas</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${escCfg.cls}`}>{escCfg.label}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${sCfg.cls}`}>{sCfg.label}</span>
                    {ev.status !== "scheduled" && (
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${lvlCfg.cls}`}>{ev.risksFound} riesgos</span>
                    )}
                    <Button variant="outline" size="sm">{ev.status === "in-progress" ? "Continuar" : ev.status === "scheduled" ? "Iniciar" : "Ver informe"}<ChevronRightIcon /></Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Sample active questionnaire */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardEditIcon className="size-4" />
                  Cuestionario Activo – EVA-004
                </CardTitle>
                <CardDescription className="mt-1">
                  Evaluación seguridad aplicaciones web · Portal de clientes · 34/52 preguntas respondidas (65%)
                </CardDescription>
              </div>
              <Button size="sm">Continuar evaluación<ChevronRightIcon /></Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {sampleQuestions.map((q) => (
              <div key={q.id} className="flex items-start gap-3 rounded-lg border border-border/50 px-4 py-3">
                <span className="text-xs font-bold text-muted-foreground w-5 shrink-0 mt-0.5">{q.id}.</span>
                <p className="flex-1 text-sm leading-snug">{q.text}</p>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-muted-foreground">Impacto: <span className="font-bold">{q.impact}</span></span>
                  <span className={`text-sm font-semibold min-w-20 text-right ${answerColors[q.answer]}`}>{q.answer}</span>
                </div>
              </div>
            ))}
            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" size="sm">Guardar progreso</Button>
              <Button size="sm">Finalizar y generar informe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

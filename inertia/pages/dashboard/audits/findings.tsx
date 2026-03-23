import {
  AlertCircleIcon,
  ArrowRightIcon,
  CalendarIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  DownloadIcon,
  FileTextIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react"
import { PageHeader } from "~/components/page-header"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { badgeCls } from "~/lib/compliance_ui"
import { FindingSheet } from "~/components/sheets"

type Classification = "non-conformity" | "observation" | "improvement"
type FindingSeverity = "critical" | "high" | "medium" | "low"
type FindingStatus = "open" | "in-review" | "pending-closure" | "closed"

interface Finding {
  id: string
  title: string
  description: string
  audit: string
  framework: string
  classification: Classification
  severity: FindingSeverity
  owner: string
  dueDate: string
  openedDate: string
  status: FindingStatus
  actionPlan?: string
  closedDate?: string
}

const findings: Finding[] = [
  { id: "HAL-001", title: "Cifrado de datos en reposo deficiente", description: "Los volúmenes de la base de datos principal no tienen cifrado AES-256 activado, incumpliendo el control A.10.1 de ISO 27001:2022.", audit: "Auditoría ISO 27001:2022", framework: "ISO 27001", classification: "non-conformity", severity: "critical", owner: "Ing. Carlos Rodríguez", dueDate: "28 Mar 2026", openedDate: "08 Mar 2026", status: "in-review", actionPlan: "Implementar cifrado en todos los volúmenes antes del 28 Mar." },
  { id: "HAL-002", title: "Políticas de contraseñas desactualizadas", description: "La política de acceso no exige MFA ni mínimo de 12 caracteres conforme al control A.9.4.3 de ISO 27001:2022.", audit: "Auditoría ISO 27001:2022", framework: "ISO 27001", classification: "non-conformity", severity: "high", owner: "Lic. Ana García", dueDate: "15 Mar 2026", openedDate: "08 Mar 2026", status: "in-review", actionPlan: "Actualizar política y forzar cambio de contraseñas en el siguiente ciclo." },
  { id: "HAL-003", title: "Falta de evidencia de capacitación en privacidad", description: "No existen registros de capacitación en Aviso de Privacidad (Art. 17 LFPDPPP) para el 40% del personal con acceso a datos personales.", audit: "Revisión LFPDPPP — Aviso de Privacidad", framework: "LFPDPPP", classification: "observation", severity: "medium", owner: "Lic. María González", dueDate: "01 Abr 2026", openedDate: "15 Mar 2026", status: "pending-closure", actionPlan: "Completar capacitación LFPDPPP pendiente y subir constancias al LMS corporativo." },
  { id: "HAL-004", title: "Plan de recuperación ante desastres no probado en 18 meses", description: "El Plan de Recuperación ante Desastres no ha sido probado desde Sep 2024, incumpliendo el control A.17.1 de ISO 27001:2022.", audit: "Auditoría ISO 27001:2022", framework: "ISO 27001", classification: "non-conformity", severity: "high", owner: "Ing. Pablo Torres", dueDate: "20 Mar 2026", openedDate: "12 Mar 2026", status: "open", actionPlan: "Planificar simulacro de DR para la tercera semana de marzo." },
  { id: "HAL-005", title: "Ausencia de registro de accesos privilegiados", description: "No existe log centralizado de accesos de administrador a sistemas de producción, incumpliendo el control A.12.4 de ISO 27001:2022.", audit: "Auditoría ISO 27001:2022", framework: "ISO 27001", classification: "non-conformity", severity: "critical", owner: "Lic. Laura Martínez", dueDate: "18 Mar 2026", openedDate: "12 Mar 2026", status: "open", actionPlan: "Implementar SIEM con correlación de logs de accesos privilegiados." },
  { id: "HAL-006", title: "Contratos con terceros sin cláusulas de Aviso de Privacidad", description: "4 proveedores que procesan datos personales carecen de cláusula de Aviso de Privacidad conforme al Art. 21 de la LFPDPPP.", audit: "Revisión LFPDPPP — Aviso de Privacidad", framework: "LFPDPPP", classification: "observation", severity: "medium", owner: "Lic. Ana García", dueDate: "30 Mar 2026", openedDate: "16 Mar 2026", status: "in-review", actionPlan: "Actualizar contratos con cláusula de Aviso de Privacidad conforme a LFPDPPP Art. 21." },
  { id: "HAL-007", title: "Segmentación de red insuficiente en entorno de pagos", description: "El entorno de datos de titulares de tarjetas (CDE) no está correctamente aislado de la red corporativa, incumpliendo el requisito 1.3 de PCI DSS v4.0.", audit: "Revisión de Cumplimiento PCI DSS v4.0", framework: "PCI DSS", classification: "non-conformity", severity: "high", owner: "Ing. Pablo Torres", dueDate: "15 Abr 2026", openedDate: "01 Mar 2026", status: "open", actionPlan: "Rediseñar arquitectura VLAN para aislar correctamente el CDE conforme a PCI DSS v4.0." },
  { id: "HAL-008", title: "Registros de auditoría con retención menor a 12 meses", description: "Los logs de seguridad se eliminan a los 90 días; el control A.12.4.1 de ISO 27001:2022 requiere retención mínima de 12 meses.", audit: "Auditoría ISO 27001:2022", framework: "ISO 27001", classification: "observation", severity: "low", owner: "Ing. Carlos Rodríguez", dueDate: "20 Mar 2026", openedDate: "08 Mar 2026", status: "pending-closure", actionPlan: "Configurar retención de 365 días en el SIEM ya desplegado." },
  { id: "HAL-009", title: "Cambios a producción sin aprobación formal del CAB", description: "Se detectaron 3 despliegues a producción sin ticket de aprobación del Comité de Control de Cambios, incumpliendo el procedimiento PTI-CC-01.", audit: "Revisión NOM-035 / Proceso Interno", framework: "ISO 9001", classification: "improvement", severity: "low", owner: "Ing. Javier López", dueDate: "01 Mar 2026", openedDate: "08 Mar 2026", status: "closed", actionPlan: "Se activó aprobación obligatoria en la pipeline CI/CD. Procedimiento PTI-CC-01 actualizado.", closedDate: "28 Feb 2026" },
  { id: "HAL-010", title: "Ausencia de plan de continuidad para proveedor de pagos", description: "No existe plan de continuidad documentado para el fallo del proveedor principal de procesamiento, incumpliendo el requisito 12.3 de PCI DSS v4.0.", audit: "Revisión de Cumplimiento PCI DSS v4.0", framework: "PCI DSS", classification: "observation", severity: "medium", owner: "Lic. Elena Sánchez", dueDate: "10 Mar 2026", openedDate: "12 Mar 2026", status: "closed", actionPlan: "BCP documentado y aprobado por el Comité de Continuidad de Negocio.", closedDate: "08 Mar 2026" },
]

const classificationConfig: Record<Classification, { label: string; cls: string }> = {
  "non-conformity": { label: "No conformidad", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  "observation": { label: "Observación", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  "improvement": { label: "Oportunidad de mejora", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
}

const severityConfig: Record<FindingSeverity, { label: string; cls: string }> = {
  critical: { label: "Crítico", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  high: { label: "Alto", cls: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400" },
  medium: { label: "Medio", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  low: { label: "Bajo", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
}

const statusConfig: Record<FindingStatus, { label: string; cls: string; step: number }> = {
  "open": { label: "Abierto", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", step: 1 },
  "in-review": { label: "En revisión", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400", step: 2 },
  "pending-closure": { label: "Pendiente cierre", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400", step: 3 },
  "closed": { label: "Cerrado", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400", step: 4 },
}

const frameworkColors: Record<string, string> = {
  "ISO 27001": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  "LFPDPPP": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  "PCI DSS": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  "ISO 9001": "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
  "NOM-035": "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400",
}

const workflowSteps = ["Abierto", "En revisión", "Pendiente cierre", "Cerrado"]

const counts = {
  total: findings.length,
  open: findings.filter((f) => f.status === "open").length,
  inReview: findings.filter((f) => f.status === "in-review").length,
  pendingClosure: findings.filter((f) => f.status === "pending-closure").length,
  closed: findings.filter((f) => f.status === "closed").length,
  critical: findings.filter((f) => f.severity === "critical" && f.status !== "closed").length,
  high: findings.filter((f) => f.severity === "high" && f.status !== "closed").length,
}

export default function Page() {
  const active = findings.filter((f) => f.status !== "closed")
  const closed = findings.filter((f) => f.status === "closed")

  return (
    <>
      <PageHeader crumbs={[{ label: "Auditorías y Revisiones", href: "/auditorias" }, { label: "Gestión de Hallazgos" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Gestión de Hallazgos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {counts.total} hallazgos registrados · {counts.open + counts.inReview + counts.pendingClosure} abiertos
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><DownloadIcon />Exportar</Button>
            <FindingSheet trigger={<Button size="sm"><PlusIcon />Nuevo hallazgo</Button>} />
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Hallazgos Abiertos</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-red-600 dark:text-red-400">{counts.open}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className={`${badgeCls} bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400`}>{counts.critical} críticos</span>
                <span className={`${badgeCls} bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400`}>{counts.high} altos</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>En Revisión</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{counts.inReview}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Con plan de acción activo</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Pendientes de Cierre</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-amber-600 dark:text-amber-400">{counts.pendingClosure}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Acción completada, pendiente validación</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Cerrados</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{counts.closed}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="h-2 rounded-full bg-green-500" style={{ width: `${(counts.closed / counts.total) * 100}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{Math.round((counts.closed / counts.total) * 100)}% tasa de cierre</p>
            </CardContent>
          </Card>
        </div>

        {/* Workflow overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Estado del Flujo de Trabajo</CardTitle>
            <CardDescription className="text-xs">Ciclo de vida de hallazgos: identificación → revisión → cierre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-0">
              {workflowSteps.map((step, i) => {
                const countMap = [counts.open, counts.inReview, counts.pendingClosure, counts.closed]
                const colorMap = ["bg-red-500", "bg-blue-500", "bg-amber-500", "bg-green-500"]
                const textMap = ["text-red-600 dark:text-red-400", "text-blue-600 dark:text-blue-400", "text-amber-600 dark:text-amber-400", "text-green-600 dark:text-green-400"]
                return (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex-1 flex flex-col items-center gap-1 rounded-lg border bg-muted/30 p-3">
                      <span className={`text-2xl font-bold ${textMap[i]}`}>{countMap[i]}</span>
                      <span className="text-xs text-center text-muted-foreground font-medium">{step}</span>
                      <div className={`h-1 w-8 rounded-full ${colorMap[i]}`} />
                    </div>
                    {i < workflowSteps.length - 1 && (
                      <ArrowRightIcon className="size-4 text-muted-foreground mx-1 shrink-0" />
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium">Filtrar:</span>
          <button className={`${badgeCls} bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300`}>Todos</button>
          <span className="text-xs text-muted-foreground">Severidad:</span>
          <button className={`${badgeCls} bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400`}>Crítico</button>
          <button className={`${badgeCls} bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400`}>Alto</button>
          <button className={`${badgeCls} bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400`}>Medio</button>
          <span className="text-xs text-muted-foreground">Clasificación:</span>
          <button className={`${badgeCls} bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400`}>No conformidad</button>
          <button className={`${badgeCls} bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400`}>Observación</button>
          <span className="text-xs text-muted-foreground">Auditoría:</span>
          <button className={`${badgeCls} bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400`}>ISO 27001</button>
          <button className={`${badgeCls} bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400`}>LFPDPPP</button>
          <button className={`${badgeCls} bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400`}>PCI DSS</button>
        </div>

        {/* Active findings table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Hallazgos Activos</CardTitle>
                <CardDescription className="text-xs mt-0.5">{active.length} hallazgos requieren atención</CardDescription>
              </div>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2 size-4 text-muted-foreground" />
                <input
                  className="h-8 w-56 rounded-md border border-input bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Buscar hallazgo..."
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {active.map((f) => {
                const sev = severityConfig[f.severity]
                const cls = classificationConfig[f.classification]
                const st = statusConfig[f.status]
                const fwCls = frameworkColors[f.framework] ?? "bg-slate-100 text-slate-700"
                return (
                  <div key={f.id} className="px-6 py-4 hover:bg-muted/40 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <AlertCircleIcon className={`size-4 mt-0.5 shrink-0 ${f.severity === "critical" ? "text-red-500" : f.severity === "high" ? "text-orange-500" : f.severity === "medium" ? "text-amber-500" : "text-blue-500"}`} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs text-muted-foreground">{f.id}</span>
                            <p className="text-sm font-semibold leading-tight">{f.title}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{f.description}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1"><FileTextIcon className="size-3" />{f.audit}</span>
                            <span className="flex items-center gap-1"><UserIcon className="size-3" />{f.owner}</span>
                            <span className="flex items-center gap-1"><CalendarIcon className="size-3" />Vence {f.dueDate}</span>
                          </div>
                          {f.actionPlan && (
                            <div className="mt-2 flex items-start gap-1.5 text-xs bg-muted/60 rounded px-2 py-1.5">
                              <ChevronRightIcon className="size-3 mt-0.5 shrink-0 text-muted-foreground" />
                              <span className="text-muted-foreground"><span className="font-medium text-foreground">Plan:</span> {f.actionPlan}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span className={`${badgeCls} ${sev.cls}`}>{sev.label}</span>
                        <span className={`${badgeCls} ${st.cls}`}>{st.label}</span>
                        <span className={`${badgeCls} ${cls.cls}`}>{cls.label}</span>
                        <span className={`${badgeCls} ${fwCls}`}>{f.framework}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Closed findings */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-green-500" />
                  Hallazgos Cerrados
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">{closed.length} hallazgos cerrados satisfactoriamente</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {closed.map((f) => {
                const sev = severityConfig[f.severity]
                const cls = classificationConfig[f.classification]
                return (
                  <div key={f.id} className="flex items-start justify-between px-6 py-3 opacity-70">
                    <div className="flex items-start gap-3 min-w-0">
                      <CheckCircle2Icon className="size-4 mt-0.5 text-green-500 shrink-0" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{f.id}</span>
                          <p className="text-sm font-medium line-through text-muted-foreground">{f.title}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{f.audit} · Cerrado {f.closedDate}</p>
                        {f.actionPlan && <p className="text-xs text-muted-foreground mt-0.5">{f.actionPlan}</p>}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0 ml-3">
                      <span className={`${badgeCls} ${sev.cls}`}>{sev.label}</span>
                      <span className={`${badgeCls} ${cls.cls}`}>{cls.label}</span>
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

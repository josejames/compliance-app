import {
  AlertCircleIcon,
  BuildingIcon,
  CalendarIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  FlaskConicalIcon,
  SearchIcon,
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
import { badgeCls, scoreBgCls } from "~/lib/compliance_ui"

const sections = [
  {
    number: "4.1",
    title: "Plan de Auditorías",
    description:
      "Calendario y planificación de auditorías internas y externas. Asignación de auditores, alcance, fechas y estado de cada proceso.",
    href: "/auditorias/plan",
    icon: ClipboardListIcon,
    stats: [
      { label: "Programadas 2026", value: "8" },
      { label: "En curso", value: "2" },
    ],
    accent: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    number: "4.2",
    title: "Gestión de Hallazgos",
    description:
      "Registro de no conformidades, observaciones y oportunidades de mejora. Flujo de aprobación y cierre con planes de acción asociados.",
    href: "/auditorias/hallazgos",
    icon: SearchIcon,
    stats: [
      { label: "Hallazgos abiertos", value: "6" },
      { label: "Críticos", value: "2" },
    ],
    accent: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
  },
  {
    number: "4.3",
    title: "Programas de Pruebas",
    description:
      "Definición de procedimientos para probar la eficacia de los controles. Registro de resultados, cobertura y próximas fechas de ejecución.",
    href: "/auditorias/pruebas",
    icon: FlaskConicalIcon,
    stats: [
      { label: "Pruebas activas", value: "12" },
      { label: "Tasa superación", value: "67%" },
    ],
    accent: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
  },
]

interface UpcomingAudit {
  id: string
  name: string
  type: "internal" | "external"
  scope: string
  auditor: string
  startDate: string
  endDate: string
  status: "planned" | "in-progress" | "completed"
}

const upcomingAudits: UpcomingAudit[] = [
  { id: "AUD-2026-02", name: "Auditoría ISO 27001:2022", type: "external", scope: "Seguridad de la información", auditor: "Galindo & Asociados", startDate: "10 Mar 2026", endDate: "21 Mar 2026", status: "in-progress" },
  { id: "AUD-2026-03", name: "Revisión LFPDPPP — Aviso de Privacidad", type: "internal", scope: "Tratamiento de datos personales", auditor: "Lic. Ana García", startDate: "15 Mar 2026", endDate: "28 Mar 2026", status: "in-progress" },
  { id: "AUD-2026-04", name: "PCI DSS Compliance Review", type: "external", scope: "Sistemas de pago", auditor: "Deloitte México", startDate: "05 Abr 2026", endDate: "18 Abr 2026", status: "planned" },
  { id: "AUD-2026-05", name: "Auditoría Interna ISO 9001", type: "internal", scope: "Procesos operativos", auditor: "Ing. Carlos Ramírez", startDate: "20 Abr 2026", endDate: "03 May 2026", status: "planned" },
  { id: "AUD-2026-06", name: "Análisis de Brechas MAAGTICSI", type: "external", scope: "Infraestructura TIC gubernamental", auditor: "PwC México", startDate: "10 May 2026", endDate: "23 May 2026", status: "planned" },
]

const auditStatusConfig = {
  "planned": { label: "Planificada", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
  "in-progress": { label: "En curso", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  "completed": { label: "Completada", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
}

interface RecentFinding {
  id: string
  title: string
  audit: string
  classification: "non-conformity" | "observation" | "improvement"
  severity: "critical" | "high" | "medium" | "low"
  daysOpen: number
}

const recentFindings: RecentFinding[] = [
  { id: "HAL-005", title: "Ausencia de registro de accesos privilegiados", audit: "Auditoría ISO 27001:2022", classification: "non-conformity", severity: "critical", daysOpen: 5 },
  { id: "HAL-004", title: "Plan de recuperación ante desastres no probado en 18 meses", audit: "Auditoría ISO 27001:2022", classification: "non-conformity", severity: "high", daysOpen: 5 },
  { id: "HAL-007", title: "Segmentación de red insuficiente en entorno de pagos", audit: "PCI DSS Pre-check", classification: "non-conformity", severity: "high", daysOpen: 12 },
  { id: "HAL-006", title: "Contratos con terceros sin cláusulas de Aviso de Privacidad (LFPDPPP Art. 21)", audit: "Revisión LFPDPPP", classification: "observation", severity: "medium", daysOpen: 3 },
]

const classificationConfig = {
  "non-conformity": { label: "No conformidad", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  "observation": { label: "Observación", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  "improvement": { label: "Mejora", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
}

const findingSeverityConfig = {
  "critical": { label: "Crítico", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  "high": { label: "Alto", cls: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400" },
  "medium": { label: "Medio", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  "low": { label: "Bajo", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
}

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Panel Principal", href: "/" }, { label: "Auditorías y Revisiones" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Auditorías y Revisiones</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Planificación, ejecución y seguimiento de auditorías internas y externas
          </p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Auditorías 2026</CardDescription>
              <CardTitle><span className="text-3xl font-bold">8</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className={`${badgeCls} bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400`}>1 completada</span>
                <span className={`${badgeCls} bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400`}>2 en curso</span>
                <span className={`${badgeCls} bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400`}>5 planificadas</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Hallazgos Abiertos</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-red-600 dark:text-red-400">6</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className={`${badgeCls} bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400`}>2 críticos</span>
                <span className={`${badgeCls} bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400`}>3 altos</span>
                <span className={`${badgeCls} bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400`}>1 medio</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Tasa Superación Pruebas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-amber-600 dark:text-amber-400">67%</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-2">
                <div className={`h-2 rounded-full ${scoreBgCls(67)}`} style={{ width: "67%" }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">8 de 12 pruebas superadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Próxima Auditoría</CardDescription>
              <CardTitle><span className="text-lg font-bold leading-tight">PCI DSS Review</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarIcon className="size-3.5" />
                <span>05 Abr 2026 · Deloitte México</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">En 23 días</p>
            </CardContent>
          </Card>
        </div>

        {/* Section Nav Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {sections.map((s) => (
            <SectionNavCard key={s.number} {...s} />
          ))}
        </div>

        {/* Bottom panels */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Upcoming audits */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base">Auditorías Próximas</CardTitle>
                <CardDescription className="text-xs mt-0.5">Programadas en los próximos 90 días</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="/auditorias/plan">Ver plan <ChevronRightIcon /></a>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {upcomingAudits.map((a) => {
                  const cfg = auditStatusConfig[a.status]
                  return (
                    <div key={a.id} className="flex items-start justify-between px-6 py-3 hover:bg-muted/40 transition-colors">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={`mt-0.5 flex items-center justify-center w-7 h-7 rounded-md shrink-0 ${a.type === "internal" ? "bg-blue-50 dark:bg-blue-950/30" : "bg-purple-50 dark:bg-purple-950/30"}`}>
                          {a.type === "internal"
                            ? <UserIcon className="size-3.5 text-blue-600 dark:text-blue-400" />
                            : <BuildingIcon className="size-3.5 text-purple-600 dark:text-purple-400" />
                          }
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-tight truncate">{a.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{a.startDate} → {a.endDate}</p>
                          <p className="text-xs text-muted-foreground">{a.auditor} · {a.scope}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0 ml-3">
                        <span className={`${badgeCls} ${cfg.cls}`}>{cfg.label}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{a.id}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent findings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base">Hallazgos Recientes</CardTitle>
                <CardDescription className="text-xs mt-0.5">Hallazgos abiertos de mayor criticidad</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="/auditorias/hallazgos">Ver todos <ChevronRightIcon /></a>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentFindings.map((f) => {
                  const sev = findingSeverityConfig[f.severity]
                  const cls = classificationConfig[f.classification]
                  return (
                    <div key={f.id} className="flex items-start justify-between px-6 py-3 hover:bg-muted/40 transition-colors">
                      <div className="flex items-start gap-3 min-w-0">
                        <AlertCircleIcon className={`size-4 mt-0.5 shrink-0 ${f.severity === "critical" ? "text-red-500" : f.severity === "high" ? "text-orange-500" : "text-amber-500"}`} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-tight">{f.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{f.audit} · Abierto hace {f.daysOpen}d</p>
                          <div className="flex gap-1.5 mt-1">
                            <span className={`${badgeCls} ${cls.cls}`}>{cls.label}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`${badgeCls} shrink-0 ml-3 ${sev.cls}`}>{sev.label}</span>
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

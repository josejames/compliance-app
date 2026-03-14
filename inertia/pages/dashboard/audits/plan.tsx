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
  CalendarIcon,
  UserIcon,
  BuildingIcon,
  ClockIcon,
  CheckCircle2Icon,
  CircleIcon,
  PlayCircleIcon,
  XCircleIcon,
} from "lucide-react"
import { badgeCls } from "~/lib/compliance_ui"

type AuditType = "internal" | "external"
type AuditStatus = "planned" | "in-progress" | "completed" | "cancelled"

interface Audit {
  id: string
  name: string
  framework: string
  type: AuditType
  scope: string
  auditor: string
  team: string
  startDate: string
  endDate: string
  status: AuditStatus
  progress: number
  findingsCount: number
}

const audits: Audit[] = [
  { id: "AUD-2026-01", name: "ISO 27001 Auditoría Interna Q1", framework: "ISO 27001", type: "internal", scope: "Seguridad TI", auditor: "Carlos Rodríguez", team: "IT Security", startDate: "01 Mar 2026", endDate: "08 Mar 2026", status: "completed", progress: 100, findingsCount: 3 },
  { id: "AUD-2026-02", name: "SOC 2 Type II Readiness", framework: "SOC 2", type: "external", scope: "Sistemas cloud", auditor: "Grant Thornton", team: "Compliance", startDate: "10 Mar 2026", endDate: "21 Mar 2026", status: "in-progress", progress: 60, findingsCount: 2 },
  { id: "AUD-2026-03", name: "GDPR Privacy Audit", framework: "GDPR", type: "internal", scope: "Gestión de datos", auditor: "Ana García", team: "Legal & Privacy", startDate: "15 Mar 2026", endDate: "28 Mar 2026", status: "in-progress", progress: 35, findingsCount: 1 },
  { id: "AUD-2026-04", name: "PCI DSS Compliance Review", framework: "PCI DSS", type: "external", scope: "Sistemas de pago", auditor: "Deloitte", team: "Finance IT", startDate: "05 Abr 2026", endDate: "18 Abr 2026", status: "planned", progress: 0, findingsCount: 0 },
  { id: "AUD-2026-05", name: "ISO 9001 Process Audit", framework: "ISO 9001", scope: "Operaciones", type: "internal", auditor: "Carlos Rodríguez", team: "Operations", startDate: "20 Abr 2026", endDate: "03 May 2026", status: "planned", progress: 0, findingsCount: 0 },
  { id: "AUD-2026-06", name: "NIS2 Gap Assessment", framework: "NIS2", type: "external", scope: "Infraestructura crítica", auditor: "PwC", team: "IT & OT", startDate: "10 May 2026", endDate: "23 May 2026", status: "planned", progress: 0, findingsCount: 0 },
  { id: "AUD-2026-07", name: "ISO 27001 Auditoría Interna Q2", framework: "ISO 27001", type: "internal", scope: "Seguridad TI", auditor: "María González", team: "IT Security", startDate: "01 Jun 2026", endDate: "14 Jun 2026", status: "planned", progress: 0, findingsCount: 0 },
  { id: "AUD-2026-08", name: "GDPR Annual Review", framework: "GDPR", type: "external", scope: "Protección de datos", auditor: "Bureau Veritas", team: "Legal & Privacy", startDate: "01 Jul 2026", endDate: "15 Jul 2026", status: "planned", progress: 0, findingsCount: 0 },
]

const statusConfig: Record<AuditStatus, { label: string; cls: string; icon: typeof CheckCircle2Icon }> = {
  completed: { label: "Completada", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400", icon: CheckCircle2Icon },
  "in-progress": { label: "En curso", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400", icon: PlayCircleIcon },
  planned: { label: "Planificada", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400", icon: CircleIcon },
  cancelled: { label: "Cancelada", cls: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400", icon: XCircleIcon },
}

const frameworkColors: Record<string, string> = {
  "ISO 27001": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  "SOC 2": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  "GDPR": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  "PCI DSS": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  "ISO 9001": "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
  "NIS2": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
}

const counts = {
  total: audits.length,
  completed: audits.filter((a) => a.status === "completed").length,
  inProgress: audits.filter((a) => a.status === "in-progress").length,
  planned: audits.filter((a) => a.status === "planned").length,
}

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Auditorías y Revisiones", href: "/auditorias" }, { label: "Plan de Auditorías" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Plan de Auditorías</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {counts.total} auditorías programadas para 2026 · {counts.inProgress} en curso
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><DownloadIcon />Exportar</Button>
            <Button size="sm"><PlusIcon />Nueva auditoría</Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Programadas</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{counts.total}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Plan anual 2026</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Completadas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{counts.completed}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="h-2 rounded-full bg-green-500" style={{ width: `${(counts.completed / counts.total) * 100}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{Math.round((counts.completed / counts.total) * 100)}% del plan ejecutado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>En Curso</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-amber-600 dark:text-amber-400">{counts.inProgress}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Auditorías activas ahora</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Planificadas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{counts.planned}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Pendientes de iniciar</p>
            </CardContent>
          </Card>
        </div>

        {/* Toolbar + Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Calendario de Auditorías 2026</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2 size-4 text-muted-foreground" />
                  <input
                    className="h-8 w-56 rounded-md border border-input bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="Buscar auditoría..."
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">ID</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Auditoría</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Marco</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Tipo</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Auditor</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Período</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide w-40">Progreso</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Estado</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Hallazgos</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {audits.map((a) => {
                    const st = statusConfig[a.status]
                    const StIcon = st.icon
                    const fwCls = frameworkColors[a.framework] ?? "bg-slate-100 text-slate-700"
                    return (
                      <tr key={a.id} className="hover:bg-muted/40 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{a.id}</td>
                        <td className="px-4 py-3">
                          <p className="font-medium leading-tight">{a.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{a.scope} · {a.team}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`${badgeCls} ${fwCls}`}>{a.framework}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 text-xs">
                            {a.type === "internal"
                              ? <><UserIcon className="size-3.5 text-blue-500" /><span className="text-muted-foreground">Interna</span></>
                              : <><BuildingIcon className="size-3.5 text-purple-500" /><span className="text-muted-foreground">Externa</span></>
                            }
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{a.auditor}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                          <div className="flex items-center gap-1"><CalendarIcon className="size-3" />{a.startDate}</div>
                          <div className="flex items-center gap-1 mt-0.5"><ClockIcon className="size-3" />{a.endDate}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-muted rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${a.progress === 100 ? "bg-green-500" : a.progress > 0 ? "bg-amber-500" : "bg-slate-200 dark:bg-slate-700"}`}
                                style={{ width: `${a.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-8 text-right">{a.progress}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 ${badgeCls} ${st.cls}`}>
                            <StIcon className="size-3" />{st.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {a.findingsCount > 0
                            ? <span className="text-sm font-semibold text-red-600 dark:text-red-400">{a.findingsCount}</span>
                            : <span className="text-xs text-muted-foreground">—</span>
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

        {/* Timeline by quarter */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribución Trimestral</CardTitle>
            <CardDescription className="text-xs">Auditorías por trimestre 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { q: "Q1", months: "Ene – Mar", items: audits.filter(a => ["AUD-2026-01", "AUD-2026-02", "AUD-2026-03"].includes(a.id)) },
                { q: "Q2", months: "Abr – Jun", items: audits.filter(a => ["AUD-2026-04", "AUD-2026-05", "AUD-2026-06", "AUD-2026-07"].includes(a.id)) },
                { q: "Q3", months: "Jul – Sep", items: audits.filter(a => ["AUD-2026-08"].includes(a.id)) },
                { q: "Q4", months: "Oct – Dic", items: [] },
              ].map(({ q, months, items }) => (
                <div key={q} className="rounded-lg border bg-muted/20 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{q}</p>
                      <p className="text-[10px] text-muted-foreground">{months}</p>
                    </div>
                    <span className="text-lg font-bold">{items.length}</span>
                  </div>
                  <div className="space-y-1.5">
                    {items.length === 0
                      ? <p className="text-xs text-muted-foreground italic">Sin auditorías planificadas</p>
                      : items.map(a => {
                          const fwCls = frameworkColors[a.framework] ?? "bg-slate-100 text-slate-700"
                          return (
                            <div key={a.id} className="flex items-center gap-1.5">
                              <span className={`${badgeCls} text-[10px] ${fwCls}`}>{a.framework}</span>
                              <span className="text-xs text-muted-foreground truncate">{a.name.split(" ").slice(0, 3).join(" ")}</span>
                            </div>
                          )
                        })
                    }
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

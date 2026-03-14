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
  SearchIcon,
  SlidersHorizontalIcon,
  DownloadIcon,
  ChevronRightIcon,
  UserIcon,
  ShieldIcon,
  TrendingDownIcon,
  ArrowRightIcon,
} from "lucide-react"

type RiskLevel = "critical" | "high" | "medium" | "low"
type Treatment = "mitigate" | "accept" | "transfer" | "avoid"
type RiskStatus = "open" | "in-treatment" | "accepted" | "closed"

interface Risk {
  id: string
  title: string
  category: string
  impact: number
  probability: number
  treatment: Treatment
  owner: string
  status: RiskStatus
  identified: string
  frameworks: string[]
}

const risks: Risk[] = [
  { id: "RSK-001", title: "Acceso no autorizado a sistemas críticos", category: "Seguridad TI", impact: 5, probability: 4, treatment: "mitigate", owner: "Carlos Rodríguez", status: "in-treatment", identified: "15 Ene 2026", frameworks: ["ISO 27001", "SOC 2"] },
  { id: "RSK-002", title: "Filtración de datos personales de clientes", category: "Privacidad", impact: 5, probability: 3, treatment: "mitigate", owner: "Ana García", status: "in-treatment", identified: "20 Ene 2026", frameworks: ["GDPR", "ISO 27001"] },
  { id: "RSK-003", title: "Ransomware en infraestructura on-premise", category: "Seguridad TI", impact: 5, probability: 3, treatment: "mitigate", owner: "Pablo Torres", status: "open", identified: "05 Feb 2026", frameworks: ["ISO 27001", "NIST CSF"] },
  { id: "RSK-004", title: "Incumplimiento GDPR por retención excesiva", category: "Privacidad", impact: 4, probability: 4, treatment: "mitigate", owner: "María González", status: "in-treatment", identified: "10 Ene 2026", frameworks: ["GDPR"] },
  { id: "RSK-005", title: "Fallo de proveedor cloud principal", category: "Continuidad", impact: 4, probability: 3, treatment: "transfer", owner: "Elena Sánchez", status: "in-treatment", identified: "28 Ene 2026", frameworks: ["ISO 27001", "SOC 2"] },
  { id: "RSK-006", title: "Vulnerabilidad sin parchear en aplicación web", category: "Seguridad TI", impact: 4, probability: 4, treatment: "mitigate", owner: "Pablo Torres", status: "in-treatment", identified: "02 Feb 2026", frameworks: ["PCI DSS", "ISO 27001"] },
  { id: "RSK-007", title: "Pérdida de datos por error humano", category: "Operacional", impact: 3, probability: 4, treatment: "mitigate", owner: "Javier López", status: "open", identified: "12 Feb 2026", frameworks: ["ISO 9001"] },
  { id: "RSK-008", title: "Fraude interno por empleado con acceso privilegiado", category: "Seguridad TI", impact: 5, probability: 2, treatment: "mitigate", owner: "Laura Martínez", status: "in-treatment", identified: "18 Ene 2026", frameworks: ["ISO 27001", "SOC 2", "PCI DSS"] },
  { id: "RSK-009", title: "No conformidad en auditoría PCI DSS", category: "Cumplimiento", impact: 4, probability: 3, treatment: "mitigate", owner: "María González", status: "open", identified: "25 Feb 2026", frameworks: ["PCI DSS"] },
  { id: "RSK-010", title: "Interrupción del servicio por ataque DDoS", category: "Continuidad", impact: 3, probability: 3, treatment: "transfer", owner: "Pablo Torres", status: "accepted", identified: "08 Feb 2026", frameworks: ["ISO 27001", "NIST CSF"] },
  { id: "RSK-011", title: "Fuga de secretos empresariales por tercero", category: "Legal", impact: 4, probability: 2, treatment: "mitigate", owner: "Ana García", status: "in-treatment", identified: "01 Mar 2026", frameworks: ["ISO 27001", "GDPR"] },
  { id: "RSK-012", title: "Desactualización de políticas de seguridad", category: "Gobernanza", impact: 3, probability: 3, treatment: "avoid", owner: "Carlos Rodríguez", status: "open", identified: "05 Mar 2026", frameworks: ["ISO 27001"] },
]

function riskScore(r: Risk) { return r.impact * r.probability }

function riskLevel(r: Risk): RiskLevel {
  const s = riskScore(r)
  if (s >= 15) return "critical"
  if (s >= 10) return "high"
  if (s >= 6) return "medium"
  return "low"
}

const treatmentConfig: Record<Treatment, { label: string; cls: string }> = {
  mitigate: { label: "Mitigar", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
  accept: { label: "Aceptar", cls: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
  transfer: { label: "Transferir", cls: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400" },
  avoid: { label: "Evitar", cls: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400" },
}

const statusConfig: Record<RiskStatus, { label: string; cls: string }> = {
  open: { label: "Abierto", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  "in-treatment": { label: "En tratamiento", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
  accepted: { label: "Aceptado", cls: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
  closed: { label: "Cerrado", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
}

function ScoreCell({ impact, probability }: { impact: number; probability: number }) {
  const score = impact * probability
  const lvl = riskLevel({ impact, probability } as Risk)
  const cfg = levelConfig[lvl]
  return (
    <div className="flex items-center gap-1.5">
      <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${cfg.cls}`}>{cfg.label}</span>
      <span className={`text-sm font-bold tabular-nums ${cfg.scoreCls}`}>{score}</span>
      <span className="text-xs text-muted-foreground">({impact}×{probability})</span>
    </div>
  )
}

export default function Page() {
  const sorted = [...risks].sort((a, b) => riskScore(b) - riskScore(a))
  const counts = {
    critical: risks.filter((r) => riskLevel(r) === "critical").length,
    high: risks.filter((r) => riskLevel(r) === "high").length,
    medium: risks.filter((r) => riskLevel(r) === "medium").length,
    open: risks.filter((r) => r.status === "open").length,
  }

  return (
    <>
      <PageHeader crumbs={[{ label: "Riesgos", href: "/riesgos" }, { label: "Registro de Riesgos" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Registro de Riesgos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {risks.length} riesgos identificados · ordenados por puntuación
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><DownloadIcon />Exportar</Button>
            <Button size="sm"><PlusIcon />Nuevo riesgo</Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-red-200 dark:border-red-900 bg-red-50/40 dark:bg-red-950/10">
            <CardHeader>
              <CardDescription className="text-red-600 dark:text-red-400">Críticos</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-red-600 dark:text-red-400">{counts.critical}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-red-600/70 dark:text-red-400/70">Puntuación ≥15</p></CardContent>
          </Card>
          <Card className="border-orange-200 dark:border-orange-900 bg-orange-50/40 dark:bg-orange-950/10">
            <CardHeader>
              <CardDescription className="text-orange-600 dark:text-orange-400">Altos</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-orange-600 dark:text-orange-400">{counts.high}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-orange-600/70 dark:text-orange-400/70">Puntuación 10–14</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Medios</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-amber-600 dark:text-amber-400">{sorted.filter(r => riskLevel(r) === 'medium').length}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Puntuación 6–9</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Sin Tratamiento</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{counts.open}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Estado: Abierto</p></CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Buscar riesgo…" className="w-full h-8 rounded-lg border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
          </div>
          <Button variant="outline" size="sm"><SlidersHorizontalIcon />Filtros</Button>
          {(["Todos", "Crítico", "Alto", "Medio", "Bajo"] as const).map((l, i) => (
            <Button key={l} variant={i === 0 ? "default" : "outline"} size="sm">{l}</Button>
          ))}
        </div>

        {/* Risk register table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Riesgos</CardTitle>
            <CardDescription>Todos los riesgos identificados, ordenados por puntuación de mayor a menor</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-medium text-muted-foreground px-4 py-3 w-24">ID</th>
                    <th className="text-left font-medium text-muted-foreground px-3 py-3">Riesgo</th>
                    <th className="text-left font-medium text-muted-foreground px-3 py-3 hidden md:table-cell">Categoría</th>
                    <th className="text-left font-medium text-muted-foreground px-3 py-3">Nivel / Score</th>
                    <th className="text-left font-medium text-muted-foreground px-3 py-3 hidden lg:table-cell">Tratamiento</th>
                    <th className="text-left font-medium text-muted-foreground px-3 py-3 hidden lg:table-cell">Estado</th>
                    <th className="text-left font-medium text-muted-foreground px-3 py-3 hidden xl:table-cell">Propietario</th>
                    <th className="px-3 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((risk) => {
                    const lvl = riskLevel(risk)
                    const lvlCfg = levelConfig[lvl]
                    const treatCfg = treatmentConfig[risk.treatment]
                    const statCfg = statusConfig[risk.status]
                    return (
                      <tr key={risk.id} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs font-medium text-muted-foreground">{risk.id}</span>
                        </td>
                        <td className="px-3 py-3">
                          <p className="font-medium leading-snug">{risk.title}</p>
                          <div className="flex gap-1 mt-0.5 flex-wrap">
                            {risk.frameworks.map((fw) => (
                              <span key={fw} className="text-[10px] px-1 py-0.5 rounded bg-muted text-muted-foreground">{fw}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-3 hidden md:table-cell">
                          <span className="text-xs text-muted-foreground">{risk.category}</span>
                        </td>
                        <td className="px-3 py-3">
                          <ScoreCell impact={risk.impact} probability={risk.probability} />
                        </td>
                        <td className="px-3 py-3 hidden lg:table-cell">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${treatCfg.cls}`}>{treatCfg.label}</span>
                        </td>
                        <td className="px-3 py-3 hidden lg:table-cell">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statCfg.cls}`}>{statCfg.label}</span>
                        </td>
                        <td className="px-3 py-3 hidden xl:table-cell">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <UserIcon className="size-3" />{risk.owner}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <Button variant="ghost" size="icon-sm"><ChevronRightIcon /></Button>
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

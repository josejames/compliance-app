import {
  AlertCircleIcon,
  CalendarIcon,
  ChevronRightIcon,
  MinusIcon,
  ShieldAlertIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  ZapIcon,
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
import { Separator } from "~/components/ui/separator"
import { scoreBgCls, scoreTextCls } from "~/lib/compliance_ui"
import { frameworks, kris, milestones } from "~/lib/mock_data"

function getKriColors(level: string) {
  if (level === "low")
    return {
      bg: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-700 dark:text-green-400",
      badge: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
      label: "Normal",
    }
  if (level === "medium")
    return {
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-800",
      text: "text-amber-700 dark:text-amber-400",
      badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
      label: "Atención",
    }
  return {
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-700 dark:text-red-400",
    badge: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
    label: "Crítico",
  }
}

function getPriorityBadge(priority: string) {
  if (priority === "high") return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
  if (priority === "medium") return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
  return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
}

function getTypeBadge(type: string) {
  const map: Record<string, string> = {
    Auditoría: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
    Tarea: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
    Informe: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    Control: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  }
  return map[type] ?? "bg-gray-100 text-gray-700"
}

function CircularGauge({ score }: { score: number }) {
  const r = 40
  const circumference = 2 * Math.PI * r
  const dash = (score / 100) * circumference
  const strokeColor = score >= 70 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444'
  return (
    <div className="relative flex items-center justify-center">
      <svg width="130" height="130" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="9" className="opacity-10" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={strokeColor}
          strokeWidth="9"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className={`text-2xl font-bold tabular-nums ${scoreTextCls(score)}`}>{score}%</span>
        <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-widest">global</span>
      </div>
    </div>
  )
}

const sparklineData: Record<string, { points: number[]; trend: 'up' | 'down' | 'stable' }> = {
  'ISO 27001:2022':     { points: [72, 76, 78], trend: 'up' },
  'LFPDPPP':           { points: [93, 91, 91], trend: 'stable' },
  'NOM-035-STPS-2018': { points: [58, 61, 64], trend: 'up' },
  'PCI DSS v4.0':      { points: [60, 57, 55], trend: 'down' },
  'ISO 9001:2015':     { points: [80, 81, 82], trend: 'up' },
  'MAAGTICSI':         { points: [69, 67, 70], trend: 'stable' },
}

function Sparkline({ points: pts, trend }: { points: number[]; trend: 'up' | 'down' | 'stable' }) {
  const min = Math.min(...pts)
  const max = Math.max(...pts)
  const range = max - min || 1
  const W = 44
  const H = 18
  const polyPoints = pts
    .map((v, i) => `${(i / (pts.length - 1)) * W},${H - ((v - min) / range) * (H - 2) - 1}`)
    .join(' ')
  const color = trend === 'up' ? '#22c55e' : trend === 'down' ? '#ef4444' : '#94a3b8'
  return (
    <svg width={W} height={H} className="shrink-0 overflow-visible">
      <polyline points={polyPoints} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Page() {
  const globalScore = Math.round(
    frameworks.reduce((acc, f) => acc + f.score, 0) / frameworks.length
  )

  return (
    <>
      <PageHeader crumbs={[{ label: "Panel Principal", href: "/" }, { label: "Vista General Ejecutiva" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        {/* Page title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Vista General Ejecutiva</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Estado de cumplimiento al{" "}
              {new Date().toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <Button variant="outline" size="sm">
            <CalendarIcon />
            Exportar informe
          </Button>
        </div>

        {/* Top KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-l-4 border-indigo-500">
            <CardHeader className="pb-2">
              <CardDescription>Cumplimiento Global</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-1 pb-4">
              <CircularGauge score={globalScore} />
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUpIcon className="size-3 text-green-500" />
                +4% respecto al mes anterior
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-amber-500">
            <CardHeader>
              <CardDescription>Riesgos Activos</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">24</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 font-medium">
                  3 críticos
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 font-medium">
                  11 altos
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 font-medium">
                  10 medios
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <TrendingDownIcon className="size-3 text-green-500" />
                −2 desde la última revisión
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-red-500">
            <CardHeader>
              <CardDescription>Tareas Pendientes</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">37</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 font-medium">
                  8 vencidas
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 font-medium">
                  12 vencen hoy
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <TrendingUpIcon className="size-3 text-red-500" />
                +5 nuevas esta semana
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-violet-500">
            <CardHeader>
              <CardDescription>Próximas Auditorías</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">3</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Próxima en <span className="font-medium text-foreground">5 días</span>
              </p>
              <p className="text-xs font-medium mt-1 truncate">Auditoría externa ISO 27001</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's priority actions */}
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ZapIcon className="size-4 text-amber-500" />
              ¿Qué debo hacer hoy?
            </CardTitle>
            <CardDescription>16 de marzo de 2026 — 3 acciones prioritarias</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
              <AlertCircleIcon className="size-4 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight">2 tareas vencidas</p>
                <p className="text-xs text-muted-foreground mt-0.5">TSK-041 · Acceso privilegiado · ISO 27001 A.9</p>
              </div>
              <a href="/mis-tareas" className="shrink-0 text-xs text-red-600 dark:text-red-400 font-medium hover:underline">Ver →</a>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <CalendarIcon className="size-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight">Auditoría en 5 días</p>
                <p className="text-xs text-muted-foreground mt-0.5">ISO 27001 · Galindo & Asociados · 21 Mar 2026</p>
              </div>
              <a href="/auditorias" className="shrink-0 text-xs text-amber-700 dark:text-amber-400 font-medium hover:underline">Ver →</a>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <ShieldAlertIcon className="size-4 text-purple-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight">Aviso de Privacidad vence en 6 días</p>
                <p className="text-xs text-muted-foreground mt-0.5">Revisión INAI · LFPDPPP Art. 17 · 22 Mar 2026</p>
              </div>
              <a href="/alertas" className="shrink-0 text-xs text-purple-700 dark:text-purple-400 font-medium hover:underline">Ver →</a>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Framework compliance bars */}
          <Card>
            <CardHeader>
              <CardTitle>Cumplimiento por Marco Normativo</CardTitle>
              <CardDescription>Porcentaje de controles conformes por estándar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {frameworks.map((fw) => (
                <div key={fw.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{fw.name}</span>
                    <div className="flex items-center gap-3">
                      {sparklineData[fw.name] && (
                        <Sparkline {...sparklineData[fw.name]} />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {fw.compliant}/{fw.controls} controles
                      </span>
                      <span className={`font-semibold tabular-nums ${scoreTextCls(fw.score)}`}>
                        {fw.score}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${scoreBgCls(fw.score)}`}
                      style={{ width: `${fw.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* KRI semaphore */}
          <Card>
            <CardHeader>
              <CardTitle>Indicadores Clave de Riesgo (KRI)</CardTitle>
              <CardDescription>Estado actual de indicadores de riesgo operacional</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {kris.map((kri) => {
                const colors = getKriColors(kri.level)
                const TrendIcon =
                  kri.trend === "up"
                    ? TrendingUpIcon
                    : kri.trend === "down"
                      ? TrendingDownIcon
                      : MinusIcon
                return (
                  <div
                    key={kri.label}
                    className={`rounded-lg border p-3 ${colors.bg} ${colors.border}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-medium text-foreground leading-tight">
                        {kri.label}
                      </span>
                      <TrendIcon className={`size-3.5 shrink-0 mt-0.5 ${colors.text}`} />
                    </div>
                    <div className="mt-2 flex items-end justify-between">
                      <span className={`text-2xl font-bold ${colors.text}`}>{kri.value}</span>
                      <span
                        className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${colors.badge}`}
                      >
                        {colors.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming milestones */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Próximos Hitos</CardTitle>
                <CardDescription className="mt-1">
                  Auditorías, tareas críticas y fechas límite importantes
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Ver calendario completo
                <ChevronRightIcon />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {milestones.map((m, i) => {
                const [day, month, year] = m.date.split(" ")
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-lg border border-border/50 px-4 py-3 hover:bg-muted/30 transition-colors"
                  >
                    <div className="text-center min-w-13">
                      <p className="text-[10px] uppercase font-medium text-muted-foreground">
                        {month} {year}
                      </p>
                      <p className="text-xl font-bold leading-tight">{day}</p>
                    </div>
                    <Separator
                      orientation="vertical"
                      className="data-[orientation=vertical]:h-10"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{m.title}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTypeBadge(m.type)}`}
                      >
                        {m.type}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${getPriorityBadge(m.priority)}`}
                      >
                        {m.priority === "high" ? "Alta" : m.priority === "medium" ? "Media" : "Baja"}
                      </span>
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

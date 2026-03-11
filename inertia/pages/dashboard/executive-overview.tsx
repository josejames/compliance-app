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
  CalendarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  ChevronRightIcon,
} from "lucide-react"

const frameworkData = [
  { name: "ISO 27001", score: 78, controls: 114, compliant: 89 },
  { name: "GDPR", score: 91, controls: 47, compliant: 43 },
  { name: "SOC 2 Type II", score: 64, controls: 80, compliant: 51 },
  { name: "PCI DSS", score: 55, controls: 60, compliant: 33 },
  { name: "ISO 9001", score: 82, controls: 36, compliant: 30 },
  { name: "NIST CSF", score: 70, controls: 108, compliant: 76 },
]

const kriData = [
  { label: "Vulnerabilidades Críticas", value: 3, level: "high", trend: "up" },
  { label: "Controles Vencidos", value: 12, level: "medium", trend: "down" },
  { label: "Proveedores Sin Evaluar", value: 5, level: "medium", trend: "stable" },
  { label: "Incidentes Abiertos", value: 1, level: "low", trend: "down" },
  { label: "Tareas Atrasadas", value: 8, level: "medium", trend: "up" },
  { label: "Políticas por Revisar", value: 2, level: "low", trend: "stable" },
]

const milestones = [
  { date: "15 Mar 2026", type: "Auditoría", title: "Auditoría externa ISO 27001", priority: "high" },
  { date: "22 Mar 2026", type: "Tarea", title: "Revisión de política de acceso", priority: "medium" },
  { date: "31 Mar 2026", type: "Informe", title: "Informe trimestral de riesgos", priority: "medium" },
  { date: "05 Abr 2026", type: "Control", title: "Renovación de certificado SSL", priority: "high" },
  { date: "18 Abr 2026", type: "Tarea", title: "Capacitación en protección de datos", priority: "low" },
]

function getScoreColor(score: number) {
  if (score >= 80) return "text-green-600 dark:text-green-400"
  if (score >= 60) return "text-amber-600 dark:text-amber-400"
  return "text-red-600 dark:text-red-400"
}

function getScoreBarColor(score: number) {
  if (score >= 80) return "bg-green-500"
  if (score >= 60) return "bg-amber-500"
  return "bg-red-500"
}

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

export default function Page() {
  const globalScore = Math.round(
    frameworkData.reduce((acc, f) => acc + f.score, 0) / frameworkData.length
  )

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
                <BreadcrumbPage>Vista General Ejecutiva</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        {/* Page title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Vista General Ejecutiva</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Estado de cumplimiento al{" "}
              {new Date().toLocaleDateString("es-ES", {
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
          <Card>
            <CardHeader>
              <CardDescription>Cumplimiento Global</CardDescription>
              <CardTitle>
                <span className={`text-3xl font-bold ${getScoreColor(globalScore)}`}>
                  {globalScore}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full ${getScoreBarColor(globalScore)}`}
                  style={{ width: `${globalScore}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <TrendingUpIcon className="size-3 text-green-500" />
                +4% respecto al mes anterior
              </p>
            </CardContent>
          </Card>

          <Card>
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

          <Card>
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

          <Card>
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

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Framework compliance bars */}
          <Card>
            <CardHeader>
              <CardTitle>Cumplimiento por Marco Normativo</CardTitle>
              <CardDescription>Porcentaje de controles conformes por estándar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {frameworkData.map((fw) => (
                <div key={fw.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{fw.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {fw.compliant}/{fw.controls} controles
                      </span>
                      <span className={`font-semibold tabular-nums ${getScoreColor(fw.score)}`}>
                        {fw.score}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getScoreBarColor(fw.score)}`}
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
              {kriData.map((kri) => {
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

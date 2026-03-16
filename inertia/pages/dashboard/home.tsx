import {
    AlertTriangleIcon,
    CalendarIcon,
    ChevronRightIcon,
    ClipboardListIcon,
    ShieldCheckIcon,
    TrendingUpIcon,
    XCircleIcon,
} from "lucide-react"
import { PageHeader } from "~/components/page-header"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { scoreBgCls, scoreTextCls } from "~/lib/compliance_ui"
import { frameworks, milestones } from "~/lib/mock_data"

// Top-3 pending tasks for the logged-in user (mock)
const myTasks = [
  {
    id: 1,
    title: "Actualizar Aviso de Privacidad — LFPDPPP",
    due: "22 Mar 2026",
    priority: "high",
    control: "LFPDPPP Art. 15",
  },
  {
    id: 2,
    title: "Subir evidencias auditoría ISO 27001",
    due: "19 Mar 2026",
    priority: "high",
    control: "ISO 27001 A.18.2",
  },
  {
    id: 3,
    title: "Aplicar cuestionario NOM-035 al área de TI",
    due: "30 Mar 2026",
    priority: "medium",
    control: "NOM-035-STPS-2018",
  },
]

// Last 3 active alerts for the home snapshot
const topAlerts = [
  { severity: "critical", title: "Brecha de seguridad detectada", time: "Hace 15 min" },
  { severity: "high", title: "3 controles ISO 27001 han vencido", time: "Hace 2 h" },
  { severity: "medium", title: "Aviso de Privacidad requiere actualización", time: "Hoy, 08:30" },
] as const

function priorityBadge(p: string) {
  if (p === "high") return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
  if (p === "medium") return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
  return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
}

function priorityLabel(p: string) {
  if (p === "high") return "Alta"
  if (p === "medium") return "Media"
  return "Baja"
}

function alertSeverityIcon(severity: "critical" | "high" | "medium") {
  if (severity === "critical")
    return <XCircleIcon className="size-4 shrink-0 text-red-500" />
  if (severity === "high")
    return <AlertTriangleIcon className="size-4 shrink-0 text-amber-500" />
  return <ShieldCheckIcon className="size-4 shrink-0 text-yellow-500" />
}

export default function Page() {
  const globalScore = Math.round(
    frameworks.reduce((acc, f) => acc + f.score, 0) / frameworks.length
  )
  const nextMilestone = milestones[0]

  return (
    <>
      <PageHeader crumbs={[{ label: "Panel Principal" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Panel Principal</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Bienvenido de vuelta — resumen al{" "}
            {new Date().toLocaleDateString("es-MX", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Top KPI strip */}
        <div className="grid gap-4 md:grid-cols-4">
          {/* Global score */}
          <Card>
            <CardHeader>
              <CardDescription>Cumplimiento Global</CardDescription>
              <CardTitle>
                <span className={`text-3xl font-bold ${scoreTextCls(globalScore)}`}>
                  {globalScore}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full ${scoreBgCls(globalScore)}`}
                  style={{ width: `${globalScore}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <TrendingUpIcon className="size-3 text-green-500" />
                +4% respecto al mes anterior
              </p>
            </CardContent>
          </Card>

          {/* My pending tasks */}
          <Card>
            <CardHeader>
              <CardDescription>Mis Tareas Pendientes</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">7</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <AlertTriangleIcon className="size-3 text-red-500" />2 vencen en los próximos 3 días
              </p>
            </CardContent>
          </Card>

          {/* Active alerts */}
          <Card>
            <CardHeader>
              <CardDescription>Alertas Activas</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-red-600 dark:text-red-400">6</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-1.5 text-xs flex-wrap">
                <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 font-medium">
                  1 crítica
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 font-medium">
                  2 altas
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Next milestone */}
          <Card>
            <CardHeader>
              <CardDescription>Próximo Hito</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">5</span>
                <span className="text-base font-normal text-muted-foreground ml-1">días</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-medium truncate">{nextMilestone.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <CalendarIcon className="size-3" />
                {nextMilestone.date}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Middle row: tasks + alerts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* My tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardListIcon className="size-4 text-muted-foreground" />
                    Mis Tareas Prioritarias
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Tareas asignadas a ti con mayor urgencia
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Ver todas
                  <ChevronRightIcon />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {myTasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-start justify-between gap-3 rounded-lg border p-3 bg-muted/30"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug truncate">{t.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t.control} · vence {t.due}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${priorityBadge(t.priority)}`}
                  >
                    {priorityLabel(t.priority)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent alerts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangleIcon className="size-4 text-muted-foreground" />
                    Alertas Recientes
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Últimas notificaciones del sistema
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Ver todas
                  <ChevronRightIcon />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {topAlerts.map((a, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border p-3 bg-muted/30"
                >
                  {alertSeverityIcon(a.severity)}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bottom row: framework overview + milestones */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Compliance by framework */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Cumplimiento por Marco</CardTitle>
                  <CardDescription className="mt-1">
                    Porcentaje de controles conformes por norma activa
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Detalle
                  <ChevronRightIcon />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {frameworks.map((fw) => (
                <div key={fw.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{fw.shortName}</span>
                    <span className={`font-semibold tabular-nums ${scoreTextCls(fw.score)}`}>
                      {fw.score}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${scoreBgCls(fw.score)}`}
                      style={{ width: `${fw.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming milestones */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="size-4 text-muted-foreground" />
                    Próximos Hitos
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Auditorías, vencimientos y fechas clave
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Ver calendario
                  <ChevronRightIcon />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-3 rounded-lg border p-3 bg-muted/30"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug">{m.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <CalendarIcon className="size-3" />
                      {m.date}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {m.type}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${priorityBadge(m.priority)}`}>
                      {priorityLabel(m.priority)}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

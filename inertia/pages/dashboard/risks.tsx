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
  ShieldAlertIcon,
  ClipboardListIcon,
  TrendingDownIcon,
  ChevronRightIcon,
  AlertTriangleIcon,
  ActivityIcon,
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react"

const sections = [
  {
    number: "3.1",
    title: "Registro de Riesgos",
    description:
      "Lista maestra de todos los riesgos identificados: valoración Impacto × Probabilidad y tratamiento asignado.",
    href: "/riesgos/registro",
    icon: ClipboardListIcon,
    stats: [
      { label: "Riesgos activos", value: "24" },
      { label: "Críticos", value: "3" },
    ],
    accent: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
  },
  {
    number: "3.2",
    title: "Evaluación de Riesgos",
    description:
      "Asistente para crear evaluaciones por proyecto, área o activo. Cuestionarios dinámicos para calcular el nivel de riesgo.",
    href: "/riesgos/evaluacion",
    icon: ActivityIcon,
    stats: [
      { label: "Evaluaciones", value: "7" },
      { label: "En curso", value: "2" },
    ],
    accent: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
  },
  {
    number: "3.3",
    title: "Plan de Mitigación",
    description:
      "Seguimiento de acciones para reducir los riesgos identificados, con enlace directo al módulo de tareas.",
    href: "/riesgos/mitigacion",
    icon: TrendingDownIcon,
    stats: [
      { label: "Acciones abiertas", value: "18" },
      { label: "Completadas", value: "11" },
    ],
    accent: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
  },
]

// Heat-map matrix data (Probabilidad rows 5→1, Impacto cols 1→5)
const heatMap: { prob: number; impact: number; count: number }[] = [
  { prob: 5, impact: 1, count: 0 }, { prob: 5, impact: 2, count: 1 }, { prob: 5, impact: 3, count: 2 }, { prob: 5, impact: 4, count: 1 }, { prob: 5, impact: 5, count: 0 },
  { prob: 4, impact: 1, count: 1 }, { prob: 4, impact: 2, count: 2 }, { prob: 4, impact: 3, count: 3 }, { prob: 4, impact: 4, count: 2 }, { prob: 4, impact: 5, count: 1 },
  { prob: 3, impact: 1, count: 0 }, { prob: 3, impact: 2, count: 1 }, { prob: 3, impact: 3, count: 2 }, { prob: 3, impact: 4, count: 1 }, { prob: 3, impact: 5, count: 2 },
  { prob: 2, impact: 1, count: 1 }, { prob: 2, impact: 2, count: 0 }, { prob: 2, impact: 3, count: 1 }, { prob: 2, impact: 4, count: 0 }, { prob: 2, impact: 5, count: 1 },
  { prob: 1, impact: 1, count: 0 }, { prob: 1, impact: 2, count: 1 }, { prob: 1, impact: 3, count: 0 }, { prob: 1, impact: 4, count: 0 }, { prob: 1, impact: 5, count: 0 },
]

function heatColor(prob: number, impact: number) {
  const score = prob * impact
  if (score >= 15) return "bg-red-500 text-white"
  if (score >= 10) return "bg-orange-400 text-white"
  if (score >= 6) return "bg-amber-300 text-amber-900"
  return "bg-green-200 text-green-900"
}

export default function Page() {
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
                <BreadcrumbPage>Riesgos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestión de Riesgos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Identificación, evaluación y mitigación de riesgos de cumplimiento
          </p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Riesgos Activos</CardDescription>
              <CardTitle><span className="text-3xl font-bold">24</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 font-medium">3 críticos</span>
                <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400 font-medium">8 altos</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 font-medium">13 medios</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Nivel de Riesgo Promedio</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-amber-600 dark:text-amber-400">Medio</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <AlertTriangleIcon className="size-3 text-amber-500" />Score agregado: 9.2 / 25
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Acciones de Mitigación</CardDescription>
              <CardTitle><span className="text-3xl font-bold">18</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle2Icon className="size-3 text-green-500" />11 completadas · 7 pendientes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Riesgos Aceptados</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">5</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <XCircleIcon className="size-3 text-muted-foreground" />Sin plan de acción activo
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Section cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <Card key={s.number} className={`border ${s.border}`}>
                <CardHeader>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.bg} mb-1`}>
                    <Icon className={`size-5 ${s.accent}`} />
                  </div>
                  <CardTitle className="text-base">
                    <span className={`text-xs font-semibold mr-1.5 ${s.accent}`}>{s.number}</span>
                    {s.title}
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed mt-1">{s.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      {s.stats.map((st) => (
                        <div key={st.label}>
                          <p className="text-lg font-bold">{st.value}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{st.label}</p>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={s.href}>Abrir <ChevronRightIcon /></a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Risk heat map */}
        <Card>
          <CardHeader>
            <CardTitle>Mapa de Calor de Riesgos</CardTitle>
            <CardDescription>Distribución de riesgos activos por Impacto × Probabilidad · el número indica cantidad de riesgos en esa celda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="border-collapse text-xs">
                <thead>
                  <tr>
                    <th className="text-right pr-3 pb-2 text-muted-foreground font-medium w-24">Probabilidad ↓ / Impacto →</th>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <th key={i} className="w-16 pb-2 text-center font-medium text-muted-foreground">
                        {i === 1 ? "Muy bajo" : i === 2 ? "Bajo" : i === 3 ? "Medio" : i === 4 ? "Alto" : "Crítico"}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[5, 4, 3, 2, 1].map((prob) => (
                    <tr key={prob}>
                      <td className="text-right pr-3 py-1 text-muted-foreground font-medium">
                        {prob === 5 ? "Muy alta" : prob === 4 ? "Alta" : prob === 3 ? "Media" : prob === 2 ? "Baja" : "Muy baja"}
                      </td>
                      {[1, 2, 3, 4, 5].map((impact) => {
                        const cell = heatMap.find((h) => h.prob === prob && h.impact === impact)!
                        return (
                          <td key={impact} className="py-1 px-1">
                            <div className={`w-14 h-10 rounded-md flex items-center justify-center font-bold text-sm ${heatColor(prob, impact)}`}>
                              {cell.count > 0 ? cell.count : ""}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-5 mt-4 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Leyenda:</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-200 inline-block" />Bajo (1–5)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-300 inline-block" />Medio (6–9)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-orange-400 inline-block" />Alto (10–14)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-500 inline-block" />Crítico (≥15)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

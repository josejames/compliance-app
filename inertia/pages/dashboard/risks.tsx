import { type Data } from '@generated/data'
import {
  ActivityIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  ClipboardListIcon,
  PlusIcon,
  TrendingDownIcon,
  UserIcon,
  XCircleIcon,
} from 'lucide-react'
import { PageHeader } from '~/components/page-header'
import { SectionNavCard } from '~/components/section-nav-card'
import { RiskSheet } from '~/components/sheets'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { badgeCls } from '~/lib/compliance_ui'
import { InertiaProps } from '~/types'

interface SubStats {
  [key: string]: number
  total: number
}

type Props = InertiaProps<{
  risks: Data.Risk[]
  evalStats: SubStats & { inProgress: number }
  mitStats: SubStats & { completed: number }
}>

const treatmentConfig: Record<string, { label: string; cls: string }> = {
  mitigate: {
    label: 'Mitigar',
    cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  },
  accept: {
    label: 'Aceptar',
    cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  },
  transfer: {
    label: 'Transferir',
    cls: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
  },
  avoid: { label: 'Evitar', cls: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' },
}

function buildHeatMap(risks: Data.Risk[]) {
  const map: Record<string, number> = {}
  for (const r of risks) {
    const key = `${r.probability}-${r.impact}`
    map[key] = (map[key] ?? 0) + 1
  }
  return map
}

function heatColor(prob: number, impact: number) {
  const score = prob * impact
  if (score >= 15) return 'bg-red-500 text-white'
  if (score >= 10) return 'bg-orange-400 text-white'
  if (score >= 6) return 'bg-amber-300 text-amber-900'
  return 'bg-green-200 text-green-900'
}

function scoreColorCls(score: number) {
  if (score >= 15) return 'text-red-600 dark:text-red-400 font-bold'
  if (score >= 10) return 'text-orange-600 dark:text-orange-400 font-bold'
  if (score >= 6) return 'text-amber-600 dark:text-amber-400 font-semibold'
  return 'text-green-600 dark:text-green-400 font-semibold'
}

export default function Page({ risks, evalStats, mitStats }: Props) {
  const activeRisks = risks.filter((r) => r.status !== 'closed')
  const criticalCount = activeRisks.filter((r) => r.level === 'critical').length
  const highCount = activeRisks.filter((r) => r.level === 'high').length
  const mediumCount = activeRisks.filter((r) => r.level === 'medium').length
  const acceptedCount = risks.filter((r) => r.status === 'accepted').length

  const avgScore =
    activeRisks.length > 0
      ? (activeRisks.reduce((sum, r) => sum + r.score, 0) / activeRisks.length).toFixed(1)
      : '0'

  const avgLevelLabel =
    Number(avgScore) >= 15
      ? 'Crítico'
      : Number(avgScore) >= 10
        ? 'Alto'
        : Number(avgScore) >= 6
          ? 'Medio'
          : 'Bajo'

  const avgLevelCls =
    Number(avgScore) >= 15
      ? 'text-red-600 dark:text-red-400'
      : Number(avgScore) >= 10
        ? 'text-orange-600 dark:text-orange-400'
        : Number(avgScore) >= 6
          ? 'text-amber-600 dark:text-amber-400'
          : 'text-green-600 dark:text-green-400'

  const heatMap = buildHeatMap(activeRisks)
  const recentRisks = [...risks].slice(0, 6)

  const sections = [
    {
      number: '3.1',
      title: 'Registro de Riesgos',
      description:
        'Lista maestra de todos los riesgos identificados: valoración Impacto × Probabilidad y tratamiento asignado.',
      href: '/riesgos/registro',
      icon: ClipboardListIcon,
      stats: [
        { label: 'Riesgos activos', value: String(activeRisks.length) },
        { label: 'Críticos', value: String(criticalCount) },
      ],
      accent: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-950/30',
      border: 'border-red-200 dark:border-red-800',
    },
    {
      number: '3.2',
      title: 'Evaluación de Riesgos',
      description:
        'Asistente para crear evaluaciones por proyecto, área o activo. Cuestionarios dinámicos para calcular el nivel de riesgo.',
      href: '/riesgos/evaluacion',
      icon: ActivityIcon,
      stats: [
        { label: 'Evaluaciones', value: String(evalStats.total) },
        { label: 'En curso', value: String(evalStats.inProgress) },
      ],
      accent: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-200 dark:border-amber-800',
    },
    {
      number: '3.3',
      title: 'Plan de Mitigación',
      description:
        'Seguimiento de acciones para reducir los riesgos identificados, con enlace directo al módulo de tareas.',
      href: '/riesgos/mitigacion',
      icon: TrendingDownIcon,
      stats: [
        { label: 'Acciones abiertas', value: String(mitStats.total - mitStats.completed) },
        { label: 'Completadas', value: String(mitStats.completed) },
      ],
      accent: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      border: 'border-emerald-200 dark:border-emerald-800',
    },
  ]

  return (
    <>
      <PageHeader crumbs={[{ label: 'Panel Principal', href: '/' }, { label: 'Riesgos' }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Gestión de Riesgos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Identificación, evaluación y mitigación de riesgos de cumplimiento
            </p>
          </div>
          <RiskSheet
            trigger={
              <Button size="sm">
                <PlusIcon />
                Nuevo riesgo
              </Button>
            }
          />
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Riesgos Activos</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">{activeRisks.length}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 font-medium">
                  {criticalCount} críticos
                </span>
                <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400 font-medium">
                  {highCount} altos
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 font-medium">
                  {mediumCount} medios
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Nivel de Riesgo Promedio</CardDescription>
              <CardTitle>
                <span className={`text-3xl font-bold ${avgLevelCls}`}>{avgLevelLabel}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <AlertTriangleIcon className="size-3 text-amber-500" />
                Score agregado: {avgScore} / 25
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Acciones de Mitigación</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">—</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle2Icon className="size-3 text-green-500" />
                Ver plan de mitigación
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Riesgos Aceptados</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {acceptedCount}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <XCircleIcon className="size-3 text-muted-foreground" />
                Sin plan de acción activo
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Section cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {sections.map((s) => (
            <SectionNavCard key={s.number} {...s} />
          ))}
        </div>

        {/* Risk heat map */}
        <Card>
          <CardHeader>
            <CardTitle>Mapa de Calor de Riesgos</CardTitle>
            <CardDescription>
              Distribución de riesgos activos por Impacto × Probabilidad · el número indica cantidad
              de riesgos en esa celda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="border-collapse text-xs">
                <thead>
                  <tr>
                    <th className="text-right pr-3 pb-2 text-muted-foreground font-medium w-24">
                      Probabilidad ↓ / Impacto →
                    </th>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <th
                        key={i}
                        className="w-16 pb-2 text-center font-medium text-muted-foreground"
                      >
                        {i === 1
                          ? 'Muy bajo'
                          : i === 2
                            ? 'Bajo'
                            : i === 3
                              ? 'Medio'
                              : i === 4
                                ? 'Alto'
                                : 'Crítico'}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[5, 4, 3, 2, 1].map((prob) => (
                    <tr key={prob}>
                      <td className="text-right pr-3 py-1 text-muted-foreground font-medium">
                        {prob === 5
                          ? 'Muy alta'
                          : prob === 4
                            ? 'Alta'
                            : prob === 3
                              ? 'Media'
                              : prob === 2
                                ? 'Baja'
                                : 'Muy baja'}
                      </td>
                      {[1, 2, 3, 4, 5].map((impact) => {
                        const count = heatMap[`${prob}-${impact}`] ?? 0
                        return (
                          <td key={impact} className="py-1 px-1">
                            <div
                              className={`w-14 h-10 rounded-md flex items-center justify-center font-bold text-sm ${heatColor(prob, impact)}`}
                            >
                              {count > 0 ? count : ''}
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
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-green-200 inline-block" />
                Bajo (1–5)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-300 inline-block" />
                Medio (6–9)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-orange-400 inline-block" />
                Alto (10–14)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-500 inline-block" />
                Crítico (≥15)
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Risk Register Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Registro de Riesgos</CardTitle>
              <CardDescription className="mt-1">
                Últimos riesgos registrados en el sistema
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="/riesgos/registro">
                Ver completo <ChevronRightIcon />
              </a>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {recentRisks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground gap-2">
                <p className="text-sm">No hay riesgos registrados todavía.</p>
                <RiskSheet
                  trigger={
                    <Button variant="outline" size="sm">
                      <PlusIcon />
                      Registrar primer riesgo
                    </Button>
                  }
                />
              </div>
            ) : (
              <div className="divide-y">
                {recentRisks.map((r) => {
                  const treatment = treatmentConfig[r.treatment] ?? {
                    label: r.treatment,
                    cls: 'bg-muted text-muted-foreground',
                  }
                  return (
                    <div
                      key={r.id}
                      className="flex items-start justify-between px-6 py-3 hover:bg-muted/40 transition-colors gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-mono text-muted-foreground">{r.code}</span>
                          <span className={`${badgeCls} bg-muted text-muted-foreground`}>
                            {r.category}
                          </span>
                        </div>
                        <p className="text-sm font-medium leading-snug">{r.title}</p>
                        {r.owner && (
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <UserIcon className="size-3" />
                            {r.owner}
                            {r.frameworks && (
                              <>
                                <span className="mx-1">·</span>
                                {r.frameworks}
                              </>
                            )}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span className={`text-sm tabular-nums ${scoreColorCls(r.score)}`}>
                          P{r.probability} × I{r.impact} = {r.score}
                        </span>
                        <span className={`${badgeCls} ${treatment.cls}`}>{treatment.label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

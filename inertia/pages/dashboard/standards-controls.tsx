import { Data } from '@generated/data'
import {
  AlertCircleIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  ClockIcon,
  ListChecksIcon,
  NetworkIcon,
} from 'lucide-react'
import { PageHeader } from '~/components/page-header'
import { SectionNavCard } from '~/components/section-nav-card'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { InertiaProps } from '~/types'

interface Stats {
  [key: string]: number
  totalControls: number
  totalFrameworks: number
  fullMappings: number
  partialMappings: number
  totalMappings: number
  coveragePercent: number
  unmappedControls: number
  overdueControls: number
}

type PageProps = InertiaProps<{
  frameworks: Data.Framework[]
  stats: Stats
}>

export default function Page({ frameworks, stats }: PageProps) {
  const activeFrameworks = frameworks.filter((f) => f.status === 'active')
  const customFrameworks = frameworks.filter((f) => f.category === 'custom')

  const sections = [
    {
      number: '2.1',
      title: 'Biblioteca de Marcos Normativos',
      description:
        'Frameworks normativos disponibles, precargados o personalizados. Vista detallada de dominios, categorías y objetivos de control.',
      href: '/normas-controles/biblioteca',
      icon: BookOpenIcon,
      stats: [
        { label: 'Frameworks activos', value: String(activeFrameworks.length) },
        { label: 'Personaliz.', value: String(customFrameworks.length) },
      ],
      accent: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-200 dark:border-blue-800',
    },
    {
      number: '2.2',
      title: 'Mapeo de Controles',
      description:
        'Matriz de correspondencia entre los controles internos y los requisitos de cada marco. Vista de cumplimiento múltiple cruzado.',
      href: '/normas-controles/mapeo',
      icon: NetworkIcon,
      stats: [
        { label: 'Mapeos totales', value: String(stats.totalMappings) },
        { label: 'Sin mapear', value: String(stats.unmappedControls) },
      ],
      accent: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/30',
      border: 'border-purple-200 dark:border-purple-800',
    },
    {
      number: '2.3',
      title: 'Catálogo de Controles Internos',
      description:
        'Inventario maestro de todos los controles implementados, con responsable, frecuencia de revisión y estado actual.',
      href: '/normas-controles/catalogo',
      icon: ListChecksIcon,
      stats: [
        { label: 'Controles totales', value: String(stats.totalControls) },
        { label: 'Requieren revisión', value: String(stats.overdueControls) },
      ],
      accent: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      border: 'border-emerald-200 dark:border-emerald-800',
    },
  ]

  return (
    <>
      <PageHeader
        crumbs={[
          { label: 'Panel Principal', href: '/' },
          { label: 'Gestión de Normas y Controles' },
        ]}
      />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gestión de Normas y Controles
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Centro de configuración normativa — define los marcos, mapea los
            controles y gestiona el inventario
          </p>
        </div>

        {/* Summary KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Frameworks Activos</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">{activeFrameworks.length}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle2Icon className="size-3 text-green-500" />
                {activeFrameworks.length - customFrameworks.length} precargados &middot;{' '}
                {customFrameworks.length} personalizado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Controles Internos</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">{stats.totalControls}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <AlertCircleIcon className="size-3 text-amber-500" />
                {stats.overdueControls} requieren revisión
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Cobertura de Mapeo</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stats.coveragePercent}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${stats.coveragePercent}%` }}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Controles Vencidos</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {stats.overdueControls}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <ClockIcon className="size-3 text-red-500" />
                Con estado &quot;overdue&quot;
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

        {/* Status overview */}
        <Card>
          <CardHeader>
            <CardTitle>Estado Global de Cumplimiento Normativo</CardTitle>
            <CardDescription>
              Porcentaje de cumplimiento por marco activo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeFrameworks.map((fw) => {
              const pct = fw.compliancePercentage
              return (
                <div key={fw.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{fw.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {fw.controlsCount} controles
                      </span>
                      <span
                        className={`font-semibold tabular-nums w-10 text-right ${
                          pct >= 80
                            ? 'text-green-600 dark:text-green-400'
                            : pct >= 60
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {pct}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        pct >= 80
                          ? 'bg-green-500'
                          : pct >= 60
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

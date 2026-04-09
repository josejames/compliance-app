import { Data } from '@generated/data'
import { Form } from '@adonisjs/inertia/react'
import { PageHeader } from '~/components/page-header'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  CheckIcon,
  MinusIcon,
  XIcon,
  InfoIcon,
} from 'lucide-react'
import { InertiaProps } from '~/types'

type MappingStatus = 'full' | 'partial' | 'none'

interface MappingEntry {
  [key: string]: string | number
  controlId: number
  frameworkId: number
  mappingStatus: MappingStatus
}

type PageProps = InertiaProps<{
  controls: Data.Control[]
  frameworks: Data.Framework[]
  mappings: MappingEntry[]
}>

const mappingConfig: Record<
  MappingStatus,
  { icon: typeof CheckIcon; cls: string; cellCls: string; label: string }
> = {
  full: {
    icon: CheckIcon,
    cls: 'text-green-600 dark:text-green-400',
    cellCls: 'bg-green-50 dark:bg-green-950/30',
    label: 'Completo',
  },
  partial: {
    icon: MinusIcon,
    cls: 'text-amber-500 dark:text-amber-400',
    cellCls: 'bg-amber-50 dark:bg-amber-950/30',
    label: 'Parcial',
  },
  none: {
    icon: XIcon,
    cls: 'text-muted-foreground/40',
    cellCls: '',
    label: 'No mapeado',
  },
}

const STATUS_CYCLE: MappingStatus[] = ['none', 'partial', 'full']

function nextStatus(current: MappingStatus): MappingStatus {
  const idx = STATUS_CYCLE.indexOf(current)
  return STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length]
}

function MappingCell({
  status,
  controlId,
  frameworkId,
}: {
  status: MappingStatus
  controlId: number
  frameworkId: number
}) {
  const cfg = mappingConfig[status]
  const Icon = cfg.icon
  const next = nextStatus(status)

  return (
    <td className={`text-center py-2.5 px-2 ${cfg.cellCls}`}>
      <Form route="normas-controles.mapeo.toggle" className="inline">
        <input type="hidden" name="controlId" value={controlId} />
        <input type="hidden" name="frameworkId" value={frameworkId} />
        <input type="hidden" name="mappingStatus" value={next} />
        <button
          type="submit"
          className="cursor-pointer hover:opacity-70 transition-opacity"
          title={`${cfg.label} — clic para cambiar`}
        >
          <Icon
            className={`size-4 mx-auto ${cfg.cls}`}
            strokeWidth={status === 'full' ? 2.5 : 2}
          />
        </button>
      </Form>
    </td>
  )
}

function coverageCount(
  controlId: number,
  mappings: MappingEntry[]
): number {
  return mappings.filter(
    (m) => m.controlId === controlId && m.mappingStatus !== 'none'
  ).length
}

function getMappingStatus(
  controlId: number,
  frameworkId: number,
  mappings: MappingEntry[]
): MappingStatus {
  const entry = mappings.find(
    (m) => m.controlId === controlId && m.frameworkId === frameworkId
  )
  return entry?.mappingStatus ?? 'none'
}

export default function Page({ controls, frameworks, mappings }: PageProps) {
  const totalMappings = mappings.filter((m) => m.mappingStatus !== 'none').length
  const fullMappings = mappings.filter((m) => m.mappingStatus === 'full').length
  const multiCoverage = controls.filter(
    (c) => coverageCount(c.id, mappings) >= 4
  ).length

  const controlsWithMapping = new Set(
    mappings.filter((m) => m.mappingStatus !== 'none').map((m) => m.controlId)
  )
  const unmappedCount = controls.length - controlsWithMapping.size

  const domains = [...new Set(controls.map((c) => c.domain))]

  return (
    <>
      <PageHeader
        crumbs={[
          { label: 'Gestión de Normas y Controles', href: '/normas-controles' },
          { label: 'Mapeo de Controles' },
        ]}
      />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mapeo de Controles</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Correspondencia entre controles internos y requisitos de cada marco normativo
            </p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Controles Mapeados</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">{controlsWithMapping.size}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                en {frameworks.length} marcos normativos
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Mapeos Completos</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {fullMappings}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {totalMappings - fullMappings} parciales &middot;{' '}
                {controls.length * frameworks.length - totalMappings} sin mapear
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Cobertura M&uacute;ltiple (&ge;4)</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {multiCoverage}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                controles que cubren 4+ marcos
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Sin Ning&uacute;n Mapeo</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {unmappedCount}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                controles sin asignar a ning&uacute;n marco
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Leyenda:</span>
          {(['full', 'partial', 'none'] as MappingStatus[]).map((s) => {
            const cfg = mappingConfig[s]
            const Icon = cfg.icon
            return (
              <span key={s} className="flex items-center gap-1.5">
                <Icon className={`size-3.5 ${cfg.cls}`} />
                {cfg.label}
              </span>
            )
          })}
          <span className="flex items-center gap-1 ml-2 text-blue-500">
            <InfoIcon className="size-3" />
            Haz clic en un icono para cambiar el estado del mapeo
          </span>
        </div>

        {/* Mapping matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Matriz de Correspondencia</CardTitle>
            <CardDescription>
              Filas = controles internos &middot; Columnas = marcos normativos
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-medium text-muted-foreground px-4 py-3 w-28">
                      C&oacute;digo
                    </th>
                    <th className="text-left font-medium text-muted-foreground px-3 py-3">
                      Control Interno
                    </th>
                    <th className="text-left font-medium text-muted-foreground px-3 py-3 hidden lg:table-cell">
                      Dominio
                    </th>
                    {frameworks.map((fw) => (
                      <th
                        key={fw.id}
                        className="text-center font-medium text-muted-foreground px-2 py-3 min-w-20"
                      >
                        <span className="text-[11px]">{fw.name}</span>
                      </th>
                    ))}
                    <th className="text-center font-medium text-muted-foreground px-3 py-3">
                      Cobertura
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {domains.map((domain) => (
                    <>
                      <tr key={`domain-${domain}`} className="bg-muted/40">
                        <td colSpan={frameworks.length + 4} className="px-4 py-1.5">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {domain}
                          </span>
                        </td>
                      </tr>
                      {controls
                        .filter((c) => c.domain === domain)
                        .map((ctrl) => {
                          const covered = coverageCount(ctrl.id, mappings)
                          return (
                            <tr
                              key={ctrl.id}
                              className="border-b border-border/40 hover:bg-muted/20 transition-colors"
                            >
                              <td className="px-4 py-2.5">
                                <span className="font-mono text-xs font-medium text-muted-foreground">
                                  {ctrl.code}
                                </span>
                              </td>
                              <td className="px-3 py-2.5 font-medium text-sm max-w-xs">
                                {ctrl.title}
                              </td>
                              <td className="px-3 py-2.5 text-xs text-muted-foreground hidden lg:table-cell">
                                {ctrl.domain}
                              </td>
                              {frameworks.map((fw) => (
                                <MappingCell
                                  key={fw.id}
                                  status={getMappingStatus(ctrl.id, fw.id, mappings)}
                                  controlId={ctrl.id}
                                  frameworkId={fw.id}
                                />
                              ))}
                              <td className="text-center px-3 py-2.5">
                                <span
                                  className={`text-xs font-bold tabular-nums ${
                                    covered >= 5
                                      ? 'text-green-600 dark:text-green-400'
                                      : covered >= 3
                                        ? 'text-amber-600 dark:text-amber-400'
                                        : 'text-red-600 dark:text-red-400'
                                  }`}
                                >
                                  {covered}/{frameworks.length}
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Multi-coverage highlight */}
        {controls.filter((c) => coverageCount(c.id, mappings) >= 4).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Vista de Cumplimiento M&uacute;ltiple</CardTitle>
              <CardDescription>
                Controles que satisfacen requisitos de 4 o m&aacute;s marcos simult&aacute;neamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {controls
                .filter((c) => coverageCount(c.id, mappings) >= 4)
                .sort(
                  (a, b) =>
                    coverageCount(b.id, mappings) - coverageCount(a.id, mappings)
                )
                .map((ctrl) => {
                  const covered = coverageCount(ctrl.id, mappings)
                  const coveredFrameworks = frameworks.filter((fw) => {
                    const status = getMappingStatus(ctrl.id, fw.id, mappings)
                    return status !== 'none'
                  })
                  return (
                    <div
                      key={ctrl.id}
                      className="flex items-center gap-4 rounded-lg border border-border/50 px-4 py-3 hover:bg-muted/20 transition-colors"
                    >
                      <span className="font-mono text-xs font-medium text-muted-foreground w-16 shrink-0">
                        {ctrl.code}
                      </span>
                      <span className="font-medium text-sm flex-1 min-w-0 truncate">
                        {ctrl.title}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        {coveredFrameworks.map((fw) => {
                          const status = getMappingStatus(ctrl.id, fw.id, mappings)
                          return (
                            <span
                              key={fw.id}
                              className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                                status === 'full'
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                              }`}
                            >
                              {fw.name}
                            </span>
                          )
                        })}
                      </div>
                      <span className="text-xs font-bold text-green-600 dark:text-green-400 shrink-0 w-12 text-right">
                        {covered}/{frameworks.length}
                      </span>
                    </div>
                  )
                })}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}

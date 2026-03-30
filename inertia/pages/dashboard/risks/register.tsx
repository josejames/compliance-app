import { type Data } from '@generated/data'
import { PageHeader } from '~/components/page-header'
import { levelConfig } from '~/lib/compliance_ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { PlusIcon, DownloadIcon, UserIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { RiskSheet } from '~/components/sheets'
import { router } from '@inertiajs/react'
import { InertiaProps } from '~/types'

type Props = InertiaProps<{
  risks: Data.Risk[]
}>

const treatmentConfig: Record<string, { label: string; cls: string }> = {
  mitigate: {
    label: 'Mitigar',
    cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  },
  accept: {
    label: 'Aceptar',
    cls: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  },
  transfer: {
    label: 'Transferir',
    cls: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
  },
  avoid: {
    label: 'Evitar',
    cls: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400',
  },
}

const statusConfig: Record<string, { label: string; cls: string }> = {
  'open': { label: 'Abierto', cls: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' },
  'in-treatment': {
    label: 'En tratamiento',
    cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  },
  'accepted': {
    label: 'Aceptado',
    cls: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  },
  'closed': {
    label: 'Cerrado',
    cls: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  },
}

function ScoreCell({
  impact,
  probability,
  level,
}: {
  impact: number
  probability: number
  level: Data.Risk['level']
}) {
  const score = impact * probability
  const cfg = levelConfig[level]
  return (
    <div className="flex items-center gap-1.5">
      <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${cfg.cls}`}>{cfg.label}</span>
      <span className={`text-sm font-bold tabular-nums ${cfg.scoreCls}`}>{score}</span>
      <span className="text-xs text-muted-foreground">
        ({impact}×{probability})
      </span>
    </div>
  )
}

function handleDelete(id: number) {
  if (confirm('¿Estás seguro de que deseas eliminar este riesgo?')) {
    router.delete(`/riesgos/${id}`)
  }
}

export default function Page({ risks }: Props) {
  const sorted = [...risks].sort((a, b) => b.score - a.score)

  const counts = {
    critical: risks.filter((r) => r.level === 'critical').length,
    high: risks.filter((r) => r.level === 'high').length,
    medium: risks.filter((r) => r.level === 'medium').length,
    open: risks.filter((r) => r.status === 'open').length,
  }

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Riesgos', href: '/riesgos' }, { label: 'Registro de Riesgos' }]}
      />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Registro de Riesgos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {risks.length} riesgo{risks.length !== 1 ? 's' : ''} identificado
              {risks.length !== 1 ? 's' : ''} · ordenados por puntuación
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <DownloadIcon />
              Exportar
            </Button>
            <RiskSheet
              trigger={
                <Button size="sm">
                  <PlusIcon />
                  Nuevo riesgo
                </Button>
              }
            />
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-red-200 dark:border-red-900 bg-red-50/40 dark:bg-red-950/10">
            <CardHeader>
              <CardDescription className="text-red-600 dark:text-red-400">Críticos</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {counts.critical}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-red-600/70 dark:text-red-400/70">Puntuación ≥15</p>
            </CardContent>
          </Card>
          <Card className="border-orange-200 dark:border-orange-900 bg-orange-50/40 dark:bg-orange-950/10">
            <CardHeader>
              <CardDescription className="text-orange-600 dark:text-orange-400">
                Altos
              </CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {counts.high}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-orange-600/70 dark:text-orange-400/70">Puntuación 10–14</p>
            </CardContent>
          </Card>
          <Card className="border-amber-200 dark:border-amber-900 bg-amber-50/40 dark:bg-amber-950/10">
            <CardHeader>
              <CardDescription className="text-amber-600 dark:text-amber-400">
                Medios
              </CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {counts.medium}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-amber-600/70 dark:text-amber-400/70">Puntuación 6–9</p>
            </CardContent>
          </Card>
          <Card className="border-muted">
            <CardHeader>
              <CardDescription>Abiertos</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">{counts.open}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Pendientes de tratamiento</p>
            </CardContent>
          </Card>
        </div>

        {/* Risk table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Todos los Riesgos</CardTitle>
              <CardDescription className="text-xs">
                Ordenados por puntuación descendente
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {sorted.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground gap-3">
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
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40 text-xs text-muted-foreground uppercase tracking-wide">
                      <th className="text-left px-4 py-2.5 font-medium">Código</th>
                      <th className="text-left px-4 py-2.5 font-medium">Riesgo</th>
                      <th className="text-left px-4 py-2.5 font-medium hidden md:table-cell">
                        Categoría
                      </th>
                      <th className="text-left px-4 py-2.5 font-medium hidden lg:table-cell">
                        Responsable
                      </th>
                      <th className="text-left px-4 py-2.5 font-medium">Puntuación</th>
                      <th className="text-left px-4 py-2.5 font-medium hidden sm:table-cell">
                        Tratamiento
                      </th>
                      <th className="text-left px-4 py-2.5 font-medium">Estado</th>
                      <th className="px-4 py-2.5" />
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {sorted.map((r) => {
                      const treatment = treatmentConfig[r.treatment] ?? {
                        label: r.treatment,
                        cls: 'bg-muted text-muted-foreground',
                      }
                      const status = statusConfig[r.status] ?? {
                        label: r.status,
                        cls: 'bg-muted text-muted-foreground',
                      }
                      return (
                        <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3">
                            <span className="text-xs font-mono text-muted-foreground">
                              {r.code}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-medium leading-tight max-w-xs truncate">{r.title}</p>
                            {r.frameworks && (
                              <p className="text-xs text-muted-foreground mt-0.5">{r.frameworks}</p>
                            )}
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span className="text-xs">{r.category}</span>
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <div className="flex items-center gap-1 text-xs">
                              <UserIcon className="size-3 text-muted-foreground shrink-0" />
                              {r.owner}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <ScoreCell
                              impact={r.impact}
                              probability={r.probability}
                              level={r.level}
                            />
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell">
                            <span
                              className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${treatment.cls}`}
                            >
                              {treatment.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${status.cls}`}
                            >
                              {status.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <RiskSheet
                                trigger={
                                  <Button variant="ghost" size="xs">
                                    <PencilIcon className="size-3" />
                                  </Button>
                                }
                                riskId={r.id}
                                defaultValues={{
                                  title: r.title,
                                  category: r.category,
                                  description: r.description ?? '',
                                  impact: String(r.impact),
                                  probability: String(r.probability),
                                  treatment: r.treatment,
                                  owner: r.owner,
                                  status: r.status,
                                  frameworks: r.frameworks ?? '',
                                }}
                              />
                              <Button variant="ghost" size="xs" onClick={() => handleDelete(r.id)}>
                                <Trash2Icon className="size-3 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

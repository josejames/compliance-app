import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { PageHeader } from '~/components/page-header'
import { levelConfig } from '~/lib/compliance_ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import {
  PlusIcon,
  CheckCircle2Icon,
  ClockIcon,
  AlertCircleIcon,
  XCircleIcon,
  LinkIcon,
  TrendingDownIcon,
  UserIcon,
  CalendarIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  TrashIcon,
} from 'lucide-react'
import { MitigationSheet } from '~/components/sheets'
import { InertiaProps } from '~/types'

type ActionStatus = 'completed' | 'in-progress' | 'pending' | 'overdue'
type RiskLevel = 'critical' | 'high' | 'medium' | 'low'

interface MitigationRow extends Data.MitigationAction {
  [key: string]: unknown
  riskTitle: string
  riskCode: string
  currentLevel: RiskLevel
  currentScore: number
}

type PageProps = InertiaProps<{
  actions: MitigationRow[]
  risks: Data.Risk[]
}>

const statusConfig: Record<ActionStatus, { label: string; cls: string; icon: typeof CheckCircle2Icon; iconCls: string }> = {
  completed: { label: 'Completada', cls: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400', icon: CheckCircle2Icon, iconCls: 'text-green-500' },
  'in-progress': { label: 'En curso', cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400', icon: ClockIcon, iconCls: 'text-blue-500' },
  pending: { label: 'Pendiente', cls: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', icon: AlertCircleIcon, iconCls: 'text-muted-foreground' },
  overdue: { label: 'Vencida', cls: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400', icon: XCircleIcon, iconCls: 'text-red-500' },
}

function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function Page({ actions, risks }: PageProps) {
  const counts = {
    completed: actions.filter((a) => a.status === 'completed').length,
    inProgress: actions.filter((a) => a.status === 'in-progress').length,
    pending: actions.filter((a) => a.status === 'pending').length,
    overdue: actions.filter((a) => a.status === 'overdue').length,
  }
  const avgReduction = actions.length > 0
    ? Math.round(actions.reduce((acc, a) => acc + (a.currentScore - a.residualScore), 0) / actions.length)
    : 0

  return (
    <>
      <PageHeader crumbs={[{ label: 'Riesgos', href: '/riesgos' }, { label: 'Plan de Mitigación' }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Plan de Mitigación</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Seguimiento de acciones para reducir los riesgos identificados
            </p>
          </div>
          <MitigationSheet
            risks={risks}
            trigger={<Button size="sm"><PlusIcon />Nueva acción</Button>}
          />
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-red-200 dark:border-red-900 bg-red-50/40 dark:bg-red-950/10">
            <CardHeader>
              <CardDescription className="text-red-600 dark:text-red-400">Acciones Vencidas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-red-600 dark:text-red-400">{counts.overdue}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-red-600/70 dark:text-red-400/70">Requieren atención inmediata</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>En Curso</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{counts.inProgress}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Activas ahora</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Completadas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{counts.completed}</span></CardTitle>
            </CardHeader>
            <CardContent>
              {actions.length > 0 && (
                <>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-green-500" style={{ width: `${Math.round((counts.completed / actions.length) * 100)}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{Math.round((counts.completed / actions.length) * 100)}% del plan</p>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Reducción de Riesgo Promedio</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">&minus;{avgReduction}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground flex items-center gap-1"><TrendingDownIcon className="size-3 text-emerald-500" />puntos de score por acción</p></CardContent>
          </Card>
        </div>

        {/* Mitigation actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones de Mitigación</CardTitle>
            <CardDescription>
              {actions.length} acciones para {new Set(actions.map((a) => a.riskId)).size} riesgos &middot; ordenadas por urgencia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {actions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground gap-2">
                <p className="text-sm">No hay acciones de mitigación registradas todavía.</p>
                <MitigationSheet
                  risks={risks}
                  trigger={<Button variant="outline" size="sm"><PlusIcon />Crear primera acción</Button>}
                />
              </div>
            ) : (
              [...actions]
                .sort((a, b) => {
                  const order: ActionStatus[] = ['overdue', 'in-progress', 'pending', 'completed']
                  return order.indexOf(a.status as ActionStatus) - order.indexOf(b.status as ActionStatus)
                })
                .map((act) => {
                  const sCfg = statusConfig[act.status as ActionStatus] ?? statusConfig.pending
                  const StatusIcon = sCfg.icon
                  const currCfg = levelConfig[act.currentLevel] ?? levelConfig.medium
                  const residCfg = levelConfig[act.residualLevel as RiskLevel] ?? levelConfig.medium
                  return (
                    <div key={act.id} className={`rounded-lg border px-4 py-4 space-y-3 ${
                      act.status === 'overdue' ? 'border-red-200 bg-red-50/40 dark:border-red-900 dark:bg-red-950/10' :
                      act.status === 'completed' ? 'border-border/40 bg-muted/10 opacity-70' : 'border-border/50'
                    }`}>
                      {/* Top row */}
                      <div className="flex items-start gap-3">
                        <StatusIcon className={`size-5 shrink-0 mt-0.5 ${sCfg.iconCls}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs text-muted-foreground">{act.code}</span>
                            <span className="font-semibold text-sm">{act.action}</span>
                          </div>
                          {act.description && <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{act.description}</p>}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sCfg.cls}`}>{sCfg.label}</span>
                          <MitigationSheet
                            mitigationId={act.id}
                            risks={risks}
                            defaultValues={{
                              action: act.action,
                              description: act.description ?? '',
                              riskId: String(act.riskId),
                              owner: act.owner,
                              dueDate: act.dueDate ?? '',
                              status: act.status,
                              residualLevel: act.residualLevel,
                              residualScore: String(act.residualScore),
                              linkedTaskId: act.linkedTaskId ?? '',
                              notes: act.notes ?? '',
                            }}
                            trigger={<Button variant="ghost" size="icon-sm"><ChevronRightIcon /></Button>}
                          />
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => {
                              if (confirm('¿Eliminar esta acción de mitigación?')) {
                                router.delete(`/riesgos/mitigacion/${act.id}`)
                              }
                            }}
                          >
                            <TrashIcon className="size-3.5 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>

                      {/* Risk context row */}
                      <div className="flex items-center gap-3 pl-8 flex-wrap">
                        <span className="text-xs text-muted-foreground">Riesgo: <span className="font-medium text-foreground">{act.riskCode} — {act.riskTitle}</span></span>
                        <span className="flex items-center gap-1 text-xs">
                          <span className={`px-1.5 py-0.5 rounded font-medium text-[10px] ${currCfg.cls}`}>{currCfg.label} ({act.currentScore})</span>
                          <ArrowRightIcon className="size-3 text-muted-foreground" />
                          <span className={`px-1.5 py-0.5 rounded font-medium text-[10px] ${residCfg.cls}`}>{residCfg.label} ({act.residualScore})</span>
                        </span>
                      </div>

                      {/* Progress + meta */}
                      <div className="pl-8 space-y-2">
                        {(act.status === 'in-progress' || act.status === 'overdue') && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden max-w-xs">
                              <div className={`h-full rounded-full ${
                                act.status === 'overdue' ? 'bg-red-500' : 'bg-blue-500'
                              }`} style={{ width: `${act.progress}%` }} />
                            </div>
                            <span className="text-xs text-muted-foreground">{act.progress}%</span>
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><UserIcon className="size-3" />{act.owner}</span>
                          <span className={`flex items-center gap-1 font-medium ${
                            act.daysLeft < 0 ? 'text-red-600 dark:text-red-400' :
                            act.daysLeft <= 3 ? 'text-amber-600 dark:text-amber-400' : ''
                          }`}>
                            <CalendarIcon className="size-3" />
                            {formatDate(act.dueDate)}
                            {act.daysLeft < 0 && ` · ${Math.abs(act.daysLeft)}d de retraso`}
                            {act.daysLeft >= 0 && act.status !== 'completed' && ` · en ${act.daysLeft}d`}
                          </span>
                          {act.linkedTaskId && (
                            <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                              <LinkIcon className="size-3" />
                              Tarea vinculada: {act.linkedTaskId}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

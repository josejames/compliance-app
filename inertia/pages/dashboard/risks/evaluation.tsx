import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { PageHeader } from '~/components/page-header'
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
  PlayCircleIcon,
  BuildingIcon,
  BoxIcon,
  FolderKanbanIcon,
  ChevronRightIcon,
  CalendarIcon,
  UserIcon,
  TrashIcon,
} from 'lucide-react'
import { EvaluationSheet } from '~/components/sheets'
import { InertiaProps } from '~/types'

type EvalScope = 'project' | 'area' | 'asset'
type EvalStatus = 'completed' | 'in-progress' | 'scheduled'

type PageProps = InertiaProps<{
  evaluations: Data.RiskEvaluation[]
}>

const scopeConfig: Record<EvalScope, { icon: typeof BuildingIcon; label: string; cls: string }> = {
  project: { icon: FolderKanbanIcon, label: 'Proyecto', cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' },
  area: { icon: BuildingIcon, label: 'Área', cls: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400' },
  asset: { icon: BoxIcon, label: 'Activo', cls: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400' },
}

const statusConfig: Record<EvalStatus, { label: string; cls: string; icon: typeof CheckCircle2Icon }> = {
  completed: { label: 'Completada', cls: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400', icon: CheckCircle2Icon },
  'in-progress': { label: 'En curso', cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400', icon: PlayCircleIcon },
  scheduled: { label: 'Programada', cls: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', icon: ClockIcon },
}

const levelConfig: Record<string, { label: string; cls: string }> = {
  critical: { label: 'Crítico', cls: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' },
  high: { label: 'Alto', cls: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' },
  medium: { label: 'Medio', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' },
  low: { label: 'Bajo', cls: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' },
}

function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function Page({ evaluations }: PageProps) {
  const completed = evaluations.filter((e) => e.status === 'completed').length
  const inProgress = evaluations.filter((e) => e.status === 'in-progress').length
  const scheduled = evaluations.filter((e) => e.status === 'scheduled').length

  return (
    <>
      <PageHeader crumbs={[{ label: 'Riesgos', href: '/riesgos' }, { label: 'Evaluación de Riesgos' }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Evaluación de Riesgos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Evaluaciones por proyecto, área o activo &middot; cuestionarios dinámicos de riesgo
            </p>
          </div>
          <EvaluationSheet trigger={<Button size="sm"><PlusIcon />Nueva evaluación</Button>} />
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Evaluaciones</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{evaluations.length}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">en el período actual</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Completadas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{completed}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground flex items-center gap-1"><CheckCircle2Icon className="size-3 text-green-500" />Con informe generado</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>En Curso</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{inProgress}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground flex items-center gap-1"><PlayCircleIcon className="size-3 text-blue-500" />Cuestionarios activos</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Programadas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-slate-600 dark:text-slate-400">{scheduled}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground flex items-center gap-1"><ClockIcon className="size-3" />Próximas a iniciar</p></CardContent>
          </Card>
        </div>

        {/* Evaluation list */}
        <Card>
          <CardHeader>
            <CardTitle>Evaluaciones</CardTitle>
            <CardDescription>Historial y estado de todas las evaluaciones de riesgo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {evaluations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground gap-2">
                <p className="text-sm">No hay evaluaciones registradas todavía.</p>
                <EvaluationSheet trigger={<Button variant="outline" size="sm"><PlusIcon />Crear primera evaluación</Button>} />
              </div>
            ) : (
              evaluations.map((ev) => {
                const sCfg = statusConfig[ev.status as EvalStatus] ?? statusConfig.scheduled
                const escCfg = scopeConfig[ev.scope as EvalScope] ?? scopeConfig.area
                const lvlCfg = levelConfig[ev.riskLevel] ?? levelConfig.medium
                const StatusIcon = sCfg.icon
                const ScopeIcon = escCfg.icon
                return (
                  <div key={ev.id} className="flex items-center gap-4 rounded-lg border border-border/50 px-4 py-3 hover:bg-muted/20 transition-colors">
                    <StatusIcon className={`size-5 shrink-0 ${ev.status === 'completed' ? 'text-green-500' : ev.status === 'in-progress' ? 'text-blue-500' : 'text-muted-foreground'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs text-muted-foreground">{ev.code}</span>
                        <p className="font-medium text-sm">{ev.title}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1"><ScopeIcon className="size-3" />{ev.scopeTarget}</span>
                        <span className="flex items-center gap-1"><UserIcon className="size-3" />{ev.owner}</span>
                        <span className="flex items-center gap-1"><CalendarIcon className="size-3" />{formatDate(ev.startDate)} → {formatDate(ev.endDate)}</span>
                      </div>
                      {ev.status === 'in-progress' && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden max-w-xs">
                            <div className="h-full rounded-full bg-blue-500" style={{ width: `${ev.progress}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{ev.questionsAnswered}/{ev.questionsTotal} preguntas</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${escCfg.cls}`}>{escCfg.label}</span>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${sCfg.cls}`}>{sCfg.label}</span>
                      {ev.status !== 'scheduled' && (
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${lvlCfg.cls}`}>{ev.risksFound} riesgos</span>
                      )}
                      <EvaluationSheet
                        evaluationId={ev.id}
                        defaultValues={{
                          title: ev.title,
                          scope: ev.scope,
                          scopeTarget: ev.scopeTarget,
                          framework: ev.framework ?? '',
                          status: ev.status,
                          owner: ev.owner,
                          startDate: ev.startDate ?? '',
                          endDate: ev.endDate ?? '',
                          questionsTotal: String(ev.questionsTotal),
                          notes: ev.notes ?? '',
                        }}
                        trigger={<Button variant="outline" size="sm">Editar<ChevronRightIcon /></Button>}
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => {
                          if (confirm('¿Eliminar esta evaluación?')) {
                            router.delete(`/riesgos/evaluacion/${ev.id}`)
                          }
                        }}
                      >
                        <TrashIcon className="size-3.5 text-muted-foreground" />
                      </Button>
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

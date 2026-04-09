import { type Data } from '@generated/data'
import { PageHeader } from '~/components/page-header'
import { ControlSheet } from '~/components/sheets'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { InertiaProps } from '~/types'
import { router } from '@inertiajs/react'
import {
  AlertCircleIcon,
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  DownloadIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  Trash2Icon,
  UserIcon,
  XCircleIcon,
} from 'lucide-react'
import { useState } from 'react'

type ControlStatus = 'active' | 'needs-review' | 'overdue' | 'inactive'
type ReviewFrequency = 'continuous' | 'monthly' | 'quarterly' | 'annual'

type Props = InertiaProps<{
  controls: Data.Control[]
}>

const statusConfig: Record<ControlStatus, { label: string; cls: string; icon: typeof CheckCircle2Icon; iconCls: string }> = {
  active: {
    label: 'Activo',
    cls: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    icon: CheckCircle2Icon,
    iconCls: 'text-green-500',
  },
  'needs-review': {
    label: 'Requiere revisión',
    cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    icon: AlertCircleIcon,
    iconCls: 'text-amber-500',
  },
  overdue: {
    label: 'Vencido',
    cls: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    icon: XCircleIcon,
    iconCls: 'text-red-500',
  },
  inactive: {
    label: 'Inactivo',
    cls: 'bg-muted text-muted-foreground',
    icon: ClockIcon,
    iconCls: 'text-muted-foreground',
  },
}

const frequencyLabels: Record<ReviewFrequency, string> = {
  continuous: 'Continuo',
  monthly: 'Mensual',
  quarterly: 'Trimestral',
  annual: 'Anual',
}

const frequencyColors: Record<ReviewFrequency, string> = {
  continuous: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  monthly: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  quarterly: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
  annual: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400',
}

type ActiveStatus = 'all' | ControlStatus

function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

function handleDelete(id: number) {
  if (confirm('¿Estás seguro de que deseas eliminar este control interno?')) {
    router.delete(`/normas-controles/catalogo/${id}`)
  }
}

export default function Page({ controls }: Props) {
  const [search, setSearch] = useState('')
  const [activeStatus, setActiveStatus] = useState<ActiveStatus>('all')
  const [editControl, setEditControl] = useState<Data.Control | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const domains = [...new Set(controls.map((c) => c.domain))]

  const filtered = controls.filter((c) => {
    const matchesSearch =
      search === '' ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      (c.description ?? '').toLowerCase().includes(search.toLowerCase())
    const matchesStatus = activeStatus === 'all' || c.status === activeStatus
    return matchesSearch && matchesStatus
  })

  const filteredDomains = [...new Set(filtered.map((c) => c.domain))]

  const statusCounts = {
    active: controls.filter((c) => c.status === 'active').length,
    'needs-review': controls.filter((c) => c.status === 'needs-review').length,
    overdue: controls.filter((c) => c.status === 'overdue').length,
  }

  return (
    <>
      <PageHeader crumbs={[{ label: 'Gestión de Normas y Controles', href: '/normas-controles' }, { label: 'Catálogo de Controles Internos' }]} />

      {/* Edit sheet (controlled) */}
      {editControl && (
        <ControlSheet
          controlId={editControl.id}
          defaultValues={{
            title: editControl.title,
            description: editControl.description ?? '',
            domain: editControl.domain,
            owner: editControl.owner,
            frequency: editControl.frequency ?? 'quarterly',
            status: editControl.status ?? 'active',
            frameworks: editControl.frameworks ?? '',
            lastReviewedAt: editControl.lastReviewedAt ?? '',
            nextReviewAt: editControl.nextReviewAt ?? '',
          }}
          open={editOpen}
          onOpenChange={(v) => {
            setEditOpen(v)
            if (!v) setEditControl(null)
          }}
        />
      )}

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Catálogo de Controles Internos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Inventario maestro de {controls.length} controles implementados en la organización
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <DownloadIcon />
              Exportar
            </Button>
            <ControlSheet
              trigger={
                <Button size="sm">
                  <PlusIcon />
                  Nuevo control
                </Button>
              }
            />
          </div>
        </div>

        {/* Status summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Controles</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{controls.length}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">en {domains.length} dominios</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Activos</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{statusCounts.active}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle2Icon className="size-3 text-green-500" />Conformes con la política vigente
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Requieren Revisión</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-amber-600 dark:text-amber-400">{statusCounts['needs-review']}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <AlertCircleIcon className="size-3 text-amber-500" />Dentro del plazo de alerta
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Vencidos</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-red-600 dark:text-red-400">{statusCounts.overdue}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <XCircleIcon className="size-3 text-red-500" />Superaron la fecha de revisión
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar control por nombre o código…"
              className="w-full h-8 rounded-lg border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>
          <Button variant="outline" size="sm">
            <SlidersHorizontalIcon />
            Filtros avanzados
          </Button>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-muted-foreground">Estado:</span>
            {(['all', 'active', 'needs-review', 'overdue', 'inactive'] as const).map((s) => (
              <Button
                key={s}
                variant={activeStatus === s ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveStatus(s)}
              >
                {s === 'all' ? 'Todos' : statusConfig[s as ControlStatus].label}
              </Button>
            ))}
          </div>
        </div>

        {/* Controls by domain */}
        {filteredDomains.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">No se encontraron controles con los filtros aplicados.</p>
        ) : (
          filteredDomains.map((domain) => {
            const domainControls = filtered.filter((c) => c.domain === domain)
            return (
              <div key={domain} className="space-y-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {domain}
                  </h2>
                  <span className="text-xs text-muted-foreground">({domainControls.length} controles)</span>
                  <div className="flex-1 h-px bg-border/60" />
                </div>

                <div className="space-y-2">
                  {domainControls.map((ctrl) => {
                    const status = (ctrl.status ?? 'active') as ControlStatus
                    const freq = (ctrl.frequency ?? 'quarterly') as ReviewFrequency
                    const sCfg = statusConfig[status]
                    const StatusIcon = sCfg.icon
                    return (
                      <Card key={ctrl.id} className="overflow-hidden">
                        <div className="flex items-start gap-4 p-4">
                          <StatusIcon className={`size-5 shrink-0 mt-0.5 ${sCfg.iconCls}`} />

                          <div className="flex-1 min-w-0 space-y-2">
                            {/* Header row */}
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-mono text-xs font-medium text-muted-foreground">{ctrl.code}</span>
                                  <span className="font-semibold text-sm">{ctrl.title}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-1">
                                  {ctrl.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sCfg.cls}`}>
                                  {sCfg.label}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  onClick={() => {
                                    setEditControl(ctrl)
                                    setEditOpen(true)
                                  }}
                                >
                                  <PencilIcon />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => handleDelete(ctrl.id)}
                                >
                                  <Trash2Icon />
                                </Button>
                              </div>
                            </div>

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <UserIcon className="size-3" />
                                {ctrl.owner}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded font-medium ${frequencyColors[freq]}`}>
                                {frequencyLabels[freq]}
                              </span>
                              {ctrl.lastReviewedAt && (
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <CalendarIcon className="size-3" />
                                  Revisado: {formatDate(ctrl.lastReviewedAt)}
                                </span>
                              )}
                              {ctrl.nextReviewAt && (
                                <span
                                  className={`flex items-center gap-1 font-medium ${
                                    status === 'overdue'
                                      ? 'text-red-600 dark:text-red-400'
                                      : status === 'needs-review'
                                        ? 'text-amber-600 dark:text-amber-400'
                                        : 'text-muted-foreground'
                                  }`}
                                >
                                  <ClockIcon className="size-3" />
                                  Próxima: {formatDate(ctrl.nextReviewAt)}
                                </span>
                              )}
                              {ctrl.frameworkList.length > 0 && (
                                <div className="flex items-center gap-1 flex-wrap ml-auto">
                                  {ctrl.frameworkList.map((fw) => (
                                    <span
                                      key={fw}
                                      className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                    >
                                      {fw}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )
          })
        )}
      </div>
    </>
  )
}

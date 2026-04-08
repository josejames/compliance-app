import { type Data } from '@generated/data'
import { PageHeader } from '~/components/page-header'
import { FrameworkSheet } from '~/components/sheets'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  frameworkCategoryConfig,
  frameworkStatusConfig,
  scoreBgCls,
  scoreTextCls,
  type FrameworkCategory,
  type FrameworkStatus,
} from '~/lib/compliance_ui'
import { InertiaProps } from '~/types'
import { router } from '@inertiajs/react'
import {
  CheckCircle2Icon,
  ChevronRightIcon,
  ClockIcon,
  LayersIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  SquareCheckIcon,
  StarIcon,
  Trash2Icon,
} from 'lucide-react'
import { useState } from 'react'

type Props = InertiaProps<{
  frameworks: Data.Framework[]
}>

function ComplianceBar({ value }: { value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Cumplimiento</span>
        <span className={`font-semibold ${scoreTextCls(value)}`}>{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${scoreBgCls(value)}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function handleDelete(id: number) {
  if (confirm('¿Estás seguro de que deseas eliminar este marco normativo?')) {
    router.delete(`/normas-controles/biblioteca/${id}`)
  }
}

export default function Page({ frameworks }: Props) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<'all' | FrameworkCategory>('all')

  const activeCount = frameworks.filter((f) => f.status === 'active').length
  const customCount = frameworks.filter((f) => f.status === 'custom').length

  const filtered = frameworks.filter((f) => {
    const matchesSearch =
      search === '' ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      (f.description ?? '').toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'all' || f.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const totalControls = frameworks.reduce((a, f) => a + f.controlsCount, 0)
  const bestCompliance = frameworks.length > 0 ? Math.max(...frameworks.map((f) => f.compliancePercentage)) : 0
  const bestFramework = frameworks.find((f) => f.compliancePercentage === bestCompliance)
  const avgCompliance =
    frameworks.length > 0
      ? Math.round(frameworks.reduce((a, f) => a + f.compliancePercentage, 0) / frameworks.length)
      : 0

  const categoryFilterOptions: { value: 'all' | FrameworkCategory; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'international', label: 'Internacional' },
    { value: 'regional', label: 'Regional' },
    { value: 'sector', label: 'Sectorial' },
    { value: 'custom', label: 'Personalizado' },
  ]

  return (
    <>
      <PageHeader
        crumbs={[
          { label: 'Gestión de Normas y Controles', href: '/normas-controles' },
          { label: 'Biblioteca de Marcos Normativos' },
        ]}
      />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Biblioteca de Marcos Normativos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {frameworks.length} marcos disponibles · {activeCount} activos · {customCount}{' '}
              personalizados
            </p>
          </div>
          <FrameworkSheet
            trigger={
              <Button size="sm">
                <PlusIcon />
                Añadir marco
              </Button>
            }
          />
        </div>

        {/* Summary stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Marcos Totales</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">{frameworks.length}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {activeCount} activos · {customCount} personaliz.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total Controles</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">{totalControls}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <LayersIcon className="size-3" />
                Suma de todos los marcos
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Mejor Cumplimiento</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {bestCompliance}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <StarIcon className="size-3 text-green-500" />
                {bestFramework?.name ?? '—'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Promedio de Cumplimiento</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">{avgCompliance}%</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full ${scoreBgCls(avgCompliance)}`}
                  style={{ width: `${avgCompliance}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search + filter bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar framework…"
              className="w-full h-8 rounded-lg border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {categoryFilterOptions.map((opt) => (
              <Button
                key={opt.value}
                variant={activeCategory === opt.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Framework cards grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground gap-3">
            <p className="text-sm">No hay marcos normativos que coincidan con la búsqueda.</p>
            <FrameworkSheet
              trigger={
                <Button variant="outline" size="sm">
                  <PlusIcon />
                  Añadir primer marco
                </Button>
              }
            />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((fw) => {
              const catCfg =
                frameworkCategoryConfig[fw.category as FrameworkCategory] ??
                frameworkCategoryConfig.custom
              const stCfg =
                frameworkStatusConfig[fw.status as FrameworkStatus] ??
                frameworkStatusConfig.inactive
              const conformes = Math.round((fw.compliancePercentage / 100) * fw.controlsCount)

              return (
                <Card key={fw.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className="text-base">{fw.name}</CardTitle>
                          <span className="text-xs text-muted-foreground font-mono">
                            v{fw.version}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${catCfg.cls}`}
                          >
                            {catCfg.label}
                          </span>
                          <span
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${stCfg.cls}`}
                          >
                            {stCfg.label}
                          </span>
                        </div>
                      </div>
                      {/* Edit / delete actions */}
                      <div className="flex gap-1 shrink-0">
                        <FrameworkSheet
                          trigger={
                            <Button variant="ghost" size="xs">
                              <PencilIcon className="size-3" />
                            </Button>
                          }
                          frameworkId={fw.id}
                          defaultValues={{
                            slug: fw.slug,
                            name: fw.name,
                            version: fw.version,
                            description: fw.description ?? '',
                            category: fw.category,
                            status: fw.status,
                            domainsCount: fw.domainsCount,
                            controlsCount: fw.controlsCount,
                            compliancePercentage: fw.compliancePercentage,
                            lastReviewDate: fw.lastReviewDate ?? '',
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleDelete(fw.id)}
                        >
                          <Trash2Icon className="size-3 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription className="text-xs leading-relaxed mt-1 line-clamp-2">
                      {fw.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col gap-3">
                    {/* Stats row */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <LayersIcon className="size-3.5 text-muted-foreground" />
                        <span className="font-medium">{fw.domainsCount}</span>
                        <span className="text-muted-foreground text-xs">dominios</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <SquareCheckIcon className="size-3.5 text-muted-foreground" />
                        <span className="font-medium">{fw.controlsCount}</span>
                        <span className="text-muted-foreground text-xs">controles</span>
                      </div>
                      {fw.lastReviewDate && (
                        <div className="flex items-center gap-1.5 ml-auto text-xs text-muted-foreground">
                          <ClockIcon className="size-3" />
                          {fw.lastReviewDate}
                        </div>
                      )}
                    </div>

                    {/* Compliance bar */}
                    <ComplianceBar value={fw.compliancePercentage} />

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-1 border-t border-border/50">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CheckCircle2Icon className="size-3 text-green-500" />
                        {conformes} conformes
                      </div>
                      <Button variant="outline" size="sm">
                        Ver detalle
                        <ChevronRightIcon />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}


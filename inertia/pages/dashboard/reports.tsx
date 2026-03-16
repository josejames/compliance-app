import {
    BarChart2Icon,
    BookOpenIcon,
    CalendarClockIcon,
    CalendarIcon,
    ChevronRightIcon,
    DownloadIcon,
    FileTextIcon,
    PencilRulerIcon,
} from "lucide-react"
import { PageHeader } from "~/components/page-header"
import { SectionNavCard } from "~/components/section-nav-card"
import { Button } from "~/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { badgeCls } from "~/lib/compliance_ui"

const sections = [
  {
    number: "7.1",
    title: "Biblioteca de Informes",
    description:
      "Colección de informes predefinidos listos para usar: ejecutivos, de brecha, para auditoría y de cumplimiento por marco normativo.",
    href: "/informes/biblioteca",
    icon: BookOpenIcon,
    stats: [
      { label: "Plantillas", value: "14" },
      { label: "Generados este mes", value: "8" },
    ],
    accent: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    number: "7.2",
    title: "Creador Personalizado",
    description:
      "Asistente paso a paso para construir informes a medida: selecciona secciones, filtros de marco, rango de fechas y formato de salida.",
    href: "/informes/creador",
    icon: PencilRulerIcon,
    stats: [
      { label: "Borradores", value: "3" },
      { label: "Guardados", value: "6" },
    ],
    accent: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
  },
  {
    number: "7.3",
    title: "Informes Programados",
    description:
      "Configura entregas automáticas por email con frecuencia diaria, semanal o mensual. Gestiona destinatarios y último envío.",
    href: "/informes/programados",
    icon: CalendarClockIcon,
    stats: [
      { label: "Activos", value: "5" },
      { label: "Próximo envío", value: "Lun" },
    ],
    accent: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
  },
]

interface RecentReport {
  id: string
  name: string
  type: string
  framework: string
  generatedBy: string
  generatedAt: string
  format: "PDF" | "Excel" | "CSV"
}

const recentReports: RecentReport[] = [
  { id: "RPT-031", name: "Informe Ejecutivo ISO 27001 — Feb 2026", type: "Ejecutivo", framework: "ISO 27001", generatedBy: "Lic. Ana García", generatedAt: "01 Mar 2026", format: "PDF" },
  { id: "RPT-030", name: "Análisis de Brechas LFPDPPP", type: "Brecha", framework: "LFPDPPP", generatedBy: "Sistema", generatedAt: "28 Feb 2026", format: "PDF" },
  { id: "RPT-029", name: "Registro de Riesgos Q1 2026", type: "Riesgos", framework: "ISO 27001", generatedBy: "Ing. Carlos Ramírez", generatedAt: "25 Feb 2026", format: "Excel" },
  { id: "RPT-028", name: "Estado de Controles PCI DSS", type: "Cumplimiento", framework: "PCI DSS", generatedBy: "Sistema", generatedAt: "20 Feb 2026", format: "PDF" },
  { id: "RPT-027", name: "Resumen de Hallazgos Abiertos — NOM-035 & ISO 27001", type: "Auditoría", framework: "Todos", generatedBy: "Lic. Pablo Torres", generatedAt: "15 Feb 2026", format: "PDF" },
]

const formatConfig: Record<RecentReport["format"], { cls: string }> = {
  PDF: { cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  Excel: { cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
  CSV: { cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
}

const typeConfig: Record<string, string> = {
  "Ejecutivo": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400",
  "Brecha": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  "Riesgos": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  "Cumplimiento": "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400",
  "Auditoría": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
}

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Panel Principal", href: "/" }, { label: "Informes" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Informes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Fábrica de reportes para diferentes audiencias y necesidades de cumplimiento
          </p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Plantillas Disponibles</CardDescription>
              <CardTitle><span className="text-3xl font-bold">14</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className={`${badgeCls} bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400`}>6 ejecutivos</span>
                <span className={`${badgeCls} bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400`}>8 técnicos</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Generados Este Mes</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">8</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">31 en los últimos 90 días</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Envíos Automatizados</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">5</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Próximo: lunes 16 Mar 2026</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Último Generado</CardDescription>
              <CardTitle><span className="text-base font-bold leading-tight">Informe Ejecutivo ISO 27001</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarIcon className="size-3.5" />
                <span>01 Mar 2026 · Ana García</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Nav Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {sections.map((s) => (
            <SectionNavCard key={s.number} {...s} />
          ))}
        </div>

        {/* Recent reports */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Informes Recientes</CardTitle>
              <CardDescription className="text-xs mt-0.5">Últimos informes generados</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="/informes/biblioteca">Ver biblioteca <ChevronRightIcon /></a>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentReports.map((r) => (
                <div key={r.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center shrink-0">
                      <FileTextIcon className="size-3.5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{r.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <CalendarIcon className="size-3" />
                        <span>{r.generatedAt}</span>
                        <span>·</span>
                        <span>{r.generatedBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className={`${badgeCls} ${typeConfig[r.type] ?? ""}`}>{r.type}</span>
                    <span className={`${badgeCls} ${formatConfig[r.format].cls}`}>{r.format}</span>
                    <Button variant="ghost" size="xs"><DownloadIcon /></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <BarChart2Icon className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Los datos de los informes se actualizan en tiempo real desde cada módulo del sistema.</p>
        </div>
      </div>
    </>
  )
}

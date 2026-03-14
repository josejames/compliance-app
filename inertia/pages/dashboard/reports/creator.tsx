import { PageHeader } from "~/components/page-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import {
  PlusIcon,
  CheckCircle2Icon,
  CircleIcon,
  FileTextIcon,
  DownloadIcon,
  SaveIcon,
  PlayCircleIcon,
} from "lucide-react"
import { badgeCls } from "~/lib/compliance_ui"

interface DataSection {
  id: string
  label: string
  description: string
  selected: boolean
}

const dataSections: DataSection[] = [
  { id: "kpis", label: "KPIs de Cumplimiento", description: "Indicadores generales: controles implementados, riesgos abiertos, tareas vencidas.", selected: true },
  { id: "risks", label: "Registro de Riesgos", description: "Tabla de riesgos con nivel, propietario, tratamiento y estado de mitigación.", selected: true },
  { id: "controls", label: "Estado de Controles", description: "Mapa de controles por marco normativo con porcentaje de implementación.", selected: true },
  { id: "findings", label: "Hallazgos de Auditoría", description: "Lista de no conformidades y observaciones con estado de remediación.", selected: false },
  { id: "evidence", label: "Inventario de Evidencias", description: "Evidencias cargadas por control, fecha y estado de vigencia.", selected: false },
  { id: "tasks", label: "Tareas y Flujos", description: "Estado de tareas asignadas, vencidas y completadas en el período.", selected: false },
  { id: "policies", label: "Políticas y Procedimientos", description: "Listado de documentos con versión, estado de aprobación y fecha de revisión.", selected: false },
  { id: "audits", label: "Plan de Auditorías", description: "Calendario de auditorías con estado, auditores y fechas de ejecución.", selected: false },
]

const frameworkOptions = ["Todos", "ISO 27001", "SOC 2", "GDPR", "PCI DSS", "NIS2", "ISO 9001"]
const periodOptions = ["Mes actual", "Trimestre actual", "Semestre actual", "Año actual", "Personalizado"]
const formatOptions: { value: string; label: string; cls: string }[] = [
  { value: "pdf", label: "PDF", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  { value: "excel", label: "Excel", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
  { value: "csv", label: "CSV", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
]

interface SavedReport {
  id: string
  name: string
  sections: number
  framework: string
  period: string
  savedAt: string
}

const savedReports: SavedReport[] = [
  { id: "CUS-001", name: "Resumen Trimestral ISO 27001", sections: 4, framework: "ISO 27001", period: "Trimestre actual", savedAt: "05 Mar 2026" },
  { id: "CUS-002", name: "Informe SOC 2 para Auditores", sections: 6, framework: "SOC 2", period: "Año actual", savedAt: "01 Mar 2026" },
  { id: "CUS-003", name: "KPIs Ejecutivos GDPR", sections: 2, framework: "GDPR", period: "Mes actual", savedAt: "20 Feb 2026" },
  { id: "CUS-004", name: "Análisis de Riesgos PCI", sections: 3, framework: "PCI DSS", period: "Semestre actual", savedAt: "10 Feb 2026" },
  { id: "CUS-005", name: "Vista General NIS2 — Borrador", sections: 5, framework: "NIS2", period: "Año actual", savedAt: "12 Mar 2026" },
  { id: "CUS-006", name: "Dashboard Mensual Todos los Marcos", sections: 7, framework: "Todos", period: "Mes actual", savedAt: "08 Mar 2026" },
]

const selectedCount = dataSections.filter(s => s.selected).length

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[
        { label: "Panel Principal", href: "/" },
        { label: "Informes", href: "/informes" },
        { label: "Creador Personalizado" },
      ]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">7.2. Creador de Informes Personalizados</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Asistente paso a paso para construir informes a medida con los datos y filtros que necesites
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Builder panel */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Step 1 — Sections */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
                  <CardTitle className="text-sm">Selecciona las secciones a incluir</CardTitle>
                </div>
                <CardDescription className="text-xs ml-8">{selectedCount} de {dataSections.length} secciones seleccionadas</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid gap-2 sm:grid-cols-2">
                  {dataSections.map((s) => (
                    <div
                      key={s.id}
                      className={`flex items-start gap-2.5 rounded-lg border p-3 cursor-pointer transition-colors ${
                        s.selected
                          ? "border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/30"
                          : "border-border hover:bg-muted/40"
                      }`}
                    >
                      {s.selected
                        ? <CheckCircle2Icon className="size-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                        : <CircleIcon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                      }
                      <div className="min-w-0">
                        <p className="text-xs font-semibold">{s.label}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 2 — Filters */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
                  <CardTitle className="text-sm">Configura filtros</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium mb-2">Marco normativo</p>
                    <div className="flex flex-wrap gap-1.5">
                      {frameworkOptions.map((fw, i) => (
                        <button
                          key={fw}
                          className={`${badgeCls} cursor-pointer ${
                            i === 0
                              ? "bg-blue-600 text-white"
                              : "bg-muted text-muted-foreground hover:bg-muted/60"
                          }`}
                        >
                          {fw}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-2">Período</p>
                    <div className="flex flex-wrap gap-1.5">
                      {periodOptions.map((p, i) => (
                        <button
                          key={p}
                          className={`${badgeCls} cursor-pointer ${
                            i === 0
                              ? "bg-blue-600 text-white"
                              : "bg-muted text-muted-foreground hover:bg-muted/60"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 — Format & Generate */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
                  <CardTitle className="text-sm">Formato de salida y generación</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-xs font-medium mb-2">Formato</p>
                    <div className="flex gap-2">
                      {formatOptions.map((f, i) => (
                        <button
                          key={f.value}
                          className={`${badgeCls} text-sm px-3 py-1 cursor-pointer ${
                            i === 0 ? f.cls + " ring-2 ring-offset-1 ring-red-400" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm"><SaveIcon /> Guardar borrador</Button>
                    <Button size="sm"><PlayCircleIcon /> Generar informe</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Saved reports */}
          <div className="flex flex-col gap-4">
            <Card className="flex-1">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm">Informes Guardados</CardTitle>
                  <CardDescription className="text-xs">Borradores y configuraciones previas</CardDescription>
                </div>
                <Button variant="outline" size="xs"><PlusIcon /> Nuevo</Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {savedReports.map((r) => (
                    <div key={r.id} className="px-4 py-3 hover:bg-muted/40 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 min-w-0">
                          <FileTextIcon className="size-3.5 text-muted-foreground mt-0.5 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium leading-tight truncate">{r.name}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{r.framework} · {r.period}</p>
                            <p className="text-[10px] text-muted-foreground">{r.sections} secciones · {r.savedAt}</p>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button variant="ghost" size="xs"><PlayCircleIcon /></Button>
                          <Button variant="ghost" size="xs"><DownloadIcon /></Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

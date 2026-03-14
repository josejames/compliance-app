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
  DownloadIcon,
  EyeIcon,
  PlayCircleIcon,
  FileTextIcon,
  SearchIcon,
} from "lucide-react"
import { badgeCls } from "~/lib/compliance_ui"

type ReportCategory = "Ejecutivo" | "Brecha" | "Auditoría" | "Riesgos" | "Cumplimiento" | "Privacidad"
type ReportFormat = "PDF" | "Excel" | "CSV"

interface ReportTemplate {
  id: string
  name: string
  description: string
  category: ReportCategory
  frameworks: string[]
  audience: string
  lastGenerated: string | null
  formats: ReportFormat[]
  popular: boolean
}

const templates: ReportTemplate[] = [
  { id: "TPL-001", name: "Informe Ejecutivo de Cumplimiento", description: "Resumen de alto nivel del estado de cumplimiento para la dirección. KPIs, tendencias y riesgos destacados.", category: "Ejecutivo", frameworks: ["ISO 27001", "SOC 2"], audience: "C-Suite / Junta Directiva", lastGenerated: "01 Mar 2026", formats: ["PDF"], popular: true },
  { id: "TPL-002", name: "Gap Analysis ISO 27001:2022", description: "Diagnóstico de controles implementados vs. requeridos por el estándar. Identifica brechas y prioridades.", category: "Brecha", frameworks: ["ISO 27001"], audience: "CISO / Equipo de Seguridad", lastGenerated: "15 Feb 2026", formats: ["PDF", "Excel"], popular: true },
  { id: "TPL-003", name: "Paquete de Evidencias SOC 2", description: "Compilación completa de evidencias organizadas por criterio de servicio de confianza para auditores externos.", category: "Auditoría", frameworks: ["SOC 2"], audience: "Auditores externos", lastGenerated: "20 Feb 2026", formats: ["PDF", "Excel"], popular: true },
  { id: "TPL-004", name: "Registro de Riesgos Completo", description: "Exportación del registro de riesgos con valoraciones, propietarios, tratamiento y estado de mitigación.", category: "Riesgos", frameworks: ["ISO 27001", "ISO 31000"], audience: "Comité de Riesgos", lastGenerated: "25 Feb 2026", formats: ["Excel", "CSV"], popular: false },
  { id: "TPL-005", name: "Estado de Controles PCI DSS", description: "Mapa de cumplimiento de todos los requerimientos PCI DSS con nivel de implementación y evidencias vinculadas.", category: "Cumplimiento", frameworks: ["PCI DSS"], audience: "QSA / Equipo Financiero", lastGenerated: "10 Feb 2026", formats: ["PDF", "Excel"], popular: false },
  { id: "TPL-006", name: "Informe GDPR para DPA", description: "Informe de cumplimiento de protección de datos para la autoridad de control. Incluye registros de tratamiento.", category: "Privacidad", frameworks: ["GDPR"], audience: "DPO / Autoridad de Control", lastGenerated: "01 Mar 2026", formats: ["PDF"], popular: false },
  { id: "TPL-007", name: "Resumen de Hallazgos de Auditoría", description: "Lista de no conformidades, observaciones y oportunidades de mejora detectadas, con estado de remediación.", category: "Auditoría", frameworks: ["Todos"], audience: "Responsables de área", lastGenerated: "12 Mar 2026", formats: ["PDF", "Excel"], popular: true },
  { id: "TPL-008", name: "KPIs de Cumplimiento Mensual", description: "Dashboard en formato informe con los indicadores clave del mes: tareas, evidencias, riesgos y controles.", category: "Ejecutivo", frameworks: ["Todos"], audience: "Dirección / Compliance Officer", lastGenerated: "01 Mar 2026", formats: ["PDF"], popular: true },
  { id: "TPL-009", name: "Gap Analysis NIS2", description: "Análisis de brechas frente a los requerimientos de la Directiva NIS2 (Art. 21 medidas de gestión de riesgos).", category: "Brecha", frameworks: ["NIS2"], audience: "CISO / Dirección", lastGenerated: null, formats: ["PDF", "Excel"], popular: false },
  { id: "TPL-010", name: "Mapa de Controles ISO 9001", description: "Estado de implementación de controles del sistema de gestión de calidad con evidencias y responsables.", category: "Cumplimiento", frameworks: ["ISO 9001"], audience: "Responsable de Calidad", lastGenerated: "05 Mar 2026", formats: ["Excel"], popular: false },
  { id: "TPL-011", name: "Informe de Riesgos Críticos", description: "Ficha detallada de todos los riesgos de nivel crítico y alto con planes de mitigación y fechas de revisión.", category: "Riesgos", frameworks: ["ISO 27001", "SOC 2"], audience: "Comité de Riesgos / CISO", lastGenerated: "08 Mar 2026", formats: ["PDF"], popular: false },
  { id: "TPL-012", name: "Inventario de Evidencias", description: "Listado completo de evidencias almacenadas por control, fecha de carga, propietario y estado de vigencia.", category: "Auditoría", frameworks: ["Todos"], audience: "Auditores internos", lastGenerated: null, formats: ["Excel", "CSV"], popular: false },
]

const categoryConfig: Record<ReportCategory, { cls: string }> = {
  "Ejecutivo": { cls: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400" },
  "Brecha": { cls: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400" },
  "Auditoría": { cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  "Riesgos": { cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  "Cumplimiento": { cls: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400" },
  "Privacidad": { cls: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400" },
}

const formatConfig: Record<ReportFormat, { cls: string }> = {
  PDF: { cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  Excel: { cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
  CSV: { cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
}

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[
        { label: "Panel Principal", href: "/" },
        { label: "Informes", href: "/informes" },
        { label: "Biblioteca de Informes" },
      ]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">7.1. Biblioteca de Informes Predefinidos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Colección de plantillas listas para generar para distintas audiencias y marcos normativos
            </p>
          </div>
          <Button variant="outline" size="sm"><SearchIcon /> Filtrar</Button>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Plantillas</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{templates.length}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">6 categorías disponibles</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Más Usadas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{templates.filter(t => t.popular).length}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Marcadas como populares</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Con Generación Reciente</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{templates.filter(t => t.lastGenerated).length}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Generadas al menos una vez</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Marcos Cubiertos</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-purple-600 dark:text-purple-400">6</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">ISO 27001, SOC 2, GDPR, PCI DSS, NIS2, ISO 9001</p></CardContent>
          </Card>
        </div>

        {/* Template grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((t) => {
            const cat = categoryConfig[t.category]
            return (
              <Card key={t.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-muted shrink-0">
                      <FileTextIcon className="size-5 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {t.popular && <span className={`${badgeCls} bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400`}>★ Popular</span>}
                      <span className={`${badgeCls} ${cat.cls}`}>{t.category}</span>
                    </div>
                  </div>
                  <CardTitle className="text-sm font-semibold mt-2 leading-snug">{t.name}</CardTitle>
                  <CardDescription className="text-xs leading-relaxed">{t.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 mt-auto">
                  <div className="text-xs text-muted-foreground mb-3 space-y-1">
                    <p><span className="font-medium">Audiencia:</span> {t.audience}</p>
                    <p><span className="font-medium">Marco:</span> {t.frameworks.join(" · ")}</p>
                    <p><span className="font-medium">Último generado:</span> {t.lastGenerated ?? "Nunca"}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {t.formats.map(f => (
                        <span key={f} className={`${badgeCls} ${formatConfig[f].cls}`}>{f}</span>
                      ))}
                    </div>
                    <div className="flex gap-1.5">
                      <Button variant="ghost" size="xs"><EyeIcon /> Vista previa</Button>
                      <Button size="xs"><PlayCircleIcon /> Generar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}

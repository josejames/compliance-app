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
  CheckIcon,
  MinusIcon,
  XIcon,
  SlidersHorizontalIcon,
  DownloadIcon,
  InfoIcon,
} from "lucide-react"

// Frameworks as columns
const frameworks = ["ISO 27001", "GDPR", "SOC 2", "PCI DSS", "NIST CSF", "ISO 9001"]

type MappingStatus = "full" | "partial" | "none"

interface InternalControl {
  code: string
  title: string
  domain: string
  mapping: Record<string, MappingStatus>
}

const controls: InternalControl[] = [
  {
    code: "CTL-001",
    title: "Política de Control de Acceso",
    domain: "Seguridad de Acceso",
    mapping: { "ISO 27001": "full", "GDPR": "partial", "SOC 2": "full", "PCI DSS": "full", "NIST CSF": "partial", "ISO 9001": "none" },
  },
  {
    code: "CTL-002",
    title: "Gestión de Cuentas Privilegiadas",
    domain: "Seguridad de Acceso",
    mapping: { "ISO 27001": "full", "GDPR": "none", "SOC 2": "full", "PCI DSS": "full", "NIST CSF": "full", "ISO 9001": "none" },
  },
  {
    code: "CTL-003",
    title: "Cifrado de Datos en Reposo",
    domain: "Protección de Datos",
    mapping: { "ISO 27001": "full", "GDPR": "full", "SOC 2": "full", "PCI DSS": "full", "NIST CSF": "partial", "ISO 9001": "none" },
  },
  {
    code: "CTL-004",
    title: "Política de Retención de Datos",
    domain: "Protección de Datos",
    mapping: { "ISO 27001": "partial", "GDPR": "full", "SOC 2": "partial", "PCI DSS": "partial", "NIST CSF": "none", "ISO 9001": "full" },
  },
  {
    code: "CTL-005",
    title: "Segmentación de Redes",
    domain: "Infraestructura",
    mapping: { "ISO 27001": "full", "GDPR": "none", "SOC 2": "full", "PCI DSS": "full", "NIST CSF": "full", "ISO 9001": "none" },
  },
  {
    code: "CTL-006",
    title: "Gestión de Parches y Vulnerabilidades",
    domain: "Infraestructura",
    mapping: { "ISO 27001": "full", "GDPR": "partial", "SOC 2": "full", "PCI DSS": "full", "NIST CSF": "full", "ISO 9001": "none" },
  },
  {
    code: "CTL-007",
    title: "Plan de Continuidad de Negocio",
    domain: "Continuidad",
    mapping: { "ISO 27001": "full", "GDPR": "partial", "SOC 2": "full", "PCI DSS": "partial", "NIST CSF": "full", "ISO 9001": "partial" },
  },
  {
    code: "CTL-008",
    title: "Copias de Seguridad y Restauración",
    domain: "Continuidad",
    mapping: { "ISO 27001": "full", "GDPR": "partial", "SOC 2": "full", "PCI DSS": "partial", "NIST CSF": "full", "ISO 9001": "none" },
  },
  {
    code: "CTL-009",
    title: "Registro y Monitorización de Eventos",
    domain: "Monitorización",
    mapping: { "ISO 27001": "full", "GDPR": "partial", "SOC 2": "full", "PCI DSS": "full", "NIST CSF": "full", "ISO 9001": "none" },
  },
  {
    code: "CTL-010",
    title: "Gestión de Incidentes de Seguridad",
    domain: "Respuesta",
    mapping: { "ISO 27001": "full", "GDPR": "full", "SOC 2": "full", "PCI DSS": "full", "NIST CSF": "full", "ISO 9001": "partial" },
  },
  {
    code: "CTL-011",
    title: "Evaluación de Riesgos de Proveedores",
    domain: "Cadena de Suministro",
    mapping: { "ISO 27001": "full", "GDPR": "partial", "SOC 2": "partial", "PCI DSS": "partial", "NIST CSF": "partial", "ISO 9001": "full" },
  },
  {
    code: "CTL-012",
    title: "Formación y Concienciación en Seguridad",
    domain: "Personas",
    mapping: { "ISO 27001": "full", "GDPR": "full", "SOC 2": "partial", "PCI DSS": "partial", "NIST CSF": "partial", "ISO 9001": "partial" },
  },
]

// Group by domain for display
const domains = [...new Set(controls.map((c) => c.domain))]

const mappingConfig: Record<MappingStatus, { icon: typeof CheckIcon; cls: string; cellCls: string; label: string }> = {
  full: {
    icon: CheckIcon,
    cls: "text-green-600 dark:text-green-400",
    cellCls: "bg-green-50 dark:bg-green-950/30",
    label: "Completo",
  },
  partial: {
    icon: MinusIcon,
    cls: "text-amber-500 dark:text-amber-400",
    cellCls: "bg-amber-50 dark:bg-amber-950/30",
    label: "Parcial",
  },
  none: {
    icon: XIcon,
    cls: "text-muted-foreground/40",
    cellCls: "",
    label: "No mapeado",
  },
}

function MappingCell({ status }: { status: MappingStatus }) {
  const cfg = mappingConfig[status]
  const Icon = cfg.icon
  return (
    <td className={`text-center py-2.5 px-2 ${cfg.cellCls}`}>
      <Icon className={`size-4 mx-auto ${cfg.cls}`} strokeWidth={status === "full" ? 2.5 : 2} />
    </td>
  )
}

function coverageCount(ctrl: InternalControl) {
  return Object.values(ctrl.mapping).filter((v) => v === "full" || v === "partial").length
}

export default function Page() {
  const totalMappings = controls.flatMap((c) => Object.values(c.mapping)).filter((v) => v !== "none").length
  const fullMappings = controls.flatMap((c) => Object.values(c.mapping)).filter((v) => v === "full").length
  const multiCoverage = controls.filter((c) => coverageCount(c) >= 4).length

  return (
    <>
      <PageHeader crumbs={[{ label: "Gestión de Normas y Controles", href: "/normas-controles" }, { label: "Mapeo de Controles" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mapeo de Controles</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Correspondencia entre controles internos y requisitos de cada marco normativo
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <SlidersHorizontalIcon />
              Filtrar
            </Button>
            <Button variant="outline" size="sm">
              <DownloadIcon />
              Exportar
            </Button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Controles Mapeados</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{controls.length}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">en {frameworks.length} marcos normativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Mapeos Totales</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{fullMappings}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{totalMappings - fullMappings} parciales · {controls.length * frameworks.length - totalMappings} sin mapear</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Cobertura Múltiple (≥4)</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{multiCoverage}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">controles que cubren 4+ marcos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Sin Ningún Mapeo</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-amber-600 dark:text-amber-400">18</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">controles sin asignar a ningún marco</p>
            </CardContent>
          </Card>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Leyenda:</span>
          {(["full", "partial", "none"] as MappingStatus[]).map((s) => {
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
            Haz clic en una fila para ver los requisitos vinculados
          </span>
        </div>

        {/* Mapping matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Matriz de Correspondencia</CardTitle>
            <CardDescription>
              Filas = controles internos · Columnas = marcos normativos
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-medium text-muted-foreground px-4 py-3 w-28">Código</th>
                    <th className="text-left font-medium text-muted-foreground px-3 py-3">Control Interno</th>
                    <th className="text-left font-medium text-muted-foreground px-3 py-3 hidden lg:table-cell">Dominio</th>
                    {frameworks.map((fw) => (
                      <th key={fw} className="text-center font-medium text-muted-foreground px-2 py-3 min-w-20">
                        <span className="text-[11px]">{fw}</span>
                      </th>
                    ))}
                    <th className="text-center font-medium text-muted-foreground px-3 py-3">Cobertura</th>
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
                          const covered = coverageCount(ctrl)
                          return (
                            <tr
                              key={ctrl.code}
                              className="border-b border-border/40 hover:bg-muted/20 transition-colors cursor-pointer"
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
                                <MappingCell key={fw} status={ctrl.mapping[fw]} />
                              ))}
                              <td className="text-center px-3 py-2.5">
                                <span
                                  className={`text-xs font-bold tabular-nums ${covered >= 5 ? "text-green-600 dark:text-green-400" : covered >= 3 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}
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
        <Card>
          <CardHeader>
            <CardTitle>Vista de Cumplimiento Múltiple</CardTitle>
            <CardDescription>Controles que satisfacen requisitos de 4 o más marcos simultáneamente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {controls
              .filter((c) => coverageCount(c) >= 4)
              .sort((a, b) => coverageCount(b) - coverageCount(a))
              .map((ctrl) => {
                const covered = coverageCount(ctrl)
                const coveredFrameworks = Object.entries(ctrl.mapping)
                  .filter(([, v]) => v !== "none")
                  .map(([fw]) => fw)
                return (
                  <div
                    key={ctrl.code}
                    className="flex items-center gap-4 rounded-lg border border-border/50 px-4 py-3 hover:bg-muted/20 transition-colors"
                  >
                    <span className="font-mono text-xs font-medium text-muted-foreground w-16 shrink-0">
                      {ctrl.code}
                    </span>
                    <span className="font-medium text-sm flex-1 min-w-0 truncate">{ctrl.title}</span>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {coveredFrameworks.map((fw) => (
                        <span
                          key={fw}
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${ctrl.mapping[fw] === "full" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"}`}
                        >
                          {fw}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-green-600 dark:text-green-400 shrink-0 w-12 text-right">
                      {covered}/{frameworks.length}
                    </span>
                  </div>
                )
              })}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

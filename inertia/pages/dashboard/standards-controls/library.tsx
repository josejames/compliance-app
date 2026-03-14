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
  ChevronRightIcon,
  SquareCheckIcon,
  LayersIcon,
  SearchIcon,
  CheckCircle2Icon,
  ClockIcon,
  StarIcon,
} from "lucide-react"

type FrameworkStatus = "active" | "inactive" | "custom"
type FrameworkCategory = "international" | "regional" | "sector"

interface Framework {
  id: string
  name: string
  version: string
  description: string
  domains: number
  controls: number
  compliance: number
  status: FrameworkStatus
  category: FrameworkCategory
  lastReview: string
}

const frameworks: Framework[] = [
  {
    id: "iso27001",
    name: "ISO 27001",
    version: "2022",
    description:
      "Norma internacional para sistemas de gestión de seguridad de la información (SGSI). Define requisitos para establecer, implementar, mantener y mejorar la seguridad.",
    domains: 14,
    controls: 114,
    compliance: 78,
    status: "active",
    category: "international",
    lastReview: "Mar 2026",
  },
  {
    id: "gdpr",
    name: "GDPR",
    version: "2016/679",
    description:
      "Reglamento General de Protección de Datos de la Unión Europea. Establece las reglas para el tratamiento de datos personales de ciudadanos europeos.",
    domains: 11,
    controls: 47,
    compliance: 91,
    status: "active",
    category: "regional",
    lastReview: "Feb 2026",
  },
  {
    id: "soc2",
    name: "SOC 2 Type II",
    version: "AICPA 2022",
    description:
      "Marco de auditoría para proveedores de servicios en la nube basado en los Criterios de Servicios de Confianza: seguridad, disponibilidad, confidencialidad y privacidad.",
    domains: 5,
    controls: 80,
    compliance: 64,
    status: "active",
    category: "international",
    lastReview: "Ene 2026",
  },
  {
    id: "pcidss",
    name: "PCI DSS",
    version: "v4.0",
    description:
      "Estándar de seguridad de datos de la industria de tarjetas de pago. Obligatorio para organizaciones que almacenan, procesan o transmiten datos de titulares de tarjetas.",
    domains: 12,
    controls: 60,
    compliance: 55,
    status: "active",
    category: "sector",
    lastReview: "Mar 2026",
  },
  {
    id: "nistcsf",
    name: "NIST CSF",
    version: "2.0",
    description:
      "Marco de ciberseguridad del NIST organizado en seis funciones: Gobernar, Identificar, Proteger, Detectar, Responder y Recuperar.",
    domains: 6,
    controls: 108,
    compliance: 70,
    status: "active",
    category: "international",
    lastReview: "Feb 2026",
  },
  {
    id: "iso9001",
    name: "ISO 9001",
    version: "2015",
    description:
      "Norma internacional para sistemas de gestión de calidad. Establece requisitos para demostrar la capacidad de proporcionar productos y servicios conformes.",
    domains: 8,
    controls: 36,
    compliance: 82,
    status: "active",
    category: "international",
    lastReview: "Ene 2026",
  },
  {
    id: "custom-tic",
    name: "Política TIC Interna",
    version: "v2.1",
    description:
      "Marco normativo interno de tecnologías de la información y comunicación adaptado a los requisitos específicos de la organización.",
    domains: 6,
    controls: 42,
    compliance: 95,
    status: "custom",
    category: "international",
    lastReview: "Mar 2026",
  },
]

const categoryLabels: Record<FrameworkCategory, string> = {
  international: "Internacional",
  regional: "Regional",
  sector: "Sectorial",
}

const categoryColors: Record<FrameworkCategory, string> = {
  international: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  regional: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  sector: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
}

const statusConfig: Record<FrameworkStatus, { label: string; cls: string }> = {
  active: { label: "Activo", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
  inactive: { label: "Inactivo", cls: "bg-muted text-muted-foreground" },
  custom: { label: "Personalizado", cls: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400" },
}

function ComplianceBar({ value }: { value: number }) {
  const color = value >= 80 ? "bg-green-500" : value >= 60 ? "bg-amber-500" : "bg-red-500"
  const textColor = value >= 80 ? "text-green-600 dark:text-green-400" : value >= 60 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Cumplimiento</span>
        <span className={`font-semibold ${textColor}`}>{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default function Page() {
  const activeCount = frameworks.filter((f) => f.status === "active").length
  const customCount = frameworks.filter((f) => f.status === "custom").length

  return (
    <>
      <PageHeader crumbs={[{ label: "Gestión de Normas y Controles", href: "/normas-controles" }, { label: "Biblioteca de Marcos Normativos" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Biblioteca de Marcos Normativos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {frameworks.length} marcos disponibles · {activeCount} activos · {customCount} personalizados
            </p>
          </div>
          <Button size="sm">
            <PlusIcon />
            Añadir marco
          </Button>
        </div>

        {/* Summary stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Marcos Totales</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{frameworks.length}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{activeCount} activos · {customCount} personaliz.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total Controles</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">
                  {frameworks.reduce((a, f) => a + f.controls, 0)}
                </span>
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
                  {Math.max(...frameworks.map((f) => f.compliance))}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <StarIcon className="size-3 text-green-500" />
                {frameworks.find((f) => f.compliance === Math.max(...frameworks.map((x) => x.compliance)))?.name}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Promedio de Cumplimiento</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">
                  {Math.round(frameworks.reduce((a, f) => a + f.compliance, 0) / frameworks.length)}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.round(frameworks.reduce((a, f) => a + f.compliance, 0) / frameworks.length)}%` }}
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
              placeholder="Buscar framework…"
              className="w-full h-8 rounded-lg border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>
          <div className="flex items-center gap-2">
            {(["all", "international", "regional", "sector"] as const).map((cat) => (
              <Button key={cat} variant={cat === "all" ? "default" : "outline"} size="sm">
                {cat === "all" ? "Todos" : categoryLabels[cat as FrameworkCategory]}
              </Button>
            ))}
          </div>
        </div>

        {/* Framework cards grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {frameworks.map((fw) => (
            <Card key={fw.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-base">{fw.name}</CardTitle>
                      <span className="text-xs text-muted-foreground font-mono">v{fw.version}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${categoryColors[fw.category]}`}>
                        {categoryLabels[fw.category]}
                      </span>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${statusConfig[fw.status].cls}`}>
                        {statusConfig[fw.status].label}
                      </span>
                    </div>
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
                    <span className="font-medium">{fw.domains}</span>
                    <span className="text-muted-foreground text-xs">dominios</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <SquareCheckIcon className="size-3.5 text-muted-foreground" />
                    <span className="font-medium">{fw.controls}</span>
                    <span className="text-muted-foreground text-xs">controles</span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-auto text-xs text-muted-foreground">
                    <ClockIcon className="size-3" />
                    {fw.lastReview}
                  </div>
                </div>

                {/* Compliance bar */}
                <ComplianceBar value={fw.compliance} />

                {/* CTA */}
                <div className="flex items-center justify-between pt-1 border-t border-border/50">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CheckCircle2Icon className="size-3 text-green-500" />
                    {Math.round((fw.compliance / 100) * fw.controls)} conformes
                  </div>
                  <Button variant="outline" size="sm">
                    Ver detalle
                    <ChevronRightIcon />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

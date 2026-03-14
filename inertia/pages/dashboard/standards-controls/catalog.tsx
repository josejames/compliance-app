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
  SearchIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  ClockIcon,
  XCircleIcon,
  ChevronRightIcon,
  SlidersHorizontalIcon,
  DownloadIcon,
  UserIcon,
  CalendarIcon,
} from "lucide-react"

type ControlStatus = "active" | "needs-review" | "overdue" | "inactive"
type ReviewFrequency = "continuous" | "monthly" | "quarterly" | "annual"

interface InternalControl {
  code: string
  title: string
  description: string
  domain: string
  owner: string
  frequency: ReviewFrequency
  status: ControlStatus
  lastReviewed: string
  nextReview: string
  frameworks: string[]
}

const controls: InternalControl[] = [
  {
    code: "CTL-001",
    title: "Política de Control de Acceso",
    description: "Define las reglas de concesión, revisión y revocación de accesos a sistemas y datos de la organización.",
    domain: "Seguridad de Acceso",
    owner: "Carlos Rodríguez",
    frequency: "quarterly",
    status: "active",
    lastReviewed: "15 Ene 2026",
    nextReview: "15 Abr 2026",
    frameworks: ["ISO 27001", "SOC 2", "PCI DSS"],
  },
  {
    code: "CTL-002",
    title: "Gestión de Cuentas Privilegiadas",
    description: "Procedimiento para la creación, seguimiento y revisión periódica de cuentas con privilegios elevados.",
    domain: "Seguridad de Acceso",
    owner: "Laura Martínez",
    frequency: "monthly",
    status: "needs-review",
    lastReviewed: "10 Nov 2025",
    nextReview: "10 Mar 2026",
    frameworks: ["ISO 27001", "SOC 2", "PCI DSS", "NIST CSF"],
  },
  {
    code: "CTL-003",
    title: "Cifrado de Datos en Reposo",
    description: "Estándar de cifrado AES-256 obligatorio para todos los datos sensibles almacenados en sistemas corporativos.",
    domain: "Protección de Datos",
    owner: "Ana García",
    frequency: "annual",
    status: "active",
    lastReviewed: "05 Feb 2026",
    nextReview: "05 Feb 2027",
    frameworks: ["ISO 27001", "GDPR", "SOC 2", "PCI DSS"],
  },
  {
    code: "CTL-004",
    title: "Política de Retención de Datos",
    description: "Define los plazos de retención y disposición de datos personales y corporativos conforme a GDPR e ISO.",
    domain: "Protección de Datos",
    owner: "María González",
    frequency: "annual",
    status: "active",
    lastReviewed: "20 Dic 2025",
    nextReview: "20 Dic 2026",
    frameworks: ["GDPR", "ISO 9001"],
  },
  {
    code: "CTL-005",
    title: "Segmentación de Redes",
    description: "Arquitectura de red con zonas de seguridad diferenciadas (DMZ, producción, desarrollo) y reglas de firewall auditadas.",
    domain: "Infraestructura",
    owner: "Pablo Torres",
    frequency: "quarterly",
    status: "overdue",
    lastReviewed: "01 Sep 2025",
    nextReview: "01 Dic 2025",
    frameworks: ["ISO 27001", "SOC 2", "PCI DSS", "NIST CSF"],
  },
  {
    code: "CTL-006",
    title: "Gestión de Parches y Vulnerabilidades",
    description: "Proceso de identificación, priorización y aplicación de parches de seguridad en plazos definidos por criticidad.",
    domain: "Infraestructura",
    owner: "Pablo Torres",
    frequency: "monthly",
    status: "active",
    lastReviewed: "01 Mar 2026",
    nextReview: "01 Abr 2026",
    frameworks: ["ISO 27001", "SOC 2", "PCI DSS", "NIST CSF"],
  },
  {
    code: "CTL-007",
    title: "Plan de Continuidad de Negocio",
    description: "Marco BCP/DRP con escenarios de desastre definidos, RPO/RTO documentados y pruebas anuales de recuperación.",
    domain: "Continuidad",
    owner: "Elena Sánchez",
    frequency: "annual",
    status: "active",
    lastReviewed: "15 Nov 2025",
    nextReview: "15 Nov 2026",
    frameworks: ["ISO 27001", "SOC 2", "NIST CSF"],
  },
  {
    code: "CTL-008",
    title: "Copias de Seguridad y Restauración",
    description: "Procedimiento de backup con frecuencia diaria incremental y semanal completa, con pruebas de restauración mensuales.",
    domain: "Continuidad",
    owner: "Javier López",
    frequency: "monthly",
    status: "needs-review",
    lastReviewed: "05 Dic 2025",
    nextReview: "05 Mar 2026",
    frameworks: ["ISO 27001", "SOC 2"],
  },
  {
    code: "CTL-009",
    title: "Registro y Monitorización de Eventos",
    description: "SIEM con retención de logs de 12 meses, alertas en tiempo real y revisión diaria de eventos críticos.",
    domain: "Monitorización",
    owner: "Carlos Rodríguez",
    frequency: "continuous",
    status: "active",
    lastReviewed: "10 Mar 2026",
    nextReview: "Continuo",
    frameworks: ["ISO 27001", "SOC 2", "PCI DSS", "NIST CSF"],
  },
  {
    code: "CTL-010",
    title: "Gestión de Incidentes de Seguridad",
    description: "Proceso de detección, clasificación, contención, erradicación y reporte de incidentes según severidad.",
    domain: "Respuesta",
    owner: "Laura Martínez",
    frequency: "quarterly",
    status: "active",
    lastReviewed: "20 Feb 2026",
    nextReview: "20 May 2026",
    frameworks: ["ISO 27001", "GDPR", "SOC 2", "PCI DSS", "NIST CSF"],
  },
  {
    code: "CTL-011",
    title: "Evaluación de Riesgos de Proveedores",
    description: "Proceso de due diligence de seguridad para terceros con acceso a datos o sistemas críticos de la organización.",
    domain: "Cadena de Suministro",
    owner: "María González",
    frequency: "annual",
    status: "overdue",
    lastReviewed: "30 Jun 2025",
    nextReview: "30 Jun 2025",
    frameworks: ["ISO 27001", "GDPR", "ISO 9001"],
  },
  {
    code: "CTL-012",
    title: "Formación y Concienciación en Seguridad",
    description: "Programa de formación anual obligatoria para todos los empleados sobre seguridad de la información y protección de datos.",
    domain: "Personas",
    owner: "Ana García",
    frequency: "annual",
    status: "active",
    lastReviewed: "01 Feb 2026",
    nextReview: "01 Feb 2027",
    frameworks: ["ISO 27001", "GDPR", "SOC 2"],
  },
]

const statusConfig: Record<ControlStatus, { label: string; cls: string; icon: typeof CheckCircle2Icon; iconCls: string }> = {
  active: {
    label: "Activo",
    cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
    icon: CheckCircle2Icon,
    iconCls: "text-green-500",
  },
  "needs-review": {
    label: "Requiere revisión",
    cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    icon: AlertCircleIcon,
    iconCls: "text-amber-500",
  },
  overdue: {
    label: "Vencido",
    cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    icon: XCircleIcon,
    iconCls: "text-red-500",
  },
  inactive: {
    label: "Inactivo",
    cls: "bg-muted text-muted-foreground",
    icon: ClockIcon,
    iconCls: "text-muted-foreground",
  },
}

const frequencyLabels: Record<ReviewFrequency, string> = {
  continuous: "Continuo",
  monthly: "Mensual",
  quarterly: "Trimestral",
  annual: "Anual",
}

const frequencyColors: Record<ReviewFrequency, string> = {
  continuous: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  monthly: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  quarterly: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  annual: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400",
}

const domains = [...new Set(controls.map((c) => c.domain))]

export default function Page() {
  const statusCounts = {
    active: controls.filter((c) => c.status === "active").length,
    "needs-review": controls.filter((c) => c.status === "needs-review").length,
    overdue: controls.filter((c) => c.status === "overdue").length,
  }

  return (
    <>
      <PageHeader crumbs={[{ label: "Gestión de Normas y Controles", href: "/normas-controles" }, { label: "Catálogo de Controles Internos" }]} />

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
            <Button size="sm">
              <PlusIcon />
              Nuevo control
            </Button>
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
              <CardTitle><span className="text-3xl font-bold text-amber-600 dark:text-amber-400">{statusCounts["needs-review"]}</span></CardTitle>
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
              placeholder="Buscar control por nombre o código…"
              className="w-full h-8 rounded-lg border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>
          <Button variant="outline" size="sm">
            <SlidersHorizontalIcon />
            Filtros avanzados
          </Button>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Estado:</span>
            {(["Todos", "Activo", "Revisión", "Vencido"] as const).map((s, i) => (
              <Button key={s} variant={i === 0 ? "default" : "outline"} size="sm">
                {s}
              </Button>
            ))}
          </div>
        </div>

        {/* Controls by domain */}
        {domains.map((domain) => {
          const domainControls = controls.filter((c) => c.domain === domain)
          return (
            <div key={domain} className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {domain}
                </h2>
                <span className="text-xs text-muted-foreground">
                  ({domainControls.length} controles)
                </span>
                <div className="flex-1 h-px bg-border/60" />
              </div>

              <div className="space-y-2">
                {domainControls.map((ctrl) => {
                  const sCfg = statusConfig[ctrl.status]
                  const StatusIcon = sCfg.icon
                  return (
                    <Card key={ctrl.code} className="overflow-hidden">
                      <div className="flex items-start gap-4 p-4">
                        <StatusIcon className={`size-5 shrink-0 mt-0.5 ${sCfg.iconCls}`} />

                        <div className="flex-1 min-w-0 space-y-2">
                          {/* Header row */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-xs font-medium text-muted-foreground">
                                  {ctrl.code}
                                </span>
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
                              <Button variant="ghost" size="icon-sm">
                                <ChevronRightIcon />
                              </Button>
                            </div>
                          </div>

                          {/* Meta row */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <UserIcon className="size-3" />
                              {ctrl.owner}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded font-medium ${frequencyColors[ctrl.frequency]}`}>
                              {frequencyLabels[ctrl.frequency]}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <CalendarIcon className="size-3" />
                              Revisado: {ctrl.lastReviewed}
                            </span>
                            <span
                              className={`flex items-center gap-1 font-medium ${ctrl.status === "overdue" ? "text-red-600 dark:text-red-400" : ctrl.status === "needs-review" ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}
                            >
                              <ClockIcon className="size-3" />
                              Próxima: {ctrl.nextReview}
                            </span>
                            <div className="flex items-center gap-1 flex-wrap ml-auto">
                              {ctrl.frameworks.map((fw) => (
                                <span
                                  key={fw}
                                  className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                >
                                  {fw}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

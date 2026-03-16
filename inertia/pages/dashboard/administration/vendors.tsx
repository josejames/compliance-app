import {
    BuildingIcon,
    CalendarIcon,
    CheckCircle2Icon,
    ClockIcon,
    FileTextIcon,
    FilterIcon,
    PlusIcon,
    ShieldCheckIcon,
    TruckIcon,
    XCircleIcon,
} from "lucide-react"
import { PageHeader } from "~/components/page-header"
import { Button } from "~/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { badgeCls } from "~/lib/compliance_ui"

type VendorStatus = "cumple" | "por-vencer" | "incumple"
type VendorType = "Encargado" | "Responsable"

interface Vendor {
  id: string
  name: string
  rfc: string
  service: string
  type: VendorType
  avisofirmado: boolean
  clausulaTransferencia: boolean
  contractExpiry: string
  lastReview: string
  status: VendorStatus
}

const vendors: Vendor[] = [
  {
    id: "PRV-001",
    name: "Amazon Web Services México",
    rfc: "AMW900218XY3",
    service: "Infraestructura cloud (IaaS)",
    type: "Encargado",
    avisofirmado: true,
    clausulaTransferencia: true,
    contractExpiry: "30 Nov 2026",
    lastReview: "10 Ene 2026",
    status: "cumple",
  },
  {
    id: "PRV-002",
    name: "Microsoft México S. de R.L.",
    rfc: "MMS930614GH7",
    service: "Productividad y nube (Microsoft 365)",
    type: "Encargado",
    avisofirmado: true,
    clausulaTransferencia: true,
    contractExpiry: "31 Oct 2026",
    lastReview: "15 Ene 2026",
    status: "cumple",
  },
  {
    id: "PRV-003",
    name: "Nóminas Express S.A. de C.V.",
    rfc: "NEX030415CD8",
    service: "Procesamiento de nómina",
    type: "Responsable",
    avisofirmado: true,
    clausulaTransferencia: false,
    contractExpiry: "01 Abr 2026",
    lastReview: "20 Nov 2025",
    status: "por-vencer",
  },
  {
    id: "PRV-004",
    name: "Salesforce Mexico S. de R.L.",
    rfc: "SFM180620EF5",
    service: "CRM y automatización de ventas",
    type: "Encargado",
    avisofirmado: false,
    clausulaTransferencia: false,
    contractExpiry: "20 Jun 2026",
    lastReview: "—",
    status: "incumple",
  },
  {
    id: "PRV-005",
    name: "Stripe Mexico S. de R.L.",
    rfc: "STR210301IJ9",
    service: "Procesamiento de pagos (PCI DSS)",
    type: "Responsable",
    avisofirmado: true,
    clausulaTransferencia: true,
    contractExpiry: "28 Feb 2027",
    lastReview: "05 Feb 2026",
    status: "cumple",
  },
  {
    id: "PRV-006",
    name: "Analytika Data S.A. de C.V.",
    rfc: "ADA150708KL2",
    service: "Analítica de comportamiento de usuarios",
    type: "Encargado",
    avisofirmado: false,
    clausulaTransferencia: false,
    contractExpiry: "10 May 2026",
    lastReview: "—",
    status: "incumple",
  },
  {
    id: "PRV-007",
    name: "Seguridad Digital S.A. de C.V.",
    rfc: "SDG120903MN4",
    service: "SOC / Monitoreo de seguridad 24×7",
    type: "Responsable",
    avisofirmado: true,
    clausulaTransferencia: true,
    contractExpiry: "15 Sep 2026",
    lastReview: "12 Feb 2026",
    status: "cumple",
  },
  {
    id: "PRV-008",
    name: "Google Cloud México S.A.",
    rfc: "GCM991105AB2",
    service: "Almacenamiento y BigQuery",
    type: "Encargado",
    avisofirmado: true,
    clausulaTransferencia: true,
    contractExpiry: "15 Ene 2027",
    lastReview: "08 Ene 2026",
    status: "cumple",
  },
]

const statusConfig: Record<VendorStatus, { label: string; cls: string; icon: typeof CheckCircle2Icon }> = {
  cumple: {
    label: "Cumple",
    cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
    icon: CheckCircle2Icon,
  },
  "por-vencer": {
    label: "Por Vencer",
    cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    icon: ClockIcon,
  },
  incumple: {
    label: "Incumple",
    cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    icon: XCircleIcon,
  },
}

const total = vendors.length
const cumpleCount = vendors.filter((v) => v.status === "cumple").length
const porVencerCount = vendors.filter((v) => v.status === "por-vencer").length
const incumpleCount = vendors.filter((v) => v.status === "incumple").length
const sinAvisoCount = vendors.filter((v) => !v.avisofirmado).length

function BoolChip({ value }: { value: boolean }) {
  return value ? (
    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-medium">
      <CheckCircle2Icon className="size-3.5" /> Sí
    </span>
  ) : (
    <span className="flex items-center gap-1 text-red-600 dark:text-red-400 text-xs font-medium">
      <XCircleIcon className="size-3.5" /> No
    </span>
  )
}

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Panel Principal", href: "/" },
          { label: "Administración", href: "/administracion" },
          { label: "Proveedores y Terceros" },
        ]}
      />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">8.5. Proveedores y Terceros</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Registro de encargados y responsables de datos personales · LFPDPPP Arts. 21 y 50
            </p>
          </div>
          <Button size="sm" className="gap-1.5">
            <PlusIcon className="size-3.5" /> Agregar proveedor
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total de Proveedores</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{total}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <TruckIcon className="size-3.5" />
                <span>{vendors.filter((v) => v.type === "Encargado").length} encargados · {vendors.filter((v) => v.type === "Responsable").length} responsables</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200 dark:border-green-900 bg-green-50/30 dark:bg-green-950/10">
            <CardHeader>
              <CardDescription className="text-green-700 dark:text-green-400">Cumplen</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{cumpleCount}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${(cumpleCount / total) * 100}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{Math.round((cumpleCount / total) * 100)}% del total</p>
            </CardContent>
          </Card>
          <Card className="border-amber-200 dark:border-amber-900 bg-amber-50/30 dark:bg-amber-950/10">
            <CardHeader>
              <CardDescription className="text-amber-700 dark:text-amber-400">Por Vencer</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-amber-600 dark:text-amber-400">{porVencerCount}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-amber-700/70 dark:text-amber-400/70">Contrato vence en &lt; 30 días</p>
            </CardContent>
          </Card>
          <Card className="border-red-200 dark:border-red-900 bg-red-50/30 dark:bg-red-950/10">
            <CardHeader>
              <CardDescription className="text-red-700 dark:text-red-400">Incumplen / Sin Aviso</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-red-600 dark:text-red-400">{incumpleCount}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-red-700/70 dark:text-red-400/70">{sinAvisoCount} sin Aviso de Privacidad firmado</p>
            </CardContent>
          </Card>
        </div>

        {/* Compliance notice */}
        <div className="flex items-start gap-3 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 px-4 py-3 text-sm">
          <ShieldCheckIcon className="size-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <p className="text-purple-800 dark:text-purple-300">
            <span className="font-semibold">LFPDPPP Art. 21 y 50 —</span> Todo proveedor que trate datos personales en nombre de la empresa debe contar con contrato vinculante que incluya cláusula de uso exclusivo de datos y prohibición de transferencia no autorizada. El incumplimiento puede derivar en multas del INAI de hasta 320,000 UMAS.
          </p>
        </div>

        {/* Vendor register table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Registro de Proveedores</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                {total} proveedores registrados · {sinAvisoCount} requieren actualización
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <FilterIcon className="size-3.5" /> Filtrar
            </Button>
          </CardHeader>

          {/* Filter chips */}
          <div className="flex items-center gap-x-5 gap-y-2 flex-wrap text-xs px-6 py-3 border-b">
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground font-medium">Estado:</span>
              {["Todos", "Cumple", "Por Vencer", "Incumple"].map((f, i) => (
                <button key={f} className={`px-2.5 py-1 rounded-full border transition-colors ${i === 0 ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:bg-muted"}`}>{f}</button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground font-medium">Tipo:</span>
              {["Todos", "Encargado", "Responsable"].map((f, i) => (
                <button key={f} className={`px-2.5 py-1 rounded-full border transition-colors ${i === 0 ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:bg-muted"}`}>{f}</button>
              ))}
            </div>
          </div>

          <CardContent className="p-0">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_auto] text-[11px] font-semibold uppercase tracking-wide text-muted-foreground px-6 py-2.5 border-b bg-muted/30 gap-4">
              <span>Proveedor</span>
              <span>Tipo LFPDPPP</span>
              <span className="text-center">Aviso Privacidad</span>
              <span className="text-center">Cláusula Transf.</span>
              <span>Vencimiento Contrato</span>
              <span>Última Revisión</span>
              <span>Estado</span>
            </div>

            <div className="divide-y">
              {vendors.map((v) => {
                const cfg = statusConfig[v.status]
                const StatusIcon = cfg.icon
                return (
                  <div
                    key={v.id}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_auto] items-center px-6 py-3 gap-4 hover:bg-muted/40 transition-colors"
                  >
                    {/* Proveedor */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex size-8 items-center justify-center rounded-md bg-muted shrink-0">
                        <BuildingIcon className="size-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{v.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span className="font-mono">{v.rfc}</span>
                          <span>·</span>
                          <span className="truncate">{v.service}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tipo */}
                    <span className={`${badgeCls} ${v.type === "Encargado" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400"}`}>
                      {v.type}
                    </span>

                    {/* Aviso */}
                    <div className="flex justify-center">
                      <BoolChip value={v.avisofirmado} />
                    </div>

                    {/* Cláusula */}
                    <div className="flex justify-center">
                      <BoolChip value={v.clausulaTransferencia} />
                    </div>

                    {/* Vencimiento */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <CalendarIcon className="size-3.5 text-muted-foreground shrink-0" />
                      <span className={v.status === "por-vencer" ? "font-semibold text-amber-600 dark:text-amber-400" : ""}>{v.contractExpiry}</span>
                    </div>

                    {/* Última revisión */}
                    <span className="text-xs text-muted-foreground">{v.lastReview}</span>

                    {/* Estado */}
                    <span className={`${badgeCls} ${cfg.cls} flex items-center gap-1 shrink-0`}>
                      <StatusIcon className="size-3" />
                      {cfg.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Bottom note */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <FileTextIcon className="size-3.5 shrink-0" />
          <span>Los contratos marcados como "Incumple" deben ser actualizados antes de continuar el tratamiento de datos personales conforme a la LFPDPPP. Contacta al Responsable de Datos Personales: <span className="font-medium">Lic. Ana García · privacidad@nexum.com.mx</span></span>
        </div>
      </div>
    </>
  )
}

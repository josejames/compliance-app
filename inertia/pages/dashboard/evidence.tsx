import {
    AlertTriangleIcon,
    BookOpenIcon,
    CalendarIcon,
    ChevronRightIcon,
    FileIcon,
    FilesIcon,
    FileTextIcon,
    FolderOpenIcon,
    HardDriveIcon,
    UploadCloudIcon,
    UserIcon
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
    number: "5.1",
    title: "Repositorio de Evidencias",
    description:
      "Visor de archivos organizado por controles, marcos y áreas. Control de versiones con historial completo de cambios por documento.",
    href: "/evidencias/repositorio",
    icon: FolderOpenIcon,
    stats: [
      { label: "Archivos", value: "342" },
      { label: "Subidos este mes", value: "28" },
    ],
    accent: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    number: "5.2",
    title: "Políticas y Procedimientos",
    description:
      "Biblioteca de documentos normativos internos con control de vigencia y fechas de revisión obligatoria.",
    href: "/evidencias/politicas",
    icon: BookOpenIcon,
    stats: [
      { label: "Políticas activas", value: "24" },
      { label: "Por revisar", value: "3" },
    ],
    accent: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  {
    number: "5.3",
    title: "Subida Masiva",
    description:
      "Carga múltiple de evidencias con asociación automática a controles y marcos normativos. Validación de formato y metadatos.",
    href: "/evidencias/subida-masiva",
    icon: UploadCloudIcon,
    stats: [
      { label: "Último lote", value: "18 arch." },
      { label: "Tasa éxito", value: "94%" },
    ],
    accent: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
  },
]

interface RecentFile {
  id: string
  name: string
  type: "pdf" | "xlsx" | "docx" | "png" | "zip"
  framework: string
  control: string
  uploadedBy: string
  uploadedAt: string
  size: string
}

const recentFiles: RecentFile[] = [
  { id: "EVD-342", name: "pentest-report-2026.pdf", type: "pdf", framework: "ISO 27001", control: "A.8.8", uploadedBy: "Ing. Pablo Torres", uploadedAt: "13 Mar 2026", size: "4.2 MB" },
  { id: "EVD-341", name: "revision-accesos-q1-2026.xlsx", type: "xlsx", framework: "ISO 27001", control: "A.9.2.5", uploadedBy: "Lic. Ana García", uploadedAt: "12 Mar 2026", size: "892 KB" },
  { id: "EVD-340", name: "capacitacion-lfpdppp-constancia.pdf", type: "pdf", framework: "LFPDPPP", control: "Art. 21", uploadedBy: "María González", uploadedAt: "12 Mar 2026", size: "1.1 MB" },
  { id: "EVD-339", name: "prueba-restauracion-backup-feb26.pdf", type: "pdf", framework: "ISO 27001", control: "A.8.13", uploadedBy: "Ing. Pablo Torres", uploadedAt: "11 Mar 2026", size: "756 KB" },
  { id: "EVD-338", name: "contratos-terceros-aviso-privacidad.zip", type: "zip", framework: "LFPDPPP", control: "Art. 28", uploadedBy: "Lic. Ana García", uploadedAt: "10 Mar 2026", size: "8.4 MB" },
]

interface ExpiringPolicy {
  title: string
  daysLeft: number
  owner: string
  reviewDate: string
}

const expiringPolicies: ExpiringPolicy[] = [
  { title: "Política de Control de Accesos", daysLeft: 8, owner: "Carlos Rodríguez", reviewDate: "21 Mar 2026" },
  { title: "Política de Gestión de Incidentes", daysLeft: 15, owner: "Laura Martínez", reviewDate: "28 Mar 2026" },
  { title: "Política de Cifrado y Claves", daysLeft: 22, owner: "Pablo Torres", reviewDate: "04 Abr 2026" },
]

const fileTypeConfig: Record<RecentFile["type"], { cls: string; icon: typeof FileIcon }> = {
  pdf: { cls: "text-red-500", icon: FileTextIcon },
  xlsx: { cls: "text-green-600", icon: FileTextIcon },
  docx: { cls: "text-blue-500", icon: FileTextIcon },
  png: { cls: "text-purple-500", icon: FileIcon },
  zip: { cls: "text-amber-500", icon: FilesIcon },
}

const frameworkColors: Record<string, string> = {
  "ISO 27001": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  "LFPDPPP": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  "NOM-035": "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
  "PCI DSS": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
}

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Panel Principal", href: "/" }, { label: "Evidencias y Documentos" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Evidencias y Documentos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Repositorio centralizado y seguro para toda la documentación de cumplimiento
          </p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Evidencias</CardDescription>
              <CardTitle><span className="text-3xl font-bold">342</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <HardDriveIcon className="size-3.5" />
                <span>12.4 GB utilizados</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Políticas Activas</CardDescription>
              <CardTitle><span className="text-3xl font-bold">24</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                <span className={`${badgeCls} bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400`}>3 por revisar</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Subidas Este Mes</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">28</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+12% respecto al mes anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Controles con Evidencia</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">87%</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "87%" }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">18 controles sin evidencia</p>
            </CardContent>
          </Card>
        </div>

        {/* Section Nav Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {sections.map((s) => (
            <SectionNavCard key={s.number} {...s} />
          ))}
        </div>

        {/* Bottom panels */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Recent uploads */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base">Archivos Recientes</CardTitle>
                <CardDescription className="text-xs mt-0.5">Últimas evidencias subidas al repositorio</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="/evidencias/repositorio">Ver todos <ChevronRightIcon /></a>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentFiles.map((f) => {
                  const ft = fileTypeConfig[f.type]
                  const FtIcon = ft.icon
                  const fwCls = frameworkColors[f.framework] ?? "bg-slate-100 text-slate-700"
                  return (
                    <div key={f.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted/40 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <FtIcon className={`size-4 shrink-0 ${ft.cls}`} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{f.name}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                            <span className={`${badgeCls} text-[10px] ${fwCls}`}>{f.framework}</span>
                            <span>{f.control}</span>
                            <span>·</span>
                            <UserIcon className="size-3" />
                            <span>{f.uploadedBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end shrink-0 ml-3 gap-0.5">
                        <span className="text-xs text-muted-foreground">{f.size}</span>
                        <span className="text-[10px] text-muted-foreground">{f.uploadedAt}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Expiring policies */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangleIcon className="size-4 text-amber-500" />
                  Políticas Próximas a Vencer
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">Requieren revisión en los próximos 30 días</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="/evidencias/politicas">Ver todas <ChevronRightIcon /></a>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {expiringPolicies.map((p) => (
                  <div key={p.title} className="flex items-center justify-between px-6 py-3 hover:bg-muted/40 transition-colors">
                    <div className="flex items-start gap-3 min-w-0">
                      <BookOpenIcon className="size-4 shrink-0 mt-0.5 text-emerald-500" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-tight">{p.title}</p>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                          <UserIcon className="size-3" />
                          <span>{p.owner}</span>
                          <CalendarIcon className="size-3" />
                          <span>Revisión: {p.reviewDate}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`${badgeCls} shrink-0 ml-3 ${p.daysLeft <= 10 ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"}`}>
                      {p.daysLeft}d
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </>
  )
}

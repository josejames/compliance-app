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
  DownloadIcon,
  FolderIcon,
  FolderOpenIcon,
  FileTextIcon,
  FileIcon,
  FilesIcon,
  ChevronRightIcon,
  HistoryIcon,
  UserIcon,
  CalendarIcon,
  TagIcon,
  SlidersHorizontalIcon,
} from "lucide-react"
import { badgeCls } from "~/lib/compliance_ui"

type FileType = "pdf" | "xlsx" | "docx" | "png" | "zip" | "csv"
type FileStatus = "current" | "superseded" | "draft"

interface EvidenceFile {
  id: string
  name: string
  type: FileType
  framework: string
  control: string
  area: string
  uploadedBy: string
  uploadedAt: string
  size: string
  version: string
  status: FileStatus
  versionsCount: number
  tags: string[]
}

const files: EvidenceFile[] = [
  { id: "EVD-342", name: "pentest-report-2026.pdf", type: "pdf", framework: "ISO 27001", control: "A.8.8", area: "Seguridad TI", uploadedBy: "Pablo Torres", uploadedAt: "13 Mar 2026", size: "4.2 MB", version: "v1.0", status: "current", versionsCount: 1, tags: ["pentest", "red-team"] },
  { id: "EVD-341", name: "iam-review-q1-2026.xlsx", type: "xlsx", framework: "SOC 2", control: "CC6.1", area: "Accesos", uploadedBy: "Ana García", uploadedAt: "12 Mar 2026", size: "892 KB", version: "v2.1", status: "current", versionsCount: 3, tags: ["iam", "access-review"] },
  { id: "EVD-340", name: "gdpr-training-completion.pdf", type: "pdf", framework: "GDPR", control: "Art.39", area: "Privacidad", uploadedBy: "María González", uploadedAt: "12 Mar 2026", size: "1.1 MB", version: "v1.0", status: "current", versionsCount: 1, tags: ["training", "gdpr"] },
  { id: "EVD-339", name: "backup-restore-test-feb26.pdf", type: "pdf", framework: "ISO 27001", control: "A.8.13", area: "Continuidad", uploadedBy: "Pablo Torres", uploadedAt: "11 Mar 2026", size: "756 KB", version: "v1.0", status: "current", versionsCount: 1, tags: ["backup", "dr-test"] },
  { id: "EVD-338", name: "vendor-contracts-dpa-signed.zip", type: "zip", framework: "GDPR", control: "Art.28", area: "Legal", uploadedBy: "Ana García", uploadedAt: "10 Mar 2026", size: "8.4 MB", version: "v3.0", status: "current", versionsCount: 5, tags: ["dpa", "vendors"] },
  { id: "EVD-337", name: "network-segmentation-diagram.png", type: "png", framework: "PCI DSS", control: "Req.1.2", area: "Redes", uploadedBy: "Carlos Rodríguez", uploadedAt: "08 Mar 2026", size: "2.3 MB", version: "v4.2", status: "current", versionsCount: 7, tags: ["network", "architecture"] },
  { id: "EVD-336", name: "soc2-cc9-incident-log.xlsx", type: "xlsx", framework: "SOC 2", control: "CC9.1", area: "Incidentes", uploadedBy: "Laura Martínez", uploadedAt: "07 Mar 2026", size: "340 KB", version: "v1.3", status: "current", versionsCount: 4, tags: ["incidents", "dr"] },
  { id: "EVD-335", name: "encryption-policy-v2.docx", type: "docx", framework: "ISO 27001", control: "A.10.1", area: "Seguridad TI", uploadedBy: "Carlos Rodríguez", uploadedAt: "05 Mar 2026", size: "180 KB", version: "v2.0", status: "current", versionsCount: 2, tags: ["policy", "encryption"] },
  { id: "EVD-334", name: "pci-saq-d-2026.pdf", type: "pdf", framework: "PCI DSS", control: "Req.12", area: "Cumplimiento", uploadedBy: "María González", uploadedAt: "03 Mar 2026", size: "1.8 MB", version: "v1.0", status: "current", versionsCount: 1, tags: ["pci", "saq"] },
  { id: "EVD-333", name: "risk-register-export-q1.xlsx", type: "xlsx", framework: "ISO 27001", control: "A.6.1", area: "Riesgos", uploadedBy: "Javier López", uploadedAt: "01 Mar 2026", size: "520 KB", version: "v5.1", status: "current", versionsCount: 8, tags: ["risk", "register"] },
  { id: "EVD-332", name: "change-management-log-feb26.csv", type: "csv", framework: "ISO 27001", control: "A.8.32", area: "Operaciones", uploadedBy: "Javier López", uploadedAt: "28 Feb 2026", size: "95 KB", version: "v1.0", status: "current", versionsCount: 1, tags: ["change", "cab"] },
  { id: "EVD-331", name: "access-control-matrix-v3.xlsx", type: "xlsx", framework: "ISO 27001", control: "A.8.18", area: "Accesos", uploadedBy: "Laura Martínez", uploadedAt: "26 Feb 2026", size: "640 KB", version: "v3.0", status: "superseded", versionsCount: 4, tags: ["access", "matrix"] },
]

const folders = [
  { name: "ISO 27001", count: 142, cls: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/30" },
  { name: "GDPR", count: 78, cls: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { name: "SOC 2", count: 64, cls: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-950/30" },
  { name: "PCI DSS", count: 38, cls: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-950/30" },
  { name: "ISO 9001", count: 20, cls: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/30" },
]

const fileTypeConfig: Record<FileType, { cls: string; icon: typeof FileIcon; label: string }> = {
  pdf: { cls: "text-red-500", icon: FileTextIcon, label: "PDF" },
  xlsx: { cls: "text-green-600", icon: FileTextIcon, label: "Excel" },
  docx: { cls: "text-blue-500", icon: FileTextIcon, label: "Word" },
  png: { cls: "text-purple-500", icon: FileIcon, label: "Imagen" },
  zip: { cls: "text-amber-500", icon: FilesIcon, label: "ZIP" },
  csv: { cls: "text-teal-500", icon: FileTextIcon, label: "CSV" },
}

const statusConfig: Record<FileStatus, { label: string; cls: string }> = {
  current: { label: "Vigente", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
  superseded: { label: "Sustituido", cls: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
  draft: { label: "Borrador", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
}

const frameworkColors: Record<string, string> = {
  "ISO 27001": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  "SOC 2": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  "GDPR": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  "PCI DSS": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  "ISO 9001": "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
}

export default function Page() {
  const totalVersions = files.reduce((acc, f) => acc + f.versionsCount, 0)
  const areas = [...new Set(files.map((f) => f.area))]

  return (
    <>
      <PageHeader crumbs={[{ label: "Evidencias y Documentos", href: "/evidencias" }, { label: "Repositorio de Evidencias" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Repositorio de Evidencias</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {files.length} archivos mostrados · organizado por marco, control y área
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><DownloadIcon />Exportar índice</Button>
            <Button size="sm"><PlusIcon />Subir evidencia</Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Archivos</CardDescription>
              <CardTitle><span className="text-3xl font-bold">342</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">12.4 GB · {areas.length} áreas cubiertas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Versiones Totales</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{totalVersions}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Historial completo de cambios</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Controles Cubiertos</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">87%</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "87%" }} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Subidos Este Mes</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">28</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Último: 13 Mar 2026</p>
            </CardContent>
          </Card>
        </div>

        {/* Folder browser + file list */}
        <div className="grid gap-6 md:grid-cols-[220px_1fr]">

          {/* Folder tree */}
          <div className="flex flex-col gap-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Por Marco Normativo</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="space-y-1">
                  {folders.map((folder) => (
                    <button
                      key={folder.name}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${folder.bg}`}>
                          <FolderIcon className={`size-3.5 ${folder.cls}`} />
                        </div>
                        <span className="text-sm font-medium">{folder.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{folder.count}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Por Área</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="space-y-1">
                  {areas.map((area) => {
                    const count = files.filter((f) => f.area === area).length
                    return (
                      <button
                        key={area}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted transition-colors text-left"
                      >
                        <div className="flex items-center gap-2">
                          <FolderOpenIcon className="size-3.5 text-muted-foreground" />
                          <span className="text-sm">{area}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{count}</span>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* File list */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-base">Todos los Archivos</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2 size-4 text-muted-foreground" />
                    <input
                      className="h-8 w-52 rounded-md border border-input bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      placeholder="Buscar archivo..."
                    />
                  </div>
                  <Button variant="outline" size="sm"><SlidersHorizontalIcon className="size-3.5" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Archivo</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Marco / Control</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Área</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Subido por</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Fecha</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Versión</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {files.map((f) => {
                      const ft = fileTypeConfig[f.type]
                      const FtIcon = ft.icon
                      const st = statusConfig[f.status]
                      const fwCls = frameworkColors[f.framework] ?? "bg-slate-100 text-slate-700"
                      return (
                        <tr key={f.id} className="hover:bg-muted/40 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <FtIcon className={`size-4 shrink-0 ${ft.cls}`} />
                              <div>
                                <p className="font-medium leading-tight">{f.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className={`${badgeCls} text-[10px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300`}>{ft.label}</span>
                                  <span className="text-[10px] text-muted-foreground">{f.size}</span>
                                  {f.versionsCount > 1 && (
                                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                                      <HistoryIcon className="size-2.5" />{f.versionsCount} versiones
                                    </span>
                                  )}
                                </div>
                                <div className="flex gap-1 mt-0.5 flex-wrap">
                                  {f.tags.map(t => (
                                    <span key={t} className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                                      <TagIcon className="size-2.5" />{t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`${badgeCls} ${fwCls}`}>{f.framework}</span>
                            <p className="text-xs text-muted-foreground mt-1 font-mono">{f.control}</p>
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{f.area}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <UserIcon className="size-3" />{f.uploadedBy}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <CalendarIcon className="size-3" />{f.uploadedAt}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-mono text-muted-foreground">{f.version}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`${badgeCls} ${st.cls}`}>{st.label}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

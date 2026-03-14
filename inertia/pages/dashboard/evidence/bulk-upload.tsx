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
  UploadCloudIcon,
  FileTextIcon,
  FileIcon,
  FilesIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  ChevronRightIcon,
  RotateCcwIcon,
  UserIcon,
  CalendarIcon,
  LinkIcon,
  SparklesIcon,
  InboxIcon,
} from "lucide-react"
import { badgeCls } from "~/lib/compliance_ui"

type BatchStatus = "completed" | "partial" | "failed" | "processing"
type FileUploadStatus = "success" | "error" | "warning" | "processing"

interface BatchUpload {
  id: string
  batchName: string
  uploadedBy: string
  uploadedAt: string
  totalFiles: number
  successFiles: number
  errorFiles: number
  warningFiles: number
  status: BatchStatus
  frameworks: string[]
  autoMapped: number
}

interface UploadQueueItem {
  name: string
  type: string
  size: string
  status: FileUploadStatus
  framework?: string
  control?: string
  message?: string
}

const batchHistory: BatchUpload[] = [
  { id: "LOT-018", batchName: "Evidencias SOC2 Marzo 2026", uploadedBy: "Ana García", uploadedAt: "12 Mar 2026", totalFiles: 18, successFiles: 17, errorFiles: 0, warningFiles: 1, status: "partial", frameworks: ["SOC 2", "ISO 27001"], autoMapped: 16 },
  { id: "LOT-017", batchName: "GDPR Q1 Documentation", uploadedBy: "María González", uploadedAt: "08 Mar 2026", totalFiles: 12, successFiles: 12, errorFiles: 0, warningFiles: 0, status: "completed", frameworks: ["GDPR"], autoMapped: 12 },
  { id: "LOT-016", batchName: "Technical Controls Evidence", uploadedBy: "Pablo Torres", uploadedAt: "01 Mar 2026", totalFiles: 22, successFiles: 19, errorFiles: 2, warningFiles: 1, status: "partial", frameworks: ["ISO 27001", "PCI DSS"], autoMapped: 17 },
  { id: "LOT-015", batchName: "Annual Audit Evidence Pack", uploadedBy: "Carlos Rodríguez", uploadedAt: "22 Feb 2026", totalFiles: 45, successFiles: 45, errorFiles: 0, warningFiles: 0, status: "completed", frameworks: ["ISO 27001", "SOC 2", "GDPR"], autoMapped: 44 },
  { id: "LOT-014", batchName: "PCI DSS Pre-check Evidence", uploadedBy: "Pablo Torres", uploadedAt: "15 Feb 2026", totalFiles: 8, successFiles: 5, errorFiles: 3, warningFiles: 0, status: "partial", frameworks: ["PCI DSS"], autoMapped: 4 },
  { id: "LOT-013", batchName: "Risk Assessment Documents", uploadedBy: "Javier López", uploadedAt: "10 Feb 2026", totalFiles: 6, successFiles: 6, errorFiles: 0, warningFiles: 0, status: "completed", frameworks: ["ISO 27001"], autoMapped: 6 },
]

const recentQueueItems: UploadQueueItem[] = [
  { name: "pentest-report-2026.pdf", type: "pdf", size: "4.2 MB", status: "success", framework: "ISO 27001", control: "A.8.8" },
  { name: "iam-review-q1-2026.xlsx", type: "xlsx", size: "892 KB", status: "success", framework: "SOC 2", control: "CC6.1" },
  { name: "gdpr-training-cert.pdf", type: "pdf", size: "340 KB", status: "success", framework: "GDPR", control: "Art.39" },
  { name: "network-diagram-v3.vsd", type: "vsd", size: "1.1 MB", status: "warning", message: "Formato no estándar — convertido a PDF automáticamente" },
  { name: "temp-access-log.txt", type: "txt", size: "12 KB", status: "error", message: "Tipo de archivo no soportado. Use PDF, XLSX, DOCX, PNG o ZIP." },
  { name: "backup-test-results.docx", type: "docx", size: "210 KB", status: "success", framework: "ISO 27001", control: "A.8.13" },
  { name: "vendor-dpa-contracts.zip", type: "zip", size: "8.4 MB", status: "success", framework: "GDPR", control: "Art.28" },
  { name: "access-matrix-draft.xlsx", type: "xlsx", size: "640 KB", status: "warning", message: "Nombre de archivo ambiguo — asociación automática no disponible. Revise manualmente." },
  { name: "change-log-feb26.csv", type: "csv", size: "95 KB", status: "success", framework: "ISO 27001", control: "A.8.32" },
]

const autoMappingRules = [
  { pattern: "pentest* | vuln-scan*", target: "ISO 27001 → A.8.8 Gestión de vulnerabilidades técnicas", active: true },
  { pattern: "iam-review* | access-*", target: "SOC 2 → CC6.1 Controles de acceso lógico", active: true },
  { pattern: "gdpr-training* | privacy-*", target: "GDPR → Art.39 Tareas del DPO / formación", active: true },
  { pattern: "backup-* | dr-*", target: "ISO 27001 → A.8.13 Copias de seguridad", active: true },
  { pattern: "vendor-dpa* | contract-*", target: "GDPR → Art.28 Responsable – encargado", active: true },
  { pattern: "network-seg* | vlan-*", target: "PCI DSS → Req.1.2 Segmentación de red", active: true },
  { pattern: "change-log* | cab-*", target: "ISO 27001 → A.8.32 Gestión de cambios", active: false },
]

const batchStatusConfig: Record<BatchStatus, { label: string; cls: string; icon: typeof CheckCircle2Icon }> = {
  completed: { label: "Completado", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400", icon: CheckCircle2Icon },
  partial: { label: "Parcial", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400", icon: AlertTriangleIcon },
  failed: { label: "Fallido", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", icon: XCircleIcon },
  processing: { label: "Procesando", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400", icon: ClockIcon },
}

const fileStatusConfig: Record<FileUploadStatus, { cls: string; icon: typeof CheckCircle2Icon; iconCls: string }> = {
  success: { cls: "bg-green-50 dark:bg-green-950/20", icon: CheckCircle2Icon, iconCls: "text-green-500" },
  error: { cls: "bg-red-50 dark:bg-red-950/20", icon: XCircleIcon, iconCls: "text-red-500" },
  warning: { cls: "bg-amber-50 dark:bg-amber-950/20", icon: AlertTriangleIcon, iconCls: "text-amber-500" },
  processing: { cls: "", icon: ClockIcon, iconCls: "text-blue-500" },
}

const frameworkColors: Record<string, string> = {
  "ISO 27001": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  "SOC 2": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  "GDPR": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  "PCI DSS": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
}

const totalUploaded = batchHistory.reduce((s, b) => s + b.totalFiles, 0)
const totalSuccess = batchHistory.reduce((s, b) => s + b.successFiles, 0)
const totalAutoMapped = batchHistory.reduce((s, b) => s + b.autoMapped, 0)
const globalRate = Math.round((totalSuccess / totalUploaded) * 100)

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Evidencias y Documentos", href: "/evidencias" }, { label: "Subida Masiva" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Subida Masiva de Evidencias</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Carga múltiple con asociación automática a controles y marcos normativos
            </p>
          </div>
          <Button size="sm"><UploadCloudIcon />Iniciar nueva subida</Button>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Lotes Procesados</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{batchHistory.length}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{totalUploaded} archivos en total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Tasa de Éxito Global</CardDescription>
              <CardTitle><span className={`text-3xl font-bold ${globalRate >= 90 ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}>{globalRate}%</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-2">
                <div className={`h-2 rounded-full ${globalRate >= 90 ? "bg-green-500" : "bg-amber-500"}`} style={{ width: `${globalRate}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{totalSuccess} de {totalUploaded} archivos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Asociación Automática</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-purple-600 dark:text-purple-400">{Math.round((totalAutoMapped / totalUploaded) * 100)}%</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{totalAutoMapped} archivos mapeados automáticamente</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Reglas de Mapeo Activas</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{autoMappingRules.filter(r => r.active).length}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">de {autoMappingRules.length} reglas configuradas</p>
            </CardContent>
          </Card>
        </div>

        {/* Upload zone + recent queue */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Drop zone */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Zona de Carga</CardTitle>
              <CardDescription className="text-xs">Arrastra archivos o haz clic para seleccionar. Formatos: PDF, XLSX, DOCX, PNG, ZIP, CSV</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center gap-3 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                  <UploadCloudIcon className="size-7 text-blue-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Arrastra archivos aquí</p>
                  <p className="text-xs text-muted-foreground mt-0.5">o haz clic para explorar</p>
                </div>
                <Button variant="outline" size="sm">Seleccionar archivos</Button>
              </div>
              <div className="mt-4 rounded-lg border bg-muted/20 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <InboxIcon className="size-4 text-muted-foreground" />
                  <p className="text-xs font-medium text-muted-foreground">Opciones de carga</p>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Asociación automática por nombre de archivo</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Detección automática de marco normativo</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>Sobrescribir versiones existentes</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Notificar al responsable del control</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent queue result */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Último Lote Procesado</CardTitle>
              <CardDescription className="text-xs">Resultado de: Evidencias SOC2 Marzo 2026 · {recentQueueItems.length} archivos</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y max-h-100 overflow-y-auto">
                {recentQueueItems.map((item, i) => {
                  const fsc = fileStatusConfig[item.status]
                  const StatusIcon = fsc.icon
                  const fwCls = item.framework ? (frameworkColors[item.framework] ?? "bg-slate-100 text-slate-700") : ""
                  return (
                    <div key={i} className={`flex items-start justify-between px-4 py-2.5 ${fsc.cls}`}>
                      <div className="flex items-start gap-2.5 min-w-0">
                        <StatusIcon className={`size-4 shrink-0 mt-0.5 ${fsc.iconCls}`} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          {item.status === "success" && item.framework && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <LinkIcon className="size-3 text-muted-foreground" />
                              <span className={`${badgeCls} text-[10px] ${fwCls}`}>{item.framework}</span>
                              <span className="text-[10px] font-mono text-muted-foreground">{item.control}</span>
                              <span className="flex items-center gap-0.5 text-[10px] text-purple-600 dark:text-purple-400">
                                <SparklesIcon className="size-2.5" />Auto
                              </span>
                            </div>
                          )}
                          {item.message && (
                            <p className="text-xs text-muted-foreground mt-0.5">{item.message}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0 ml-2 mt-0.5">{item.size}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Auto-mapping rules */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SparklesIcon className="size-4 text-purple-500" />
                <CardTitle className="text-base">Reglas de Asociación Automática</CardTitle>
              </div>
              <Button variant="outline" size="sm"><PlusIcon />Nueva regla</Button>
            </div>
            <CardDescription className="text-xs mt-0.5">
              Patrones de nombre de archivo → control/marco destino. Se aplican en orden al subir lotes.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {autoMappingRules.map((rule, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-3 hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${rule.active ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600"}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-mono font-medium text-blue-600 dark:text-blue-400 truncate">{rule.pattern}</p>
                      <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                        <ChevronRightIcon className="size-3" />
                        <span>{rule.target}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <span className={`${badgeCls} ${rule.active ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>
                      {rule.active ? "Activa" : "Inactiva"}
                    </span>
                    <Button variant="ghost" size="sm">Editar</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Batch history */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Historial de Lotes</CardTitle>
            <CardDescription className="text-xs">Todos los lotes de subida masiva procesados</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">ID</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Nombre del lote</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Marcos</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Archivos</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Éxito</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Auto-mapeados</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Usuario</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Fecha</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {batchHistory.map((b) => {
                    const st = batchStatusConfig[b.status]
                    const StIcon = st.icon
                    const rate = Math.round((b.successFiles / b.totalFiles) * 100)
                    return (
                      <tr key={b.id} className="hover:bg-muted/40 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{b.id}</td>
                        <td className="px-4 py-3 font-medium">{b.batchName}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 flex-wrap">
                            {b.frameworks.map(fw => (
                              <span key={fw} className={`${badgeCls} text-[10px] ${frameworkColors[fw] ?? "bg-slate-100 text-slate-700"}`}>{fw}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-medium">{b.totalFiles}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-1.5">
                              <div className={`h-1.5 rounded-full ${rate === 100 ? "bg-green-500" : rate >= 80 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${rate}%` }} />
                            </div>
                            <span className="text-xs text-muted-foreground">{rate}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <SparklesIcon className="size-3 text-purple-500" />
                            {b.autoMapped}/{b.totalFiles}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <UserIcon className="size-3" />{b.uploadedBy}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CalendarIcon className="size-3" />{b.uploadedAt}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`${badgeCls} ${st.cls} flex items-center gap-1 w-fit`}>
                            <StIcon className="size-3" />{st.label}
                          </span>
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
    </>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="M12 5v14" />
    </svg>
  )
}

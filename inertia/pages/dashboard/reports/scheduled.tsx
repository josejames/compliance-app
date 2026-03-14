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
  PauseCircleIcon,
  PlayCircleIcon,
  Settings2Icon,
  MailIcon,
  CalendarIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
} from "lucide-react"
import { badgeCls } from "~/lib/compliance_ui"

type ScheduleFrequency = "daily" | "weekly" | "monthly" | "quarterly"
type ScheduleStatus = "active" | "paused"
type DeliveryStatus = "sent" | "failed" | "pending"
type ReportFormat = "PDF" | "Excel"

interface ScheduledReport {
  id: string
  name: string
  reportTemplate: string
  frequency: ScheduleFrequency
  nextDelivery: string
  lastDelivery: string | null
  lastStatus: DeliveryStatus | null
  recipients: string[]
  format: ReportFormat
  status: ScheduleStatus
}

const scheduled: ScheduledReport[] = [
  { id: "SCH-001", name: "Informe Ejecutivo Mensual", reportTemplate: "KPIs de Cumplimiento Mensual", frequency: "monthly", nextDelivery: "01 Abr 2026", lastDelivery: "01 Mar 2026", lastStatus: "sent", recipients: ["direccion@empresa.com", "ciso@empresa.com"], format: "PDF", status: "active" },
  { id: "SCH-002", name: "Resumen Semanal de Tareas", reportTemplate: "KPIs de Cumplimiento Mensual", frequency: "weekly", nextDelivery: "16 Mar 2026", lastDelivery: "09 Mar 2026", lastStatus: "sent", recipients: ["compliance@empresa.com"], format: "PDF", status: "active" },
  { id: "SCH-003", name: "Hallazgos Abiertos — Martes", reportTemplate: "Resumen de Hallazgos de Auditoría", frequency: "weekly", nextDelivery: "17 Mar 2026", lastDelivery: "10 Mar 2026", lastStatus: "sent", recipients: ["auditoria@empresa.com", "ciso@empresa.com"], format: "PDF", status: "active" },
  { id: "SCH-004", name: "Estado de Riesgos Trimestral", reportTemplate: "Registro de Riesgos Completo", frequency: "quarterly", nextDelivery: "01 Abr 2026", lastDelivery: "01 Ene 2026", lastStatus: "sent", recipients: ["comite-riesgos@empresa.com"], format: "Excel", status: "active" },
  { id: "SCH-005", name: "Controles PCI DSS Mensual", reportTemplate: "Estado de Controles PCI DSS", frequency: "monthly", nextDelivery: "01 Abr 2026", lastDelivery: "01 Mar 2026", lastStatus: "failed", recipients: ["pagos@empresa.com", "ciso@empresa.com"], format: "PDF", status: "active" },
  { id: "SCH-006", name: "Gap Analysis ISO — Semanal (Pausado)", reportTemplate: "Gap Analysis ISO 27001:2022", frequency: "weekly", nextDelivery: "N/A", lastDelivery: "20 Feb 2026", lastStatus: "sent", recipients: ["iso-team@empresa.com"], format: "PDF", status: "paused" },
  { id: "SCH-007", name: "Daily Digest — Alertas de Seguridad", reportTemplate: "KPIs de Cumplimiento Mensual", frequency: "daily", nextDelivery: "14 Mar 2026", lastDelivery: "13 Mar 2026", lastStatus: "sent", recipients: ["ciso@empresa.com"], format: "PDF", status: "active" },
]

const frequencyConfig: Record<ScheduleFrequency, { label: string; cls: string }> = {
  daily: { label: "Diario", cls: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400" },
  weekly: { label: "Semanal", cls: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400" },
  monthly: { label: "Mensual", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
  quarterly: { label: "Trimestral", cls: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400" },
}

const deliveryStatusConfig: Record<DeliveryStatus, { label: string; cls: string; icon: React.ElementType }> = {
  sent: { label: "Enviado", cls: "text-green-600 dark:text-green-400", icon: CheckCircle2Icon },
  failed: { label: "Error", cls: "text-red-600 dark:text-red-400", icon: XCircleIcon },
  pending: { label: "Pendiente", cls: "text-amber-600 dark:text-amber-400", icon: ClockIcon },
}

const formatConfig: Record<ReportFormat, { cls: string }> = {
  PDF: { cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  Excel: { cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
}

import React from "react"

const activeCount = scheduled.filter(s => s.status === "active").length
const failedLast = scheduled.filter(s => s.lastStatus === "failed").length
const totalRecipients = [...new Set(scheduled.flatMap(s => s.recipients))].length

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[
        { label: "Panel Principal", href: "/" },
        { label: "Informes", href: "/informes" },
        { label: "Informes Programados" },
      ]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">7.3. Informes Programados</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Configuración de entregas automáticas por email: diario, semanal, mensual o trimestral
            </p>
          </div>
          <Button size="sm"><PlusIcon /> Nuevo Envío</Button>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Envíos Activos</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{activeCount}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{scheduled.length - activeCount} pausados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Próximo Envío</CardDescription>
              <CardTitle><span className="text-lg font-bold">Hoy</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Daily Digest — 14 Mar 2026</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Errores Último Ciclo</CardDescription>
              <CardTitle><span className={`text-3xl font-bold ${failedLast > 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>{failedLast}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Envíos fallidos en el último ciclo</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Destinatarios Únicos</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalRecipients}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Direcciones de email configuradas</p>
            </CardContent>
          </Card>
        </div>

        {/* Scheduled list */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Configuración de Envíos</CardTitle>
            <CardDescription className="text-xs">{scheduled.length} informes programados</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40 text-xs text-muted-foreground uppercase tracking-wide">
                    <th className="text-left px-4 py-2.5 font-medium">Nombre</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden md:table-cell">Frecuencia</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden lg:table-cell">Próximo Envío</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden lg:table-cell">Último Envío</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden xl:table-cell">Destinatarios</th>
                    <th className="text-left px-4 py-2.5 font-medium">Formato</th>
                    <th className="text-left px-4 py-2.5 font-medium">Estado</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {scheduled.map((s) => {
                    const freq = frequencyConfig[s.frequency]
                    const fmt = formatConfig[s.format]
                    const lastDel = s.lastStatus ? deliveryStatusConfig[s.lastStatus] : null
                    const LastIcon = lastDel?.icon
                    return (
                      <tr key={s.id} className={`hover:bg-muted/30 transition-colors ${s.status === "paused" ? "opacity-60" : ""}`}>
                        <td className="px-4 py-3 max-w-60">
                          <p className="font-medium text-sm leading-tight truncate">{s.name}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{s.reportTemplate}</p>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className={`${badgeCls} ${freq.cls}`}>{freq.label}</span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <div className="flex items-center gap-1 text-xs">
                            <CalendarIcon className="size-3 text-muted-foreground shrink-0" />
                            <span>{s.nextDelivery}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          {s.lastDelivery && lastDel && LastIcon ? (
                            <div className="flex items-center gap-1 text-xs">
                              <LastIcon className={`size-3.5 shrink-0 ${lastDel.cls}`} />
                              <span>{s.lastDelivery}</span>
                            </div>
                          ) : <span className="text-xs text-muted-foreground">—</span>}
                        </td>
                        <td className="px-4 py-3 hidden xl:table-cell">
                          <div className="flex flex-col gap-0.5">
                            {s.recipients.slice(0, 2).map(r => (
                              <div key={r} className="flex items-center gap-1 text-xs">
                                <MailIcon className="size-3 text-muted-foreground shrink-0" />
                                <span className="truncate max-w-36">{r}</span>
                              </div>
                            ))}
                            {s.recipients.length > 2 && (
                              <span className="text-[10px] text-muted-foreground">+{s.recipients.length - 2} más</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`${badgeCls} ${fmt.cls}`}>{s.format}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`${badgeCls} ${s.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                            {s.status === "active" ? "Activo" : "Pausado"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            {s.status === "active"
                              ? <Button variant="ghost" size="xs"><PauseCircleIcon /> Pausar</Button>
                              : <Button variant="ghost" size="xs"><PlayCircleIcon /> Reanudar</Button>
                            }
                            <Button variant="ghost" size="xs"><Settings2Icon /></Button>
                          </div>
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

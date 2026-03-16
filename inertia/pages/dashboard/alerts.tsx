import {
    AlertTriangleIcon,
    BellIcon,
    CheckCheckIcon,
    CheckCircle2Icon,
    ChevronRightIcon,
    ClockIcon,
    InfoIcon,
    ShieldAlertIcon,
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
import { severityConfig } from "~/lib/compliance_ui"

type Severity = "critical" | "high" | "medium" | "info"

interface Alert {
  id: number
  title: string
  description: string
  severity: Severity
  time: string
  read: boolean
  source: string
}

const activeAlerts: Alert[] = [
  {
    id: 1,
    title: "Brecha de seguridad detectada",
    description:
      "Se detectó acceso no autorizado al sistema de gestión documental desde una IP externa. Se han bloqueado automáticamente 3 intentos de acceso. Notificación en curso al CERT-MX conforme al art. 20 LFPDPPP.",
    severity: "critical",
    time: "Hace 15 minutos",
    read: false,
    source: "SIEM · Sistema de Detección",
  },
  {
    id: 2,
    title: "3 controles ISO 27001 han vencido",
    description:
      "Los controles A.12.1.2, A.12.6.1 y A.14.2.1 superaron su fecha de revisión. Se requiere acción del responsable asignado antes de la auditoría del 21 de marzo.",
    severity: "high",
    time: "Hace 2 horas",
    read: false,
    source: "Motor de Cumplimiento",
  },
  {
    id: 3,
    title: "8 tareas han vencido sin completar",
    description:
      "Existen tareas asignadas a distintos colaboradores que superaron su fecha límite. Revisa el módulo de Tareas y reasigna si es necesario.",
    severity: "high",
    time: "Hace 4 horas",
    read: false,
    source: "Gestor de Tareas",
  },
  {
    id: 4,
    title: "Auditoría externa ISO 27001 en 5 días",
    description:
      "La auditoría de certificación ISO 27001 programada para el 21 de marzo requiere que se suban las evidencias pendientes antes del 19 de marzo. Despacho Galindo & Asociados — auditores acreditados.",
    severity: "medium",
    time: "Hoy, 09:00",
    read: false,
    source: "Módulo de Auditorías",
  },
  {
    id: 5,
    title: "Aviso de Privacidad requiere actualización",
    description:
      "El Aviso de Privacidad corporativo (DOC-PRIV-003) debe actualizarse para reflejar los cambios a los Lineamientos del INAI publicados en el DOF el 10 de marzo de 2026. Fecha límite interna: 22 de marzo.",
    severity: "medium",
    time: "Hoy, 08:30",
    read: false,
    source: "Gestión Documental · LFPDPPP",
  },
  {
    id: 6,
    title: "NOM-035-STPS: evaluación pendiente",
    description:
      "Conforme al art. 9 de la NOM-035-STPS-2018, la evaluación anual de factores de riesgo psicosocial debe realizarse antes del 30 de abril. Se han completado 51 de 80 controles.",
    severity: "info",
    time: "Ayer, 14:20",
    read: false,
    source: "Biblioteca Normativa · STPS",
  },
]

const readHistory: Alert[] = [
  {
    id: 7,
    title: "Control PCI DSS 6.3.2 vencido – resuelto",
    description:
      "El control de inventario de componentes de software ha sido actualizado por Ing. María González (Seguridad TI).",
    severity: "high",
    time: "08 Mar 2026",
    read: true,
    source: "Motor de Cumplimiento",
  },
  {
    id: 8,
    title: "Evaluación de riesgos Q1 completada",
    description: "Lic. Carlos Ramírez marcó como completada la evaluación de riesgos del Q1 2026.",
    severity: "info",
    time: "07 Mar 2026",
    read: true,
    source: "Gestor de Tareas",
  },
  {
    id: 9,
    title: "Informe de cumplimiento Q4 generado",
    description:
      "El informe trimestral Q4 2025 fue generado y está disponible en la biblioteca de informes.",
    severity: "info",
    time: "05 Mar 2026",
    read: true,
    source: "Módulo de Informes",
  },
]

function SeverityIcon({ severity, className }: { severity: Severity; className?: string }) {
  const cls = `size-5 shrink-0 ${severityConfig[severity].iconCls} ${className ?? ""}`
  if (severity === "critical") return <XCircleIcon className={cls} />
  if (severity === "high") return <AlertTriangleIcon className={cls} />
  if (severity === "medium") return <ShieldAlertIcon className={cls} />
  return <InfoIcon className={cls} />
}

export default function Page() {
  const criticalCount = activeAlerts.filter((a) => a.severity === "critical").length
  const highCount = activeAlerts.filter((a) => a.severity === "high").length
  const mediumCount = activeAlerts.filter((a) => a.severity === "medium").length
  const infoCount = activeAlerts.filter((a) => a.severity === "info").length

  return (
    <>
      <PageHeader crumbs={[{ label: "Panel Principal", href: "/" }, { label: "Alertas y Notificaciones" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Alertas y Notificaciones</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Centro de mensajes del sistema · {activeAlerts.length} alertas sin leer
            </p>
          </div>
          <Button variant="outline" size="sm">
            <CheckCheckIcon />
            Marcar todo como leído
          </Button>
        </div>

        {/* Severity summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-red-200 dark:border-red-900 bg-red-50/40 dark:bg-red-950/10">
            <CardHeader>
              <CardDescription className="text-red-600 dark:text-red-400">Críticas</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {criticalCount}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-red-600/70 dark:text-red-400/70">
                Requieren acción inmediata
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-900 bg-orange-50/40 dark:bg-orange-950/10">
            <CardHeader>
              <CardDescription className="text-orange-600 dark:text-orange-400">
                Alta Prioridad
              </CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {highCount}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-orange-600/70 dark:text-orange-400/70">
                Atender en menos de 24h
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Media Prioridad</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {mediumCount}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Atender esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Informativas</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {infoCount}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Sin acción requerida</p>
            </CardContent>
          </Card>
        </div>

        {/* Active alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BellIcon className="size-4" />
              <CardTitle>Alertas Activas</CardTitle>
            </div>
            <CardDescription>Notificaciones sin leer que requieren tu atención</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeAlerts.map((alert) => {
              const cfg = severityConfig[alert.severity]
              return (
                <div
                  key={alert.id}
                  className={`flex gap-4 rounded-lg border p-4 ${cfg.bg} ${cfg.border}`}
                >
                  <SeverityIcon severity={alert.severity} className="mt-0.5" />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold leading-tight">{alert.title}</p>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${cfg.cls}`}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {alert.description}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <ClockIcon className="size-3" />
                        <span>{alert.time}</span>
                        <span>·</span>
                        <span>{alert.source}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button variant="outline" size="xs">
                          Ver detalle
                          <ChevronRightIcon />
                        </Button>
                        <Button variant="ghost" size="icon-xs" title="Marcar como leída">
                          <CheckCircle2Icon />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Read history */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCheckIcon className="size-4 text-muted-foreground" />
              <CardTitle className="text-muted-foreground">Historial de Notificaciones</CardTitle>
            </div>
            <CardDescription>Alertas ya revisadas · últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {readHistory.map((alert) => {
              const cfg = severityConfig[alert.severity]
              return (
                <div
                  key={alert.id}
                  className="flex gap-4 rounded-lg border border-border/40 p-4 bg-muted/20 opacity-60 hover:opacity-100 transition-opacity"
                >
                  <SeverityIcon severity={alert.severity} className="mt-0.5 opacity-60" />
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-muted-foreground">{alert.title}</p>
                      <span className="text-xs text-muted-foreground shrink-0">{alert.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground/70 leading-relaxed">
                      {alert.description}
                    </p>
                    <p className="text-xs text-muted-foreground/50">{alert.source}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

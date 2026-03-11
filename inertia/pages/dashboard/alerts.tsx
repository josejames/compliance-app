import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import { SidebarTrigger } from "~/components/ui/sidebar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import {
  AlertTriangleIcon,
  ShieldAlertIcon,
  ClockIcon,
  CheckCircle2Icon,
  XCircleIcon,
  BellIcon,
  CheckCheckIcon,
  ChevronRightIcon,
  InfoIcon,
} from "lucide-react"

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
      "Se detectó acceso no autorizado al sistema de gestión documental desde una IP externa. Se han bloqueado automáticamente 3 intentos de acceso.",
    severity: "critical",
    time: "Hace 15 minutos",
    read: false,
    source: "SIEM · Sistema de Detección",
  },
  {
    id: 2,
    title: "3 controles ISO 27001 han vencido",
    description:
      "Los controles A.12.1.2, A.12.6.1 y A.14.2.1 superaron su fecha de revisión. Se requiere acción del responsable asignado antes de la próxima auditoría.",
    severity: "high",
    time: "Hace 2 horas",
    read: false,
    source: "Motor de Cumplimiento",
  },
  {
    id: 3,
    title: "8 tareas han vencido sin completar",
    description:
      "Existen tareas asignadas a distintos usuarios que superaron su fecha límite. Revisa el módulo de Tareas y reasigna si es necesario.",
    severity: "high",
    time: "Hace 4 horas",
    read: false,
    source: "Gestor de Tareas",
  },
  {
    id: 4,
    title: "Auditoría externa en 5 días",
    description:
      "La auditoría de certificación ISO 27001 programada para el 15 de marzo requiere que se suban las evidencias pendientes antes del 13 de marzo.",
    severity: "medium",
    time: "Hoy, 09:00",
    read: false,
    source: "Módulo de Auditorías",
  },
  {
    id: 5,
    title: "Política de contraseñas por revisar",
    description:
      "La política POL-SEC-001 tiene programada su revisión periódica. Fecha límite: 22 de marzo de 2026.",
    severity: "medium",
    time: "Hoy, 08:30",
    read: false,
    source: "Gestión Documental",
  },
  {
    id: 6,
    title: "Nuevo marco DORA disponible",
    description:
      "Se ha añadido el Reglamento DORA (Digital Operational Resilience Act) a la biblioteca normativa. Puedes iniciar el mapeo de controles.",
    severity: "info",
    time: "Ayer, 14:20",
    read: false,
    source: "Biblioteca Normativa",
  },
]

const readHistory: Alert[] = [
  {
    id: 7,
    title: "Control PCI DSS 6.3.2 vencido – solucionado",
    description:
      "El control de inventario de componentes de software ha sido actualizado por María González.",
    severity: "high",
    time: "08 Mar 2026",
    read: true,
    source: "Motor de Cumplimiento",
  },
  {
    id: 8,
    title: "Evaluación de riesgos Q1 completada",
    description: "Carlos Rodríguez marcó como completada la evaluación de riesgos del Q1 2026.",
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

const severityConfig: Record<
  Severity,
  { bg: string; border: string; badge: string; label: string; iconCls: string }
> = {
  critical: {
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-300 dark:border-red-800",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    label: "Crítico",
    iconCls: "text-red-500",
  },
  high: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-300 dark:border-orange-800",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
    label: "Alto",
    iconCls: "text-orange-500",
  },
  medium: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    label: "Medio",
    iconCls: "text-amber-500",
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
    label: "Informativo",
    iconCls: "text-blue-500",
  },
}

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
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Panel Principal</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Alertas y Notificaciones</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

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
                        className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${cfg.badge}`}
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

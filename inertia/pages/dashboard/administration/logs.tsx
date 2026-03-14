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
  SearchIcon,
  DownloadIcon,
  FilterIcon,
  CheckCircle2Icon,
  XCircleIcon,
  LogInIcon,
  FilePlusIcon,
  FileEditIcon,
  Trash2Icon,
  DownloadCloudIcon,
} from "lucide-react"
import { badgeCls } from "~/lib/compliance_ui"

type LogAction = "login" | "logout" | "create" | "update" | "delete" | "export" | "approve" | "reject"
type LogResult = "success" | "failure"

interface ActivityLog {
  id: string
  timestamp: string
  user: string
  role: string
  action: LogAction
  resource: string
  detail: string
  ip: string
  result: LogResult
}

const logs: ActivityLog[] = [
  { id: "LOG-1142", timestamp: "14 Mar 2026 09:47", user: "Ana García", role: "Cumplimiento", action: "approve", resource: "Política de Contraseñas v3.1", detail: "Aprobación de documento política", ip: "192.168.1.22", result: "success" },
  { id: "LOG-1141", timestamp: "14 Mar 2026 09:35", user: "Carlos Rodríguez", role: "Empleado", action: "create", resource: "Evidencia: Backup-Feb-2026.zip", detail: "Subida de archivo de evidencia", ip: "192.168.1.45", result: "success" },
  { id: "LOG-1140", timestamp: "14 Mar 2026 09:12", user: "Laura Martínez", role: "CISO", action: "update", resource: "Riesgo RSK-014", detail: "Actualización del plan de mitigación", ip: "192.168.1.10", result: "success" },
  { id: "LOG-1139", timestamp: "14 Mar 2026 08:55", user: "Claudia Ruiz", role: "Cumplimiento", action: "login", resource: "—", detail: "Inicio de sesión vía SSO", ip: "192.168.1.30", result: "success" },
  { id: "LOG-1138", timestamp: "14 Mar 2026 08:42", user: "Laura Martínez", role: "CISO", action: "login", resource: "—", detail: "Inicio de sesión vía contraseña", ip: "192.168.1.10", result: "success" },
  { id: "LOG-1137", timestamp: "14 Mar 2026 08:30", user: "Sistema", role: "Sistema", action: "export", resource: "Informe KPIs Mensual PDF", detail: "Generación automática programada", ip: "127.0.0.1", result: "success" },
  { id: "LOG-1136", timestamp: "13 Mar 2026 17:55", user: "Desconocido", role: "—", action: "login", resource: "—", detail: "Intento de acceso con credenciales incorrectas", ip: "185.220.101.12", result: "failure" },
  { id: "LOG-1135", timestamp: "13 Mar 2026 17:30", user: "Pablo Torres", role: "Auditor", action: "login", resource: "—", detail: "Inicio de sesión vía contraseña", ip: "192.168.1.55", result: "success" },
  { id: "LOG-1134", timestamp: "13 Mar 2026 16:10", user: "Ana García", role: "Cumplimiento", action: "create", resource: "Tarea TSK-046", detail: "Creación de tarea recurrente mensual", ip: "192.168.1.22", result: "success" },
  { id: "LOG-1133", timestamp: "13 Mar 2026 15:45", user: "Roberto Admin", role: "Admin", action: "update", resource: "Usuario USR-005 (María González)", detail: "Cambio de rol: Empleado", ip: "192.168.1.5", result: "success" },
  { id: "LOG-1132", timestamp: "13 Mar 2026 14:30", user: "Laura Martínez", role: "CISO", action: "approve", resource: "Flujo WF-006 Fast-Track", detail: "Activación de flujo de aprobación borrador", ip: "192.168.1.10", result: "success" },
  { id: "LOG-1131", timestamp: "13 Mar 2026 12:00", user: "Pablo Torres", role: "Auditor", action: "export", resource: "Hallazgos abiertos — CSV", detail: "Exportación de hallazgos filtrados por estado", ip: "192.168.1.55", result: "success" },
  { id: "LOG-1130", timestamp: "13 Mar 2026 11:20", user: "Carlos Rodríguez", role: "Empleado", action: "delete", resource: "Borrador Evidencia: test-upload.tmp", detail: "Eliminación de archivo temporal", ip: "192.168.1.45", result: "success" },
  { id: "LOG-1129", timestamp: "13 Mar 2026 10:05", user: "Desconocido", role: "—", action: "login", resource: "—", detail: "3 intentos fallidos consecutivos — IP bloqueada", ip: "91.108.4.55", result: "failure" },
  { id: "LOG-1128", timestamp: "13 Mar 2026 09:00", user: "Sistema", role: "Sistema", action: "create", resource: "Tareas recurrentes Semana 11", detail: "Generación automática de 6 tareas recurrentes", ip: "127.0.0.1", result: "success" },
]

const actionConfig: Record<LogAction, { label: string; icon: React.ElementType; cls: string }> = {
  login: { label: "Acceso", icon: LogInIcon, cls: "bg-muted text-muted-foreground" },
  logout: { label: "Cierre", icon: LogInIcon, cls: "bg-muted text-muted-foreground" },
  create: { label: "Creación", icon: FilePlusIcon, cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
  update: { label: "Modificación", icon: FileEditIcon, cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
  delete: { label: "Eliminación", icon: Trash2Icon, cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  export: { label: "Exportación", icon: DownloadCloudIcon, cls: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400" },
  approve: { label: "Aprobación", icon: CheckCircle2Icon, cls: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400" },
  reject: { label: "Rechazo", icon: XCircleIcon, cls: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400" },
}

import React from "react"

const failureCount = logs.filter(l => l.result === "failure").length
const uniqueUsers = [...new Set(logs.filter(l => l.user !== "Sistema" && l.user !== "Desconocido").map(l => l.user))].length

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[
        { label: "Panel Principal", href: "/" },
        { label: "Administración", href: "/administracion" },
        { label: "Registros de Actividad" },
      ]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">8.3. Registros de Actividad</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Traza inalterable de todas las acciones del sistema: quién, qué, cuándo y desde dónde
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><DownloadIcon /> Exportar</Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Eventos Hoy</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{logs.length}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Mostrando últimos {logs.length} registros</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Intentos Fallidos</CardDescription>
              <CardTitle><span className={`text-3xl font-bold ${failureCount > 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>{failureCount}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Accesos denegados o errores</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Usuarios Áctivos Hoy</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{uniqueUsers}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Distintos usuarios con actividad</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Último Evento</CardDescription>
              <CardTitle><span className="text-base font-bold">14 Mar 09:47</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Ana García — Aprobación de política</p></CardContent>
          </Card>
        </div>

        {/* Log table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Historial de Eventos</CardTitle>
              <CardDescription className="text-xs">{logs.length} eventos registrados hoy</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><FilterIcon /> Filtros</Button>
              <Button variant="outline" size="sm"><SearchIcon /> Buscar</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40 text-xs text-muted-foreground uppercase tracking-wide">
                    <th className="text-left px-4 py-2.5 font-medium">Fecha y hora</th>
                    <th className="text-left px-4 py-2.5 font-medium">Usuario</th>
                    <th className="text-left px-4 py-2.5 font-medium">Acción</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden lg:table-cell">Recurso</th>
                    <th className="text-left px-4 py-2.5 font-medium hidden xl:table-cell">IP</th>
                    <th className="text-left px-4 py-2.5 font-medium">Resultado</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {logs.map((log) => {
                    const action = actionConfig[log.action]
                    const ActionIcon = action.icon
                    return (
                      <tr key={log.id} className={`hover:bg-muted/30 transition-colors ${log.result === "failure" ? "bg-red-50/50 dark:bg-red-950/10" : ""}`}>
                        <td className="px-4 py-3 text-xs whitespace-nowrap">
                          <p className="font-mono">{log.timestamp}</p>
                          <p className="text-muted-foreground font-mono">{log.id}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium">{log.user}</p>
                          <p className="text-xs text-muted-foreground">{log.role}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <ActionIcon className="size-3.5 shrink-0 text-muted-foreground" />
                            <span className={`${badgeCls} ${action.cls}`}>{action.label}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 max-w-52 truncate">{log.detail}</p>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell text-xs max-w-52">
                          <p className="truncate">{log.resource}</p>
                        </td>
                        <td className="px-4 py-3 hidden xl:table-cell">
                          <p className="text-xs font-mono text-muted-foreground">{log.ip}</p>
                        </td>
                        <td className="px-4 py-3">
                          {log.result === "success"
                            ? <CheckCircle2Icon className="size-4 text-green-600 dark:text-green-400" />
                            : <XCircleIcon className="size-4 text-red-600 dark:text-red-400" />
                          }
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

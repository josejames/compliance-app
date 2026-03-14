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
  RefreshCwIcon,
  Settings2Icon,
  CheckCircle2Icon,
  XCircleIcon,
  AlertCircleIcon,
  CalendarIcon,
} from "lucide-react"
import { badgeCls } from "~/lib/compliance_ui"

type IntegrationStatus = "connected" | "disconnected" | "error"
type IntegrationCategory = "identity" | "ticketing" | "communication" | "storage" | "monitoring"

interface Integration {
  id: string
  name: string
  vendor: string
  category: IntegrationCategory
  description: string
  status: IntegrationStatus
  lastSync: string | null
  syncFrequency: string
  usedFor: string
}

const integrations: Integration[] = [
  { id: "INT-001", name: "Azure Active Directory", vendor: "Microsoft", category: "identity", description: "Sincronización de usuarios, grupos y SSO mediante SAML 2.0 / OIDC.", status: "connected", lastSync: "14 Mar 2026 09:00", syncFrequency: "Cada hora", usedFor: "Autenticación, importación de usuarios" },
  { id: "INT-002", name: "SMTP / SendGrid", vendor: "SendGrid", category: "communication", description: "Envío de notificaciones, alertas y reportes programados por email.", status: "connected", lastSync: "14 Mar 2026 08:30", syncFrequency: "Tiempo real", usedFor: "Notificaciones, informes programados" },
  { id: "INT-003", name: "Jira Software", vendor: "Atlassian", category: "ticketing", description: "Sincronización bidireccional de tareas y hallazgos como issues de Jira.", status: "connected", lastSync: "14 Mar 2026 07:45", syncFrequency: "Cada 15 min", usedFor: "Gestión de tareas, hallazgos" },
  { id: "INT-004", name: "Slack", vendor: "Salesforce", category: "communication", description: "Publicación de alertas críticas y notificaciones de flujos de aprobación en canales de Slack.", status: "error", lastSync: "13 Mar 2026 18:20", syncFrequency: "Tiempo real", usedFor: "Alertas, aprobaciones urgentes" },
  { id: "INT-005", name: "SharePoint / OneDrive", vendor: "Microsoft", category: "storage", description: "Almacenamiento y sincronización de políticas y evidencias en repositorios corporativos.", status: "connected", lastSync: "14 Mar 2026 06:00", syncFrequency: "Diaria", usedFor: "Repositorio de documentos y evidencias" },
  { id: "INT-006", name: "Splunk SIEM", vendor: "Splunk", category: "monitoring", description: "Importación de alertas de seguridad y eventos de SIEM para correlación con controles.", status: "disconnected", lastSync: null, syncFrequency: "En tiempo real", usedFor: "Alertas de seguridad, logs" },
  { id: "INT-007", name: "ServiceNow", vendor: "ServiceNow", category: "ticketing", description: "Integración con ITSM para vincular incidentes de seguridad con hallazgos de auditoría.", status: "disconnected", lastSync: null, syncFrequency: "Cada 30 min", usedFor: "Incidentes, CMDB" },
]

const statusConfig: Record<IntegrationStatus, { label: string; cls: string; icon: React.ElementType }> = {
  connected: { label: "Conectado", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400", icon: CheckCircle2Icon },
  disconnected: { label: "Desconectado", cls: "bg-muted text-muted-foreground", icon: XCircleIcon },
  error: { label: "Error", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", icon: AlertCircleIcon },
}

const categoryConfig: Record<IntegrationCategory, { label: string; cls: string }> = {
  identity: { label: "Identidad", cls: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400" },
  ticketing: { label: "Ticketing", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
  communication: { label: "Comunicación", cls: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400" },
  storage: { label: "Almacenamiento", cls: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400" },
  monitoring: { label: "Monitorización", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
}

import React from "react"

const connectedCount = integrations.filter(i => i.status === "connected").length
const errorCount = integrations.filter(i => i.status === "error").length
const disconnectedCount = integrations.filter(i => i.status === "disconnected").length

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[
        { label: "Panel Principal", href: "/" },
        { label: "Administración", href: "/administracion" },
        { label: "Integraciones" },
      ]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">8.4. Integraciones</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Configuración y estado de conexiones con herramientas y sistemas externos
            </p>
          </div>
          <Button size="sm"><PlusIcon /> Nueva Integración</Button>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Integraciones</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{integrations.length}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Configuradas en el sistema</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Conectadas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{connectedCount}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Funcionando correctamente</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Con Error</CardDescription>
              <CardTitle><span className={`text-3xl font-bold ${errorCount > 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>{errorCount}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Requieren atención inmediata</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Desconectadas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-muted-foreground">{disconnectedCount}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Pendientes de configurar</p></CardContent>
          </Card>
        </div>

        {/* Integration cards grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {integrations.map((integration) => {
            const status = statusConfig[integration.status]
            const category = categoryConfig[integration.category]
            const StatusIcon = status.icon
            return (
              <Card key={integration.id} className={integration.status === "error" ? "border-red-300 dark:border-red-800" : integration.status === "disconnected" ? "opacity-70" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-muted-foreground">{integration.vendor.slice(0, 2).toUpperCase()}</span>
                      </div>
                      <div>
                        <CardTitle className="text-sm font-semibold">{integration.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{integration.vendor}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex items-center gap-1">
                        <StatusIcon className={`size-3.5 ${integration.status === "connected" ? "text-green-600 dark:text-green-400" : integration.status === "error" ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}`} />
                        <span className={`${badgeCls} ${status.cls}`}>{status.label}</span>
                      </div>
                      <span className={`${badgeCls} ${category.cls}`}>{category.label}</span>
                    </div>
                  </div>
                  <CardDescription className="text-xs mt-1 leading-relaxed">{integration.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground space-y-1 mb-3">
                    <p><span className="font-medium">Usado para:</span> {integration.usedFor}</p>
                    <p><span className="font-medium">Frecuencia:</span> {integration.syncFrequency}</p>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="size-3 shrink-0" />
                      <span><span className="font-medium">Última sincronización:</span> {integration.lastSync ?? "Nunca"}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {integration.status === "connected" && (
                      <Button variant="outline" size="xs" className="flex-1"><RefreshCwIcon /> Sincronizar</Button>
                    )}
                    {integration.status === "error" && (
                      <Button variant="outline" size="xs" className="flex-1 border-red-300 text-red-600 hover:bg-red-50"><RefreshCwIcon /> Reconectar</Button>
                    )}
                    {integration.status === "disconnected" && (
                      <Button size="xs" className="flex-1"><PlusIcon /> Configurar</Button>
                    )}
                    <Button variant="ghost" size="xs"><Settings2Icon /></Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}

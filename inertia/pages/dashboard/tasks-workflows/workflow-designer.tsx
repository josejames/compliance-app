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
  GitBranchIcon,
  UserCheckIcon,
  ArrowRightIcon,
  CopyIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  Settings2Icon,
} from "lucide-react"
import { badgeCls } from "~/lib/compliance_ui"

type FlowStatus = "active" | "draft" | "inactive"
type FlowTrigger = "evidence-upload" | "finding-open" | "policy-submit" | "risk-created" | "task-overdue"

interface ApprovalStep {
  order: number
  role: string
  approver: string
  condition?: string
}

interface ApprovalFlow {
  id: string
  name: string
  description: string
  trigger: FlowTrigger
  status: FlowStatus
  steps: ApprovalStep[]
  usageCount: number
  lastModified: string
}

const flows: ApprovalFlow[] = [
  {
    id: "WF-001",
    name: "Aprobación de Nuevas Políticas",
    description: "Flujo estándar para publicación de políticas internas. Requiere revisión legal y CISO.",
    trigger: "policy-submit",
    status: "active",
    steps: [
      { order: 1, role: "Responsable de Área", approver: "Carlos Rodríguez", condition: "Revisar contenido técnico" },
      { order: 2, role: "Responsable de Cumplimiento", approver: "Ana García", condition: "Validar alineación normativa" },
      { order: 3, role: "CISO", approver: "Laura Martínez", condition: "Aprobación final" },
    ],
    usageCount: 12,
    lastModified: "05 Mar 2026",
  },
  {
    id: "WF-002",
    name: "Cierre de Hallazgos Críticos",
    description: "Proceso de cierre para no conformidades críticas. Incluye verificación de evidencias.",
    trigger: "finding-open",
    status: "active",
    steps: [
      { order: 1, role: "Owner del Hallazgo", approver: "Responsable asignado", condition: "Subir evidencia de remediación" },
      { order: 2, role: "Auditor Interno", approver: "Pablo Torres", condition: "Verificar cierre técnico" },
      { order: 3, role: "Responsable de Cumplimiento", approver: "Ana García", condition: "Aprobación de cierre formal" },
    ],
    usageCount: 6,
    lastModified: "10 Mar 2026",
  },
  {
    id: "WF-003",
    name: "Validación de Evidencias SOC 2",
    description: "Flujo de revisión para evidencias suministradas en auditorías SOC 2 Type II.",
    trigger: "evidence-upload",
    status: "active",
    steps: [
      { order: 1, role: "Técnico TI", approver: "Carlos Rodríguez", condition: "Verificar completitud técnica" },
      { order: 2, role: "Responsable de Cumplimiento", approver:"Ana García", condition: "Aprobar para auditores" },
    ],
    usageCount: 28,
    lastModified: "01 Mar 2026",
  },
  {
    id: "WF-004",
    name: "Escalado de Riesgos Altos",
    description: "Escalado automático cuando se crea un riesgo de nivel alto o crítico.",
    trigger: "risk-created",
    status: "active",
    steps: [
      { order: 1, role: "Risk Owner", approver: "Propietario del activo", condition: "Confirmar y evaluar" },
      { order: 2, role: "CISO", approver: "Laura Martínez", condition: "Validar tratamiento propuesto" },
      { order: 3, role: "Comité de Riesgos", approver: "Dirección", condition: "Aprobación del plan de mitigación" },
    ],
    usageCount: 4,
    lastModified: "08 Mar 2026",
  },
  {
    id: "WF-005",
    name: "Revisión de Accesos Trimestrales",
    description: "Flujo de revisión y certificación de accesos privilegiados cada trimestre.",
    trigger: "task-overdue",
    status: "active",
    steps: [
      { order: 1, role: "Responsable de TI", approver: "Carlos Rodríguez", condition: "Revisar y actualizar lista de accesos" },
      { order: 2, role: "CISO", approver: "Laura Martínez", condition: "Certificar revisión completada" },
    ],
    usageCount: 3,
    lastModified: "15 Feb 2026",
  },
  {
    id: "WF-006",
    name: "Aprobación Urgente (Fast-Track)",
    description: "Flujo simplificado de un solo paso para aprobaciones urgentes pre-autorizadas.",
    trigger: "policy-submit",
    status: "draft",
    steps: [
      { order: 1, role: "CISO", approver: "Laura Martínez", condition: "Aprobación directa" },
    ],
    usageCount: 0,
    lastModified: "12 Mar 2026",
  },
  {
    id: "WF-007",
    name: "Onboarding de Nuevo Proveedor",
    description: "Due diligence y aprobación contractual para nuevos proveedores que acceden a datos.",
    trigger: "evidence-upload",
    status: "draft",
    steps: [
      { order: 1, role: "Responsable de Compras", approver: "Elena Sánchez", condition: "Verificar documentación" },
      { order: 2, role: "Legal", approver: "Javier López", condition: "Revisar contrato y DPA" },
      { order: 3, role: "CISO", approver: "Laura Martínez", condition: "Aprobación de seguridad" },
    ],
    usageCount: 0,
    lastModified: "11 Mar 2026",
  },
  {
    id: "WF-008",
    name: "Cierre de Auditoría Interna (Deprecated)",
    description: "Flujo anterior de cierre de auditorías. Reemplazado por WF-002 en Feb 2026.",
    trigger: "finding-open",
    status: "inactive",
    steps: [
      { order: 1, role: "Auditor", approver: "Asignado", condition: "Verificar cierre" },
      { order: 2, role: "Director", approver: "Dirección", condition: "Aprobación final" },
    ],
    usageCount: 18,
    lastModified: "01 Feb 2026",
  },
]

const flowStatusConfig: Record<FlowStatus, { label: string; cls: string }> = {
  active: { label: "Activo", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
  draft: { label: "Borrador", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
  inactive: { label: "Inactivo", cls: "bg-muted text-muted-foreground" },
}

const triggerConfig: Record<FlowTrigger, { label: string; cls: string }> = {
  "evidence-upload": { label: "Subida de evidencia", cls: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400" },
  "finding-open": { label: "Hallazgo abierto", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  "policy-submit": { label: "Envío de política", cls: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400" },
  "risk-created": { label: "Riesgo creado", cls: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400" },
  "task-overdue": { label: "Tarea vencida", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
}

const activeCount = flows.filter(f => f.status === "active").length
const draftCount = flows.filter(f => f.status === "draft").length
const inactiveCount = flows.filter(f => f.status === "inactive").length

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[
        { label: "Panel Principal", href: "/" },
        { label: "Tareas y Flujos de Trabajo", href: "/tareas-workflows" },
        { label: "Diseñador de Flujos" },
      ]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">6.2. Diseñador de Flujos de Aprobación</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Configura secuencias de revisores, condiciones y notificaciones automáticas
            </p>
          </div>
          <Button size="sm">
            <PlusIcon /> Nuevo Flujo
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Flujos</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{flows.length}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Todos los flujos configurados</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Activos</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{activeCount}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Disponibles para ejecutar</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>En Borrador</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{draftCount}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Pendientes de activación</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Inactivos</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-muted-foreground">{inactiveCount}</span></CardTitle>
            </CardHeader>
            <CardContent><p className="text-xs text-muted-foreground">Archivados o deprecados</p></CardContent>
          </Card>
        </div>

        {/* Flow list */}
        <div className="flex flex-col gap-4">
          {flows.map((flow) => {
            const status = flowStatusConfig[flow.status]
            const trigger = triggerConfig[flow.trigger]
            return (
              <Card key={flow.id} className={flow.status === "inactive" ? "opacity-60" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-purple-50 dark:bg-purple-950/30 shrink-0">
                        <GitBranchIcon className="size-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className="text-sm font-semibold">{flow.name}</CardTitle>
                          <span className={`${badgeCls} ${status.cls}`}>{status.label}</span>
                          <span className={`${badgeCls} ${trigger.cls}`}>{trigger.label}</span>
                        </div>
                        <CardDescription className="text-xs mt-1">{flow.description}</CardDescription>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {flow.id} · Modificado {flow.lastModified} · Usado {flow.usageCount} veces
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {flow.status === "active"
                        ? <Button variant="outline" size="xs"><PauseCircleIcon /> Desactivar</Button>
                        : flow.status === "draft"
                          ? <Button variant="outline" size="xs"><PlayCircleIcon /> Activar</Button>
                          : null
                      }
                      <Button variant="ghost" size="xs"><CopyIcon /> Clonar</Button>
                      <Button variant="ghost" size="xs"><Settings2Icon /> Editar</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Steps visualization */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {flow.steps.map((step, idx) => (
                      <div key={step.order} className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 text-xs">
                          <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-[10px] font-bold text-purple-700 dark:text-purple-400 shrink-0">
                            {step.order}
                          </div>
                          <div>
                            <p className="font-medium leading-tight">{step.role}</p>
                            <p className="text-muted-foreground text-[10px]">{step.approver}</p>
                          </div>
                          <UserCheckIcon className="size-3.5 text-muted-foreground ml-1" />
                        </div>
                        {idx < flow.steps.length - 1 && (
                          <ArrowRightIcon className="size-3.5 text-muted-foreground shrink-0" />
                        )}
                      </div>
                    ))}
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

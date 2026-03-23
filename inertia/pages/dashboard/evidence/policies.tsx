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
  BookOpenIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  CalendarIcon,
  ChevronRightIcon,
  FileTextIcon,
  ShieldCheckIcon,
} from "lucide-react"
import { badgeCls } from "~/lib/compliance_ui"
import { PolicySheet } from "~/components/sheets"

type PolicyStatus = "active" | "review-due" | "overdue" | "draft" | "retired"
type PolicyCategory =
  | "Seguridad TI"
  | "Privacidad"
  | "Accesos"
  | "Continuidad"
  | "Operaciones"
  | "RRHH"
  | "Legal"

interface Policy {
  id: string
  title: string
  category: PolicyCategory
  frameworks: string[]
  owner: string
  approvedBy: string
  effectiveDate: string
  reviewDate: string
  version: string
  status: PolicyStatus
  daysUntilReview: number
  description: string
}

const policies: Policy[] = [
  { id: "POL-001", title: "Política de Seguridad de la Información", category: "Seguridad TI", frameworks: ["ISO 27001", "SOC 2"], owner: "Carlos Rodríguez", approvedBy: "CISO", effectiveDate: "01 Ene 2026", reviewDate: "01 Ene 2027", version: "v3.2", status: "active", daysUntilReview: 294, description: "Política maestra de seguridad que establece los principios y requisitos generales para la protección de activos de información." },
  { id: "POL-002", title: "Política de Control de Accesos", category: "Accesos", frameworks: ["ISO 27001", "PCI DSS"], owner: "Carlos Rodríguez", approvedBy: "CISO", effectiveDate: "15 Mar 2025", reviewDate: "21 Mar 2026", version: "v2.4", status: "review-due", daysUntilReview: 8, description: "Define los principios de mínimo privilegio, segregación de funciones y gestión del ciclo de vida de credenciales." },
  { id: "POL-003", title: "Política de Gestión de Incidentes", category: "Seguridad TI", frameworks: ["ISO 27001", "NIS2"], owner: "Laura Martínez", approvedBy: "CISO", effectiveDate: "20 Mar 2025", reviewDate: "28 Mar 2026", version: "v2.1", status: "review-due", daysUntilReview: 15, description: "Procedimiento de detección, clasificación, respuesta y notificación de incidentes de seguridad." },
  { id: "POL-004", title: "Política de Cifrado y Gestión de Claves", category: "Seguridad TI", frameworks: ["ISO 27001", "PCI DSS"], owner: "Pablo Torres", approvedBy: "CISO", effectiveDate: "13 Abr 2025", reviewDate: "04 Abr 2026", version: "v1.5", status: "review-due", daysUntilReview: 22, description: "Estándares de cifrado en reposo y en tránsito, gestión de claves criptográficas y certificados." },
  { id: "POL-005", title: "Política de Privacidad y Protección de Datos", category: "Privacidad", frameworks: ["GDPR", "ISO 27001"], owner: "Ana García", approvedBy: "DPO", effectiveDate: "01 Feb 2026", reviewDate: "01 Feb 2027", version: "v4.0", status: "active", daysUntilReview: 326, description: "Derechos de los interesados, bases legales de tratamiento, transferencias internacionales y gestión de consentimientos." },
  { id: "POL-006", title: "Política de Gestión de Riesgos", category: "Operaciones", frameworks: ["ISO 27001", "ISO 9001"], owner: "Javier López", approvedBy: "CRO", effectiveDate: "15 Feb 2026", reviewDate: "15 Feb 2027", version: "v2.0", status: "active", daysUntilReview: 338, description: "Metodología de identificación, evaluación, tratamiento y monitorización de riesgos corporativos." },
  { id: "POL-007", title: "Política de Gestión de Proveedores", category: "Legal", frameworks: ["ISO 27001", "GDPR"], owner: "Ana García", approvedBy: "Legal", effectiveDate: "01 Mar 2026", reviewDate: "01 Mar 2027", version: "v1.3", status: "active", daysUntilReview: 352, description: "Due diligence, contratos, DPAs y monitorización continua de terceros con acceso a sistemas críticos." },
  { id: "POL-008", title: "Plan de Continuidad de Negocio (BCP)", category: "Continuidad", frameworks: ["ISO 27001", "SOC 2"], owner: "Elena Sánchez", approvedBy: "COO", effectiveDate: "10 Ene 2026", reviewDate: "10 Ene 2027", version: "v3.0", status: "active", daysUntilReview: 303, description: "Estrategias de recuperación, RPO/RTO por sistema crítico y pruebas anuales obligatorias." },
  { id: "POL-009", title: "Política de Uso Aceptable de TI", category: "RRHH", frameworks: ["ISO 27001"], owner: "María González", approvedBy: "CISO", effectiveDate: "01 Ene 2026", reviewDate: "01 Ene 2027", version: "v2.2", status: "active", daysUntilReview: 294, description: "Normas de uso de dispositivos corporativos, Internet, correo electrónico y activos de TI." },
  { id: "POL-010", title: "Política de Gestión de Cambios", category: "Operaciones", frameworks: ["ISO 27001", "ISO 9001"], owner: "Javier López", approvedBy: "CTO", effectiveDate: "01 Feb 2025", reviewDate: "05 Feb 2026", version: "v1.4", status: "overdue", daysUntilReview: -36, description: "Proceso CAB, tipos de cambio, formularios de autorización y gestión de emergencias." },
  { id: "POL-011", title: "Política de Clasificación de Información", category: "Seguridad TI", frameworks: ["ISO 27001", "GDPR"], owner: "Carlos Rodríguez", approvedBy: "CISO", effectiveDate: "01 Mar 2025", reviewDate: "01 Jun 2026", version: "v2.0", status: "active", daysUntilReview: 80, description: "Niveles de clasificación (Público, Interno, Confidencial, Secreto) y controles asociados." },
  { id: "POL-012", title: "Política de Seguridad en el Desarrollo", category: "Seguridad TI", frameworks: ["ISO 27001", "PCI DSS"], owner: "Pablo Torres", approvedBy: "CTO", effectiveDate: "01 Abr 2026", reviewDate: "01 Abr 2027", version: "v1.0", status: "draft", daysUntilReview: 384, description: "SSDLC, revisiones de código, gestión de dependencias y pruebas de seguridad en CI/CD." },
]

const statusConfig: Record<PolicyStatus, { label: string; cls: string; icon: typeof CheckCircle2Icon }> = {
  active: { label: "Vigente", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400", icon: CheckCircle2Icon },
  "review-due": { label: "Revisión próxima", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400", icon: ClockIcon },
  overdue: { label: "Vencida", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", icon: XCircleIcon },
  draft: { label: "Borrador", cls: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", icon: FileTextIcon },
  retired: { label: "Retirada", cls: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500", icon: XCircleIcon },
}

const categoryColors: Record<PolicyCategory, string> = {
  "Seguridad TI": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  "Privacidad": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  "Accesos": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  "Continuidad": "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
  "Operaciones": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  "RRHH": "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400",
  "Legal": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
}

const frameworkColors: Record<string, string> = {
  "ISO 27001": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  "SOC 2": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  "GDPR": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  "PCI DSS": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  "ISO 9001": "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
  "NIS2": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
}

const counts = {
  total: policies.length,
  active: policies.filter((p) => p.status === "active").length,
  reviewDue: policies.filter((p) => p.status === "review-due").length,
  overdue: policies.filter((p) => p.status === "overdue").length,
  draft: policies.filter((p) => p.status === "draft").length,
}

export default function Page() {
  const urgent = policies.filter((p) => p.status === "review-due" || p.status === "overdue")
    .sort((a, b) => a.daysUntilReview - b.daysUntilReview)
  const activeAndDraft = policies.filter((p) => p.status === "active" || p.status === "draft")

  return (
    <>
      <PageHeader crumbs={[{ label: "Evidencias y Documentos", href: "/evidencias" }, { label: "Políticas y Procedimientos" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Políticas y Procedimientos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {counts.total} documentos normativos · {counts.reviewDue + counts.overdue} requieren atención
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><DownloadIcon />Exportar</Button>
            <PolicySheet trigger={<Button size="sm"><PlusIcon />Nueva política</Button>} />
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Políticas</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{counts.total}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Documentos normativos registrados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Vigentes</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{counts.active}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="h-2 rounded-full bg-green-500" style={{ width: `${(counts.active / counts.total) * 100}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{Math.round((counts.active / counts.total) * 100)}% del catálogo vigente</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Revisión Próxima</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-amber-600 dark:text-amber-400">{counts.reviewDue}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Requieren revisión en &lt; 30 días</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Vencidas / Borrador</CardDescription>
              <CardTitle>
                <span className="text-3xl font-bold">
                  <span className="text-red-600 dark:text-red-400">{counts.overdue}</span>
                  <span className="text-muted-foreground text-xl mx-1">/</span>
                  <span className="text-slate-500">{counts.draft}</span>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Sin revisar · pendientes aprobación</p>
            </CardContent>
          </Card>
        </div>

        {/* Urgent review needed */}
        {urgent.length > 0 && (
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangleIcon className="size-4 text-amber-500" />
                <CardTitle className="text-base text-amber-700 dark:text-amber-400">Requieren Revisión</CardTitle>
              </div>
              <CardDescription className="text-xs mt-0.5">
                {urgent.length} políticas con fecha de revisión próxima o vencida
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-amber-100 dark:divide-amber-900/40">
                {urgent.map((p) => {
                  const st = statusConfig[p.status]
                  const StIcon = st.icon
                  return (
                    <div key={p.id} className="flex items-center justify-between px-6 py-3 bg-amber-50/40 dark:bg-amber-950/10 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors">
                      <div className="flex items-start gap-3 min-w-0">
                        <BookOpenIcon className="size-4 shrink-0 mt-0.5 text-amber-500" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-tight">{p.title}</p>
                          <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1"><UserIcon className="size-3" />{p.owner}</span>
                            <span className="flex items-center gap-1"><CalendarIcon className="size-3" />Revisión: {p.reviewDate}</span>
                            <span className="font-mono">{p.version}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span className={`${badgeCls} ${st.cls} flex items-center gap-1`}>
                          <StIcon className="size-3" />{st.label}
                        </span>
                        <span className={`${badgeCls} ${p.daysUntilReview < 0 ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"}`}>
                          {p.daysUntilReview < 0 ? `${Math.abs(p.daysUntilReview)}d vencida` : `${p.daysUntilReview}d`}
                        </span>
                        <Button variant="outline" size="sm">Revisar <ChevronRightIcon /></Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All policies table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Catálogo de Políticas</CardTitle>
                <CardDescription className="text-xs mt-0.5">Todos los documentos normativos con su estado de vigencia</CardDescription>
              </div>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2 size-4 text-muted-foreground" />
                <input
                  className="h-8 w-56 rounded-md border border-input bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Buscar política..."
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">ID</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Política</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Categoría</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Marcos</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Responsable</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Vigencia</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Próxima revisión</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {policies.map((p) => {
                    const st = statusConfig[p.status]
                    const StIcon = st.icon
                    const catCls = categoryColors[p.category]
                    return (
                      <tr key={p.id} className="hover:bg-muted/40 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-start gap-2">
                            <ShieldCheckIcon className="size-4 shrink-0 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="font-medium leading-tight">{p.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5 max-w-xs leading-relaxed">{p.description}</p>
                              <span className="text-[10px] font-mono text-muted-foreground">{p.version}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`${badgeCls} ${catCls}`}>{p.category}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 flex-wrap">
                            {p.frameworks.map(fw => (
                              <span key={fw} className={`${badgeCls} text-[10px] ${frameworkColors[fw] ?? "bg-slate-100 text-slate-700"}`}>{fw}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{p.owner}</td>
                        <td className="px-4 py-3">
                          <div className="text-xs text-muted-foreground">
                            <div className="flex items-center gap-1"><CalendarIcon className="size-3" />{p.effectiveDate}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-xs text-muted-foreground">
                            <div className="flex items-center gap-1"><CalendarIcon className="size-3" />{p.reviewDate}</div>
                            {p.daysUntilReview <= 30 && (
                              <span className={`mt-0.5 inline-block ${badgeCls} text-[10px] ${p.daysUntilReview < 0 ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"}`}>
                                {p.daysUntilReview < 0 ? `${Math.abs(p.daysUntilReview)}d vencida` : `en ${p.daysUntilReview}d`}
                              </span>
                            )}
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

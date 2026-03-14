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
  CheckCircle2Icon,
  XCircleIcon,
  MinusCircleIcon,
  ClockIcon,
  CalendarIcon,
  ShieldCheckIcon,
  FlaskConicalIcon,
  EyeIcon,
  MessageSquareIcon,
  TestTubesIcon,
  ActivityIcon,
} from "lucide-react"
import { badgeCls, scoreBgCls } from "~/lib/compliance_ui"

type TestMethod = "examination" | "interview" | "observation" | "test" | "automated"
type TestResult = "pass" | "fail" | "not-applicable" | "pending"
type TestFrequency = "weekly" | "monthly" | "quarterly" | "annual"

interface TestProgram {
  id: string
  controlRef: string
  title: string
  description: string
  framework: string
  method: TestMethod
  frequency: TestFrequency
  owner: string
  lastRun: string
  lastResult: TestResult
  nextDue: string
  evidence: string
  failureNote?: string
}

const tests: TestProgram[] = [
  { id: "PRU-001", controlRef: "A.8.10", title: "Verificación de cifrado en reposo", description: "Confirmar que todos los volúmenes de almacenamiento tienen AES-256 activo.", framework: "ISO 27001", method: "examination", frequency: "quarterly", owner: "Carlos Rodríguez", lastRun: "15 Ene 2026", lastResult: "fail", nextDue: "15 Abr 2026", evidence: "storage-audit-jan2026.pdf", failureNote: "3 volúmenes sin cifrado detectados en entorno de staging." },
  { id: "PRU-002", controlRef: "A.8.8", title: "Test de penetración de red interna", description: "Evaluación de vulnerabilidades en infraestructura interna mediante pruebas de penetración.", framework: "ISO 27001", method: "test", frequency: "annual", owner: "Pablo Torres", lastRun: "01 Feb 2026", lastResult: "pass", nextDue: "01 Feb 2027", evidence: "pentest-report-2026.pdf" },
  { id: "PRU-003", controlRef: "A.8.18", title: "Revisión de accesos privilegiados", description: "Verificar que los registros de acceso de administradores estén completos y correlacionados.", framework: "ISO 27001", method: "examination", frequency: "monthly", owner: "Laura Martínez", lastRun: "01 Mar 2026", lastResult: "pass", nextDue: "01 Abr 2026", evidence: "priv-access-log-mar2026.xlsx" },
  { id: "PRU-004", controlRef: "A.8.13", title: "Verificación de copias de seguridad", description: "Restaurar backup de muestra para comprobar integridad y tiempo de recuperación.", framework: "ISO 27001", method: "test", frequency: "monthly", owner: "Pablo Torres", lastRun: "28 Feb 2026", lastResult: "pass", nextDue: "28 Mar 2026", evidence: "backup-test-feb2026.pdf" },
  { id: "PRU-005", controlRef: "CC6.8", title: "Análisis de vulnerabilidades en apps", description: "Escaneo automatizado de vulnerabilidades conocidas en aplicaciones web y APIs.", framework: "SOC 2", method: "automated", frequency: "weekly", owner: "Pablo Torres", lastRun: "10 Mar 2026", lastResult: "pass", nextDue: "17 Mar 2026", evidence: "vuln-scan-w10-2026.json" },
  { id: "PRU-006", controlRef: "CC6.1", title: "Revisión de permisos en sistemas cloud", description: "Auditar asignaciones de roles IAM para detectar permisos excesivos o inconsistentes.", framework: "SOC 2", method: "examination", frequency: "quarterly", owner: "Ana García", lastRun: "15 Dic 2025", lastResult: "fail", nextDue: "15 Mar 2026", evidence: "iam-review-dec2025.xlsx", failureNote: "12 cuentas con permisos de administrador no justificados." },
  { id: "PRU-007", controlRef: "Art.39 GDPR", title: "Entrevistas sobre formación GDPR", description: "Entrevistar muestra de empleados para comprobar conocimiento de políticas de privacidad.", framework: "GDPR", method: "interview", frequency: "annual", owner: "María González", lastRun: "15 Nov 2025", lastResult: "pass", nextDue: "15 Nov 2026", evidence: "gdpr-training-interviews-nov2025.pdf" },
  { id: "PRU-008", controlRef: "Art.28 GDPR", title: "Revisión de contratos DPA con terceros", description: "Verificar que todos los proveedores que tratan datos personales tienen DPA firmado y vigente.", framework: "GDPR", method: "examination", frequency: "annual", owner: "Ana García", lastRun: "20 Ene 2026", lastResult: "pass", nextDue: "20 Ene 2027", evidence: "dpa-register-2026.xlsx" },
  { id: "PRU-009", controlRef: "Req.6.4", title: "Test de seguridad en tablero de pago", description: "Comprobación de que las aplicaciones de captura de pago superan OWASP Top 10.", framework: "PCI DSS", method: "test", frequency: "quarterly", owner: "Javier López", lastRun: "15 Feb 2026", lastResult: "fail", nextDue: "15 May 2026", evidence: "pci-app-test-feb2026.pdf", failureNote: "Detectada vulnerabilidad XSS en formulario de checkout." },
  { id: "PRU-010", controlRef: "Req.1.2", title: "Verificación de segmentación de red PCI", description: "Confirmar que el CDE está aislado de la red corporativa mediante prueba de escaneo.", framework: "PCI DSS", method: "test", frequency: "annual", owner: "Pablo Torres", lastRun: "10 Dic 2025", lastResult: "fail", nextDue: "10 Dic 2026", evidence: "network-seg-test-dec2025.pdf", failureNote: "Brecha detectada entre VLAN-10 y VLAN-30." },
  { id: "PRU-011", controlRef: "A.8.32", title: "Control de cambios en producción", description: "Observar proceso de despliegue para confirmar aprobación CAB y trazabilidad completa.", framework: "ISO 27001", method: "observation", frequency: "quarterly", owner: "Javier López", lastRun: "20 Ene 2026", lastResult: "pass", nextDue: "20 Abr 2026", evidence: "change-obs-jan2026.pdf" },
  { id: "PRU-012", controlRef: "A.5.22", title: "Revisión de SLAs de proveedores", description: "Verificar que los SLAs de proveedores críticos están vigentes y se revisan anualmente.", framework: "ISO 27001", method: "examination", frequency: "annual", owner: "Elena Sánchez", lastRun: "10 Feb 2026", lastResult: "pass", nextDue: "10 Feb 2027", evidence: "vendor-sla-review-2026.xlsx" },
]

const methodConfig: Record<TestMethod, { label: string; icon: typeof FlaskConicalIcon; cls: string }> = {
  examination: { label: "Examinación", icon: SearchIcon, cls: "text-blue-500" },
  interview: { label: "Entrevista", icon: MessageSquareIcon, cls: "text-purple-500" },
  observation: { label: "Observación", icon: EyeIcon, cls: "text-amber-500" },
  test: { label: "Prueba técnica", icon: TestTubesIcon, cls: "text-emerald-500" },
  automated: { label: "Automatizado", icon: ActivityIcon, cls: "text-sky-500" },
}

const resultConfig: Record<TestResult, { label: string; cls: string; icon: typeof CheckCircle2Icon }> = {
  pass: { label: "Superada", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400", icon: CheckCircle2Icon },
  fail: { label: "Fallida", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", icon: XCircleIcon },
  "not-applicable": { label: "No aplica", cls: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400", icon: MinusCircleIcon },
  pending: { label: "Pendiente", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400", icon: ClockIcon },
}

const frequencyConfig: Record<TestFrequency, string> = {
  weekly: "Semanal",
  monthly: "Mensual",
  quarterly: "Trimestral",
  annual: "Anual",
}

const frameworkColors: Record<string, string> = {
  "ISO 27001": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  "SOC 2": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  "GDPR": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  "PCI DSS": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
}

const counts = {
  total: tests.length,
  pass: tests.filter((t) => t.lastResult === "pass").length,
  fail: tests.filter((t) => t.lastResult === "fail").length,
  frameworks: [...new Set(tests.map((t) => t.framework))].length,
}
const passRate = Math.round((counts.pass / counts.total) * 100)

export default function Page() {
  const failing = tests.filter((t) => t.lastResult === "fail")
  const passing = tests.filter((t) => t.lastResult === "pass")

  return (
    <>
      <PageHeader crumbs={[{ label: "Auditorías y Revisiones", href: "/auditorias" }, { label: "Programas de Pruebas" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Programas de Pruebas</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {counts.total} pruebas de eficacia de controles · {counts.fail} requieren atención
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><DownloadIcon />Exportar</Button>
            <Button size="sm"><PlusIcon />Nueva prueba</Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Tasa de Superación</CardDescription>
              <CardTitle><span className={`text-3xl font-bold ${passRate >= 80 ? "text-green-600 dark:text-green-400" : passRate >= 60 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>{passRate}%</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-2">
                <div className={`h-2 rounded-full ${scoreBgCls(passRate)}`} style={{ width: `${passRate}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{counts.pass} de {counts.total} pruebas superadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Pruebas Fallidas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-red-600 dark:text-red-400">{counts.fail}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Controles que requieren remediación inmediata</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Pruebas Superadas</CardDescription>
              <CardTitle><span className="text-3xl font-bold text-green-600 dark:text-green-400">{counts.pass}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Controles verificados con resultado positivo</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Marcos Cubiertos</CardDescription>
              <CardTitle><span className="text-3xl font-bold">{counts.frameworks}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-1 flex-wrap">
                {[...new Set(tests.map((t) => t.framework))].map(fw => (
                  <span key={fw} className={`${badgeCls} text-[10px] ${frameworkColors[fw] ?? "bg-slate-100 text-slate-700"}`}>{fw}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Failing tests – highlighted */}
        {failing.length > 0 && (
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <XCircleIcon className="size-4 text-red-500" />
                <CardTitle className="text-base text-red-700 dark:text-red-400">Pruebas Fallidas — Requieren Acción</CardTitle>
              </div>
              <CardDescription className="text-xs mt-0.5">{failing.length} controles no superaron la última verificación</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-red-100 dark:divide-red-900/40">
                {failing.map((t) => {
                  const MethodIcon = methodConfig[t.method].icon
                  const fwCls = frameworkColors[t.framework] ?? "bg-slate-100 text-slate-700"
                  return (
                    <div key={t.id} className="px-6 py-3 bg-red-50/50 dark:bg-red-950/10">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <XCircleIcon className="size-4 mt-0.5 text-red-500 shrink-0" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                              <span className={`${badgeCls} text-[10px] ${fwCls}`}>{t.controlRef}</span>
                              <p className="text-sm font-semibold">{t.title}</p>
                            </div>
                            {t.failureNote && (
                              <p className="text-xs text-red-700 dark:text-red-400 mt-1 bg-red-100/60 dark:bg-red-900/20 rounded px-2 py-1">
                                {t.failureNote}
                              </p>
                            )}
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><MethodIcon className={`size-3 ${methodConfig[t.method].cls}`} />{methodConfig[t.method].label}</span>
                              <span className="flex items-center gap-1"><CalendarIcon className="size-3" />Último: {t.lastRun}</span>
                              <span className="flex items-center gap-1"><ClockIcon className="size-3" />Próxima: {t.nextDue}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className={`${badgeCls} ${resultConfig.fail.cls}`}>Fallida</span>
                          <span className={`${badgeCls} ${fwCls}`}>{t.framework}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All tests table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Todas las Pruebas</CardTitle>
                <CardDescription className="text-xs mt-0.5">Procedimientos de verificación de controles por marco normativo</CardDescription>
              </div>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2 size-4 text-muted-foreground" />
                <input
                  className="h-8 w-56 rounded-md border border-input bg-background pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Buscar prueba..."
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
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Prueba / Control</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Marco</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Método</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Frecuencia</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Responsable</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Último resultado</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Próxima ejecución</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {tests.map((t) => {
                    const res = resultConfig[t.lastResult]
                    const ResIcon = res.icon
                    const MethodIcon = methodConfig[t.method].icon
                    const fwCls = frameworkColors[t.framework] ?? "bg-slate-100 text-slate-700"
                    return (
                      <tr key={t.id} className="hover:bg-muted/40 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{t.id}</td>
                        <td className="px-4 py-3">
                          <p className="font-medium leading-tight">{t.title}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`${badgeCls} text-[10px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300`}>{t.controlRef}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-xs">{t.description}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`${badgeCls} ${fwCls}`}>{t.framework}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MethodIcon className={`size-3.5 ${methodConfig[t.method].cls}`} />
                            {methodConfig[t.method].label}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{frequencyConfig[t.frequency]}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{t.owner}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex items-center gap-1 ${badgeCls} ${res.cls}`}>
                              <ResIcon className="size-3" />{res.label}
                            </span>
                            <span className="text-[10px] text-muted-foreground">{t.lastRun}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CalendarIcon className="size-3" />{t.nextDue}
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

        {/* Coverage by framework */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cobertura por Marco Normativo</CardTitle>
            <CardDescription className="text-xs">Distribución y tasa de superación por estándar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...new Set(tests.map((t) => t.framework))].map((fw) => {
                const fwTests = tests.filter((t) => t.framework === fw)
                const fwPass = fwTests.filter((t) => t.lastResult === "pass").length
                const fwRate = Math.round((fwPass / fwTests.length) * 100)
                const fwCls = frameworkColors[fw] ?? "bg-slate-100 text-slate-700"
                return (
                  <div key={fw} className="flex items-center gap-4">
                    <div className="w-28 shrink-0">
                      <span className={`${badgeCls} ${fwCls}`}>{fw}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div className={`h-2 rounded-full ${scoreBgCls(fwRate)}`} style={{ width: `${fwRate}%` }} />
                      </div>
                      <span className={`text-sm font-bold tabular-nums w-10 text-right ${fwRate >= 80 ? "text-green-600 dark:text-green-400" : fwRate >= 60 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>{fwRate}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground w-28 text-right shrink-0">
                      {fwPass}/{fwTests.length} pruebas superadas
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

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
  BuildingIcon,
  PencilIcon,
  GlobeIcon,
  UsersIcon,
  CheckCircle2Icon,
  CalendarIcon,
} from "lucide-react"
import { badgeCls, scoreBgCls } from "~/lib/compliance_ui"

const org = {
  name: "Empresa ABC S.A.",
  industry: "Servicios Financieros",
  size: "201–500 empleados",
  country: "España",
  taxId: "A-12345678",
  website: "www.empresa-abc.com",
  dpo: "Ana García",
  dpoEmail: "dpo@empresa.com",
  ciso: "Laura Martínez",
  cisoEmail: "ciso@empresa.com",
  nextReview: "01 Jun 2026",
  lastUpdated: "10 Ene 2026",
}

const departments = [
  { name: "TI / Seguridad", head: "Carlos Rodríguez", headcount: 12, compliance: 88 },
  { name: "Legal", head: "Javier López", headcount: 5, compliance: 95 },
  { name: "Cumplimiento", head: "Ana García", headcount: 4, compliance: 92 },
  { name: "Auditoría Interna", head: "Pablo Torres", headcount: 3, compliance: 90 },
  { name: "RRHH", head: "María González", headcount: 8, compliance: 75 },
  { name: "Finanzas", head: "Diego Morales", headcount: 10, compliance: 82 },
  { name: "Operaciones", head: "Elena Sánchez", headcount: 20, compliance: 68 },
]

const frameworks = [
  { name: "ISO 27001:2022", scope: "Seguridad de la información", certExpiry: "15 Nov 2026", status: "certified" },
  { name: "SOC 2 Type II", scope: "Sistemas cloud y SaaS", certExpiry: "30 Sep 2026", status: "in-progress" },
  { name: "GDPR", scope: "Protección de datos personales", certExpiry: "Continuo", status: "active" },
  { name: "PCI DSS v4.0", scope: "Procesamiento de pagos", certExpiry: "01 Ago 2026", status: "active" },
  { name: "NIS2", scope: "Infraestructura crítica", certExpiry: "Continuo", status: "in-progress" },
]

const frameworkStatusConfig: Record<string, { label: string; cls: string }> = {
  certified: { label: "Certificado", cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
  "in-progress": { label: "En proceso", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  active: { label: "Activo", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
}

export default function Page() {
  return (
    <>
      <PageHeader crumbs={[
        { label: "Panel Principal", href: "/" },
        { label: "Administración", href: "/administracion" },
        { label: "Configuración de la Organización" },
      ]} />

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">8.2. Configuración de la Organización</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Datos de la empresa, estructura de áreas y marcos normativos activos
            </p>
          </div>
          <Button variant="outline" size="sm"><PencilIcon /> Editar</Button>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">

          {/* Company profile */}
          <Card>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center mb-1">
                <BuildingIcon className="size-5 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-base">{org.name}</CardTitle>
              <CardDescription className="text-xs">{org.industry} · {org.size}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <div>
                  <p className="text-muted-foreground">País</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <GlobeIcon className="size-3 text-muted-foreground" />
                    <span className="font-medium">{org.country}</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">NIF / CIF</p>
                  <p className="font-medium mt-0.5">{org.taxId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Web</p>
                  <p className="font-medium mt-0.5">{org.website}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Última actualización</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <CalendarIcon className="size-3 text-muted-foreground" />
                    <span className="font-medium">{org.lastUpdated}</span>
                  </div>
                </div>
              </div>
              <div className="border-t pt-3 space-y-2 text-xs">
                <div>
                  <p className="text-muted-foreground">DPO (Delegado de Protección de Datos)</p>
                  <p className="font-medium">{org.dpo} · {org.dpoEmail}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">CISO</p>
                  <p className="font-medium">{org.ciso} · {org.cisoEmail}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Próxima revisión del sistema</p>
                  <p className="font-medium">{org.nextReview}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Departments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Departamentos</CardTitle>
              <CardDescription className="text-xs">{departments.length} áreas configuradas</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {departments.map((d) => (
                  <div key={d.name} className="px-4 py-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <p className="text-sm font-medium">{d.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <UsersIcon className="size-3" />
                          <span>{d.head} · {d.headcount} personas</span>
                        </div>
                      </div>
                      <span className="text-sm font-bold">{d.compliance}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${scoreBgCls(d.compliance)}`} style={{ width: `${d.compliance}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active frameworks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Marcos Normativos Activos</CardTitle>
              <CardDescription className="text-xs">{frameworks.length} marcos configurados</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {frameworks.map((f) => {
                  const cfg = frameworkStatusConfig[f.status]
                  return (
                    <div key={f.name} className="px-4 py-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2Icon className="size-4 text-green-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-semibold">{f.name}</p>
                            <p className="text-xs text-muted-foreground">{f.scope}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              <span className="font-medium">Vencimiento:</span> {f.certExpiry}
                            </p>
                          </div>
                        </div>
                        <span className={`${badgeCls} ${cfg.cls} shrink-0`}>{cfg.label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

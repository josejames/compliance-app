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

export default function Page() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Panel Principal</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>1.1. Vista General Ejecutiva</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-6 pt-4">
        <h1 className="text-2xl font-bold tracking-tight">1.1. Vista General Ejecutiva</h1>
        <p className="text-muted-foreground">Resumen ejecutivo del estado de cumplimiento de la organización.</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Resumen de cumplimiento global (porcentaje general).</li>
          <li>Gráfico de cumplimiento por marco normativo (ISO 27001, GDPR, etc.).</li>
          <li>Indicadores clave de riesgo (KRI) en formato de semáforo.</li>
          <li>Calendario de hitos importantes (próximas auditorías, fechas límite de tareas).</li>
        </ul>
      </div>
    </>
  )
}

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
                <BreadcrumbLink href="/normas-controles">Gestión de Normas y Controles</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>2.2. Mapeo de Controles</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-6 pt-4">
        <h1 className="text-2xl font-bold tracking-tight">2.2. Mapeo de Controles</h1>
        <p className="text-muted-foreground">Matriz que relaciona los controles internos de la empresa con los requisitos de diferentes marcos.</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Matriz que relaciona los controles internos de la empresa con los requisitos de los diferentes marcos.</li>
          <li>Funcionalidad de 'vista de cumplimiento múltiple' (ver qué controles sirven para GDPR y SOX a la vez).</li>
        </ul>
      </div>
    </>
  )
}

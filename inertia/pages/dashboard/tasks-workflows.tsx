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
                <BreadcrumbPage>6. Tareas y Flujos de Trabajo</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-6 pt-4">
        <h1 className="text-2xl font-bold tracking-tight">6. Tareas y Flujos de Trabajo</h1>
        <p className="text-muted-foreground">Motor operativo que asigna y da seguimiento a las acciones concretas.</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Gestión de Tareas (6.1).</li>
          <li>Diseñador de Flujos de Aprobación (6.2).</li>
          <li>Tareas Recurrentes (6.3).</li>
        </ul>
      </div>
    </>
  )
}

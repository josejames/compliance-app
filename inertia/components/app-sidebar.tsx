import { Data } from '@generated/data'
import { usePage } from '@inertiajs/react'
import * as React from "react"

import {
  BarChart2Icon,
  BookOpenIcon,
  CheckSquareIcon,
  ClipboardListIcon,
  FolderOpenIcon,
  GalleryVerticalEndIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  ShieldAlertIcon,
} from "lucide-react"
import { NavMain } from "~/components/nav-main"
import { NavUser } from "~/components/nav-user"
import { TeamSwitcher } from "~/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar"

const data = {
  teams: [
    {
      name: "Nexum Servicios Digitales",
      logo: <GalleryVerticalEndIcon />,
      plan: "S.A. de C.V.",
    },
  ],
  navMain: [
    {
      title: "1. Panel Principal",
      url: "/",
      icon: <LayoutDashboardIcon />,
      isActive: true,
      items: [
        { title: "1.1. Vista General Ejecutiva", url: "/vista-general" },
        { title: "1.2. Mis Tareas Pendientes", url: "/mis-tareas", badge: 2 },
        { title: "1.3. Alertas y Notificaciones", url: "/alertas", badge: 3 },
      ],
    },
    {
      title: "2. Gestión de Normas y Controles",
      url: "/normas-controles",
      icon: <BookOpenIcon />,
      items: [
        { title: "Vista general", url: "/normas-controles" },
        { title: "2.1. Biblioteca de Marcos Normativos", url: "/normas-controles/biblioteca" },
        { title: "2.2. Mapeo de Controles", url: "/normas-controles/mapeo" },
        { title: "2.3. Catálogo de Controles Internos", url: "/normas-controles/catalogo" },
      ],
    },
    {
      title: "3. Riesgos",
      url: "/riesgos",
      icon: <ShieldAlertIcon />,
      items: [
        { title: "Vista general", url: "/riesgos" },
        { title: "3.1. Registro de Riesgos", url: "/riesgos/registro" },
        { title: "3.2. Evaluación de Riesgos", url: "/riesgos/evaluacion" },
        { title: "3.3. Plan de Mitigación", url: "/riesgos/mitigacion" },
      ],
    },
    {
      title: "4. Auditorías y Revisiones",
      url: "/auditorias",
      icon: <ClipboardListIcon />,
      items: [
        { title: "Vista general", url: "/auditorias" },
        { title: "4.1. Plan de Auditorías", url: "/auditorias/plan" },
        { title: "4.2. Gestión de Hallazgos", url: "/auditorias/hallazgos" },
        { title: "4.3. Programas de Pruebas", url: "/auditorias/pruebas" },
      ],
    },
    {
      title: "5. Evidencias y Documentos",
      url: "/evidencias",
      icon: <FolderOpenIcon />,
      items: [
        { title: "Vista general", url: "/evidencias" },
        { title: "5.1. Repositorio de Evidencias", url: "/evidencias/repositorio" },
        { title: "5.2. Políticas y Procedimientos", url: "/evidencias/politicas" },
        { title: "5.3. Subida Masiva", url: "/evidencias/subida-masiva" },
      ],
    },
    {
      title: "6. Tareas y Flujos de Trabajo",
      url: "/tareas-workflows",
      icon: <CheckSquareIcon />,
      items: [
        { title: "Vista general", url: "/tareas-workflows" },
        { title: "6.1. Gestión de Tareas", url: "/tareas-workflows/gestion-tareas" },
        { title: "6.2. Diseñador de Flujos de Aprobación", url: "/tareas-workflows/diseno-flujos" },
        { title: "6.3. Tareas Recurrentes", url: "/tareas-workflows/tareas-recurrentes" },
      ],
    },
    {
      title: "7. Informes",
      url: "/informes",
      icon: <BarChart2Icon />,
      items: [
        { title: "Vista general", url: "/informes" },
        { title: "7.1. Biblioteca de Informes Predefinidos", url: "/informes/biblioteca" },
        { title: "7.2. Creador de Informes Personalizados", url: "/informes/creador" },
        { title: "7.3. Informes Programados", url: "/informes/programados" },
      ],
    },
    {
      title: "8. Administración",
      url: "/administracion",
      icon: <Settings2Icon />,
      items: [
        { title: "Vista general", url: "/administracion" },
        { title: "8.1. Gestión de Usuarios y Roles", url: "/administracion/usuarios-roles" },
        { title: "8.2. Configuración de la Organización", url: "/administracion/organizacion" },
        { title: "8.3. Registros de Actividad", url: "/administracion/logs" },
        { title: "8.4. Integraciones", url: "/administracion/integraciones" },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = usePage<Data.SharedProps>().props
  const sidebarUser = {
    name: user?.fullName ?? '',
    email: user?.email ?? '',
    avatar: '',
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

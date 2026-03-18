import { Data } from '@generated/data'
import { usePage } from '@inertiajs/react'
import { ReactElement, useEffect } from 'react'
import { toast, Toaster } from 'sonner'
import { AiCompanion } from '~/components/ai-companion'
import { AppSidebar } from '~/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'

export default function DashboardLayout({ children }: { children: ReactElement<Data.SharedProps> }) {
  useEffect(() => {
    toast.dismiss()
  }, [usePage().url])

  if (children.props.flash.error) {
    toast.error(children.props.flash.error)
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
      <AiCompanion />
      <Toaster position="top-center" richColors />
    </>
  )
}

import { client } from '~/client'
import { ReactElement } from 'react'
import Layout from '~/layouts/default'
import AuthLayout from '~/layouts/auth'
import DashboardLayout from '~/layouts/dashboard'
import { Data } from '@generated/data'
import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      return resolvePageComponent(
        `./pages/${name}.tsx`,
        import.meta.glob('./pages/**/*.tsx', { eager: true }),
        (page: ReactElement<Data.SharedProps>) => {
          if (name.startsWith('auth/')) return <AuthLayout children={page} />
          if (name.startsWith('dashboard/')) return <DashboardLayout children={page} />
          return <Layout children={page} />
        }
      )
    },
    setup: ({ App, props }) => {
      return (
        <TuyauProvider client={client}>
          <App {...props} />
        </TuyauProvider>
      )
    },
  })
}

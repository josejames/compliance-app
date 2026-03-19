import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { Data } from '@generated/data'
import { createInertiaApp } from '@inertiajs/react'
import { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import AuthLayout from '~/layouts/auth'
import DashboardLayout from '~/layouts/dashboard'
import Layout from '~/layouts/default'
import { client } from './client'
import './css/app.css'

const appName = import.meta.env.VITE_APP_NAME || 'LexAI'

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => {
    return resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
      (page: ReactElement<Data.SharedProps>) => {
        if (name.startsWith('auth/')) return <AuthLayout children={page} />
        if (name.startsWith('dashboard/')) return <DashboardLayout children={page} />
        return <Layout children={page} />
      }
    )
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <TuyauProvider client={client}>
        <App {...props} />
      </TuyauProvider>
    )
  },
  progress: {
    color: '#4B5563',
  },
})

import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
    'dashboard/administracion': ExtractProps<(typeof import('../../inertia/pages/dashboard/administracion.tsx'))['default']>
    'dashboard/administracion/integraciones': ExtractProps<(typeof import('../../inertia/pages/dashboard/administracion/integraciones.tsx'))['default']>
    'dashboard/administracion/logs': ExtractProps<(typeof import('../../inertia/pages/dashboard/administracion/logs.tsx'))['default']>
    'dashboard/administracion/organizacion': ExtractProps<(typeof import('../../inertia/pages/dashboard/administracion/organizacion.tsx'))['default']>
    'dashboard/administracion/usuarios-roles': ExtractProps<(typeof import('../../inertia/pages/dashboard/administracion/usuarios-roles.tsx'))['default']>
    'dashboard/alertas': ExtractProps<(typeof import('../../inertia/pages/dashboard/alertas.tsx'))['default']>
    'dashboard/auditorias': ExtractProps<(typeof import('../../inertia/pages/dashboard/auditorias.tsx'))['default']>
    'dashboard/auditorias/hallazgos': ExtractProps<(typeof import('../../inertia/pages/dashboard/auditorias/hallazgos.tsx'))['default']>
    'dashboard/auditorias/plan': ExtractProps<(typeof import('../../inertia/pages/dashboard/auditorias/plan.tsx'))['default']>
    'dashboard/auditorias/pruebas': ExtractProps<(typeof import('../../inertia/pages/dashboard/auditorias/pruebas.tsx'))['default']>
    'dashboard/evidencias': ExtractProps<(typeof import('../../inertia/pages/dashboard/evidencias.tsx'))['default']>
    'dashboard/evidencias/politicas': ExtractProps<(typeof import('../../inertia/pages/dashboard/evidencias/politicas.tsx'))['default']>
    'dashboard/evidencias/repositorio': ExtractProps<(typeof import('../../inertia/pages/dashboard/evidencias/repositorio.tsx'))['default']>
    'dashboard/evidencias/subida-masiva': ExtractProps<(typeof import('../../inertia/pages/dashboard/evidencias/subida-masiva.tsx'))['default']>
    'dashboard/home': ExtractProps<(typeof import('../../inertia/pages/dashboard/home.tsx'))['default']>
    'dashboard/informes': ExtractProps<(typeof import('../../inertia/pages/dashboard/informes.tsx'))['default']>
    'dashboard/informes/biblioteca': ExtractProps<(typeof import('../../inertia/pages/dashboard/informes/biblioteca.tsx'))['default']>
    'dashboard/informes/creador': ExtractProps<(typeof import('../../inertia/pages/dashboard/informes/creador.tsx'))['default']>
    'dashboard/informes/programados': ExtractProps<(typeof import('../../inertia/pages/dashboard/informes/programados.tsx'))['default']>
    'dashboard/mis-tareas': ExtractProps<(typeof import('../../inertia/pages/dashboard/mis-tareas.tsx'))['default']>
    'dashboard/normas-controles': ExtractProps<(typeof import('../../inertia/pages/dashboard/normas-controles.tsx'))['default']>
    'dashboard/normas-controles/biblioteca': ExtractProps<(typeof import('../../inertia/pages/dashboard/normas-controles/biblioteca.tsx'))['default']>
    'dashboard/normas-controles/catalogo': ExtractProps<(typeof import('../../inertia/pages/dashboard/normas-controles/catalogo.tsx'))['default']>
    'dashboard/normas-controles/mapeo': ExtractProps<(typeof import('../../inertia/pages/dashboard/normas-controles/mapeo.tsx'))['default']>
    'dashboard/riesgos': ExtractProps<(typeof import('../../inertia/pages/dashboard/riesgos.tsx'))['default']>
    'dashboard/riesgos/evaluacion': ExtractProps<(typeof import('../../inertia/pages/dashboard/riesgos/evaluacion.tsx'))['default']>
    'dashboard/riesgos/mitigacion': ExtractProps<(typeof import('../../inertia/pages/dashboard/riesgos/mitigacion.tsx'))['default']>
    'dashboard/riesgos/registro': ExtractProps<(typeof import('../../inertia/pages/dashboard/riesgos/registro.tsx'))['default']>
    'dashboard/tareas-workflows': ExtractProps<(typeof import('../../inertia/pages/dashboard/tareas-workflows.tsx'))['default']>
    'dashboard/tareas-workflows/diseno-flujos': ExtractProps<(typeof import('../../inertia/pages/dashboard/tareas-workflows/diseno-flujos.tsx'))['default']>
    'dashboard/tareas-workflows/gestion-tareas': ExtractProps<(typeof import('../../inertia/pages/dashboard/tareas-workflows/gestion-tareas.tsx'))['default']>
    'dashboard/tareas-workflows/tareas-recurrentes': ExtractProps<(typeof import('../../inertia/pages/dashboard/tareas-workflows/tareas-recurrentes.tsx'))['default']>
    'dashboard/vista-general': ExtractProps<(typeof import('../../inertia/pages/dashboard/vista-general.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
  }
}

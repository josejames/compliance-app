/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.on('/').renderInertia('dashboard/home', {}).as('home')

    // 1. Panel Principal - sub-pages
    router.on('/vista-general').renderInertia('dashboard/vista-general', {}).as('vista-general')
    router.on('/mis-tareas').renderInertia('dashboard/mis-tareas', {}).as('mis-tareas')
    router.on('/alertas').renderInertia('dashboard/alertas', {}).as('alertas')

    // 2. Gestión de Normas y Controles
    router
      .on('/normas-controles')
      .renderInertia('dashboard/normas-controles', {})
      .as('normas-controles')
    router
      .on('/normas-controles/biblioteca')
      .renderInertia('dashboard/normas-controles/biblioteca', {})
      .as('normas-controles.biblioteca')
    router
      .on('/normas-controles/mapeo')
      .renderInertia('dashboard/normas-controles/mapeo', {})
      .as('normas-controles.mapeo')
    router
      .on('/normas-controles/catalogo')
      .renderInertia('dashboard/normas-controles/catalogo', {})
      .as('normas-controles.catalogo')

    // 3. Riesgos
    router.on('/riesgos').renderInertia('dashboard/riesgos', {}).as('riesgos')
    router
      .on('/riesgos/registro')
      .renderInertia('dashboard/riesgos/registro', {})
      .as('riesgos.registro')
    router
      .on('/riesgos/evaluacion')
      .renderInertia('dashboard/riesgos/evaluacion', {})
      .as('riesgos.evaluacion')
    router
      .on('/riesgos/mitigacion')
      .renderInertia('dashboard/riesgos/mitigacion', {})
      .as('riesgos.mitigacion')

    // 4. Auditorías y Revisiones
    router.on('/auditorias').renderInertia('dashboard/auditorias', {}).as('auditorias')
    router
      .on('/auditorias/plan')
      .renderInertia('dashboard/auditorias/plan', {})
      .as('auditorias.plan')
    router
      .on('/auditorias/hallazgos')
      .renderInertia('dashboard/auditorias/hallazgos', {})
      .as('auditorias.hallazgos')
    router
      .on('/auditorias/pruebas')
      .renderInertia('dashboard/auditorias/pruebas', {})
      .as('auditorias.pruebas')

    // 5. Evidencias y Documentos
    router.on('/evidencias').renderInertia('dashboard/evidencias', {}).as('evidencias')
    router
      .on('/evidencias/repositorio')
      .renderInertia('dashboard/evidencias/repositorio', {})
      .as('evidencias.repositorio')
    router
      .on('/evidencias/politicas')
      .renderInertia('dashboard/evidencias/politicas', {})
      .as('evidencias.politicas')
    router
      .on('/evidencias/subida-masiva')
      .renderInertia('dashboard/evidencias/subida-masiva', {})
      .as('evidencias.subida-masiva')

    // 6. Tareas y Flujos de Trabajo
    router
      .on('/tareas-workflows')
      .renderInertia('dashboard/tareas-workflows', {})
      .as('tareas-workflows')
    router
      .on('/tareas-workflows/gestion-tareas')
      .renderInertia('dashboard/tareas-workflows/gestion-tareas', {})
      .as('tareas-workflows.gestion-tareas')
    router
      .on('/tareas-workflows/diseno-flujos')
      .renderInertia('dashboard/tareas-workflows/diseno-flujos', {})
      .as('tareas-workflows.diseno-flujos')
    router
      .on('/tareas-workflows/tareas-recurrentes')
      .renderInertia('dashboard/tareas-workflows/tareas-recurrentes', {})
      .as('tareas-workflows.tareas-recurrentes')

    // 7. Informes
    router.on('/informes').renderInertia('dashboard/informes', {}).as('informes')
    router
      .on('/informes/biblioteca')
      .renderInertia('dashboard/informes/biblioteca', {})
      .as('informes.biblioteca')
    router
      .on('/informes/creador')
      .renderInertia('dashboard/informes/creador', {})
      .as('informes.creador')
    router
      .on('/informes/programados')
      .renderInertia('dashboard/informes/programados', {})
      .as('informes.programados')

    // 8. Administración
    router.on('/administracion').renderInertia('dashboard/administracion', {}).as('administracion')
    router
      .on('/administracion/usuarios-roles')
      .renderInertia('dashboard/administracion/usuarios-roles', {})
      .as('administracion.usuarios-roles')
    router
      .on('/administracion/organizacion')
      .renderInertia('dashboard/administracion/organizacion', {})
      .as('administracion.organizacion')
    router
      .on('/administracion/logs')
      .renderInertia('dashboard/administracion/logs', {})
      .as('administracion.logs')
    router
      .on('/administracion/integraciones')
      .renderInertia('dashboard/administracion/integraciones', {})
      .as('administracion.integraciones')
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())

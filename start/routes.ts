/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.on('/').renderInertia('dashboard/home', {}).as('home')

    // 1. Panel Principal - sub-pages
    router
      .on('/vista-general')
      .renderInertia('dashboard/executive-overview', {})
      .as('vista-general')
    router.on('/mis-tareas').renderInertia('dashboard/my-tasks', {}).as('mis-tareas')
    router.on('/alertas').renderInertia('dashboard/alerts', {}).as('alertas')

    // 2. Gestión de Normas y Controles
    router
      .on('/normas-controles')
      .renderInertia('dashboard/standards-controls', {})
      .as('normas-controles')
    router
      .on('/normas-controles/biblioteca')
      .renderInertia('dashboard/standards-controls/library', {})
      .as('normas-controles.biblioteca')
    router
      .on('/normas-controles/mapeo')
      .renderInertia('dashboard/standards-controls/mapping', {})
      .as('normas-controles.mapeo')
    router
      .on('/normas-controles/catalogo')
      .renderInertia('dashboard/standards-controls/catalog', {})
      .as('normas-controles.catalogo')

    // 3. Riesgos
    router.on('/riesgos').renderInertia('dashboard/risks', {}).as('riesgos')
    router
      .on('/riesgos/registro')
      .renderInertia('dashboard/risks/register', {})
      .as('riesgos.registro')
    router
      .on('/riesgos/evaluacion')
      .renderInertia('dashboard/risks/evaluation', {})
      .as('riesgos.evaluacion')
    router
      .on('/riesgos/mitigacion')
      .renderInertia('dashboard/risks/mitigation', {})
      .as('riesgos.mitigacion')

    // 4. Auditorías y Revisiones
    router.on('/auditorias').renderInertia('dashboard/audits', {}).as('auditorias')
    router.on('/auditorias/plan').renderInertia('dashboard/audits/plan', {}).as('auditorias.plan')
    router
      .on('/auditorias/hallazgos')
      .renderInertia('dashboard/audits/findings', {})
      .as('auditorias.hallazgos')
    router
      .on('/auditorias/pruebas')
      .renderInertia('dashboard/audits/tests', {})
      .as('auditorias.pruebas')

    // 5. Evidencias y Documentos
    router.on('/evidencias').renderInertia('dashboard/evidence', {}).as('evidencias')
    router
      .on('/evidencias/repositorio')
      .renderInertia('dashboard/evidence/repository', {})
      .as('evidencias.repositorio')
    router
      .on('/evidencias/politicas')
      .renderInertia('dashboard/evidence/policies', {})
      .as('evidencias.politicas')
    router
      .on('/evidencias/subida-masiva')
      .renderInertia('dashboard/evidence/bulk-upload', {})
      .as('evidencias.subida-masiva')

    // 6. Tareas y Flujos de Trabajo
    router
      .on('/tareas-workflows')
      .renderInertia('dashboard/tasks-workflows', {})
      .as('tareas-workflows')
    router
      .on('/tareas-workflows/gestion-tareas')
      .renderInertia('dashboard/tasks-workflows/task-management', {})
      .as('tareas-workflows.gestion-tareas')
    router
      .on('/tareas-workflows/diseno-flujos')
      .renderInertia('dashboard/tasks-workflows/workflow-designer', {})
      .as('tareas-workflows.diseno-flujos')
    router
      .on('/tareas-workflows/tareas-recurrentes')
      .renderInertia('dashboard/tasks-workflows/recurring-tasks', {})
      .as('tareas-workflows.tareas-recurrentes')

    // 7. Informes
    router.on('/informes').renderInertia('dashboard/reports', {}).as('informes')
    router
      .on('/informes/biblioteca')
      .renderInertia('dashboard/reports/library', {})
      .as('informes.biblioteca')
    router
      .on('/informes/creador')
      .renderInertia('dashboard/reports/creator', {})
      .as('informes.creador')
    router
      .on('/informes/programados')
      .renderInertia('dashboard/reports/scheduled', {})
      .as('informes.programados')

    // 8. Administración
    router.on('/administracion').renderInertia('dashboard/administration', {}).as('administracion')
    router
      .on('/administracion/usuarios-roles')
      .renderInertia('dashboard/administration/users-roles', {})
      .as('administracion.usuarios-roles')
    router
      .on('/administracion/organizacion')
      .renderInertia('dashboard/administration/organization', {})
      .as('administracion.organizacion')
    router
      .on('/administracion/logs')
      .renderInertia('dashboard/administration/logs', {})
      .as('administracion.logs')
    router
      .on('/administracion/integraciones')
      .renderInertia('dashboard/administration/integrations', {})
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

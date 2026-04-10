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
      .get('/normas-controles', [controllers.StandardsControls, 'index'])
      .as('normas-controles')
    router
      .get('/normas-controles/biblioteca', [controllers.Frameworks, 'index'])
      .as('normas-controles.biblioteca')
    router.post('/normas-controles/biblioteca', [controllers.Frameworks, 'store']).as('normas-controles.biblioteca.store')
    router.put('/normas-controles/biblioteca/:id', [controllers.Frameworks, 'update']).as('normas-controles.biblioteca.update')
    router.delete('/normas-controles/biblioteca/:id', [controllers.Frameworks, 'destroy']).as('normas-controles.biblioteca.destroy')
    router
      .get('/normas-controles/mapeo', [controllers.Mapping, 'index'])
      .as('normas-controles.mapeo')
    router
      .post('/normas-controles/mapeo', [controllers.Mapping, 'toggle'])
      .as('normas-controles.mapeo.toggle')
    router.get('/normas-controles/catalogo', [controllers.Controls, 'index']).as('normas-controles.catalogo')
    router.post('/normas-controles/catalogo', [controllers.Controls, 'store']).as('normas-controles.catalogo.store')
    router.put('/normas-controles/catalogo/:id', [controllers.Controls, 'update']).as('normas-controles.catalogo.update')
    router.delete('/normas-controles/catalogo/:id', [controllers.Controls, 'destroy']).as('normas-controles.catalogo.destroy')

    // 3. Riesgos
    router.get('/riesgos', [controllers.Risks, 'index']).as('riesgos')
    router.get('/riesgos/registro', [controllers.Risks, 'register']).as('riesgos.registro')
    router.post('/riesgos', [controllers.Risks, 'store']).as('riesgos.store')
    router.put('/riesgos/:id', [controllers.Risks, 'update']).as('riesgos.update')
    router.delete('/riesgos/:id', [controllers.Risks, 'destroy']).as('riesgos.destroy')
    // 3.2 Evaluación de Riesgos
    router.get('/riesgos/evaluacion', [controllers.RiskEvaluations, 'index']).as('riesgos.evaluacion')
    router.post('/riesgos/evaluacion', [controllers.RiskEvaluations, 'store']).as('riesgos.evaluacion.store')
    router.put('/riesgos/evaluacion/:id', [controllers.RiskEvaluations, 'update']).as('riesgos.evaluacion.update')
    router.delete('/riesgos/evaluacion/:id', [controllers.RiskEvaluations, 'destroy']).as('riesgos.evaluacion.destroy')
    // 3.3 Plan de Mitigación
    router.get('/riesgos/mitigacion', [controllers.MitigationActions, 'index']).as('riesgos.mitigacion')
    router.post('/riesgos/mitigacion', [controllers.MitigationActions, 'store']).as('riesgos.mitigacion.store')
    router.put('/riesgos/mitigacion/:id', [controllers.MitigationActions, 'update']).as('riesgos.mitigacion.update')
    router.delete('/riesgos/mitigacion/:id', [controllers.MitigationActions, 'destroy']).as('riesgos.mitigacion.destroy')

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
      .get('/administracion/usuarios-roles', [controllers.Admin, 'index'])
      .as('administracion.usuarios-roles')
    router
      .put('/administracion/usuarios-roles/:id', [controllers.Admin, 'update'])
      .as('administracion.usuarios-roles.update')
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
    router
      .on('/administracion/proveedores')
      .renderInertia('dashboard/administration/vendors', {})
      .as('administracion.proveedores')
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

import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'vista-general': { paramsTuple?: []; params?: {} }
    'mis-tareas': { paramsTuple?: []; params?: {} }
    'alertas': { paramsTuple?: []; params?: {} }
    'normas-controles': { paramsTuple?: []; params?: {} }
    'normas-controles.biblioteca': { paramsTuple?: []; params?: {} }
    'normas-controles.biblioteca.store': { paramsTuple?: []; params?: {} }
    'normas-controles.biblioteca.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'normas-controles.biblioteca.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'normas-controles.mapeo': { paramsTuple?: []; params?: {} }
    'normas-controles.mapeo.toggle': { paramsTuple?: []; params?: {} }
    'normas-controles.catalogo': { paramsTuple?: []; params?: {} }
    'normas-controles.catalogo.store': { paramsTuple?: []; params?: {} }
    'normas-controles.catalogo.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'normas-controles.catalogo.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'riesgos': { paramsTuple?: []; params?: {} }
    'riesgos.registro': { paramsTuple?: []; params?: {} }
    'riesgos.store': { paramsTuple?: []; params?: {} }
    'riesgos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'riesgos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'riesgos.evaluacion': { paramsTuple?: []; params?: {} }
    'riesgos.mitigacion': { paramsTuple?: []; params?: {} }
    'auditorias': { paramsTuple?: []; params?: {} }
    'auditorias.plan': { paramsTuple?: []; params?: {} }
    'auditorias.hallazgos': { paramsTuple?: []; params?: {} }
    'auditorias.pruebas': { paramsTuple?: []; params?: {} }
    'evidencias': { paramsTuple?: []; params?: {} }
    'evidencias.repositorio': { paramsTuple?: []; params?: {} }
    'evidencias.politicas': { paramsTuple?: []; params?: {} }
    'evidencias.subida-masiva': { paramsTuple?: []; params?: {} }
    'tareas-workflows': { paramsTuple?: []; params?: {} }
    'tareas-workflows.gestion-tareas': { paramsTuple?: []; params?: {} }
    'tareas-workflows.diseno-flujos': { paramsTuple?: []; params?: {} }
    'tareas-workflows.tareas-recurrentes': { paramsTuple?: []; params?: {} }
    'informes': { paramsTuple?: []; params?: {} }
    'informes.biblioteca': { paramsTuple?: []; params?: {} }
    'informes.creador': { paramsTuple?: []; params?: {} }
    'informes.programados': { paramsTuple?: []; params?: {} }
    'administracion': { paramsTuple?: []; params?: {} }
    'administracion.usuarios-roles': { paramsTuple?: []; params?: {} }
    'administracion.usuarios-roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administracion.organizacion': { paramsTuple?: []; params?: {} }
    'administracion.logs': { paramsTuple?: []; params?: {} }
    'administracion.integraciones': { paramsTuple?: []; params?: {} }
    'administracion.proveedores': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'vista-general': { paramsTuple?: []; params?: {} }
    'mis-tareas': { paramsTuple?: []; params?: {} }
    'alertas': { paramsTuple?: []; params?: {} }
    'normas-controles': { paramsTuple?: []; params?: {} }
    'normas-controles.biblioteca': { paramsTuple?: []; params?: {} }
    'normas-controles.mapeo': { paramsTuple?: []; params?: {} }
    'normas-controles.catalogo': { paramsTuple?: []; params?: {} }
    'riesgos': { paramsTuple?: []; params?: {} }
    'riesgos.registro': { paramsTuple?: []; params?: {} }
    'riesgos.evaluacion': { paramsTuple?: []; params?: {} }
    'riesgos.mitigacion': { paramsTuple?: []; params?: {} }
    'auditorias': { paramsTuple?: []; params?: {} }
    'auditorias.plan': { paramsTuple?: []; params?: {} }
    'auditorias.hallazgos': { paramsTuple?: []; params?: {} }
    'auditorias.pruebas': { paramsTuple?: []; params?: {} }
    'evidencias': { paramsTuple?: []; params?: {} }
    'evidencias.repositorio': { paramsTuple?: []; params?: {} }
    'evidencias.politicas': { paramsTuple?: []; params?: {} }
    'evidencias.subida-masiva': { paramsTuple?: []; params?: {} }
    'tareas-workflows': { paramsTuple?: []; params?: {} }
    'tareas-workflows.gestion-tareas': { paramsTuple?: []; params?: {} }
    'tareas-workflows.diseno-flujos': { paramsTuple?: []; params?: {} }
    'tareas-workflows.tareas-recurrentes': { paramsTuple?: []; params?: {} }
    'informes': { paramsTuple?: []; params?: {} }
    'informes.biblioteca': { paramsTuple?: []; params?: {} }
    'informes.creador': { paramsTuple?: []; params?: {} }
    'informes.programados': { paramsTuple?: []; params?: {} }
    'administracion': { paramsTuple?: []; params?: {} }
    'administracion.usuarios-roles': { paramsTuple?: []; params?: {} }
    'administracion.organizacion': { paramsTuple?: []; params?: {} }
    'administracion.logs': { paramsTuple?: []; params?: {} }
    'administracion.integraciones': { paramsTuple?: []; params?: {} }
    'administracion.proveedores': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'vista-general': { paramsTuple?: []; params?: {} }
    'mis-tareas': { paramsTuple?: []; params?: {} }
    'alertas': { paramsTuple?: []; params?: {} }
    'normas-controles': { paramsTuple?: []; params?: {} }
    'normas-controles.biblioteca': { paramsTuple?: []; params?: {} }
    'normas-controles.mapeo': { paramsTuple?: []; params?: {} }
    'normas-controles.catalogo': { paramsTuple?: []; params?: {} }
    'riesgos': { paramsTuple?: []; params?: {} }
    'riesgos.registro': { paramsTuple?: []; params?: {} }
    'riesgos.evaluacion': { paramsTuple?: []; params?: {} }
    'riesgos.mitigacion': { paramsTuple?: []; params?: {} }
    'auditorias': { paramsTuple?: []; params?: {} }
    'auditorias.plan': { paramsTuple?: []; params?: {} }
    'auditorias.hallazgos': { paramsTuple?: []; params?: {} }
    'auditorias.pruebas': { paramsTuple?: []; params?: {} }
    'evidencias': { paramsTuple?: []; params?: {} }
    'evidencias.repositorio': { paramsTuple?: []; params?: {} }
    'evidencias.politicas': { paramsTuple?: []; params?: {} }
    'evidencias.subida-masiva': { paramsTuple?: []; params?: {} }
    'tareas-workflows': { paramsTuple?: []; params?: {} }
    'tareas-workflows.gestion-tareas': { paramsTuple?: []; params?: {} }
    'tareas-workflows.diseno-flujos': { paramsTuple?: []; params?: {} }
    'tareas-workflows.tareas-recurrentes': { paramsTuple?: []; params?: {} }
    'informes': { paramsTuple?: []; params?: {} }
    'informes.biblioteca': { paramsTuple?: []; params?: {} }
    'informes.creador': { paramsTuple?: []; params?: {} }
    'informes.programados': { paramsTuple?: []; params?: {} }
    'administracion': { paramsTuple?: []; params?: {} }
    'administracion.usuarios-roles': { paramsTuple?: []; params?: {} }
    'administracion.organizacion': { paramsTuple?: []; params?: {} }
    'administracion.logs': { paramsTuple?: []; params?: {} }
    'administracion.integraciones': { paramsTuple?: []; params?: {} }
    'administracion.proveedores': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'normas-controles.biblioteca.store': { paramsTuple?: []; params?: {} }
    'normas-controles.mapeo.toggle': { paramsTuple?: []; params?: {} }
    'normas-controles.catalogo.store': { paramsTuple?: []; params?: {} }
    'riesgos.store': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'normas-controles.biblioteca.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'normas-controles.catalogo.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'riesgos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administracion.usuarios-roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'normas-controles.biblioteca.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'normas-controles.catalogo.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'riesgos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}
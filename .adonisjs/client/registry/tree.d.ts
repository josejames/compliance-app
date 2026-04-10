/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  vistaGeneral: typeof routes['vista-general']
  misTareas: typeof routes['mis-tareas']
  alertas: typeof routes['alertas']
  normasControles: typeof routes['normas-controles'] & {
    biblioteca: typeof routes['normas-controles.biblioteca'] & {
      store: typeof routes['normas-controles.biblioteca.store']
      update: typeof routes['normas-controles.biblioteca.update']
      destroy: typeof routes['normas-controles.biblioteca.destroy']
    }
    mapeo: typeof routes['normas-controles.mapeo'] & {
      toggle: typeof routes['normas-controles.mapeo.toggle']
    }
    catalogo: typeof routes['normas-controles.catalogo'] & {
      store: typeof routes['normas-controles.catalogo.store']
      update: typeof routes['normas-controles.catalogo.update']
      destroy: typeof routes['normas-controles.catalogo.destroy']
    }
  }
  riesgos: typeof routes['riesgos'] & {
    registro: typeof routes['riesgos.registro']
    store: typeof routes['riesgos.store']
    update: typeof routes['riesgos.update']
    destroy: typeof routes['riesgos.destroy']
    evaluacion: typeof routes['riesgos.evaluacion'] & {
      store: typeof routes['riesgos.evaluacion.store']
      update: typeof routes['riesgos.evaluacion.update']
      destroy: typeof routes['riesgos.evaluacion.destroy']
    }
    mitigacion: typeof routes['riesgos.mitigacion'] & {
      store: typeof routes['riesgos.mitigacion.store']
      update: typeof routes['riesgos.mitigacion.update']
      destroy: typeof routes['riesgos.mitigacion.destroy']
    }
  }
  auditorias: typeof routes['auditorias'] & {
    plan: typeof routes['auditorias.plan']
    hallazgos: typeof routes['auditorias.hallazgos']
    pruebas: typeof routes['auditorias.pruebas']
  }
  evidencias: typeof routes['evidencias'] & {
    repositorio: typeof routes['evidencias.repositorio']
    politicas: typeof routes['evidencias.politicas']
    subidaMasiva: typeof routes['evidencias.subida-masiva']
  }
  tareasWorkflows: typeof routes['tareas-workflows'] & {
    gestionTareas: typeof routes['tareas-workflows.gestion-tareas']
    disenoFlujos: typeof routes['tareas-workflows.diseno-flujos']
    tareasRecurrentes: typeof routes['tareas-workflows.tareas-recurrentes']
  }
  informes: typeof routes['informes'] & {
    biblioteca: typeof routes['informes.biblioteca']
    creador: typeof routes['informes.creador']
    programados: typeof routes['informes.programados']
  }
  administracion: typeof routes['administracion'] & {
    usuariosRoles: typeof routes['administracion.usuarios-roles'] & {
      update: typeof routes['administracion.usuarios-roles.update']
    }
    organizacion: typeof routes['administracion.organizacion']
    logs: typeof routes['administracion.logs']
    integraciones: typeof routes['administracion.integraciones']
    proveedores: typeof routes['administracion.proveedores']
  }
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
}

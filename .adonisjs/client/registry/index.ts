/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'vista-general': {
    methods: ["GET","HEAD"],
    pattern: '/vista-general',
    tokens: [{"old":"/vista-general","type":0,"val":"vista-general","end":""}],
    types: placeholder as Registry['vista-general']['types'],
  },
  'mis-tareas': {
    methods: ["GET","HEAD"],
    pattern: '/mis-tareas',
    tokens: [{"old":"/mis-tareas","type":0,"val":"mis-tareas","end":""}],
    types: placeholder as Registry['mis-tareas']['types'],
  },
  'alertas': {
    methods: ["GET","HEAD"],
    pattern: '/alertas',
    tokens: [{"old":"/alertas","type":0,"val":"alertas","end":""}],
    types: placeholder as Registry['alertas']['types'],
  },
  'normas-controles': {
    methods: ["GET","HEAD"],
    pattern: '/normas-controles',
    tokens: [{"old":"/normas-controles","type":0,"val":"normas-controles","end":""}],
    types: placeholder as Registry['normas-controles']['types'],
  },
  'normas-controles.biblioteca': {
    methods: ["GET","HEAD"],
    pattern: '/normas-controles/biblioteca',
    tokens: [{"old":"/normas-controles/biblioteca","type":0,"val":"normas-controles","end":""},{"old":"/normas-controles/biblioteca","type":0,"val":"biblioteca","end":""}],
    types: placeholder as Registry['normas-controles.biblioteca']['types'],
  },
  'normas-controles.biblioteca.store': {
    methods: ["POST"],
    pattern: '/normas-controles/biblioteca',
    tokens: [{"old":"/normas-controles/biblioteca","type":0,"val":"normas-controles","end":""},{"old":"/normas-controles/biblioteca","type":0,"val":"biblioteca","end":""}],
    types: placeholder as Registry['normas-controles.biblioteca.store']['types'],
  },
  'normas-controles.biblioteca.update': {
    methods: ["PUT"],
    pattern: '/normas-controles/biblioteca/:id',
    tokens: [{"old":"/normas-controles/biblioteca/:id","type":0,"val":"normas-controles","end":""},{"old":"/normas-controles/biblioteca/:id","type":0,"val":"biblioteca","end":""},{"old":"/normas-controles/biblioteca/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['normas-controles.biblioteca.update']['types'],
  },
  'normas-controles.biblioteca.destroy': {
    methods: ["DELETE"],
    pattern: '/normas-controles/biblioteca/:id',
    tokens: [{"old":"/normas-controles/biblioteca/:id","type":0,"val":"normas-controles","end":""},{"old":"/normas-controles/biblioteca/:id","type":0,"val":"biblioteca","end":""},{"old":"/normas-controles/biblioteca/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['normas-controles.biblioteca.destroy']['types'],
  },
  'normas-controles.mapeo': {
    methods: ["GET","HEAD"],
    pattern: '/normas-controles/mapeo',
    tokens: [{"old":"/normas-controles/mapeo","type":0,"val":"normas-controles","end":""},{"old":"/normas-controles/mapeo","type":0,"val":"mapeo","end":""}],
    types: placeholder as Registry['normas-controles.mapeo']['types'],
  },
  'normas-controles.mapeo.toggle': {
    methods: ["POST"],
    pattern: '/normas-controles/mapeo',
    tokens: [{"old":"/normas-controles/mapeo","type":0,"val":"normas-controles","end":""},{"old":"/normas-controles/mapeo","type":0,"val":"mapeo","end":""}],
    types: placeholder as Registry['normas-controles.mapeo.toggle']['types'],
  },
  'normas-controles.catalogo': {
    methods: ["GET","HEAD"],
    pattern: '/normas-controles/catalogo',
    tokens: [{"old":"/normas-controles/catalogo","type":0,"val":"normas-controles","end":""},{"old":"/normas-controles/catalogo","type":0,"val":"catalogo","end":""}],
    types: placeholder as Registry['normas-controles.catalogo']['types'],
  },
  'normas-controles.catalogo.store': {
    methods: ["POST"],
    pattern: '/normas-controles/catalogo',
    tokens: [{"old":"/normas-controles/catalogo","type":0,"val":"normas-controles","end":""},{"old":"/normas-controles/catalogo","type":0,"val":"catalogo","end":""}],
    types: placeholder as Registry['normas-controles.catalogo.store']['types'],
  },
  'normas-controles.catalogo.update': {
    methods: ["PUT"],
    pattern: '/normas-controles/catalogo/:id',
    tokens: [{"old":"/normas-controles/catalogo/:id","type":0,"val":"normas-controles","end":""},{"old":"/normas-controles/catalogo/:id","type":0,"val":"catalogo","end":""},{"old":"/normas-controles/catalogo/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['normas-controles.catalogo.update']['types'],
  },
  'normas-controles.catalogo.destroy': {
    methods: ["DELETE"],
    pattern: '/normas-controles/catalogo/:id',
    tokens: [{"old":"/normas-controles/catalogo/:id","type":0,"val":"normas-controles","end":""},{"old":"/normas-controles/catalogo/:id","type":0,"val":"catalogo","end":""},{"old":"/normas-controles/catalogo/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['normas-controles.catalogo.destroy']['types'],
  },
  'riesgos': {
    methods: ["GET","HEAD"],
    pattern: '/riesgos',
    tokens: [{"old":"/riesgos","type":0,"val":"riesgos","end":""}],
    types: placeholder as Registry['riesgos']['types'],
  },
  'riesgos.registro': {
    methods: ["GET","HEAD"],
    pattern: '/riesgos/registro',
    tokens: [{"old":"/riesgos/registro","type":0,"val":"riesgos","end":""},{"old":"/riesgos/registro","type":0,"val":"registro","end":""}],
    types: placeholder as Registry['riesgos.registro']['types'],
  },
  'riesgos.store': {
    methods: ["POST"],
    pattern: '/riesgos',
    tokens: [{"old":"/riesgos","type":0,"val":"riesgos","end":""}],
    types: placeholder as Registry['riesgos.store']['types'],
  },
  'riesgos.update': {
    methods: ["PUT"],
    pattern: '/riesgos/:id',
    tokens: [{"old":"/riesgos/:id","type":0,"val":"riesgos","end":""},{"old":"/riesgos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['riesgos.update']['types'],
  },
  'riesgos.destroy': {
    methods: ["DELETE"],
    pattern: '/riesgos/:id',
    tokens: [{"old":"/riesgos/:id","type":0,"val":"riesgos","end":""},{"old":"/riesgos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['riesgos.destroy']['types'],
  },
  'riesgos.evaluacion': {
    methods: ["GET","HEAD"],
    pattern: '/riesgos/evaluacion',
    tokens: [{"old":"/riesgos/evaluacion","type":0,"val":"riesgos","end":""},{"old":"/riesgos/evaluacion","type":0,"val":"evaluacion","end":""}],
    types: placeholder as Registry['riesgos.evaluacion']['types'],
  },
  'riesgos.mitigacion': {
    methods: ["GET","HEAD"],
    pattern: '/riesgos/mitigacion',
    tokens: [{"old":"/riesgos/mitigacion","type":0,"val":"riesgos","end":""},{"old":"/riesgos/mitigacion","type":0,"val":"mitigacion","end":""}],
    types: placeholder as Registry['riesgos.mitigacion']['types'],
  },
  'auditorias': {
    methods: ["GET","HEAD"],
    pattern: '/auditorias',
    tokens: [{"old":"/auditorias","type":0,"val":"auditorias","end":""}],
    types: placeholder as Registry['auditorias']['types'],
  },
  'auditorias.plan': {
    methods: ["GET","HEAD"],
    pattern: '/auditorias/plan',
    tokens: [{"old":"/auditorias/plan","type":0,"val":"auditorias","end":""},{"old":"/auditorias/plan","type":0,"val":"plan","end":""}],
    types: placeholder as Registry['auditorias.plan']['types'],
  },
  'auditorias.hallazgos': {
    methods: ["GET","HEAD"],
    pattern: '/auditorias/hallazgos',
    tokens: [{"old":"/auditorias/hallazgos","type":0,"val":"auditorias","end":""},{"old":"/auditorias/hallazgos","type":0,"val":"hallazgos","end":""}],
    types: placeholder as Registry['auditorias.hallazgos']['types'],
  },
  'auditorias.pruebas': {
    methods: ["GET","HEAD"],
    pattern: '/auditorias/pruebas',
    tokens: [{"old":"/auditorias/pruebas","type":0,"val":"auditorias","end":""},{"old":"/auditorias/pruebas","type":0,"val":"pruebas","end":""}],
    types: placeholder as Registry['auditorias.pruebas']['types'],
  },
  'evidencias': {
    methods: ["GET","HEAD"],
    pattern: '/evidencias',
    tokens: [{"old":"/evidencias","type":0,"val":"evidencias","end":""}],
    types: placeholder as Registry['evidencias']['types'],
  },
  'evidencias.repositorio': {
    methods: ["GET","HEAD"],
    pattern: '/evidencias/repositorio',
    tokens: [{"old":"/evidencias/repositorio","type":0,"val":"evidencias","end":""},{"old":"/evidencias/repositorio","type":0,"val":"repositorio","end":""}],
    types: placeholder as Registry['evidencias.repositorio']['types'],
  },
  'evidencias.politicas': {
    methods: ["GET","HEAD"],
    pattern: '/evidencias/politicas',
    tokens: [{"old":"/evidencias/politicas","type":0,"val":"evidencias","end":""},{"old":"/evidencias/politicas","type":0,"val":"politicas","end":""}],
    types: placeholder as Registry['evidencias.politicas']['types'],
  },
  'evidencias.subida-masiva': {
    methods: ["GET","HEAD"],
    pattern: '/evidencias/subida-masiva',
    tokens: [{"old":"/evidencias/subida-masiva","type":0,"val":"evidencias","end":""},{"old":"/evidencias/subida-masiva","type":0,"val":"subida-masiva","end":""}],
    types: placeholder as Registry['evidencias.subida-masiva']['types'],
  },
  'tareas-workflows': {
    methods: ["GET","HEAD"],
    pattern: '/tareas-workflows',
    tokens: [{"old":"/tareas-workflows","type":0,"val":"tareas-workflows","end":""}],
    types: placeholder as Registry['tareas-workflows']['types'],
  },
  'tareas-workflows.gestion-tareas': {
    methods: ["GET","HEAD"],
    pattern: '/tareas-workflows/gestion-tareas',
    tokens: [{"old":"/tareas-workflows/gestion-tareas","type":0,"val":"tareas-workflows","end":""},{"old":"/tareas-workflows/gestion-tareas","type":0,"val":"gestion-tareas","end":""}],
    types: placeholder as Registry['tareas-workflows.gestion-tareas']['types'],
  },
  'tareas-workflows.diseno-flujos': {
    methods: ["GET","HEAD"],
    pattern: '/tareas-workflows/diseno-flujos',
    tokens: [{"old":"/tareas-workflows/diseno-flujos","type":0,"val":"tareas-workflows","end":""},{"old":"/tareas-workflows/diseno-flujos","type":0,"val":"diseno-flujos","end":""}],
    types: placeholder as Registry['tareas-workflows.diseno-flujos']['types'],
  },
  'tareas-workflows.tareas-recurrentes': {
    methods: ["GET","HEAD"],
    pattern: '/tareas-workflows/tareas-recurrentes',
    tokens: [{"old":"/tareas-workflows/tareas-recurrentes","type":0,"val":"tareas-workflows","end":""},{"old":"/tareas-workflows/tareas-recurrentes","type":0,"val":"tareas-recurrentes","end":""}],
    types: placeholder as Registry['tareas-workflows.tareas-recurrentes']['types'],
  },
  'informes': {
    methods: ["GET","HEAD"],
    pattern: '/informes',
    tokens: [{"old":"/informes","type":0,"val":"informes","end":""}],
    types: placeholder as Registry['informes']['types'],
  },
  'informes.biblioteca': {
    methods: ["GET","HEAD"],
    pattern: '/informes/biblioteca',
    tokens: [{"old":"/informes/biblioteca","type":0,"val":"informes","end":""},{"old":"/informes/biblioteca","type":0,"val":"biblioteca","end":""}],
    types: placeholder as Registry['informes.biblioteca']['types'],
  },
  'informes.creador': {
    methods: ["GET","HEAD"],
    pattern: '/informes/creador',
    tokens: [{"old":"/informes/creador","type":0,"val":"informes","end":""},{"old":"/informes/creador","type":0,"val":"creador","end":""}],
    types: placeholder as Registry['informes.creador']['types'],
  },
  'informes.programados': {
    methods: ["GET","HEAD"],
    pattern: '/informes/programados',
    tokens: [{"old":"/informes/programados","type":0,"val":"informes","end":""},{"old":"/informes/programados","type":0,"val":"programados","end":""}],
    types: placeholder as Registry['informes.programados']['types'],
  },
  'administracion': {
    methods: ["GET","HEAD"],
    pattern: '/administracion',
    tokens: [{"old":"/administracion","type":0,"val":"administracion","end":""}],
    types: placeholder as Registry['administracion']['types'],
  },
  'administracion.usuarios-roles': {
    methods: ["GET","HEAD"],
    pattern: '/administracion/usuarios-roles',
    tokens: [{"old":"/administracion/usuarios-roles","type":0,"val":"administracion","end":""},{"old":"/administracion/usuarios-roles","type":0,"val":"usuarios-roles","end":""}],
    types: placeholder as Registry['administracion.usuarios-roles']['types'],
  },
  'administracion.usuarios-roles.update': {
    methods: ["PUT"],
    pattern: '/administracion/usuarios-roles/:id',
    tokens: [{"old":"/administracion/usuarios-roles/:id","type":0,"val":"administracion","end":""},{"old":"/administracion/usuarios-roles/:id","type":0,"val":"usuarios-roles","end":""},{"old":"/administracion/usuarios-roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['administracion.usuarios-roles.update']['types'],
  },
  'administracion.organizacion': {
    methods: ["GET","HEAD"],
    pattern: '/administracion/organizacion',
    tokens: [{"old":"/administracion/organizacion","type":0,"val":"administracion","end":""},{"old":"/administracion/organizacion","type":0,"val":"organizacion","end":""}],
    types: placeholder as Registry['administracion.organizacion']['types'],
  },
  'administracion.logs': {
    methods: ["GET","HEAD"],
    pattern: '/administracion/logs',
    tokens: [{"old":"/administracion/logs","type":0,"val":"administracion","end":""},{"old":"/administracion/logs","type":0,"val":"logs","end":""}],
    types: placeholder as Registry['administracion.logs']['types'],
  },
  'administracion.integraciones': {
    methods: ["GET","HEAD"],
    pattern: '/administracion/integraciones',
    tokens: [{"old":"/administracion/integraciones","type":0,"val":"administracion","end":""},{"old":"/administracion/integraciones","type":0,"val":"integraciones","end":""}],
    types: placeholder as Registry['administracion.integraciones']['types'],
  },
  'administracion.proveedores': {
    methods: ["GET","HEAD"],
    pattern: '/administracion/proveedores',
    tokens: [{"old":"/administracion/proveedores","type":0,"val":"administracion","end":""},{"old":"/administracion/proveedores","type":0,"val":"proveedores","end":""}],
    types: placeholder as Registry['administracion.proveedores']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}

/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'vista-general': {
    methods: ["GET","HEAD"]
    pattern: '/vista-general'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'mis-tareas': {
    methods: ["GET","HEAD"]
    pattern: '/mis-tareas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'alertas': {
    methods: ["GET","HEAD"]
    pattern: '/alertas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'normas-controles': {
    methods: ["GET","HEAD"]
    pattern: '/normas-controles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/standards_controls_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/standards_controls_controller').default['index']>>>
    }
  }
  'normas-controles.biblioteca': {
    methods: ["GET","HEAD"]
    pattern: '/normas-controles/biblioteca'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/frameworks_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/frameworks_controller').default['index']>>>
    }
  }
  'normas-controles.biblioteca.store': {
    methods: ["POST"]
    pattern: '/normas-controles/biblioteca'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/framework').createFrameworkValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/framework').createFrameworkValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/frameworks_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/frameworks_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'normas-controles.biblioteca.update': {
    methods: ["PUT"]
    pattern: '/normas-controles/biblioteca/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/framework').updateFrameworkValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/framework').updateFrameworkValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/frameworks_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/frameworks_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'normas-controles.biblioteca.destroy': {
    methods: ["DELETE"]
    pattern: '/normas-controles/biblioteca/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/frameworks_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/frameworks_controller').default['destroy']>>>
    }
  }
  'normas-controles.mapeo': {
    methods: ["GET","HEAD"]
    pattern: '/normas-controles/mapeo'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/mapping_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/mapping_controller').default['index']>>>
    }
  }
  'normas-controles.mapeo.toggle': {
    methods: ["POST"]
    pattern: '/normas-controles/mapeo'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/mapping').toggleMappingValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/mapping').toggleMappingValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/mapping_controller').default['toggle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/mapping_controller').default['toggle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'normas-controles.catalogo': {
    methods: ["GET","HEAD"]
    pattern: '/normas-controles/catalogo'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/controls_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/controls_controller').default['index']>>>
    }
  }
  'normas-controles.catalogo.store': {
    methods: ["POST"]
    pattern: '/normas-controles/catalogo'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/control').createControlValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/control').createControlValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/controls_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/controls_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'normas-controles.catalogo.update': {
    methods: ["PUT"]
    pattern: '/normas-controles/catalogo/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/control').updateControlValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/control').updateControlValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/controls_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/controls_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'normas-controles.catalogo.destroy': {
    methods: ["DELETE"]
    pattern: '/normas-controles/catalogo/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/controls_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/controls_controller').default['destroy']>>>
    }
  }
  'riesgos': {
    methods: ["GET","HEAD"]
    pattern: '/riesgos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/risks_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/risks_controller').default['index']>>>
    }
  }
  'riesgos.registro': {
    methods: ["GET","HEAD"]
    pattern: '/riesgos/registro'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/risks_controller').default['register']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/risks_controller').default['register']>>>
    }
  }
  'riesgos.store': {
    methods: ["POST"]
    pattern: '/riesgos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/risk').createRiskValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/risk').createRiskValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/risks_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/risks_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'riesgos.update': {
    methods: ["PUT"]
    pattern: '/riesgos/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/risk').updateRiskValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/risk').updateRiskValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/risks_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/risks_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'riesgos.destroy': {
    methods: ["DELETE"]
    pattern: '/riesgos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/risks_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/risks_controller').default['destroy']>>>
    }
  }
  'riesgos.evaluacion': {
    methods: ["GET","HEAD"]
    pattern: '/riesgos/evaluacion'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'riesgos.mitigacion': {
    methods: ["GET","HEAD"]
    pattern: '/riesgos/mitigacion'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'auditorias': {
    methods: ["GET","HEAD"]
    pattern: '/auditorias'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'auditorias.plan': {
    methods: ["GET","HEAD"]
    pattern: '/auditorias/plan'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'auditorias.hallazgos': {
    methods: ["GET","HEAD"]
    pattern: '/auditorias/hallazgos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'auditorias.pruebas': {
    methods: ["GET","HEAD"]
    pattern: '/auditorias/pruebas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'evidencias': {
    methods: ["GET","HEAD"]
    pattern: '/evidencias'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'evidencias.repositorio': {
    methods: ["GET","HEAD"]
    pattern: '/evidencias/repositorio'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'evidencias.politicas': {
    methods: ["GET","HEAD"]
    pattern: '/evidencias/politicas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'evidencias.subida-masiva': {
    methods: ["GET","HEAD"]
    pattern: '/evidencias/subida-masiva'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'tareas-workflows': {
    methods: ["GET","HEAD"]
    pattern: '/tareas-workflows'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'tareas-workflows.gestion-tareas': {
    methods: ["GET","HEAD"]
    pattern: '/tareas-workflows/gestion-tareas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'tareas-workflows.diseno-flujos': {
    methods: ["GET","HEAD"]
    pattern: '/tareas-workflows/diseno-flujos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'tareas-workflows.tareas-recurrentes': {
    methods: ["GET","HEAD"]
    pattern: '/tareas-workflows/tareas-recurrentes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'informes': {
    methods: ["GET","HEAD"]
    pattern: '/informes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'informes.biblioteca': {
    methods: ["GET","HEAD"]
    pattern: '/informes/biblioteca'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'informes.creador': {
    methods: ["GET","HEAD"]
    pattern: '/informes/creador'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'informes.programados': {
    methods: ["GET","HEAD"]
    pattern: '/informes/programados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'administracion': {
    methods: ["GET","HEAD"]
    pattern: '/administracion'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'administracion.usuarios-roles': {
    methods: ["GET","HEAD"]
    pattern: '/administracion/usuarios-roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_controller').default['index']>>>
    }
  }
  'administracion.usuarios-roles.update': {
    methods: ["PUT"]
    pattern: '/administracion/usuarios-roles/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').createUpdateUserValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/user').createUpdateUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'administracion.organizacion': {
    methods: ["GET","HEAD"]
    pattern: '/administracion/organizacion'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'administracion.logs': {
    methods: ["GET","HEAD"]
    pattern: '/administracion/logs'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'administracion.integraciones': {
    methods: ["GET","HEAD"]
    pattern: '/administracion/integraciones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'administracion.proveedores': {
    methods: ["GET","HEAD"]
    pattern: '/administracion/proveedores'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'new_account.create': {
    methods: ["GET","HEAD"]
    pattern: '/signup'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
    }
  }
  'new_account.store': {
    methods: ["POST"]
    pattern: '/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'session.create': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
    }
  }
  'session.store': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>>
    }
  }
  'session.destroy': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
    }
  }
}

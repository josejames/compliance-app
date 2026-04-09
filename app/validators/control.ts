import vine from '@vinejs/vine'

export const CONTROL_DOMAINS = [
  'Seguridad de Acceso',
  'Protección de Datos',
  'Gestión de Incidentes',
  'Continuidad del Negocio',
  'Seguridad Física',
  'Gestión de Proveedores',
  'Cumplimiento Legal',
  'Auditoría y Logs',
  'Seguridad en el Desarrollo',
  'Gobernanza',
  'Infraestructura',
  'Monitorización',
  'Respuesta',
  'Continuidad',
  'Cadena de Suministro',
  'Personas',
] as const

export const CONTROL_FREQUENCIES = ['continuous', 'monthly', 'quarterly', 'annual'] as const
export const CONTROL_STATUSES = ['active', 'needs-review', 'overdue', 'inactive'] as const

const controlFields = {
  title: vine.string().minLength(1).maxLength(255),
  description: vine.string().maxLength(2000).optional(),
  domain: vine.string().minLength(1).maxLength(100),
  owner: vine.string().minLength(1).maxLength(255),
  frequency: vine.string().in([...CONTROL_FREQUENCIES]),
  status: vine.string().in([...CONTROL_STATUSES]),
  frameworks: vine.string().maxLength(1000).optional(),
  lastReviewedAt: vine.date({ formats: ['YYYY-MM-DD'] }).optional(),
  nextReviewAt: vine.date({ formats: ['YYYY-MM-DD'] }).optional(),
}

export const createControlValidator = vine.create({ ...controlFields })
export const updateControlValidator = vine.create({ ...controlFields })

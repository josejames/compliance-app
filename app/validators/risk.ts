import vine from '@vinejs/vine'

const VALID_CATEGORIES = [
  'Seguridad TI',
  'Privacidad',
  'Continuidad',
  'Operacional',
  'Cumplimiento',
  'Legal',
  'Gobernanza',
  'Financiero',
  'Reputacional',
] as const

const VALID_TREATMENTS = ['mitigate', 'accept', 'transfer', 'avoid'] as const
const VALID_STATUSES = ['open', 'in-treatment', 'accepted', 'closed'] as const

const riskFields = {
  title: vine.string().minLength(1).maxLength(255),
  category: vine.string().in([...VALID_CATEGORIES]),
  description: vine.string().maxLength(2000).optional(),
  impact: vine.number().min(1).max(5),
  probability: vine.number().min(1).max(5),
  treatment: vine.string().in([...VALID_TREATMENTS]),
  owner: vine.string().minLength(1).maxLength(255),
  status: vine.string().in([...VALID_STATUSES]),
  frameworks: vine.string().maxLength(500).optional(),
}

export const createRiskValidator = vine.create({ ...riskFields })

export const updateRiskValidator = vine.create({ ...riskFields })

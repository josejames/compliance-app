import vine from '@vinejs/vine'

export const FRAMEWORK_CATEGORIES = ['international', 'regional', 'sector', 'custom'] as const
export const FRAMEWORK_STATUSES = ['active', 'inactive', 'custom'] as const

const frameworkFields = {
  slug: vine.string().minLength(1).maxLength(100),
  name: vine.string().minLength(1).maxLength(255),
  version: vine.string().minLength(1).maxLength(50),
  description: vine.string().maxLength(2000).optional(),
  category: vine.string().in([...FRAMEWORK_CATEGORIES]),
  status: vine.string().in([...FRAMEWORK_STATUSES]),
  domainsCount: vine.number().min(0).max(9999),
  controlsCount: vine.number().min(0).max(9999),
  compliancePercentage: vine.number().min(0).max(100),
  lastReviewDate: vine.date({ formats: ['YYYY-MM-DD'] }).optional(),
}

export const createFrameworkValidator = vine.create({ ...frameworkFields })

export const updateFrameworkValidator = vine.create({ ...frameworkFields })

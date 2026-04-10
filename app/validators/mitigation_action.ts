import vine from '@vinejs/vine'

export const MITIGATION_STATUSES = ['completed', 'in-progress', 'pending', 'overdue'] as const
export const RESIDUAL_LEVELS = ['critical', 'high', 'medium', 'low'] as const

export const createMitigationValidator = vine.compile(
  vine.object({
    riskId: vine.number().positive(),
    action: vine.string().minLength(1).maxLength(255),
    description: vine.string().maxLength(2000).optional(),
    owner: vine.string().minLength(1).maxLength(255),
    dueDate: vine.date(),
    status: vine.string().in([...MITIGATION_STATUSES]),
    progress: vine.number().min(0).max(100),
    residualLevel: vine.string().in([...RESIDUAL_LEVELS]),
    residualScore: vine.number().min(0).max(25),
    linkedTaskId: vine.string().maxLength(50).optional(),
    notes: vine.string().maxLength(2000).optional(),
  })
)

export const updateMitigationValidator = vine.compile(
  vine.object({
    riskId: vine.number().positive(),
    action: vine.string().minLength(1).maxLength(255),
    description: vine.string().maxLength(2000).optional(),
    owner: vine.string().minLength(1).maxLength(255),
    dueDate: vine.date(),
    status: vine.string().in([...MITIGATION_STATUSES]),
    progress: vine.number().min(0).max(100),
    residualLevel: vine.string().in([...RESIDUAL_LEVELS]),
    residualScore: vine.number().min(0).max(25),
    linkedTaskId: vine.string().maxLength(50).optional(),
    notes: vine.string().maxLength(2000).optional(),
  })
)

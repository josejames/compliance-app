import vine from '@vinejs/vine'

export const EVAL_SCOPES = ['project', 'area', 'asset'] as const
export const EVAL_STATUSES = ['completed', 'in-progress', 'scheduled'] as const
export const RISK_LEVELS = ['critical', 'high', 'medium', 'low'] as const

export const createEvaluationValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(1).maxLength(255),
    scope: vine.string().in([...EVAL_SCOPES]),
    scopeTarget: vine.string().minLength(1).maxLength(255),
    framework: vine.string().maxLength(255).optional(),
    status: vine.string().in([...EVAL_STATUSES]),
    progress: vine.number().min(0).max(100),
    risksFound: vine.number().min(0),
    riskLevel: vine.string().in([...RISK_LEVELS]),
    owner: vine.string().minLength(1).maxLength(255),
    questionsTotal: vine.number().min(0),
    questionsAnswered: vine.number().min(0),
    notes: vine.string().maxLength(2000).optional(),
    startDate: vine.date(),
    endDate: vine.date(),
  })
)

export const updateEvaluationValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(1).maxLength(255),
    scope: vine.string().in([...EVAL_SCOPES]),
    scopeTarget: vine.string().minLength(1).maxLength(255),
    framework: vine.string().maxLength(255).optional(),
    status: vine.string().in([...EVAL_STATUSES]),
    progress: vine.number().min(0).max(100),
    risksFound: vine.number().min(0),
    riskLevel: vine.string().in([...RISK_LEVELS]),
    owner: vine.string().minLength(1).maxLength(255),
    questionsTotal: vine.number().min(0),
    questionsAnswered: vine.number().min(0),
    notes: vine.string().maxLength(2000).optional(),
    startDate: vine.date(),
    endDate: vine.date(),
  })
)

import vine from '@vinejs/vine'

export const MAPPING_STATUSES = ['full', 'partial', 'none'] as const

export const toggleMappingValidator = vine.compile(
  vine.object({
    controlId: vine.number().positive(),
    frameworkId: vine.number().positive(),
    mappingStatus: vine.string().in([...MAPPING_STATUSES]),
  })
)

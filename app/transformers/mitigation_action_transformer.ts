import type MitigationAction from '#models/mitigation_action'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class MitigationActionTransformer extends BaseTransformer<MitigationAction> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'riskId',
        'action',
        'description',
        'owner',
        'status',
        'progress',
        'residualLevel',
        'residualScore',
        'linkedTaskId',
        'notes',
      ]),
      code: this.resource.code,
      daysLeft: this.resource.daysLeft,
      dueDate: this.resource.dueDate?.toISODate() ?? null,
      createdAt: this.resource.createdAt?.toISO() ?? null,
      updatedAt: this.resource.updatedAt?.toISO() ?? null,
    }
  }
}

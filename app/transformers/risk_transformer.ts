import type Risk from '#models/risk'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class RiskTransformer extends BaseTransformer<Risk> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'title',
        'category',
        'description',
        'impact',
        'probability',
        'treatment',
        'owner',
        'status',
        'frameworks',
      ]),
      code: this.resource.code,
      score: this.resource.score,
      level: this.resource.level,
      createdAt: this.resource.createdAt?.toISO() ?? null,
      updatedAt: this.resource.updatedAt?.toISO() ?? null,
    }
  }
}

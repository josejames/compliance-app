import type Framework from '#models/framework'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class FrameworkTransformer extends BaseTransformer<Framework> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'slug',
        'name',
        'version',
        'description',
        'category',
        'status',
        'domainsCount',
        'controlsCount',
        'compliancePercentage',
      ]),
      complianceLevel: this.resource.complianceLevel,
      lastReviewDate: this.resource.lastReviewDate?.toISODate() ?? null,
      createdAt: this.resource.createdAt?.toISO() ?? null,
      updatedAt: this.resource.updatedAt?.toISO() ?? null,
    }
  }
}

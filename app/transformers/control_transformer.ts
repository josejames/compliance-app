import type Control from '#models/control'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class ControlTransformer extends BaseTransformer<Control> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'title',
        'description',
        'domain',
        'owner',
        'frequency',
        'status',
        'frameworks',
      ]),
      code: this.resource.code,
      frameworkList: this.resource.frameworkList,
      lastReviewedAt: this.resource.lastReviewedAt?.toISODate() ?? null,
      nextReviewAt: this.resource.nextReviewAt?.toISODate() ?? null,
      createdAt: this.resource.createdAt?.toISO() ?? null,
      updatedAt: this.resource.updatedAt?.toISO() ?? null,
    }
  }
}

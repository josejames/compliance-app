import type RiskEvaluation from '#models/risk_evaluation'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class RiskEvaluationTransformer extends BaseTransformer<RiskEvaluation> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'title',
        'scope',
        'scopeTarget',
        'framework',
        'status',
        'progress',
        'risksFound',
        'riskLevel',
        'owner',
        'questionsTotal',
        'questionsAnswered',
        'notes',
      ]),
      code: this.resource.code,
      startDate: this.resource.startDate?.toISODate() ?? null,
      endDate: this.resource.endDate?.toISODate() ?? null,
      createdAt: this.resource.createdAt?.toISO() ?? null,
      updatedAt: this.resource.updatedAt?.toISO() ?? null,
    }
  }
}

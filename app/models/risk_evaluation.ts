import { RiskEvaluationSchema } from '#database/schema'

export default class RiskEvaluation extends RiskEvaluationSchema {
  get code(): string {
    return `EVA-${String(this.id).padStart(3, '0')}`
  }
}

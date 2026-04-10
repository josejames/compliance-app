import RiskEvaluation from '#models/risk_evaluation'
import { DateTime } from 'luxon'

export interface EvaluationData {
  title: string
  scope: string
  scopeTarget: string
  framework?: string
  status: string
  progress: number
  risksFound: number
  riskLevel: string
  owner: string
  questionsTotal: number
  questionsAnswered: number
  notes?: string
  startDate: DateTime
  endDate: DateTime
}

export default class RiskEvaluationService {
  async all(): Promise<RiskEvaluation[]> {
    return RiskEvaluation.query().orderBy('id', 'desc')
  }

  async find(id: number): Promise<RiskEvaluation> {
    return RiskEvaluation.findOrFail(id)
  }

  async create(data: EvaluationData): Promise<RiskEvaluation> {
    return RiskEvaluation.create({
      title: data.title,
      scope: data.scope,
      scopeTarget: data.scopeTarget,
      framework: data.framework ?? null,
      status: data.status,
      progress: data.progress,
      risksFound: data.risksFound,
      riskLevel: data.riskLevel,
      owner: data.owner,
      questionsTotal: data.questionsTotal,
      questionsAnswered: data.questionsAnswered,
      notes: data.notes ?? null,
      startDate: data.startDate,
      endDate: data.endDate,
    })
  }

  async update(id: number, data: Partial<EvaluationData>): Promise<RiskEvaluation> {
    const evaluation = await RiskEvaluation.findOrFail(id)
    evaluation.merge({
      title: data.title,
      scope: data.scope,
      scopeTarget: data.scopeTarget,
      framework: data.framework ?? null,
      status: data.status,
      progress: data.progress,
      risksFound: data.risksFound,
      riskLevel: data.riskLevel,
      owner: data.owner,
      questionsTotal: data.questionsTotal,
      questionsAnswered: data.questionsAnswered,
      notes: data.notes ?? null,
      startDate: data.startDate,
      endDate: data.endDate,
    })
    await evaluation.save()
    return evaluation
  }

  async destroy(id: number): Promise<void> {
    const evaluation = await RiskEvaluation.findOrFail(id)
    await evaluation.delete()
  }
}

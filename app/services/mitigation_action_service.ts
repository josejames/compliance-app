import MitigationAction from '#models/mitigation_action'
import { DateTime } from 'luxon'

export interface MitigationData {
  riskId: number
  action: string
  description?: string
  owner: string
  dueDate: DateTime
  status: string
  progress: number
  residualLevel: string
  residualScore: number
  linkedTaskId?: string
  notes?: string
}

export default class MitigationActionService {
  async all(): Promise<MitigationAction[]> {
    return MitigationAction.query().preload('risk').orderBy('id', 'desc')
  }

  async find(id: number): Promise<MitigationAction> {
    return MitigationAction.query().where('id', id).preload('risk').firstOrFail()
  }

  async create(data: MitigationData): Promise<MitigationAction> {
    return MitigationAction.create({
      riskId: data.riskId,
      action: data.action,
      description: data.description ?? null,
      owner: data.owner,
      dueDate: data.dueDate,
      status: data.status,
      progress: data.progress,
      residualLevel: data.residualLevel,
      residualScore: data.residualScore,
      linkedTaskId: data.linkedTaskId ?? null,
      notes: data.notes ?? null,
    })
  }

  async update(id: number, data: Partial<MitigationData>): Promise<MitigationAction> {
    const action = await MitigationAction.findOrFail(id)
    action.merge({
      riskId: data.riskId,
      action: data.action,
      description: data.description ?? null,
      owner: data.owner,
      dueDate: data.dueDate,
      status: data.status,
      progress: data.progress,
      residualLevel: data.residualLevel,
      residualScore: data.residualScore,
      linkedTaskId: data.linkedTaskId ?? null,
      notes: data.notes ?? null,
    })
    await action.save()
    return action
  }

  async destroy(id: number): Promise<void> {
    const action = await MitigationAction.findOrFail(id)
    await action.delete()
  }
}

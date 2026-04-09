import Control from '#models/control'
import { DateTime } from 'luxon'

export interface ControlData {
  title: string
  description?: string
  domain: string
  owner: string
  frequency: string
  status: string
  frameworks?: string
  lastReviewedAt?: DateTime
  nextReviewAt?: DateTime
}

export default class ControlService {
  async all(): Promise<Control[]> {
    return Control.query().orderBy('id', 'asc')
  }

  async find(id: number): Promise<Control> {
    return Control.findOrFail(id)
  }

  async create(data: ControlData): Promise<Control> {
    return Control.create({
      title: data.title,
      description: data.description ?? null,
      domain: data.domain,
      owner: data.owner,
      frequency: data.frequency,
      status: data.status,
      frameworks: data.frameworks ?? null,
      lastReviewedAt: data.lastReviewedAt ?? null,
      nextReviewAt: data.nextReviewAt ?? null,
    })
  }

  async update(id: number, data: Partial<ControlData>): Promise<Control> {
    const control = await Control.findOrFail(id)
    control.merge({
      title: data.title,
      description: data.description ?? null,
      domain: data.domain,
      owner: data.owner,
      frequency: data.frequency,
      status: data.status,
      frameworks: data.frameworks ?? null,
      lastReviewedAt: data.lastReviewedAt ?? null,
      nextReviewAt: data.nextReviewAt ?? null,
    })
    await control.save()
    return control
  }

  async destroy(id: number): Promise<void> {
    const control = await Control.findOrFail(id)
    await control.delete()
  }
}

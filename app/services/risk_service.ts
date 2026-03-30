import Risk from '#models/risk'

export interface RiskData {
  title: string
  category: string
  description?: string
  impact: number
  probability: number
  treatment: string
  owner: string
  status: string
  frameworks?: string
}

export default class RiskService {
  async all(): Promise<Risk[]> {
    return Risk.query().orderBy('id', 'desc')
  }

  async find(id: number): Promise<Risk> {
    return Risk.findOrFail(id)
  }

  async create(data: RiskData): Promise<Risk> {
    return Risk.create({
      title: data.title,
      category: data.category,
      description: data.description ?? null,
      impact: data.impact,
      probability: data.probability,
      treatment: data.treatment,
      owner: data.owner,
      status: data.status,
      frameworks: data.frameworks ?? null,
    })
  }

  async update(id: number, data: RiskData): Promise<Risk> {
    const risk = await Risk.findOrFail(id)
    risk.merge({
      title: data.title,
      category: data.category,
      description: data.description ?? null,
      impact: data.impact,
      probability: data.probability,
      treatment: data.treatment,
      owner: data.owner,
      status: data.status,
      frameworks: data.frameworks ?? null,
    })
    await risk.save()
    return risk
  }

  async destroy(id: number): Promise<void> {
    const risk = await Risk.findOrFail(id)
    await risk.delete()
  }
}

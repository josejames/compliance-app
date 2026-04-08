import Framework from '#models/framework'
import { DateTime } from 'luxon'

export interface FrameworkData {
  slug: string
  name: string
  version: string
  description?: string
  category: string
  status: string
  domainsCount: number
  controlsCount: number
  compliancePercentage: number
  lastReviewDate?: DateTime
}

export default class FrameworkService {
  async all(): Promise<Framework[]> {
    return Framework.query().orderBy('name', 'asc')
  }

  async find(id: number): Promise<Framework> {
    return Framework.findOrFail(id)
  }

  async create(data: FrameworkData): Promise<Framework> {
    return Framework.create({
      slug: data.slug,
      name: data.name,
      version: data.version,
      description: data.description ?? null,
      category: data.category,
      status: data.status,
      domainsCount: data.domainsCount,
      controlsCount: data.controlsCount,
      compliancePercentage: data.compliancePercentage,
      lastReviewDate: data.lastReviewDate ?? null,
    })
  }

  async update(id: number, data: Partial<FrameworkData>): Promise<Framework> {
    const framework = await Framework.findOrFail(id)
    framework.merge({
      slug: data.slug,
      name: data.name,
      version: data.version,
      description: data.description ?? null,
      category: data.category,
      status: data.status,
      domainsCount: data.domainsCount,
      controlsCount: data.controlsCount,
      compliancePercentage: data.compliancePercentage,
      lastReviewDate: data.lastReviewDate ?? null,
    })
    await framework.save()
    return framework
  }

  async destroy(id: number): Promise<void> {
    const framework = await Framework.findOrFail(id)
    await framework.delete()
  }
}

import MappingService from '#services/mapping_service'
import FrameworkTransformer from '#transformers/framework_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class StandardsControlsController {
  public async index({ inertia }: HttpContext) {
    const service = new MappingService()
    const [frameworks, stats] = await Promise.all([
      service.allFrameworks(),
      service.stats(),
    ])

    return inertia.render('dashboard/standards-controls', {
      frameworks: frameworks.map((f) => new FrameworkTransformer(f).toObject()),
      stats,
    })
  }
}

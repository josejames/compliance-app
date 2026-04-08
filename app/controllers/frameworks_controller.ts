import FrameworkService from '#services/framework_service'
import FrameworkTransformer from '#transformers/framework_transformer'
import { createFrameworkValidator, updateFrameworkValidator } from '#validators/framework'
import type { HttpContext } from '@adonisjs/core/http'

export default class FrameworksController {
  /**
   * Render the frameworks library page with all registered frameworks.
   */
  public async index({ inertia }: HttpContext) {
    const service = new FrameworkService()
    const frameworks = await service.all()

    return inertia.render('dashboard/standards-controls/library', {
      frameworks: frameworks.map((f) => new FrameworkTransformer(f).toObject()),
    })
  }

  /**
   * Create a new framework.
   */
  public async store({ request, response }: HttpContext) {
    const service = new FrameworkService()
    const payload = await request.validateUsing(createFrameworkValidator)
    await service.create(payload)
    return response.redirect().toRoute('normas-controles.biblioteca')
  }

  /**
   * Update an existing framework.
   */
  public async update({ request, response, params }: HttpContext) {
    const service = new FrameworkService()
    const payload = await request.validateUsing(updateFrameworkValidator)
    await service.update(params.id, payload)
    return response.redirect().toRoute('normas-controles.biblioteca')
  }

  /**
   * Delete a framework.
   */
  public async destroy({ response, params }: HttpContext) {
    const service = new FrameworkService()
    await service.destroy(params.id)
    return response.redirect().toRoute('normas-controles.biblioteca')
  }
}

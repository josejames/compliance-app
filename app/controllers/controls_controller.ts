import ControlService from '#services/control_service'
import ControlTransformer from '#transformers/control_transformer'
import { createControlValidator, updateControlValidator } from '#validators/control'
import type { HttpContext } from '@adonisjs/core/http'

export default class ControlsController {
  public async index({ inertia }: HttpContext) {
    const service = new ControlService()
    const controls = await service.all()
    return inertia.render('dashboard/standards-controls/catalog', {
      controls: controls.map((c) => new ControlTransformer(c).toObject()),
    })
  }

  public async store({ request, response }: HttpContext) {
    const service = new ControlService()
    const payload = await request.validateUsing(createControlValidator)
    await service.create(payload)
    return response.redirect().toRoute('normas-controles.catalogo')
  }

  public async update({ request, response, params }: HttpContext) {
    const service = new ControlService()
    const payload = await request.validateUsing(updateControlValidator)
    await service.update(params.id, payload)
    return response.redirect().toRoute('normas-controles.catalogo')
  }

  public async destroy({ response, params }: HttpContext) {
    const service = new ControlService()
    await service.destroy(params.id)
    return response.redirect().toRoute('normas-controles.catalogo')
  }
}

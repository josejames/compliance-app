import MappingService, { type MappingStatus } from '#services/mapping_service'
import ControlTransformer from '#transformers/control_transformer'
import FrameworkTransformer from '#transformers/framework_transformer'
import { toggleMappingValidator } from '#validators/mapping'
import type { HttpContext } from '@adonisjs/core/http'

export default class MappingController {
  public async index({ inertia }: HttpContext) {
    const service = new MappingService()
    const [controls, frameworks, mappings] = await Promise.all([
      service.allControls(),
      service.allFrameworks(),
      service.allMappings(),
    ])

    return inertia.render('dashboard/standards-controls/mapping', {
      controls: controls.map((c) => new ControlTransformer(c).toObject()),
      frameworks: frameworks.map((f) => new FrameworkTransformer(f).toObject()),
      mappings: mappings.map((m) => ({
        controlId: m.controlId,
        frameworkId: m.frameworkId,
        mappingStatus: m.mappingStatus,
      })),
    })
  }

  public async toggle({ request, response }: HttpContext) {
    const { controlId, frameworkId, mappingStatus } = await request.validateUsing(
      toggleMappingValidator
    )
    const service = new MappingService()
    await service.setMapping(controlId, frameworkId, mappingStatus as MappingStatus)
    return response.redirect().toRoute('normas-controles.mapeo')
  }
}

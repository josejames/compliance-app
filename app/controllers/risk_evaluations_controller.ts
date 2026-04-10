import RiskEvaluationService from '#services/risk_evaluation_service'
import RiskEvaluationTransformer from '#transformers/risk_evaluation_transformer'
import { createEvaluationValidator, updateEvaluationValidator } from '#validators/risk_evaluation'
import type { HttpContext } from '@adonisjs/core/http'

export default class RiskEvaluationsController {
  public async index({ inertia }: HttpContext) {
    const service = new RiskEvaluationService()
    const evaluations = await service.all()
    return inertia.render('dashboard/risks/evaluation', {
      evaluations: evaluations.map((e) => new RiskEvaluationTransformer(e).toObject()),
    })
  }

  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createEvaluationValidator)
    const service = new RiskEvaluationService()
    await service.create(payload)
    return response.redirect().toRoute('riesgos.evaluacion')
  }

  public async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateEvaluationValidator)
    const service = new RiskEvaluationService()
    await service.update(params.id, payload)
    return response.redirect().toRoute('riesgos.evaluacion')
  }

  public async destroy({ response, params }: HttpContext) {
    const service = new RiskEvaluationService()
    await service.destroy(params.id)
    return response.redirect().toRoute('riesgos.evaluacion')
  }
}

import RiskService from '#services/risk_service'
import RiskTransformer from '#transformers/risk_transformer'
import { createRiskValidator, updateRiskValidator } from '#validators/risk'
import type { HttpContext } from '@adonisjs/core/http'

export default class RisksController {
  /**
   * Render the risks overview page with aggregated stats.
   */
  public async index({ inertia }: HttpContext) {
    const service = new RiskService()
    const risks = await service.all()

    return inertia.render('dashboard/risks', {
      risks: risks.map((r) => new RiskTransformer(r).toObject()),
    })
  }

  /**
   * Render the risk register page.
   */
  public async register({ inertia }: HttpContext) {
    const service = new RiskService()
    const risks = await service.all()

    return inertia.render('dashboard/risks/register', {
      risks: risks.map((r) => new RiskTransformer(r).toObject()),
    })
  }

  /**
   * Create a new risk.
   */
  public async store({ request, response }: HttpContext) {
    const service = new RiskService()
    const payload = await request.validateUsing(createRiskValidator)
    await service.create(payload)
    return response.redirect().toRoute('riesgos.registro')
  }

  /**
   * Update an existing risk.
   */
  public async update({ request, response, params }: HttpContext) {
    const service = new RiskService()
    const payload = await request.validateUsing(updateRiskValidator)
    await service.update(params.id, payload)
    return response.redirect().toRoute('riesgos.registro')
  }

  /**
   * Delete a risk.
   */
  public async destroy({ response, params }: HttpContext) {
    const service = new RiskService()
    await service.destroy(params.id)
    return response.redirect().toRoute('riesgos.registro')
  }
}

import RiskService from '#services/risk_service'
import RiskTransformer from '#transformers/risk_transformer'
import { createRiskValidator, updateRiskValidator } from '#validators/risk'
import db from '@adonisjs/lucid/services/db'
import type { HttpContext } from '@adonisjs/core/http'

export default class RisksController {
  public async index({ inertia }: HttpContext) {
    const service = new RiskService()
    const risks = await service.all()

    const [evalCounts] = await db.from('risk_evaluations').count('* as total')
    const [evalInProgress] = await db.from('risk_evaluations').where('status', 'in-progress').count('* as total')
    const [mitTotal] = await db.from('mitigation_actions').count('* as total')
    const [mitCompleted] = await db.from('mitigation_actions').where('status', 'completed').count('* as total')

    return inertia.render('dashboard/risks', {
      risks: risks.map((r) => new RiskTransformer(r).toObject()),
      evalStats: {
        total: Number(evalCounts.total),
        inProgress: Number(evalInProgress.total),
      },
      mitStats: {
        total: Number(mitTotal.total),
        completed: Number(mitCompleted.total),
      },
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

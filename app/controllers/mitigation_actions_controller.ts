import MitigationActionService from '#services/mitigation_action_service'
import MitigationActionTransformer from '#transformers/mitigation_action_transformer'
import RiskService from '#services/risk_service'
import RiskTransformer from '#transformers/risk_transformer'
import { createMitigationValidator, updateMitigationValidator } from '#validators/mitigation_action'
import type { HttpContext } from '@adonisjs/core/http'

export default class MitigationActionsController {
  public async index({ inertia }: HttpContext) {
    const service = new MitigationActionService()
    const riskService = new RiskService()
    const [actions, risks] = await Promise.all([service.all(), riskService.all()])
    return inertia.render('dashboard/risks/mitigation', {
      actions: actions.map((a) => {
        const transformed = new MitigationActionTransformer(a).toObject()
        return {
          ...transformed,
          riskTitle: a.risk?.title ?? '',
          riskCode: a.risk?.code ?? '',
          currentLevel: a.risk?.level ?? 'medium',
          currentScore: a.risk?.score ?? 0,
        }
      }),
      risks: risks.map((r) => new RiskTransformer(r).toObject()),
    })
  }

  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createMitigationValidator)
    const service = new MitigationActionService()
    await service.create(payload)
    return response.redirect().toRoute('riesgos.mitigacion')
  }

  public async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateMitigationValidator)
    const service = new MitigationActionService()
    await service.update(params.id, payload)
    return response.redirect().toRoute('riesgos.mitigacion')
  }

  public async destroy({ response, params }: HttpContext) {
    const service = new MitigationActionService()
    await service.destroy(params.id)
    return response.redirect().toRoute('riesgos.mitigacion')
  }
}

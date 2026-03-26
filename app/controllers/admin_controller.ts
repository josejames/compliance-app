import Role from '#models/role'
import User from '#models/user'
import RoleTransformer from '#transformers/role_transformer'
import UserTransformer from '#transformers/user_transformer'
import { createUpdateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  /**
   * Render the user management page.
   */
  public async index({ inertia }: HttpContext) {
    const [roles, users] = await Promise.all([Role.all(), User.all()])

    return inertia.render('dashboard/administration/users-roles', {
      roles: roles.map((role) => new RoleTransformer(role).toObject()),
      users: users.map((user) => new UserTransformer(user).toObject()),
    })
  }

  /**
   * Update an existing user's profile data (name, email, role, department, status).
   */
  public async update({ request, response, params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validateUsing(createUpdateUserValidator(user.id))

    user.merge({
      fullName: payload.fullName ?? null,
      email: payload.email,
      role: payload.role,
      department: payload.department ?? null,
      status: payload.status ?? user.status,
    })

    await user.save()

    response.redirect().toRoute('administracion.usuarios-roles')
  }
}

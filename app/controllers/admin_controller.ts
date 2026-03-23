import Role from '#models/role'
import User from '#models/user'
import RoleTransformer from '#transformers/role_transformer'
import UserTransformer from '#transformers/user_transformer'
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
}

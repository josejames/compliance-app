import type Role from '#models/role'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class RoleTransformer extends BaseTransformer<Role> {
  toObject() {
    return this.pick(this.resource, ['id', 'slug', 'name', 'description', 'sortOrder'])
  }
}

import { RoleSchema } from '#database/schema'

export default class Role extends RoleSchema {
  /**
   * Returns a human-readable label for the role.
   * Useful in views and serialised responses.
   */
  get label(): string {
    return this.name
  }
}

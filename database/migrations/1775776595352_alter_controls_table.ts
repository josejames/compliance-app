import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'control_framework'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('mapping_status', ['full', 'partial', 'none']).notNullable().defaultTo('full')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('mapping_status')
    })
  }
}

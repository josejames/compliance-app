import { BaseSeeder } from '@adonisjs/lucid/seeders'
import app from '@adonisjs/core/services/app'

/**
 * Main database seeder.
 *
 * Runs all seeders in dependency order:
 *   1. RoleSeeder      – must run first so role slugs exist before users reference them
 *   2. FrameworkSeeder – seed initial compliance frameworks
 *   3. ControlSeeder   – seed initial internal controls catalog
 *   4. UserSeeder      – development / test only, seeds sample users
 *
 * Run with:
 *   node ace db:seed
 *
 * Run a single seeder with:
 *   node ace db:seed --files="database/seeders/framework_seeder.ts"
 */
export default class MainSeeder extends BaseSeeder {
  async run() {
    const { default: RoleSeeder } = await import('./role_seeder.js')
    await new RoleSeeder(this.client).run()

    const { default: FrameworkSeeder } = await import('./framework_seeder.js')
    await new FrameworkSeeder(this.client).run()

    const { default: ControlSeeder } = await import('./control_seeder.js')
    await new ControlSeeder(this.client).run()

    const { default: MappingSeeder } = await import('./mapping_seeder.js')
    await new MappingSeeder(this.client).run()

    const { default: RiskEvaluationSeeder } = await import('./risk_evaluation_seeder.js')
    await new RiskEvaluationSeeder(this.client).run()

    const { default: MitigationActionSeeder } = await import('./mitigation_action_seeder.js')
    await new MitigationActionSeeder(this.client).run()

    /**
     * UserSeeder contains sample data and must only run in non-production
     * environments.
     */
    if (app.nodeEnvironment !== 'production') {
      const { default: UserSeeder } = await import('./user_seeder.js')
      await new UserSeeder(this.client).run()
    }
  }
}

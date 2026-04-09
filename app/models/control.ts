import { ControlSchema } from '#database/schema'

export default class Control extends ControlSchema {
  get code(): string {
    return `CTL-${String(this.id).padStart(3, '0')}`
  }

  get frameworkList(): string[] {
    if (!this.frameworks) return []
    return this.frameworks
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean)
  }
}
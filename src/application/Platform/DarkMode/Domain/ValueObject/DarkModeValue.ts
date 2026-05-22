import { DarkModeDomainError } from '../DarkModeDomainError'

export class DarkModeValue {
  private constructor(public readonly value: string) {}

  static readonly AUTO = new DarkModeValue('auto')
  static readonly LIGHT = new DarkModeValue('light')
  static readonly DARK = new DarkModeValue('dark')

  static fromString(input: string): DarkModeValue {
    switch (input) {
      case 'auto':
        return DarkModeValue.AUTO
      case 'light':
        return DarkModeValue.LIGHT
      case 'dark':
        return DarkModeValue.DARK
      default:
        throw new DarkModeDomainError(`Invalid DarkModeValue: ${input}`)
    }
  }

  toString(): string {
    return this.value
  }

  equals(other: DarkModeValue | string): boolean {
    if (typeof other === 'string') {
      return this.value === other
    }
    return this.value === other.value
  }

  getQuasarFriendlyValue(): 'auto' | boolean {
    switch (this.value) {
      case 'auto':
        return 'auto'
      case 'light':
        return false
      case 'dark':
        return true
      default:
        throw new DarkModeDomainError(`Cannot set Quasar Dark Mode value.`)
    }
  }

  isDarkActive(): boolean {
    switch (this.value) {
      case 'dark':
        return true
      case 'light':
        return false
      case 'auto':
        return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
      default:
        throw new DarkModeDomainError(`Invalid DarkModeValue: ${this.value}`)
    }
  }
}

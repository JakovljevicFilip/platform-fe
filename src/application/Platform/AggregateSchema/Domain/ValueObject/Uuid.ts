/**
 * Uuid
 * -----------------------------------------------------------------------------
 * Value object representing a UUID.
 * Enforces validity and provides a consistent interface across aggregates.
 */

export class Uuid {
  public readonly value: string

  constructor(value: string) {
    if (!Uuid.isValid(value)) {
      throw new Error(`Invalid UUID: ${value}`)
    }
    this.value = value
  }

  static generate(): Uuid {
    return new Uuid(crypto.randomUUID())
  }

  static fromString(input: string): Uuid {
    return new Uuid(input)
  }

  static isValid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
  }

  toString(): string {
    return this.value
  }

  equals(other: Uuid): boolean {
    return this.value === other.toString()
  }
}

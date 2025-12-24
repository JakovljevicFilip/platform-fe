/**
 * Input Validation Helper
 * -----------------------------------------------------------------------------
 * Declarative UI-level validation rules for a specific field, form, or use-case.
 *
 * USAGE
 * - Consumed by Vue components to validate form inputs.
 * - Provides Quasar-compatible `rules` for inputs.
 * - Exposes helper methods (e.g. `isValid`) to derive submit eligibility.
 *
 * SCOPE & PLACEMENT
 * - Input helpers are stored inside an `Input/` directory belonging to
 *   their consumer(s).
 * - Nested components may consume input helpers from parent directories.
 * - Parent components must not depend on input helpers defined in child directories.
 * - When multiple sibling components share the same input rules, the helper must
 *   be placed at their nearest common parent directory.
 *
 * ARCHITECTURAL NOTES
 * - Input helpers are Application-layer utilities.
 * - They do not define or enforce domain invariants.
 * - They may reference Domain settings or constants to align UI constraints.
 * - Domain rules remain authoritative and are enforced by Aggregates.
 */

export type InputRule<T> = (value: T) => true | string

export interface InputFieldValidation<T> {
  rules: InputRule<T>[]
  isValid(value: T): boolean
}

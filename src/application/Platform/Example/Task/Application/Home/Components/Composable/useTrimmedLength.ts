/**
 * Composable
 * -----------------------------------------------------------------------------
 * Vue composable encapsulating reusable, UI-level reactive behavior.
 *
 * USAGE
 * - Consumed by Vue components to share and reuse reactive logic.
 * - May accept reactive sources and configuration parameters from callers.
 * - May read domain-layer constants or rules to drive UI behavior.
 *
 * SCOPE & PLACEMENT
 * - Composables are stored inside a `Composables/` directory belonging to
 *   their consumer(s).
 * - When multiple sibling components consume the same composable, it must be
 *   placed at the nearest common parent directory.
 * - Nested components may consume composables from parent directories.
 * - Parent components must not depend on composables defined in child directories.
 *
 * ARCHITECTURAL NOTES
 * - Composables are Application-layer utilities.
 * - They do not define or enforce domain rules.
 */

import { computed, type Ref } from 'vue'

export function useTrimmedLength(
  source: Ref<string>,
  options?: {
    min?: number
    max?: number
  },
) {
  const trimmedLength = computed(() => source.value.trim().length)

  const isTooShort = computed(() =>
    options?.min !== undefined ? trimmedLength.value < options.min : false,
  )

  const isTooLong = computed(() =>
    options?.max !== undefined ? trimmedLength.value > options.max : false,
  )

  const isValidLength = computed(() => !isTooShort.value && !isTooLong.value)

  return {
    trimmedLength,
    isTooShort,
    isTooLong,
    isValidLength,
  }
}

/**
 * Composable
 * -----------------------------------------------------------------------------
 * Vue composable encapsulating reusable, UI-level reactive behavior.
 *
 * USAGE
 * - Manages async submission state (loading, disabled, error handling).
 * - Consumed by Vue components performing async actions.
 * - Wraps async functions to provide consistent UI state handling.
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
 * - They may be combined with validation helpers to control UI flow.
 */

import { ref, computed } from 'vue'

export function useAsyncSubmitState() {
  const isSubmitting = ref(false)
  const error = ref<Error | null>(null)

  const canInteract = computed(() => !isSubmitting.value)

  async function run<T>(action: () => Promise<T>): Promise<T | undefined> {
    if (isSubmitting.value) return

    try {
      isSubmitting.value = true
      error.value = null
      return await action()
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      throw error.value
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    isSubmitting,
    canInteract,
    error,
    run,
  }
}

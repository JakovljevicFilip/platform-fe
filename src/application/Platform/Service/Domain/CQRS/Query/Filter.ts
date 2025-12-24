/**
 * Filter
 * -----------------------------------------------------------------------------
 * Read-side application abstraction for transforming query results.
 * Applies additional in-memory constraints without performing I/O
 * or mutating domain state.
 */
export interface Filter<T> {
  filter(items: T[]): T[]
}

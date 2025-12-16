/**
 * StorageBoot
 * -----------------------------------------------------------------------------
 * Optional storage driver boot contract.
 * Some drivers require initialization; others do not.
 */
export interface StorageBoot {
  boot(): Promise<void> | void
}

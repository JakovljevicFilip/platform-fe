export interface DexieORM {
  id: string
  [key: string]: unknown
}

export interface DexieRepository {
  create(data: DexieORM): Promise<string>
  update(data: DexieORM): Promise<string>
  delete(id: string): Promise<string>
  deleteMultiple(ids: string[]): Promise<string[]>

  list(): Promise<DexieORM[]>
  findOneById(id: string): Promise<DexieORM | null>
  where(index: string, value: unknown): Promise<DexieORM[]>

  /**
   * Switch DB context for this client instance.
   */
  changeToPlatformClient(): void
  changeToMicroserviceClient(): void
}

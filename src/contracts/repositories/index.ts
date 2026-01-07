export interface IRepository<T> {
  create: (entity: T) => Promise<void | Error>
  update: (entity: T) => Promise<void | Error>
  delete: (id: string) => Promise<void | Error>
  findById(id: string): Promise<T | undefined>;
}

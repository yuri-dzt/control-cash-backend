export type Create<T> = Omit<T, "id" | "created_at" | "updated_at"> & {
  id?: string
  created_at?: number
  updated_at?: number
}

export type Update<T> = Partial<Create<T>>

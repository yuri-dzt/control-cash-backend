
export interface FindByAccountResponse {
  account_password?: string
  account_id: string
}

export interface IAccountRepository {
  findByEmail: (email: string) => Promise<FindByAccountResponse | undefined>
}

export interface FindByAccountResponse {
  account_password?: string
  account_type: 'SUPER_ADMIN' | 'SUPPORT' | 'USER' | 'ADMIN' | 'CONTACT'
  account_id: string
}

export interface IAccountRepository {
  findByEmail: (email: string) => Promise<FindByAccountResponse | undefined>
}
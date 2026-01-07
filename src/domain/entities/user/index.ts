import { UserRole } from './enum'
import { Account, AccountProps } from '../../../shared/account'
import { randomUUID } from 'node:crypto'

export type IUser = AccountProps & {
  role: UserRole
};

export type UserProps = Omit<IUser, "id" | 'created_at'> & {
  id?: string
  created_at?: number
}

export type UserCollection = User[]

export class User extends Account<IUser> {
  get role() {
    return this.props.role
  }

  constructor(props: UserProps) {
    super({
      ...props,
      id: props.id || randomUUID(),
      created_at: props.created_at || Date.now(),
    })
  }

  public updateRole(role: UserRole) {
    this.props.role = role
    this.props.updated_at = Date.now()
  }
}

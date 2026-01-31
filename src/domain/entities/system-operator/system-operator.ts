import { v4 as uuidv4 } from 'uuid';

import { SystemOperatorRole } from './enum'
import { Account, AccountProps } from '../../../shared/account';

export type ISystemOperator = AccountProps & {
  role: SystemOperatorRole
  is_active: boolean
};

export type SystemOperatorProps = Omit<ISystemOperator, "id" | 'created_at'> & {
  id?: string
  created_at?: number
}

export type UpdateSystemOperatorProps = Omit<ISystemOperator, "id" | 'name' | 'email' | 'password' | 'is_active' | 'role' | 'created_at' | 'updated_at'> & {
  name?: string
  email?: string
  password?: string
  is_active?: boolean
  role?: SystemOperatorRole
}

export type SystemOperatorsCollection = SystemOperator[]

export class SystemOperator extends Account<ISystemOperator> {
  get role() {
    return this.props.role
  }

  get is_active() {
    return this.props.is_active
  }

  constructor(props: SystemOperatorProps) {
    super({
      ...props,
      id: props.id || uuidv4(),
      created_at: props.created_at || Date.now(),
    })
  }

  public update({ name, email, password, is_active, role }: UpdateSystemOperatorProps) {
    if (name) this.props.name = name
    if (email) this.props.email = email
    if (password) this.props.password = password
    if (is_active !== undefined) this.props.is_active = is_active
    if (role) this.props.role = role

    this.props.updated_at = Date.now()
  }
}

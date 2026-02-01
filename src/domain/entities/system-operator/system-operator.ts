import { v4 as uuidv4 } from 'uuid';

import { SystemOperatorRole } from './enum'
import { Create, Update } from '../../../shared/utils';
import { Account, AccountProps } from '../../../shared/account';

export type ISystemOperator = AccountProps & {
  role: SystemOperatorRole
};

export type SystemOperatorProps = Create<ISystemOperator>
export type UpdateSystemOperatorProps = Update<ISystemOperator>

export type SystemOperatorsCollection = SystemOperator[]

export class SystemOperator extends Account<ISystemOperator> {
  get role() {
    return this.props.role
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

export type AccountProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: number;
  updated_at?: number;
};

export abstract class Account<T extends AccountProps> {
  protected props: T;

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  protected constructor(props: T) {
    this.props = props;
  }

  public updateName(name: string) {
    this.props.name = name;
    this.props.updated_at = Date.now();
  }

  public updateEmail(email: string) {
    this.props.email = email;
    this.props.updated_at = Date.now();
  }

  public updatePassword(password: string) {
    this.props.password = password;
    this.props.updated_at = Date.now();
  }
}

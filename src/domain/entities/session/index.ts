import { randomUUID } from "crypto";

export interface SessionProps {
  id: string;
  user_id: string;
  refresh_token: string;
  expires_at: number;
  created_at: number;
}

export interface UpdateSessionProps {
  refresh_token?: string;
  expires_at?: number;
}

export type SessionCollection = Session[];

export class Session {
  private readonly props: SessionProps;

  get id() {
    return this.props.id;
  }

  get user_id() {
    return this.props.user_id;
  }

  get refresh_token() {
    return this.props.refresh_token;
  }

  get expires_at() {
    return this.props.expires_at;
  }

  get created_at() {
    return this.props.created_at;
  }

  constructor(
    props: Omit<SessionProps, "id" | "created_at"> & {
      id?: string;
      created_at?: number;
    }
  ) {
    this.props = {
      id: props.id || randomUUID(),
      user_id: props.user_id,
      refresh_token: props.refresh_token,
      expires_at: props.expires_at,
      created_at: props.created_at || Date.now(),
    };
  }

  public update(props: UpdateSessionProps) {
    if (props.refresh_token) {
      this.props.refresh_token = props.refresh_token
    }

    if (props.expires_at) {
      this.props.expires_at = props.expires_at
    }
  }
}

import { Session, SessionProps } from "../../../src/domain/entities/session";

export const makeSession = (override?: Partial<SessionProps>) => {
  return new Session({
    id: "1",
    user_id: "1",
    refresh_token: "refresh_token",
    expires_at: Date.now() + 1000 * 60 * 60 * 24 * 7,
    ...override,
  });
};

import { UserRole } from "../../../src/domain/entities/user/enum";
import { User, UserProps } from "../../../src/domain/entities/user";

export const makeUser = (override?: Partial<UserProps>) => {
  return new User({
    id: "1",
    email: "user@gmail.com",
    name: "User",
    password: "1234",
    role: "USER" as UserRole,
    ...override,
  });
};

import { describe, it, expect } from "vitest";

import { User } from "../../../src/domain/entities/user/index";
import { UserRole } from "../../../src/domain/entities/user/enum";

describe("User", () => {
  it("should be able to create user", () => {
    const user = new User({
      name: "John Doe",
      email: "VYXr9@example.com",
      role: UserRole.USER,
      password: "123456",
    })

    expect(user).toBeInstanceOf(User);
  });
});

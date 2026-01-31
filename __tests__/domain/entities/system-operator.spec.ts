import { describe, it, expect } from "vitest";

import { SystemOperatorRole } from "../../../src/domain/entities/system-operator/enum";
import { SystemOperator } from "../../../src/domain/entities/system-operator/system-operator";

describe("SystemOperator", () => {
  it("should be able to create a super admin", () => {
    const systemOperator = new SystemOperator({
      name: 'John Doe',
      email: 'nHd1A@example.com',
      password: '123456',
      role: SystemOperatorRole.SUPER_ADMIN,
      is_active: true,
    })

    expect(systemOperator).toBeInstanceOf(SystemOperator);
    expect(systemOperator.role).toBe(SystemOperatorRole.SUPER_ADMIN);
  });

  it("should be able to create a support", () => {
    const systemOperator = new SystemOperator({
      name: 'John Doe',
      email: 'nHd1A@example.com',
      password: '123456',
      role: SystemOperatorRole.SUPPORT,
      is_active: true,
    })

    expect(systemOperator).toBeInstanceOf(SystemOperator);
    expect(systemOperator.role).toBe(SystemOperatorRole.SUPPORT);
  })
});

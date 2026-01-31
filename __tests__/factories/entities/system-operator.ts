import { SystemOperatorRole } from "../../../src/domain/entities/system-operator/enum";
import { SystemOperator, SystemOperatorProps } from "../../../src/domain/entities/system-operator/system-operator";

export const makeSystemOperator = (override?: Partial<SystemOperatorProps>) => {
  return new SystemOperator({
    id: "1",
    email: "systemoperator@gmail.com",
    name: "System Operator",
    password: "1234",
    role: "SUPER_ADMIN" as SystemOperatorRole,
    is_active: true,
    ...override,
  });
};

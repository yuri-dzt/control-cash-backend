import { describe, beforeEach, it, expect } from "vitest";

import { makeSystemOperator } from "../../factories/entities/system-operator";
import { SystemOperatorRole } from "../../../src/domain/entities/system-operator/enum";
import { InMemorySystemOperatorRepository } from "../../mocks/repositories/system-operator";
import { DeleteSystemOperatorUseCase } from "../../../src/app/use-cases/system-operator/delete";
import { DeleteSystemOperatorUseCaseError } from "../../../src/app/use-cases/system-operator/delete/error";

describe("DeleteSystemOperatorUseCase", () => {
  let systemOperatorRepo: InMemorySystemOperatorRepository;
  let sut: DeleteSystemOperatorUseCase;

  beforeEach(() => {
    systemOperatorRepo = new InMemorySystemOperatorRepository();
    sut = new DeleteSystemOperatorUseCase(systemOperatorRepo);
  });

  it("should not be able to delete if admin not found", async () => {
    const response = await sut.execute({ admin_id: "invalid-id", id: "invalid-id" });

    expect(response).toBeInstanceOf(DeleteSystemOperatorUseCaseError);
    expect((response as DeleteSystemOperatorUseCaseError).message).toEqual("Error on delete system operator: Admin not found");
  })

  it("should not be able to delete if admin does not have permission", async () => {
    const admin = makeSystemOperator({ role: SystemOperatorRole.SUPPORT });
    systemOperatorRepo.system_operators.push(admin);

    const response = await sut.execute({ admin_id: admin.id, id: "invalid-id" });

    expect(response).toBeInstanceOf(DeleteSystemOperatorUseCaseError);
    expect((response as DeleteSystemOperatorUseCaseError).message).toEqual("Error on delete system operator: Admin does not have permission to delete");
  })

  it("should not be able to delete if system operator not found", async () => {
    const admin = makeSystemOperator({ role: SystemOperatorRole.SUPER_ADMIN });
    systemOperatorRepo.system_operators.push(admin);

    const response = await sut.execute({ admin_id: admin.id, id: "invalid-id" });

    expect(response).toBeInstanceOf(DeleteSystemOperatorUseCaseError);
    expect((response as DeleteSystemOperatorUseCaseError).message).toEqual("Error on delete system operator: System operator not found");
  })

  it("should delete system operator", async () => {
    const admin = makeSystemOperator({ id: "1", role: SystemOperatorRole.SUPER_ADMIN });
    systemOperatorRepo.system_operators.push(admin);

    const operator = makeSystemOperator({ id: "2" });
    systemOperatorRepo.system_operators.push(operator);

    const response = await sut.execute({ admin_id: admin.id, id: operator.id });

    expect(response).toBeUndefined();
    expect(systemOperatorRepo.system_operators).toHaveLength(1);
  })
});

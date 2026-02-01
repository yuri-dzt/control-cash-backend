import { describe, beforeEach, it, expect } from "vitest";

import { HashServiceMock } from "../../mocks/services/hash";
import { IHashService } from "../../../src/contracts/services/hash";
import { InMemoryAccountRepository } from "../../mocks/repositories/account";
import { makeSystemOperator } from "../../factories/entities/system-operator";
import { InMemorySystemOperatorRepository } from "../../mocks/repositories/system-operator";
import { SystemOperator } from "../../../src/domain/entities/system-operator/system-operator";
import { UpdateSystemOperatorUseCase } from "../../../src/app/use-cases/system-operator/update";
import { UpdateSystemOperatorUseCaseError } from "../../../src/app/use-cases/system-operator/update/error";

describe("UpdateSystemOperatorUseCase", () => {
  let systemOperatorRepo: InMemorySystemOperatorRepository;
  let accountRepo: InMemoryAccountRepository;
  let hashService: IHashService;
  let sut: UpdateSystemOperatorUseCase;

  beforeEach(() => {
    systemOperatorRepo = new InMemorySystemOperatorRepository();
    accountRepo = new InMemoryAccountRepository();
    hashService = new HashServiceMock()
    sut = new UpdateSystemOperatorUseCase(systemOperatorRepo, accountRepo, hashService);
  });

  it('should not be able to update if system operator not found', async () => {
    const response = await sut.execute({ id: 'invalid-id' })

    expect(response).toBeInstanceOf(UpdateSystemOperatorUseCaseError);
    expect((response as UpdateSystemOperatorUseCaseError).message).toEqual('Error on update system operator: System operator not found');
  })

  it("should not be able update email if already exists an account with this email", async () => {
    const operator1 = makeSystemOperator({ email: 'systemoperator1@gmail.com' })
    accountRepo.system_operators.push(operator1)

    const operator2 = makeSystemOperator({ email: 'systemoperator2@gmail.com' })
    systemOperatorRepo.system_operators.push(operator2)

    const response = await sut.execute({ id: operator2.id, email: 'systemoperator1@gmail.com' })

    expect(response).toBeInstanceOf(UpdateSystemOperatorUseCaseError);
    expect((response as UpdateSystemOperatorUseCaseError).message).toEqual('Error on update system operator: Email already used');
  })

  it("should update system operator", async () => {
    const operator = makeSystemOperator()
    systemOperatorRepo.system_operators.push(operator)

    const response = await sut.execute({
      id: operator.id,
      name: 'New Name',
      email: 'new_email@gmail',
      password: 'new_password',
      role: 'ADMIN'
    })

    expect((response as SystemOperator).name).toEqual('New Name');
    expect((response as SystemOperator).email).toEqual('new_email@gmail');
    expect((response as SystemOperator).role).toEqual('ADMIN');
    expect((response as SystemOperator).password).not.toEqual('new_password');
  })
});

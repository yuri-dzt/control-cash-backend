import { describe, beforeEach, it, expect } from "vitest";

import { HashServiceMock } from "../../mocks/services/hash";
import { IHashService } from "../../../src/contracts/services/hash";
import { InMemoryAccountRepository } from "../../mocks/repositories/account";
import { makeSystemOperator } from "../../factories/entities/system-operator";
import { InMemorySystemOperatorRepository } from "../../mocks/repositories/system-operator";
import { SystemOperator } from "../../../src/domain/entities/system-operator/system-operator";
import { CreateSystemOperatorUseCase } from "../../../src/app/use-cases/system-operator/create";
import { CreateSystemOperatorUseCaseError } from "../../../src/app/use-cases/system-operator/create/error";

describe("CreateSystemOperatorUseCase", () => {
  let systemOperatorRepo: InMemorySystemOperatorRepository;
  let accountRepo: InMemoryAccountRepository;
  let hashService: IHashService;
  let sut: CreateSystemOperatorUseCase;

  beforeEach(() => {
    systemOperatorRepo = new InMemorySystemOperatorRepository();
    accountRepo = new InMemoryAccountRepository();
    hashService = new HashServiceMock()
    sut = new CreateSystemOperatorUseCase(systemOperatorRepo, accountRepo, hashService);
  });

  it("should not be able to create a user if already exists an user with this email", async () => {
    const user = makeSystemOperator({ email: 'systemoperator@gmail.com' })
    accountRepo.system_operators.push(user)

    const response = await sut.execute({
      name: "John Doe",
      email: "systemoperator@gmail.com",
      password: "123456",
      role: "SUPER_ADMIN",
    })

    expect(response).toBeInstanceOf(CreateSystemOperatorUseCaseError);
    expect((response as CreateSystemOperatorUseCaseError).message).toEqual("Error on create system operator: Email already used");
  })

  it("should create an admin", async () => {
    const response = await sut.execute({
      name: "John Doe",
      email: "5oB3O@example.com",
      password: "123456",
      role: "SUPER_ADMIN",
    })

    expect((response as SystemOperator).name).toEqual("John Doe");
    expect((response as SystemOperator).email).toEqual("5oB3O@example.com");
    expect((response as SystemOperator).role).toEqual("SUPER_ADMIN");
  });
});

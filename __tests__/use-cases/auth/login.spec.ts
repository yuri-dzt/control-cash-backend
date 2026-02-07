import { describe, beforeEach, it, expect } from "vitest";

import { JwtServiceMock } from "../../mocks/services/jwt";
import { HashServiceMock } from "../../mocks/services/hash";
import { IJwtService } from "../../../src/contracts/services/jwt";
import { IHashService } from "../../../src/contracts/services/hash";
import { LoginUseCase } from "../../../src/app/use-cases/auth/login";
import { InMemoryAccountRepository } from "../../mocks/repositories/account";
import { makeSystemOperator } from "../../factories/entities/system-operator";
import { LoginUseCaseError } from "../../../src/app/use-cases/auth/login/error";

describe("LoginUseCase", () => {
  let accountRepo: InMemoryAccountRepository;
  let jwtService: IJwtService;
  let hashService: IHashService;
  let sut: LoginUseCase;

  beforeEach(() => {
    accountRepo = new InMemoryAccountRepository();
    jwtService = new JwtServiceMock()
    hashService = new HashServiceMock()
    sut = new LoginUseCase(accountRepo, jwtService, hashService);
  });

  it("should not be able to login if not exists an user with this email", async () => {
    const response = await sut.execute({
      email: "systemoperator@gmail.com",
      password: "123456",
    })

    expect(response).toBeInstanceOf(LoginUseCaseError);
    expect((response as LoginUseCaseError).message).toEqual("Error on login: Email or password incorrect!!");
  })

  it("should not be able to login if password is incorrect", async () => {
    const user = makeSystemOperator({ email: 'systemoperator@gmail.com', password: '123456' })
    accountRepo.system_operators.push(user)

    const response = await sut.execute({
      email: "systemoperator@gmail.com",
      password: "invalid-password",
    })

    expect(response).toBeInstanceOf(LoginUseCaseError);
    expect((response as LoginUseCaseError).message).toEqual("Error on login: Email or password incorrect!");
  })

  it("should be able to login", async () => {
    const user = makeSystemOperator({ email: 'systemoperator@gmail.com', password: '123456' })
    accountRepo.system_operators.push(user)

    const response = await sut.execute({
      email: "systemoperator@gmail.com",
      password: "123456",
    })

    expect(response).toHaveProperty("access_token");
  })
});

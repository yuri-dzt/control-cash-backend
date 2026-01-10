import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { HashServiceMock } from "../../mocks/services/hash";
import { JwtServiceMock } from "../../mocks/services/jwt";
import { IJwtService } from "../../../src/contracts/services/jwt";
import { IHashService } from "../../../src/contracts/services/hash";
import { LoginUseCase } from "../../../src/app/use-cases/auth/login";
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { LoginUseCaseError } from "../../../src/app/use-cases/auth/login/error";

describe("LoginUseCase", () => {
  let userRepo: InMemoryUserRepository;
  let jwtService: IJwtService;
  let hashService: IHashService;
  let sut: LoginUseCase;

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    jwtService = new JwtServiceMock();
    hashService = new HashServiceMock();
    sut = new LoginUseCase(userRepo, jwtService, hashService);
  });

  it("should not be able to login if user not exists", async () => {
    const response = await sut.execute({
      email: "user@gmail",
      password: "123456",
    });

    expect(response).toBeInstanceOf(LoginUseCaseError);
    expect(response).toEqual(new LoginUseCaseError("Unauthorized!"));
  })

  it("should be able to login", async () => {
    const user = makeUser();
    userRepo.create(user);

    const response = await sut.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).not.toBeInstanceOf(Error);
    expect(response).toHaveProperty("access_token");
    expect(response).toHaveProperty("account_id");
    expect(response).toHaveProperty("account_type");
  });
});

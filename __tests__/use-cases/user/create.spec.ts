import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { User } from "../../../src/domain/entities/user";
import { HashServiceMock } from "../../mocks/services/hash";
import { IHashService } from "../../../src/contracts/services/hash";
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { CreateUserUseCase } from "../../../src/app/use-cases/user/create";
import { CreateUserUseCaseError } from "../../../src/app/use-cases/user/create/error";

describe("CreateUserUseCase", () => {
  let userRepo: InMemoryUserRepository;
  let hashService: IHashService;
  let sut: CreateUserUseCase;

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    hashService = new HashServiceMock()
    sut = new CreateUserUseCase(userRepo, hashService);
  });

  it("should not be able to create a user if already exists an user with this email", async () => {
    const user = makeUser({ email: 'user@gmail.com' })
    userRepo.create(user)

    const response = await sut.execute({
      name: "John Doe",
      email: "user@gmail.com",
      password: "123456",
    })

    expect(response).toBeInstanceOf(CreateUserUseCaseError);
    expect((response as CreateUserUseCaseError).message).toEqual("Error on create user: Already exists an user with this email!");
  })

  it("should create an admin", async () => {
    const response = await sut.execute({
      name: "John Doe",
      email: "5oB3O@example.com",
      password: "123456",
    })

    expect((response as User).name).toEqual("John Doe");
    expect((response as User).email).toEqual("5oB3O@example.com");
    expect((response as User).role).toEqual("USER");
  });
});

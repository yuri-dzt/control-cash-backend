import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { User } from "../../../src/domain/entities/user";
import { HashServiceMock } from "../../mocks/services/hash";
import { IHashService } from "../../../src/contracts/services/hash";
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { UpdateUserUseCase } from "../../../src/app/use-cases/user/update";
import { UpdateUserUseCaseError } from "../../../src/app/use-cases/user/update/error";

describe("UpdateUserUseCase", () => {
  let userRepo: InMemoryUserRepository;
  let hashService: IHashService;
  let sut: UpdateUserUseCase;

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    hashService = new HashServiceMock()
    sut = new UpdateUserUseCase(userRepo, hashService);
  });

  it("should not be able to update if user does not exists", async () => {
    const response = await sut.execute({
      user_id: "1",
      name: "new name",
    })

    expect(response).toBeInstanceOf(UpdateUserUseCaseError);
    expect((response as UpdateUserUseCaseError).message).toEqual("Error on update user: User not found!");
  })

  it("should not be able to update email if already exists an user with this email", async () => {
    const user1 = makeUser()
    await userRepo.create(user1)

    const user2 = makeUser({
      email: "user2@gmail.com",
    })
    await userRepo.create(user2)

    const response = await sut.execute({
      user_id: user1.id,
      email: "user2@gmail.com",
    })

    expect(response).toBeInstanceOf(UpdateUserUseCaseError);
    expect((response as UpdateUserUseCaseError).message).toEqual("Error on update user: Already exists an user with this email!");
  })

  it("should be update an user", async () => {
    const user = makeUser()
    await userRepo.create(user)

    const response = await sut.execute({
      user_id: user.id,
      name: "new name",
      email: "newemail@example.com",
      password: "123456",
      role: "ADMIN",
    })

    expect((response as User).name).toEqual("new name");
    expect((response as User).email).toEqual("newemail@example.com");
    expect((response as User).role).toEqual("ADMIN")
  });
});

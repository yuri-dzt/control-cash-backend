import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { DeleteUserUseCase } from "../../../src/app/use-cases/user/delete";
import { DeleteUserUseCaseError } from "../../../src/app/use-cases/user/delete/error";

describe("DeleteUserUseCase", () => {
  let userRepo: InMemoryUserRepository;
  let sut: DeleteUserUseCase;

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    sut = new DeleteUserUseCase(userRepo);
  });

  it("should not be able to delete if user not exists", async () => {
    const response = await sut.execute({
      id: "1",
    })

    expect(response).toBeInstanceOf(DeleteUserUseCaseError);
    expect((response as DeleteUserUseCaseError).message).toEqual("Error on delete user: User not found!");
  })

  it("should be delete an user", async () => {
    const user1 = makeUser({
      id: '1',
      email: 'user1@gmail.com'
    })
    const user2 = makeUser({
      id: '2',
      email: 'user2@gmail.com'
    })
    await userRepo.create(user1)
    await userRepo.create(user2)

    const response = await sut.execute({
      id: user1.id,
    })

    expect(response).toBe(undefined)
    expect(userRepo.users.length).toEqual(1)
  });
});

import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { GetUsersUseCase } from "../../../src/app/use-cases/user/get";
import { InMemoryUserRepository } from "../../mocks/repositories/user";

describe("GetUsersUseCase", () => {
  let userRepo: InMemoryUserRepository;
  let sut: GetUsersUseCase;

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    sut = new GetUsersUseCase(userRepo);
  });

  it("should be return a empty array if not have users", async () => {
    const response = await sut.execute()

    expect(response).toHaveLength(0)
  })

  it("should be able to get a users", async () => {
    const user1 = makeUser({
      id: '1',
      email: "user1@gmail.com",
    })
    const user2 = makeUser({
      id: '2',
      email: "user2@gmail.com",
    })
    await userRepo.create(user1)
    await userRepo.create(user2)

    const response = await sut.execute()

    expect(response).toHaveLength(2)
  });
});

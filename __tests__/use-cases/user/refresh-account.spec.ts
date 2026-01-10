import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { User } from "../../../src/domain/entities/user";
import { HashServiceMock } from "../../mocks/services/hash";
import { IHashService } from "../../../src/contracts/services/hash";
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { RefreshAccountUseCase } from "../../../src/app/use-cases/user/refresh-account";
import { RefreshAccountUseCaseError } from "../../../src/app/use-cases/user/refresh-account/error";

describe("RefreshAccountUseCase", () => {
  let userRepo: InMemoryUserRepository;
  let hashService: IHashService;
  let sut: RefreshAccountUseCase;

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    hashService = new HashServiceMock()
    sut = new RefreshAccountUseCase(userRepo);
  });

  it("should not be able to refresh account if user not exists", async () => {
    const response = await sut.execute({
      id: "1",
    })

    expect(response).toBeInstanceOf(RefreshAccountUseCaseError);
    expect((response as RefreshAccountUseCaseError).message).toEqual("Error on refresh account: User not found!");
  })

  it("should be able to refresh account", async () => {
    const user = makeUser();
    userRepo.create(user);

    const response = await sut.execute({
      id: user.id,
    })

    expect(response).not.toBeInstanceOf(RefreshAccountUseCaseError);
    expect((response as User).id).toEqual(user.id);
  })
});

import { describe, beforeEach, it, expect } from "vitest";

import { makeSession } from "../../factories/entities/session";
import { GetSessionsUseCase } from "../../../src/app/use-cases/session/get";
import { InMemorySessionRepository } from "../../mocks/repositories/session";

describe("GetSessionsUseCase", () => {
  let sessionRepo: InMemorySessionRepository;
  let sut: GetSessionsUseCase;

  beforeEach(() => {
    sessionRepo = new InMemorySessionRepository();
    sut = new GetSessionsUseCase(sessionRepo);
  });

  it("should be return a empty array if not have sessions", async () => {
    const response = await sut.execute({ user_id: "1" })

    expect(response).toHaveLength(0)
  })

  it("should be able to get a sessions", async () => {
    const user1 = makeSession({
      id: '1',
      user_id: "1",
    })
    const user2 = makeSession({
      id: '2',
      user_id: "1",
    })
    const user3 = makeSession({
      id: '3',
      user_id: "3",
    })
    await sessionRepo.create(user1)
    await sessionRepo.create(user2)
    await sessionRepo.create(user3)

    const response = await sut.execute({
      user_id: "1",
    })

    expect(response).toHaveLength(2)
  });
});

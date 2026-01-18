import { describe, beforeEach, it, expect } from "vitest";

import { makeSession } from "../../factories/entities/session";
import { InMemorySessionRepository } from "../../mocks/repositories/session";
import { DeleteSessionUseCase } from "../../../src/app/use-cases/session/delete";
import { DeleteSessionUseCaseError } from "../../../src/app/use-cases/session/delete/error";

describe("DeleteSessionUseCase", () => {
  let sessionRepo: InMemorySessionRepository;
  let sut: DeleteSessionUseCase;

  beforeEach(() => {
    sessionRepo = new InMemorySessionRepository();
    sut = new DeleteSessionUseCase(sessionRepo);
  });

  it("should not be able to delete if session not exists", async () => {
    const response = await sut.execute({
      id: "1",
    })

    expect(response).toBeInstanceOf(DeleteSessionUseCaseError);
    expect((response as DeleteSessionUseCaseError).message).toEqual("Error on delete session: Session not found!");
  })

  it("should be delete an session", async () => {
    const session1 = makeSession({
      id: '1',
    })
    await sessionRepo.create(session1)

    const response = await sut.execute({
      id: session1.id,
    })

    expect(response).toBe(undefined)
    expect(sessionRepo.sessions.length).toEqual(0)
  });
});

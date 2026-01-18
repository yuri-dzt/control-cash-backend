import { describe, beforeEach, it, expect } from "vitest";

import { makeSession } from "../../factories/entities/session";
import { LogoutUseCase } from "../../../src/app/use-cases/auth/logout";
import { InMemorySessionRepository } from "../../mocks/repositories/session";

describe("LogoutUseCase", () => {
  let sessionRepo: InMemorySessionRepository;
  let sut: LogoutUseCase;

  beforeEach(() => {
    sessionRepo = new InMemorySessionRepository();
    sut = new LogoutUseCase(sessionRepo);
  });

  it("should be able to logout", async () => {
    const session = makeSession({
      refresh_token: "refresh_token",
    });
    sessionRepo.create(session);

    const response = await sut.execute({
      refresh_token: "refresh_token",
    });

    expect(response).not.toBeInstanceOf(Error);
    expect(sessionRepo.sessions).toHaveLength(0);
  });
});

import { describe, it, expect, beforeEach, vi } from "vitest";

import { LoginUseCase } from "../../../src/app/use-cases/auth/login";
import { LoginController } from "../../../src/infra/controllers/auth/login";
import { LoginUseCaseError } from "../../../src/app/use-cases/auth/login/error";

describe("LoginController", () => {
  let useCase: LoginUseCase;
  let controller: LoginController;

  beforeEach(() => {
    useCase = {
      execute: vi.fn(),
    } as any;

    controller = new LoginController(useCase);
  });

  it("should return 200 when use case succeeds", async () => {
    const fakeResult = {
      access_token: "token",
    };

    vi.spyOn(useCase, "execute").mockResolvedValueOnce(fakeResult);

    const response = await controller.handle({
      email: "john@test.com",
      password: "123456",
    });

    expect(response.status_code).toBe(200);
    expect(response.body).toEqual(fakeResult);
  });

  it("should return 400 when use case returns error", async () => {
    const error = new LoginUseCaseError("Email or password incorrect!!");

    vi.spyOn(useCase, "execute").mockResolvedValueOnce(error);

    const response = await controller.handle({
      email: "john@test.com",
      password: "123456",
    });

    expect(response.status_code).toBe(400);
    expect(response.body).toEqual({
      message: "Error on login: Email or password incorrect!!",
    });
  });
});

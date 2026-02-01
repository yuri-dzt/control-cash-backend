import { describe, it, expect, beforeEach, vi } from "vitest";

import { SystemOperatorRole } from "../../../src/domain/entities/system-operator/enum";
import { UpdateSystemOperatorUseCase } from "../../../src/app/use-cases/system-operator/update";
import { UpdateSystemOperatorController } from "../../../src/infra/controllers/system-operator/update";
import { UpdateSystemOperatorUseCaseError } from "../../../src/app/use-cases/system-operator/update/error";

describe("UpdateSystemOperatorController", () => {
  let useCase: UpdateSystemOperatorUseCase;
  let controller: UpdateSystemOperatorController;

  beforeEach(() => {
    useCase = {
      execute: vi.fn(),
    } as any;

    controller = new UpdateSystemOperatorController(useCase);
  });

  it("should return 200 when use case succeeds", async () => {
    const fakeResult = {
      id: "123",
      name: "John",
      email: "john@test.com",
      role: SystemOperatorRole.SUPER_ADMIN,
      is_active: true,
      created_at: Date.now(),
    };

    vi.spyOn(useCase, "execute").mockResolvedValueOnce(fakeResult);

    const response = await controller.handle({
      id: "123",
      name: "John",
    });

    expect(response.status_code).toBe(200);
    expect(response.body).toEqual(fakeResult);
  });

  it("should return 400 when use case returns error", async () => {
    const error = new UpdateSystemOperatorUseCaseError("Email already exists");

    vi.spyOn(useCase, "execute").mockResolvedValueOnce(error);

    const response = await controller.handle({
      id: "123",
      name: "John",
      email: "john@test.com",
      password: "123456",
      role: "ADMIN",
    });

    expect(response.status_code).toBe(400);
    expect(response.body).toEqual({
      message: "Error on update system operator: Email already exists",
    });
  });
});

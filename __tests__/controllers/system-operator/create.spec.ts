import { describe, it, expect, beforeEach, vi } from "vitest";

import { SystemOperatorRole } from "../../../src/domain/entities/system-operator/enum";
import { CreateSystemOperatorUseCase } from "../../../src/app/use-cases/system-operator/create";
import { CreateSystemOperatorController } from "../../../src/infra/controllers/system-operator/create";
import { CreateSystemOperatorUseCaseError } from "../../../src/app/use-cases/system-operator/create/error";

describe("CreateSystemOperatorController", () => {
  let useCase: CreateSystemOperatorUseCase;
  let controller: CreateSystemOperatorController;

  beforeEach(() => {
    useCase = {
      execute: vi.fn(),
    } as any;

    controller = new CreateSystemOperatorController(useCase);
  });

  it("should return 201 when use case succeeds", async () => {
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
      name: "John",
      email: "john@test.com",
      password: "123456",
      role: "ADMIN",
    });

    expect(response.status_code).toBe(201);
    expect(response.body).toEqual(fakeResult);
  });

  it("should return 400 when use case returns error", async () => {
    const error = new CreateSystemOperatorUseCaseError("Email already exists");

    vi.spyOn(useCase, "execute").mockResolvedValueOnce(error);

    const response = await controller.handle({
      name: "John",
      email: "john@test.com",
      password: "123456",
      role: "ADMIN",
    });

    expect(response.status_code).toBe(400);
    expect(response.body).toEqual({
      message: "Error on create system operator: Email already exists",
    });
  });
});

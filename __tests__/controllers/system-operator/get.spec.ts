import { describe, it, expect, beforeEach, vi } from "vitest";

import { ISystemOperatorDto } from "../../../src/contracts/dtos/system-operator";
import { SystemOperatorRole } from "../../../src/domain/entities/system-operator/enum";
import { GetSystemOperatorsUseCase } from "../../../src/app/use-cases/system-operator/get";
import { GetSystemOperatorsController } from "../../../src/infra/controllers/system-operator/get";
import { GetSystemOperatorsUseCaseError } from "../../../src/app/use-cases/system-operator/get/error";

describe("GetSystemOperatorsController", () => {
  let useCase: GetSystemOperatorsUseCase;
  let controller: GetSystemOperatorsController;

  beforeEach(() => {
    useCase = {
      execute: vi.fn(),
    } as any;

    controller = new GetSystemOperatorsController(useCase);
  });

  it("should return 200 when use case succeeds", async () => {
    const fakeResult: ISystemOperatorDto[] = [
      {
        id: "1",
        name: "John",
        email: "john@test.com",
        role: SystemOperatorRole.SUPER_ADMIN,
        is_active: true,
        created_at: Date.now(),
      },
    ];

    vi.spyOn(useCase, "execute").mockResolvedValueOnce(fakeResult);

    const response = await controller.handle({});

    expect(response.status_code).toBe(200);
    expect(response.body).toEqual(fakeResult);
  });

  it("should return 400 when use case returns error", async () => {
    const error = new GetSystemOperatorsUseCaseError("Error occurred while getting system operator");

    vi.spyOn(useCase, "execute").mockResolvedValueOnce(error);

    const response = await controller.handle({});

    expect(response.status_code).toBe(400);
    expect(response.body).toEqual({
      message: "Error on get system operators: Error occurred while getting system operator",
    });
  });

  it("should call use case with correct params", async () => {
    vi.spyOn(useCase, "execute").mockResolvedValueOnce([]);

    const input = {};

    await controller.handle(input);

    expect(useCase.execute).toHaveBeenCalledWith(input);
  });
});

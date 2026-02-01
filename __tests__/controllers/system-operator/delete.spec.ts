import { describe, it, expect, beforeEach, vi } from "vitest";

import { DeleteSystemOperatorUseCase } from "../../../src/app/use-cases/system-operator/delete";
import { DeleteSystemOperatorController } from "../../../src/infra/controllers/system-operator/delete";
import { DeleteSystemOperatorUseCaseError } from "../../../src/app/use-cases/system-operator/delete/error";

describe("DeleteSystemOperatorController", () => {
  let useCase: DeleteSystemOperatorUseCase;
  let controller: DeleteSystemOperatorController;

  beforeEach(() => {
    useCase = {
      execute: vi.fn(),
    } as any;

    controller = new DeleteSystemOperatorController(useCase);
  });

  it("should return 204 when delete succeeds", async () => {
    vi.spyOn(useCase, "execute").mockResolvedValueOnce(undefined);

    const response = await controller.handle({
      id: "123",
      admin_id: "123",
    });

    expect(response.status_code).toBe(204);
    expect(response.body).toBeUndefined();
  });

  it("should return 400 when use case returns error", async () => {
    const error = new DeleteSystemOperatorUseCaseError("System operator not found");

    vi.spyOn(useCase, "execute").mockResolvedValueOnce(error);

    const response = await controller.handle({
      id: "123",
      admin_id: "123",
    });

    expect(response.status_code).toBe(400);
    expect(response.body).toEqual({
      message: "Error on delete system operator: System operator not found",
    });
  });

  it("should call use case with correct params", async () => {
    vi.spyOn(useCase, "execute").mockResolvedValueOnce(undefined);

    const input = { id: "123", admin_id: "123" };

    await controller.handle(input);

    expect(useCase.execute).toHaveBeenCalledWith(input);
  });
});

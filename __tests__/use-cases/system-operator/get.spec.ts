import { describe, beforeEach, it, expect, vi } from "vitest";

import { makeSystemOperator } from "../../factories/entities/system-operator";
import { GetSystemOperatorsUseCase } from "../../../src/app/use-cases/system-operator/get";
import { InMemorySystemOperatorRepository } from "../../mocks/repositories/system-operator";
import { GetSystemOperatorsUseCaseError } from "../../../src/app/use-cases/system-operator/get/error";

describe("GetSystemOperatorsUseCase", () => {
  let systemOperatorRepo: InMemorySystemOperatorRepository;
  let sut: GetSystemOperatorsUseCase;

  beforeEach(() => {
    systemOperatorRepo = new InMemorySystemOperatorRepository();
    sut = new GetSystemOperatorsUseCase(systemOperatorRepo);
  });

  it("should return GetSystemOperatorsUseCaseError when repository throws error", async () => {
    vi.spyOn(systemOperatorRepo, "getAll").mockRejectedValueOnce(
      new Error("Repository error")
    );

    const response = await sut.execute({});

    expect(response).toBeInstanceOf(GetSystemOperatorsUseCaseError);
    expect((response as GetSystemOperatorsUseCaseError).message).toEqual("Error on get system operators: Error occurred while getting system operator");
  });


  it("should be return a empty array if system operators not found", async () => {
    const response = await sut.execute({});

    expect(response).toHaveLength(0);
  })

  it("should return system operators", async () => {
    const systemOperator = makeSystemOperator();
    systemOperatorRepo.system_operators.push(systemOperator);

    const response = await sut.execute({});

    expect(response).toHaveLength(1);
  })
});

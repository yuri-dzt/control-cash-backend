import { IControllerResponse } from "../../../contracts/controllers/controller";
import { GetSystemOperatorsUseCase } from "../../../app/use-cases/system-operator/get";
import { GetSystemOperatorsUseCaseInput } from "../../../app/use-cases/system-operator/get/input";
import { GetSystemOperatorsUseCaseError } from "../../../app/use-cases/system-operator/get/error";

export class GetSystemOperatorsController {
  constructor(private readonly useCase: GetSystemOperatorsUseCase) { }

  async handle(props: GetSystemOperatorsUseCaseInput): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof GetSystemOperatorsUseCaseError) {
      return {
        status_code: 400,
        body: {
          message: result.message,
        },
      };
    }

    return {
      status_code: 200,
      body: result,
    };
  }
}

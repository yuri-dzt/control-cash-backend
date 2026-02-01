import { IControllerResponse } from "../../../contracts/controllers/controller";
import { UpdateSystemOperatorUseCase } from "../../../app/use-cases/system-operator/update/index";
import { UpdateSystemOperatorUseCaseInput } from "../../../app/use-cases/system-operator/update/input";
import { UpdateSystemOperatorUseCaseError } from "../../../app/use-cases/system-operator/update/error";

export class UpdateSystemOperatorController {
  constructor(private readonly useCase: UpdateSystemOperatorUseCase) { }

  async handle(props: UpdateSystemOperatorUseCaseInput): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof UpdateSystemOperatorUseCaseError) {
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

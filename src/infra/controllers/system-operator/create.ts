import { IControllerResponse } from "../../../contracts/controllers/controller";
import { CreateSystemOperatorUseCase } from "../../../app/use-cases/system-operator/create/index";
import { CreateSystemOperatorUseCaseInput } from "../../../app/use-cases/system-operator/create/input";
import { CreateSystemOperatorUseCaseError } from "../../../app/use-cases/system-operator/create/error";

export class CreateSystemOperatorController {
  constructor(private readonly useCase: CreateSystemOperatorUseCase) { }

  async handle(props: CreateSystemOperatorUseCaseInput): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof CreateSystemOperatorUseCaseError) {
      return {
        status_code: 400,
        body: {
          message: result.message,
        },
      };
    }

    return {
      status_code: 201,
      body: result,
    };
  }
}

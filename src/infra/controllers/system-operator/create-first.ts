import { IControllerResponse } from "../../../contracts/controllers/controller";
import { CreateFirstSystemOperatorUseCase } from "../../../app/use-cases/system-operator/create-first/index";
import { CreateFirstSystemOperatorUseCaseInput } from "../../../app/use-cases/system-operator/create-first/input";
import { CreateFirstSystemOperatorUseCaseError } from "../../../app/use-cases/system-operator/create-first/error";

export class CreateFirstSystemOperatorController {
  constructor(private readonly useCase: CreateFirstSystemOperatorUseCase) { }

  async handle(props: CreateFirstSystemOperatorUseCaseInput): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof CreateFirstSystemOperatorUseCaseError) {
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

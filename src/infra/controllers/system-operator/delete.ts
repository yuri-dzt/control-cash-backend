import { IControllerResponse } from "../../../contracts/controllers/controller";
import { DeleteSystemOperatorUseCase } from "../../../app/use-cases/system-operator/delete";
import { DeleteSystemOperatorUseCaseInput } from "../../../app/use-cases/system-operator/delete/input";
import { DeleteSystemOperatorUseCaseError } from "../../../app/use-cases/system-operator/delete/error";

export class DeleteSystemOperatorController {
  constructor(private readonly useCase: DeleteSystemOperatorUseCase) { }

  async handle(props: DeleteSystemOperatorUseCaseInput): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof DeleteSystemOperatorUseCaseError) {
      return {
        status_code: 400,
        body: {
          message: result.message,
        },
      };
    }

    return {
      status_code: 204,
    };
  }
}

import { DeleteSessionUseCase } from "../../../app/use-cases/session/delete";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { DeleteSessionInput } from "../../../app/use-cases/session/delete/input";
import { DeleteSessionUseCaseError } from "../../../app/use-cases/session/delete/error";

export class DeleteSessionController {
  constructor(private readonly useCase: DeleteSessionUseCase) { }

  async handle(props: DeleteSessionInput): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof DeleteSessionUseCaseError) {
      return {
        status_code: 400,
        body: {
          message: result.message,
        },
      };
    }

    return {
      status_code: 204,
      body: result,
    };
  }
}

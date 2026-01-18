import { GetSessionsUseCase } from "../../../app/use-cases/session/get";
import { GetSessionsInput } from "../../../app/use-cases/session/get/input";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { GetSessionsUseCaseError } from "../../../app/use-cases/session/get/error";

export class GetSessionsController {
  constructor(private readonly useCase: GetSessionsUseCase) { }

  async handle(props: GetSessionsInput): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof GetSessionsUseCaseError) {
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

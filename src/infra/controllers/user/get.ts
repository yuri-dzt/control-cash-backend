import { GetUsersUseCase } from "../../../app/use-cases/user/get";
import { GetUsersUseCaseError } from "../../../app/use-cases/user/get/error";
import { IControllerResponse } from "../../../contracts/controllers/controller";

export class GetUsersController {
  constructor(private readonly useCase: GetUsersUseCase) { }

  async handle(): Promise<IControllerResponse> {
    const result = await this.useCase.execute();

    if (result instanceof GetUsersUseCaseError) {
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

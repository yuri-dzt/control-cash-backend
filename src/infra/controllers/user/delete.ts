import { DeleteUserUseCase } from "../../../app/use-cases/user/delete";
import { DeleteUserInput } from "../../../app/use-cases/user/delete/input";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { DeleteUserUseCaseError } from "../../../app/use-cases/user/delete/error";

export class DeleteUserController {
  constructor(private readonly useCase: DeleteUserUseCase) { }

  async handle(props: DeleteUserInput): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof DeleteUserUseCaseError) {
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

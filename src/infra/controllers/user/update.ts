import { UpdateUserUseCase } from "../../../app/use-cases/user/update";
import { UpdateUserInput } from "../../../app/use-cases/user/update/input";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { UpdateUserUseCaseError } from "../../../app/use-cases/user/update/error";

export class UpdateUserController {
  constructor(private readonly useCase: UpdateUserUseCase) { }

  async handle(props: UpdateUserInput): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof UpdateUserUseCaseError) {
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

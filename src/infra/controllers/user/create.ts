import { CreateUserUseCase } from "../../../app/use-cases/user/create";
import { CreateUserInput } from "../../../app/use-cases/user/create/input";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { CreateUserUseCaseError } from "../../../app/use-cases/user/create/error";

export class CreateUserController {
  constructor(private readonly useCase: CreateUserUseCase) { }

  async handle(props: Omit<CreateUserInput, "role">): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof CreateUserUseCaseError) {
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

import { LoginUseCase } from "../../../app/use-cases/auth/login";
import { LoginUseCaseInput } from "../../../app/use-cases/auth/login/input";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { LoginUseCaseError } from "../../../app/use-cases/auth/login/error";

export class LoginController {
  constructor(private readonly useCase: LoginUseCase) { }

  async handle(props: LoginUseCaseInput): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof LoginUseCaseError) {
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

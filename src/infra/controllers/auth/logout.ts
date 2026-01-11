import { LogoutUseCase } from "../../../app/use-cases/auth/logout";
import { LogoutUseCaseInput } from "../../../app/use-cases/auth/logout/input";
import { IControllerResponse } from "../../../contracts/controllers/controller";

export class LogoutController {
  constructor(private readonly useCase: LogoutUseCase) { }

  async handle(props: LogoutUseCaseInput): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    return {
      status_code: 200,
      body: result,
    };
  }
}

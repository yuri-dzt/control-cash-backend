import { IControllerResponse } from "../../../contracts/controllers/controller";
import { RefreshAccountUseCase } from "../../../app/use-cases/user/refresh-account";
import { RefreshAccountInput } from "../../../app/use-cases/user/refresh-account/input";
import { RefreshAccountUseCaseError } from "../../../app/use-cases/user/refresh-account/error";

export class RefreshAccountController {
  constructor(private readonly useCase: RefreshAccountUseCase) { }

  async handle(props: RefreshAccountInput): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof RefreshAccountUseCaseError) {
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

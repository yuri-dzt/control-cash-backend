import { IControllerResponse } from "../../../contracts/controllers/controller";
import { RefreshTokenUseCaseError } from "../../../app/use-cases/auth/refresh-token/error";
import { RefreshTokenUseCase, RefreshTokenUseCaseInput } from "../../../app/use-cases/auth/refresh-token";

export class RefreshTokenController {
  constructor(private readonly useCase: RefreshTokenUseCase) { }

  async handle(props: RefreshTokenUseCaseInput): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof RefreshTokenUseCaseError) {
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

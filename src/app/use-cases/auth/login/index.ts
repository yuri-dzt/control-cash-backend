import { LoginUseCaseError } from "./error";
import { LoginUseCaseInput } from "./input";
import { IJwtService } from "../../../../contracts/services/jwt";
import { IHashService } from "../../../../contracts/services/hash";
import { IAccountRepository } from "../../../../contracts/repositories/account";

interface LoginUseCaseResponse {
  access_token: string;
}

export class LoginUseCase {
  constructor(
    private readonly accountRepo: IAccountRepository,
    private readonly jwtService: IJwtService,
    private readonly hashService: IHashService,
  ) { }

  async execute(props: LoginUseCaseInput): Promise<LoginUseCaseResponse | LoginUseCaseError> {
    try {
      const userExist = await this.accountRepo.findByEmail(props.email);
      if (!userExist) return new LoginUseCaseError("Email or password incorrect!!");

      const passwordMatch = await this.hashService.compare(props.password, userExist.account_password);
      if (!passwordMatch) return new LoginUseCaseError("Email or password incorrect!");

      const access_token = this.jwtService.sign({
        account_id: userExist.account_id,
        account_type: userExist.account_type,
      })

      return {
        access_token
      }
    } catch {
      return new LoginUseCaseError("Error occurred while login");
    }
  }
}

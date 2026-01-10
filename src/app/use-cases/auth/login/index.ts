import { LoginUseCaseInput } from "./input";
import { LoginUseCaseError } from "./error";
import { IJwtService } from "../../../../contracts/services/jwt";
import { IHashService } from "../../../../contracts/services/hash";
import { IUserRepository } from "../../../../contracts/repositories/user";

export interface LoginUseCaseResponse {
  access_token: string;
  account_id: string;
  account_type: string;
}

export class LoginUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly jwtService: IJwtService,
    private readonly hashService: IHashService
  ) { }

  async execute(props: LoginUseCaseInput): Promise<LoginUseCaseResponse | LoginUseCaseError> {
    try {
      const userExist = await this.userRepo.findByEmail(props.email);
      if (!userExist) {
        return new LoginUseCaseError("Unauthorized!");
      }

      const isValidPassword = await this.hashService.compare(props.password, userExist.password);
      if (!isValidPassword) {
        return new LoginUseCaseError("Unauthorized!");
      }

      const token = this.jwtService.sign({ account_id: userExist.id, account_type: userExist.role });

      return {
        access_token: token,
        account_id: userExist.id,
        account_type: userExist.role,
      }
    } catch {
      return new LoginUseCaseError("Error occurred while login");
    }
  }
}

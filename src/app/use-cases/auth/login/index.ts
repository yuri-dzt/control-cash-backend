import { LoginUseCaseInput } from "./input";
import { LoginUseCaseError } from "./error";
import { IJwtService, JwtPayloadProps } from "../../../../contracts/services/jwt";
import { IHashService } from "../../../../contracts/services/hash";
import { IUserRepository } from "../../../../contracts/repositories/user";
import { ISessionRepository } from "../../../../contracts/repositories/session";
import { Session } from "../../../../domain/entities/session";

export interface LoginUseCaseResponse {
  access_token: string;
  refresh_token: string;
  account_id: string;
  account_type: string;
}

export class LoginUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly sessionRepo: ISessionRepository,
    private readonly jwtService: IJwtService,
    private readonly hashService: IHashService
  ) { }

  async execute(props: LoginUseCaseInput): Promise<LoginUseCaseResponse | LoginUseCaseError> {
    try {
      // 1️⃣ Verifica se o usuário existe
      const userExist = await this.userRepo.findByEmail(props.email);
      if (!userExist) {
        return new LoginUseCaseError("Unauthorized!");
      }

      // 2️⃣ Verifica a senha
      const isValidPassword = await this.hashService.compare(props.password, userExist.password);
      if (!isValidPassword) {
        return new LoginUseCaseError("Unauthorized!");
      }

      // 4️⃣ Gera refresh token
      const refreshTokenExp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30d
      const refresh_token = this.jwtService.sign({
        account_id: userExist.id,
        account_type: userExist.role,
        type: "refresh",
        exp: refreshTokenExp
      });

      // 5️⃣ Salva refresh token na tabela sessions
      const expires_at = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 dias
      const session = new Session({
        user_id: userExist.id,
        refresh_token,
        expires_at,
        created_at: Date.now(),
      });

      const result = await this.sessionRepo.create(session);
      if (result instanceof Error) {
        return new LoginUseCaseError(result.message);
      }

      const accessTokenExp = Math.floor(Date.now() / 1000) + 60 * 60; // 1h
      const access_token = this.jwtService.sign({
        account_id: userExist.id,
        account_type: userExist.role,
        type: "access",
        exp: accessTokenExp,
        session_id: session.id
      });

      return {
        access_token,
        refresh_token,
        account_id: userExist.id,
        account_type: userExist.role,
      };
    } catch (err) {
      console.error(err);
      return new LoginUseCaseError("Error occurred while login");
    }
  }
}

import { RefreshTokenUseCaseError } from "./error";
import { IJwtService } from "../../../../contracts/services/jwt";
import { IUserRepository } from "../../../../contracts/repositories/user";
import { ISessionRepository } from "../../../../contracts/repositories/session";

export interface RefreshTokenUseCaseInput {
  refresh_token: string;
}

export interface RefreshTokenUseCaseResponse {
  access_token: string;
  refresh_token?: string;
}

export class RefreshTokenUseCase {
  constructor(
    private readonly sessionRepo: ISessionRepository,
    private readonly userRepo: IUserRepository,
    private readonly jwtService: IJwtService
  ) { }

  async execute(
    props: RefreshTokenUseCaseInput
  ): Promise<RefreshTokenUseCaseResponse | RefreshTokenUseCaseError> {
    try {
      const session = await this.sessionRepo.findByToken(props.refresh_token);
      if (!session) {
        return new RefreshTokenUseCaseError("Invalid refresh token!");
      }

      // 2️⃣ Verifica expiração
      const now = Date.now();
      if (session.expires_at < now) {
        // opcional: remover a sessão expirada
        await this.sessionRepo.delete(session.id);
        return new RefreshTokenUseCaseError("Refresh token expired!");
      }

      // 3️⃣ Busca o usuário relacionado
      const user = await this.userRepo.findById(session.user_id);
      if (!user) {
        return new RefreshTokenUseCaseError("User not found!");
      }

      // 4️⃣ Gera novo access token
      const accessTokenExp = Math.floor(Date.now() / 1000) + 60 * 60; // 1h
      const access_token = this.jwtService.sign({
        account_id: user.id,
        account_type: user.role,
        exp: accessTokenExp
      });

      const newExpiresAt = now + 30 * 24 * 60 * 60 * 1000;

      const refreshTokenExp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30d
      const new_refresh_token = this.jwtService.sign({
        account_id: user.id,
        account_type: user.role,
        type: "refresh",
        exp: refreshTokenExp
      });

      session.update({
        expires_at: newExpiresAt,
        refresh_token: new_refresh_token,
      })

      await this.sessionRepo.update(session)

      return {
        access_token,
        refresh_token: new_refresh_token,
      };
    } catch (err) {
      return new RefreshTokenUseCaseError("Error occurred while refreshing token");
    }
  }
}

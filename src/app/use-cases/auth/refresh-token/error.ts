export class RefreshTokenUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on refresh token: " + message);
    this.name = "RefreshTokenUseCaseError";
  }
}

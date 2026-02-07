export class LoginUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on login: " + message);
    this.name = "LoginUseCaseError";
  }
}

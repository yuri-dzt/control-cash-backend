export class CreateUserUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on create user: " + message);
    this.name = "CreateUserUseCaseError";
  }
}

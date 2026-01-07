export class UpdateUserUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on update user: " + message);
    this.name = "UpdateUserUseCaseError";
  }
}

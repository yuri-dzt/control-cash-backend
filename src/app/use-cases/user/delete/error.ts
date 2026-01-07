export class DeleteUserUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on delete user: " + message);
    this.name = "DeleteUserUseCaseError";
  }
}

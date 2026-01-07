export class GetUsersUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on get users: " + message);
    this.name = "GetUserUseCaseErrors";
  }
}

export class DeleteSessionUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on delete session: " + message);
    this.name = "DeleteSessionUseCaseError";
  }
}

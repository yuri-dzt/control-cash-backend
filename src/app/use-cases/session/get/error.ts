export class GetSessionsUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on get sessions: " + message);
    this.name = "GetSessionsUseCaseErrors";
  }
}

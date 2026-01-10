export class RefreshAccountUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on refresh account: " + message);
    this.name = "RefreshAccountUseCaseError";
  }
}

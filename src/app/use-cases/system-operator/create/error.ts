export class CreateSystemOperatorUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on create system operator: " + message);
    this.name = "CreateSystemOperatorUseCaseError";
  }
}

export class CreateFirstSystemOperatorUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on create first system operator: " + message);
    this.name = "CreateFirstSystemOperatorUseCaseError";
  }
}

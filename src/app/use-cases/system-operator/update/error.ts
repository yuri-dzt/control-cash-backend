export class UpdateSystemOperatorUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on update system operator: " + message);
    this.name = "UpdateSystemOperatorUseCaseError";
  }
}

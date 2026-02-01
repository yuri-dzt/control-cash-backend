export class DeleteSystemOperatorUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on delete system operator: " + message);
    this.name = "DeleteSystemOperatorUseCaseError";
  }
}

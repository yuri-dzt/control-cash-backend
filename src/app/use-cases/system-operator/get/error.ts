export class GetSystemOperatorsUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on get system operators: " + message);
    this.name = "GetSystemOperatorsUseCaseError";
  }
}

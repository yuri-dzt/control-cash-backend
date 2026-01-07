export class PrismaError extends Error {
  constructor(message?: string) {
    super("Prisma error: " + message);
  }
}

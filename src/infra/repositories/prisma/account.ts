import { prisma } from "../../../shared/prisma/client";
import { PrismaError } from "../../../shared/prisma/error";
import { SystemOperatorRole } from "../../../domain/entities/system-operator/enum";
import { FindByAccountResponse, IAccountRepository } from "../../../contracts/repositories/account";

export class PrismaAccountRepository implements IAccountRepository {
  async findByEmail(email: string): Promise<FindByAccountResponse | undefined> {
    try {
      const result = await prisma.systemOperator.findUnique({
        where: { email }
      });

      return result ? {
        account_id: result.id,
        account_type: result.role as SystemOperatorRole,
        account_password: result.password
      } : undefined
    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }

}
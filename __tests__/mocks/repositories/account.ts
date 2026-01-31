import { InMemorySystemOperatorRepository } from "./system-operator";
import { FindByAccountResponse, IAccountRepository } from "../../../src/contracts/repositories/account";

export class InMemoryAccountRepository implements IAccountRepository {
  public system_operators = new InMemorySystemOperatorRepository().system_operators

  async findByEmail(email: string): Promise<FindByAccountResponse | undefined> {
    const account = this.system_operators.find(c => c.email === email);

    if (!account) return undefined;

    return {
      account_id: account.id,
      account_type: account.role,
      account_password: account.password
    }
  };
}

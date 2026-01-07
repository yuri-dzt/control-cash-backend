import bcrypt from "bcrypt";

import { IHashService } from "../../contracts/services/hash";

export class BcryptService implements IHashService {
  async hash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(password, hash);
    return isPasswordValid;
  }
}

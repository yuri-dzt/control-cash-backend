import { IHashService } from "../../../src/contracts/services/hash";

export class HashServiceMock implements IHashService {
  async hash(password: string): Promise<string> {
    return Promise.resolve('password');
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isMatch = password === hash;

    return Promise.resolve(isMatch);
  }
}

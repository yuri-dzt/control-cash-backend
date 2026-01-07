import { IJwtService, JwtPayloadProps } from "../../../src/contracts/services/jwt";

export class JwtServiceMock implements IJwtService {
  sign(payload: JwtPayloadProps): string {
    return "token " + payload.account_id;
  }

  verify(token: string): JwtPayloadProps {
    if (token === "token") return { account_id: "1", account_type: "user" };
    return { account_id: "1", account_type: "user" };
  }
}

import jwt from "jsonwebtoken";
import { IJwtService, JwtPayloadProps } from "../../contracts/services/jwt";

export class JwtService implements IJwtService {
	sign(payload: JwtPayloadProps): string {
		return jwt.sign(payload, process.env.JWT_SECRET || "");
	}

	verify(token: string): JwtPayloadProps {
		return jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayloadProps;
	}
}

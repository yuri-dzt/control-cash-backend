// import type { NextFunction, Request, Response } from "express";

// import { JwtService } from "../services/jwt";

// export const authorizeSuperAdminMiddleware = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// ) => {
// 	const { authorization } = req.headers;

// 	if (!authorization) {
// 		return res.status(401).json({ code: "UNAUTHORIZED" });
// 	}

// 	const [, token] = authorization.split(" ");

// 	const jwtService = new JwtService();
// 	const decoded = jwtService.verify(token);

// 	if (decoded instanceof Error) {
// 		return res.status(401).json({ code: "TOKEN_INVALID" });
// 	}

// 	if (decoded.account_type !== "SUPER_ADMIN") {
// 		return res.status(401).json({ code: "UNAUTHORIZED" });
// 	}

// 	req.user = {
// 		account_id: decoded.account_id,
// 		account_type: decoded.account_type,
// 	};

// 	next();
// };

// export const authorizeAdminRolesMiddleware = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// ) => {
// 	const { authorization } = req.headers;

// 	if (!authorization) {
// 		return res.status(401).json({ code: "UNAUTHORIZED" });
// 	}

// 	const [, token] = authorization.split(" ");

// 	const jwtService = new JwtService();
// 	const decoded = jwtService.verify(token);

// 	if (decoded instanceof Error) {
// 		return res.status(401).json({ code: "TOKEN_INVALID" });
// 	}

// 	if (decoded.account_type !== "SUPER_ADMIN" && decoded.account_type !== "SUPPORT") {
// 		return res.status(401).json({ code: "UNAUTHORIZED" });
// 	}

// 	req.user = {
// 		account_id: decoded.account_id,
// 		account_type: decoded.account_type,
// 	};

// 	next();
// };

import type { NextFunction, Request, Response } from "express";

import { JwtService } from "../services/jwt";
import { SystemOperatorRole } from "../../domain/entities/system-operator/enum";


const authorizeRoles = (allowedRoles: SystemOperatorRole[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const { authorization } = req.headers;

		if (!authorization) {
			return res.status(401).json({ code: "UNAUTHORIZED" });
		}

		const [, token] = authorization.split(" ");

		const jwtService = new JwtService();
		const decoded = jwtService.verify(token);

		if (decoded instanceof Error) {
			return res.status(401).json({ code: "TOKEN_INVALID" });
		}

		if (!allowedRoles.includes(decoded.account_type as SystemOperatorRole)) {
			return res.status(401).json({ code: "UNAUTHORIZED" });
		}

		req.user = {
			account_id: decoded.account_id,
			account_type: decoded.account_type,
		};

		next();
	};
};

export const authorizeSuperAdminMiddleware = authorizeRoles([SystemOperatorRole.SUPER_ADMIN]);
export const authorizeAdminRolesMiddleware = authorizeRoles([SystemOperatorRole.SUPER_ADMIN, SystemOperatorRole.SUPPORT]);
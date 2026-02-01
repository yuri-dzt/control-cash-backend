import type { NextFunction, Request, Response } from "express";

import { JwtService } from "../services/jwt";

export const verifyTokenMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ code: "UNAUTHORIZED" });
	}

	const [, token] = authorization.split(" ");

	const jwtService = new JwtService();
	const decoded = await jwtService.verify(token);

	if (decoded instanceof Error) {
		return res.status(401).json({ code: "TOKEN_INVALID" });
	}

	// 🚨 garante que é ACCESS token
	if (decoded.type !== "access") {
		return res.status(401).json({ code: "INVALID_TOKEN_TYPE" });
	}

	// 🚨 garante que existe sessão
	if (!decoded.session_id) {
		return res.status(401).json({ code: "SESSION_ID_MISSING" });
	}

	// 🔍 valida sessão no banco
	req.user = {
		account_id: decoded.account_id,
		account_type: decoded.account_type,
		session_id: decoded.session_id,
	};

	next();
};
import type { NextFunction, Request, Response } from "express";

import { JwtService } from "../services/jwt";

export const verifyTokenMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { authorization } = req.headers;

	if (!authorization) {
		res.status(401).json({ message: "Unauthorized!" });
		return;
	}

	const [, token] = authorization.split(" ");

	const jwtService = new JwtService();
	const tokenDecodedOrError = await jwtService.verify(token);

	if (tokenDecodedOrError instanceof Error) {
		console.log({
			message: tokenDecodedOrError.message,
		});
		res.status(401).json({ message: "Token not valid!" });
		return;
	}

	req.user = tokenDecodedOrError;
	next();
};

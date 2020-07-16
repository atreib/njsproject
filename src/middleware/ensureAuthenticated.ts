import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function MiddlewareEnsureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const authHeader = request.headers.authorization;
	if (!authHeader) throw new AppError('JWT is missing', 401);

	const [, token] = authHeader.split(' ');

	try {
		const decoded = verify(token, AuthConfig.jwt.secret);
		const { sub } = decoded as TokenPayload;
		request.user = { id: sub };
		return next();
	} catch {
		throw new AppError('Unauthorized access', 401);
	}
}

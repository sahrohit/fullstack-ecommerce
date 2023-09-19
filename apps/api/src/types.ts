import { Request, Response } from "express";
import { Session } from "express-session";
import { type Redis } from "ioredis";

export type MyContext = {
	req: Request & { session?: Session & { userId?: number; tenantId?: number } };
	res: Response;
	redis: Redis;
};

import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import Express from "express";
import session from "express-session";
import helmet from "helmet";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, __prod__ } from "./constants";
import { AppDataSource } from "./data-source";
import { AddressResolver } from "./resolvers/address";
import { AdminResolver } from "./resolvers/admin";
import { CartResolver } from "./resolvers/cart";
import { CategoryResolver } from "./resolvers/category";
import { DiscountResolver } from "./resolvers/discount";
import { HelloResolver } from "./resolvers/hello";
import { ProductResolver } from "./resolvers/product";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
import "reflect-metadata";

const Server = async () => {
	AppDataSource.initialize()
		.then(() => {
			AppDataSource.runMigrations();
		})
		.catch((error) => console.log(error));

	const app = Express();

	app.use(helmet());

	app.set("trust proxy", 1);

	app.use(
		cors({
			origin: (process.env.ALLOWED_ORIGINS.split(",") || "").map(
				(origin) => origin
			),
			credentials: true,
		})
	);

	const RedisStore = connectRedis(session);

	const redis = new Redis(process.env.REDIS_URL);

	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({
				client: redis as any,
				disableTouch: true,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10yrs
				httpOnly: true,
				sameSite: __prod__ ? "none" : "lax", //CSRF
				secure: __prod__, //Cookie only works in https
			},
			saveUninitialized: false,
			secret: process.env.SESSION_SECRET,
			resave: false,
		})
	);

	app.get("/", (_req, res) => {
		res.json({ status: "ok" });
	});

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [
				HelloResolver,
				UserResolver,
				AddressResolver,
				ProductResolver,
				DiscountResolver,
				CategoryResolver,
				CartResolver,
				AdminResolver,
			],
			validate: false,
		}),
		context: ({ req, res }): MyContext => ({
			req,
			res,
			redis,
		}),
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({ app, cors: false });

	app.listen(parseInt(process.env.PORT), () => {
		console.log(`Server is running on port ${process.env.PORT}`);
	});
};

Server().catch((error) => console.log(error));

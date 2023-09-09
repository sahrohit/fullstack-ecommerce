import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import connectRedis from "connect-redis";
import { json } from "body-parser";
import cors from "cors";
import "dotenv-safe/config";
import Express from "express";
import session from "express-session";
import helmet from "helmet";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, __prod__ } from "./constants";
import { AppDataSource } from "./data-source";
import { AddressResolver } from "./resolvers/address";
import { RoleResolver } from "./resolvers/role";
import { CartResolver } from "./resolvers/cart";
import { CategoryResolver } from "./resolvers/category";
import { DiscountResolver } from "./resolvers/discount";
import { HelloResolver } from "./resolvers/hello";
import { ProductResolver } from "./resolvers/product";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
import "reflect-metadata";
import { PromoResolver } from "./resolvers/promo";
import { OrderResolver } from "./resolvers/order";
import { VariantResolver } from "./resolvers/variant";
import { FavouriteResolver } from "./resolvers/favourite";
import { ReviewResolver } from "./resolvers/review";
import Redis from "ioredis";
import { Product } from "./entities/Product";
import { InvoiceResolver } from "./resolvers/invoice";
import authRouter from "./routers/auth";
import tenantRouter from "./routers/tenant";
import { ShippingMethodResolver } from "./resolvers/shipping";

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
			origin: (process.env.ALLOWED_ORIGINS!.split(",") || "").map(
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
			secret: process.env.SESSION_SECRET!,
			resave: false,
		})
	);

	app.get("/", (_req, res) => {
		console.log("Request Home");
		res.json({ status: "ok" });
	});

	app.use("/auth", authRouter);
	app.use("/tenant", tenantRouter);

	app.get("/products", async (_req, res) => {
		res.json(
			await Product.find({
				relations: {
					inventories: {
						variants: {
							variant_value: {
								variant: true,
							},
						},
					},
					category: true,
					images: true,
					discount: true,
				},
				where: {
					inventories: {
						isPublished: true,
					},
				},
			})
		);
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
				RoleResolver,
				PromoResolver,
				OrderResolver,
				VariantResolver,
				FavouriteResolver,
				ReviewResolver,
				InvoiceResolver,
				ShippingMethodResolver,
			],
			validate: false,
		}),
		introspection: !__prod__,
	});

	await apolloServer.start();

	app.use(
		"/graphql",
		json(),
		expressMiddleware(apolloServer, {
			context: async ({ req, res }): Promise<MyContext> => ({
				req,
				res,
				redis,
			}),
		})
	);

	app.listen(parseInt(process.env.PORT!), () => {
		console.log(`Server is running on port ${process.env.PORT!}`);
	});
};

Server().catch((error) => console.log(error));

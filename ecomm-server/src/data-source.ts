import "reflect-metadata";
import { DataSource } from "typeorm";
import { Address } from "./entities/Address";
import { Discount } from "./entities/Discount";
import { Product } from "./entities/Product";
import { ProductCategory } from "./entities/ProductCategory";
import { ProductInventory } from "./entities/ProductInventory";
import { User } from "./entities/User";
import { UserRole } from "./entities/UserRole";

export const AppDataSource = new DataSource({
	type: "postgres",
	url: process.env.DATABASE_URL,
	synchronize: true,
	logging: true,
	entities: [
		User,
		Address,
		Product,
		ProductCategory,
		ProductInventory,
		Discount,
		UserRole
	],
	migrations: [],
	subscribers: [],
});

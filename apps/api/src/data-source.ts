import "dotenv-safe/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Address } from "./entities/Address";
import { Cart } from "./entities/Cart";
import { Discount } from "./entities/Discount";
import { OrderDetail } from "./entities/OrderDetail";
import { OrderItem } from "./entities/OrderItem";
import { PaymentDetail } from "./entities/PaymentDetail";
import { Product } from "./entities/Product";
import { ProductCategory } from "./entities/ProductCategory";
import { ProductImage } from "./entities/ProductImage";
import { ProductInventory } from "./entities/ProductInventory";
import { User } from "./entities/User";
import { UserPayment } from "./entities/UserPayment";
import { UserRole } from "./entities/UserRole";
import { Variant } from "./entities/Variant";
import { VariantValue } from "./entities/VariantValue";
import { ProductVariant } from "./entities/ProductVariant";
import { Promo } from "./entities/Promo";
import { Favourite } from "./entities/Favourite";

export const AppDataSource = new DataSource({
	type: "postgres",
	url: process.env.DATABASE_URL,
	synchronize: true,
	logging: true,
	entities: [
		User,
		Address,
		Product,
		ProductImage,
		ProductCategory,
		ProductInventory,
		Discount,
		UserRole,
		Cart,
		UserPayment,
		OrderDetail,
		OrderItem,
		PaymentDetail,
		Variant,
		VariantValue,
		ProductVariant,
		Promo,
		Favourite,
	],
	migrations: ["src/migration/**/*.ts"],
	subscribers: ["src/migration/**/*.ts"],
});

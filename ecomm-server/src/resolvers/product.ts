import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
import { ProductInventory } from "../entities/ProductInventory";
import AddProductInput from "./GqlObjets/AddProductInput";
import ProductResponse from "./GqlObjets/ProductResponse";
import UpdateProductInput from "./GqlObjets/UpdateProductInput";

const PRODUCT_QUERY_SQL = `
SELECT p.*, pi.quantity,
d.name "discount_name", d.discount_percent "discount_percent",
d.desc "discount_desc", d.active "discount_active",
pc.name "category_name", pc."desc" "category_desc"
FROM product p
INNER JOIN product_inventory pi on pi.id = p."inventoryId"
LEFT JOIN discount d on d.id = p."discountId"
LEFT JOIN product_category pc on pc.id = p."categoryId"
`;

@Resolver(Product)
export class ProductResolver {
	@Query(() => [ProductResponse], { nullable: true })
	async products() {
		const products = await AppDataSource.query(PRODUCT_QUERY_SQL);
		return products;
	}

	@Mutation(() => ProductResponse, { nullable: true })
	async addProducts(@Arg("options") options: AddProductInput) {
		const inventory = await ProductInventory.insert({
			quantity: options.quantity,
		});

		console.log(inventory);

		if (!inventory) {
			throw new Error("Failed to add product");
		}

		const insertedProduct = await Product.insert({
			name: options.name,
			desc: options.desc,
			price: options.price,
			inventoryId: inventory.raw[0].id,
			categoryId: options.category_id,
		});

		const product = await AppDataSource.query(
			`
    ${PRODUCT_QUERY_SQL}
    WHERE p.id = $1
    `,
			[insertedProduct.raw[0].id]
		);

		return product[0];
	}

	@Mutation(() => ProductResponse, { nullable: true })
	async updateProduct(
		@Arg("id") id: number,
		@Arg("options") options: UpdateProductInput
	): Promise<ProductResponse> {
		const updatedProduct = await AppDataSource.createQueryBuilder()
			.update(Product)
			.set({ ...options })
			.where("id = :id", {
				id,
			})
			.returning("*")
			.execute();
		return updatedProduct.raw[0];
	}

	@Mutation(() => ProductResponse, { nullable: true })
	async updateProductDiscount(
		@Arg("product_id") product_id: number,
		@Arg("discount_id") discount_id: number
	) {
		const updatedProduct = await AppDataSource.createQueryBuilder()
			.update(Product)
			.set({ discountId: discount_id })
			.where("id = :id", {
				id: product_id,
			})
			.returning("*")
			.execute();
		const product = await AppDataSource.query(
			`
    ${PRODUCT_QUERY_SQL}
    WHERE p.id = $1
    `,
			[updatedProduct.raw[0].id]
		);

		return product[0];
	}
}

import { ProductImage } from "../entities/ProductImage";
import { ProductInventory } from "../entities/ProductInventory";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
import ProductResponse from "./GqlObjets/ProductResponse";
import UpdateProductInput from "./GqlObjets/UpdateProductInput";
import AddProductInput from "./GqlObjets/AddProductInput";

const PRODUCT_QUERY_SQL = `
SELECT p.*,
       d.name                           "discount_name",
       d.discount_percent               "discount_percent",
       d.desc                           "discount_desc",
       d.active                         "discount_active",
       pc.name                          "category_name",
       pc."desc"                        "category_desc",
       COALESCE(pi.variants, '[]')   AS variants,
       COALESCE(pimage.images, '[]') AS images
FROM product p
         LEFT JOIN LATERAL (
    SELECT json_agg(json_build_object(
            'variant_id', pi.id,
            'product_id', pi."productId",
            'quantity', pi.quantity,
            'variant', pi.variant,
            'price', pi.price
        )) AS variants
    FROM product_inventory pi
    WHERE p.id = pi."productId"
    ) pi ON true
         LEFT JOIN LATERAL (
    SELECT json_agg(json_build_object(
            'image_id', pimage.id,
            'imageURL', pimage."imageURL"
        )) AS images
    FROM product_image pimage
    WHERE p.id = pimage."productId"
    ) pimage ON true
         LEFT JOIN discount d on d.id = p."discountId"
         LEFT JOIN product_category pc on pc.id = p."categoryId"
`;

@Resolver(Product)
export class ProductResolver {
	@Query(() => [ProductResponse], { nullable: true })
	async products(): Promise<ProductResponse[]> {
		return AppDataSource.query(PRODUCT_QUERY_SQL);
	}

	@Query(() => ProductResponse, { nullable: true })
	async product(
		@Arg("identifier") identifier: string
	): Promise<ProductResponse> {
		const product = await AppDataSource.query(
			`
			${PRODUCT_QUERY_SQL}
			WHERE p.identifier = $1
    		`,
			[identifier]
		);
		return product[0];
	}

	@Mutation(() => ProductResponse, { nullable: true })
	async addProducts(@Arg("options") options: AddProductInput) {
		const insertedProduct = await AppDataSource.transaction(async (tm) => {
			const insertedProduct = await tm
				.createQueryBuilder()
				.insert()
				.into(Product)
				.values({
					name: options.name,
					desc: options.desc,
					categoryId: options.categoryId,
					identifier: options.identifier,
				})
				.returning("*")
				.execute();

			await tm
				.createQueryBuilder()
				.insert()
				.into(ProductInventory)
				.values(
					options.variants.map((variant) => ({
						...variant,
						productId: insertedProduct.identifiers[0].id,
					}))
				)
				.execute();

			await tm
				.createQueryBuilder()
				.insert()
				.into(ProductImage)
				.values(
					options.images.map((image) => ({
						...image,
						productId: insertedProduct.identifiers[0].id,
					}))
				)
				.execute();
		});

		console.log("Insterted Product", insertedProduct);

		const product = await AppDataSource.query(
			`
    ${PRODUCT_QUERY_SQL}
    WHERE p.id = $1
    `,
			[1]
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

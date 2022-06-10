import { Arg, Mutation, Resolver } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Discount } from "../entities/Discount";
import AddProductInput from "./GqlObjets/AddProductInput";
import { DiscountResponse } from "./GqlObjets/DiscountResponse";
import UpdateDiscountInput from "./GqlObjets/UpdateDiscountInput";

@Resolver()
export class DiscountResolver {
	@Mutation(() => DiscountResponse, { nullable: true })
	async addDiscount(@Arg("options") options: AddProductInput) {
		const insertedDiscount = await Discount.insert({ ...options });
		const updatedDiscount = await Discount.findOne({
			where: { id: insertedDiscount.raw[0].id },
		});
		return updatedDiscount;
	}

	@Mutation(() => DiscountResponse, { nullable: true })
	async updateDiscount(@Arg("options") options: UpdateDiscountInput) {
		const updatedDiscount = await AppDataSource.createQueryBuilder()
			.update(Discount)
			.set({ ...options })
			.where("id = :id", {
				id: options.id,
			})
			.returning("*")
			.execute();

		return updatedDiscount.raw[0];
	}

	@Mutation(() => Boolean, { nullable: true })
	async deleteDiscount(@Arg("id") id: number) {
		const updatedDiscount = await AppDataSource.query(
			`
    UPDATE product 
    SET "discountId" = NULL
    WHERE "discountId" = $1
    `,
			[id]
		);

		console.log("Updated Discount", updatedDiscount);

		await Discount.delete({ id });
		return true;
	}
}

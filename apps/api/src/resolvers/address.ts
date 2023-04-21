import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import { AppDataSource } from "../data-source";
import { Address } from "../entities/Address";
import { isVerified } from "../middlewares/isVerified";
import { type MyContext } from "../types";
import AddressInput from "./GqlObjets/AddressInput";

@Resolver(Address)
export class AddressResolver {
	@Query(() => [Address], { nullable: true })
	@UseMiddleware(isVerified)
	addresses(@Ctx() { req }: MyContext) {
		return Address.find({ where: { userId: req.session.userId } });
	}

	@Mutation(() => Address)
	@UseMiddleware(isVerified)
	async addAddress(
		@Arg("input", () => AddressInput) input: AddressInput,
		@Ctx() { req }: MyContext
	): Promise<Address> {
		return Address.create({ ...input, userId: req.session.userId }).save();
	}

	@Mutation(() => Address)
	@UseMiddleware(isVerified)
	async updateAddress(
		@Arg("id", () => Int) id: number,
		@Arg("input", () => AddressInput) input: AddressInput,
		@Ctx() { req }: MyContext
	): Promise<Address> {
		const result = await AppDataSource.createQueryBuilder()
			.update(Address)
			.set({ ...input })
			.where('id = :id and "userId" = :userId', {
				id,
				userId: req.session.userId,
			})
			.returning("*")
			.execute();
		return result.raw[0];
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isVerified)
	async deleteAddress(
		@Arg("id", () => Int) id: number,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		await Address.delete({ id, userId: req.session.userId });
		return true;
	}
}

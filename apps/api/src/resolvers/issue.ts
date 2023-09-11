import { isVerified } from "../middlewares/isVerified";
import { Issue } from "../entities/Issue";
import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
import IssueInput from "./GqlObjets/Issue";
import { AppDataSource } from "../data-source";
import { IssueCategory } from "../entities/IssueCategory";
import { IssueComment } from "../entities/IssueComment";

@Resolver()
export class IssueResolver {
	@Query(() => [Issue])
	@UseMiddleware(isVerified)
	async issues(@Ctx() { req }: MyContext) {
		return Issue.find({
			relations: {
				category: true,
			},
			where: {
				userId: req.session.userId,
			},
			order: {
				created_at: "DESC",
			},
		});
	}

	@Query(() => Issue)
	@UseMiddleware(isVerified)
	async issuesWithComments(@Arg("issueId", () => Int) issueId: number) {
		return Issue.findOne({
			select: {
				user: {
					first_name: true,
					last_name: true,
					role: {
						name: true,
					},
					imageUrl: true,
				},
			},
			relations: {
				category: true,
				comments: {
					user: {
						role: true,
					},
				},
				user: {
					role: true,
				},
			},
			where: {
				id: issueId,
			},
			order: {
				comments: {
					created_at: "ASC",
				},
			},
		});
	}

	@Query(() => [IssueCategory])
	@UseMiddleware(isVerified)
	async issueCategories() {
		return IssueCategory.find();
	}

	@Mutation(() => Issue)
	@UseMiddleware(isVerified)
	async createIssue(
		@Arg("input", () => IssueInput) input: IssueInput,
		@Ctx() { req }: MyContext
	): Promise<Issue> {
		return Issue.create({
			...input,
			categoryId: Number(input.categoryId),
			userId: req.session.userId,
		}).save();
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isVerified)
	async resolveByCustomer(
		@Arg("issueId", () => Int) issueId: number,
		@Ctx() { req }: MyContext
	): Promise<boolean> {
		await Issue.findOneByOrFail({
			id: issueId,
			userId: req.session.userId,
		});

		await Issue.update(
			{ id: issueId },
			{
				status: "RESOLVED_BY_CUSTOMER",
				completed_at: new Date(Date.now()).toISOString(),
			}
		);

		return true;
	}

	@Mutation(() => IssueComment)
	@UseMiddleware(isVerified)
	async createComment(
		@Arg("content", () => String) content: string,
		@Arg("issueId", () => Int) issueId: number,
		@Ctx() { req }: MyContext
	): Promise<IssueComment> {
		return IssueComment.create({
			content,
			issueId,
			userId: req.session.userId,
		}).save();
	}

	@Mutation(() => Issue)
	@UseMiddleware(isVerified)
	async updateIssue(
		@Arg("id", () => Int) id: number,
		@Arg("input", () => IssueInput) input: IssueInput,
		@Ctx() { req }: MyContext
	): Promise<Issue> {
		const result = await AppDataSource.createQueryBuilder()
			.update(Issue)
			.set({ ...input })
			.where('id = :id and "userId" = :userId', {
				id,
				userId: req.session.userId,
			})
			.returning("*")
			.execute();
		return result.raw[0];
	}
}

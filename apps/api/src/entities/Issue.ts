import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
	JoinTable,
	OneToMany,
} from "typeorm";
import { User } from "./User";
import { IssueCategory } from "./IssueCategory";
import { IssueComment } from "./IssueComment";

export const POSSIBLE_ISSUE_STATUS = [
	"SUBMITTED",
	"OPEN",
	"IN_PROGRESS",
	"ON_HOLD",
	"CLOSED",
	"REJECTED",
	"RESOLVED_BY_CUSTOMER",
	"PENDING_CUSTOMER_RESPONSE",
];

export type IssueStatus =
	| "SUBMITTED"
	| "OPEN"
	| "IN_PROGRESS"
	| "ON_HOLD"
	| "CLOSED"
	| "REJECTED"
	| "RESOLVED_BY_CUSTOMER"
	| "PENDING_CUSTOMER_RESPONSE";

@ObjectType()
@Entity()
export class Issue extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@Column()
	subject!: string;

	@Field(() => String)
	@Column({
		type: "text",
	})
	content!: string;

	@Field(() => String, {
		nullable: true,
	})
	@Column({
		type: "text",
		nullable: true,
	})
	html?: string;

	@Field(() => String)
	@Column({
		type: "enum",
		enum: POSSIBLE_ISSUE_STATUS,
		default: "SUBMITTED",
	})
	status!: IssueStatus;

	@Field(() => [IssueComment], { nullable: true })
	@OneToMany(() => IssueComment, (comment) => comment.issue)
	@JoinTable({ name: "comment_id" })
	comments?: IssueComment[];

	@Field(() => String, { nullable: true })
	@Column({
		type: "timestamp with time zone",
		nullable: true,
	})
	completed_at?: string;

	@Field(() => Int)
	@Column()
	categoryId!: number;

	@Field(() => IssueCategory)
	@ManyToOne(() => IssueCategory, (category) => category.issues)
	@JoinTable({ name: "category_id" })
	category!: IssueCategory;

	@Field()
	@Column()
	userId!: number;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.issues)
	user!: User;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}

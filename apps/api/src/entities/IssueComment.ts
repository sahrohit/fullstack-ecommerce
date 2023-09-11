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
} from "typeorm";
import { User } from "./User";
import { Issue } from "./Issue";

@ObjectType()
@Entity()
export class IssueComment extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

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

	@Field(() => String, { nullable: true })
	@Column({
		type: "timestamp with time zone",
		nullable: true,
	})
	completed_at?: string;

	@Field(() => Int)
	@Column()
	issueId!: number;

	@Field(() => Issue)
	@ManyToOne(() => Issue, (issue) => issue.comments)
	@JoinTable({ name: "issue_id" })
	issue!: Issue;

	@Field()
	@Column()
	userId!: number;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.addresses)
	user!: User;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}

import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Issue } from "./Issue";

@ObjectType()
@Entity()
export class IssueCategory extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@Column()
	name!: string;

	@Field(() => String)
	@Column({ unique: true })
	identifier!: string;

	@Field(() => String)
	@Column({ type: "text" })
	desc!: string;

	@Field(() => [Issue], { nullable: true })
	@OneToMany(() => Issue, (issue) => issue.category)
	@JoinTable({ name: "issue_id" })
	issues?: Issue[];

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}

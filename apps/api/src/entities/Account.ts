import { Field, Int, ObjectType } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	ManyToOne,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Account extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	userId!: number;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.accounts)
	user!: User;

	@Field(() => String)
	@Column({
		type: "enum",
		enum: ["OAUTH", "PASSWORD"],
	})
	type!: "OAUTH" | "PASSWORD";

	@Field()
	@Column()
	provider!: string;

	@Field()
	@Column()
	providerAccountId!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	refresh_token!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	access_token!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	expires_at!: number;

	@Field({ nullable: true })
	@Column({ nullable: true })
	token_type!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	scope!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	id_token!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	session_state!: string;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}

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
export class Tenant extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column()
	desc!: string;

	@Field()
	@Column({
		nullable: true,
		default:
			"https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg",
	})
	logo?: string;

	@Field()
	@Column({
		nullable: true,
		default: "Popins",
	})
	font?: string;

	@Field()
	@Column()
	subdomain!: string;

	@Field()
	@Column({ nullable: true })
	customDomain?: string;

	@Field()
	@Column({
		default: false,
	})
	defaultForPreview!: boolean;

	@Field()
	@Column()
	userId!: number;

	@ManyToOne(() => User, (user) => user.addresses)
	user!: User;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}

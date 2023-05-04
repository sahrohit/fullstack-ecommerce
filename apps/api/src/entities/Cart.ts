import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { ProductInventory } from "./ProductInventory";

@ObjectType()
@Entity()
@Unique(["userId", "inventoryId"])
export class Cart extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => Int)
	@Column()
	userId!: number;

	@Field(() => Int)
	@Column()
	quantity!: number;

	@Field(() => Int)
	@Column()
	inventoryId!: number;

	@Field(() => ProductInventory)
	@ManyToOne(
		() => ProductInventory,
		(productinventory) => productinventory.carts
	)
	@JoinColumn({ name: "inventoryId" })
	inventory!: ProductInventory;

	@ManyToOne(() => User, (user) => user.carts)
	user!: User;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}

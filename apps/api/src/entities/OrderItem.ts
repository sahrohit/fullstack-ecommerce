import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { OrderDetail } from "./OrderDetail";
import { ProductInventory } from "./ProductInventory";

@Entity()
@ObjectType()
export class OrderItem extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => OrderDetail)
	@ManyToOne(() => OrderDetail, (orderdetail) => orderdetail.orderitems)
	@JoinColumn({ name: "orderId" })
	orderdetail!: OrderDetail;

	@Field(() => ProductInventory, { nullable: true })
	@ManyToOne(
		() => ProductInventory,
		(productinventory) => productinventory.orderitems
	)
	@JoinColumn({ name: "inventoryId" })
	inventory!: ProductInventory;

	@Field(() => Int)
	@Column()
	quantity!: number;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}

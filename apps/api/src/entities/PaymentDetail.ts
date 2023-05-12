import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";
import { OrderDetail } from "./OrderDetail";

export type PaymentStatus =
	| "PENDING"
	| "COMPLETE"
	| "REFUNDED"
	| "FAILED"
	| "ABANDONED";

@ObjectType()
@Entity()
export class PaymentDetail extends BaseEntity {
	@Column()
	@PrimaryColumn()
	id!: string;

	@Field(() => String)
	orderId!: string;

	@Field(() => OrderDetail)
	@ManyToOne(() => OrderDetail, (orderdetail) => orderdetail.paymentdetails)
	@JoinColumn({ name: "orderId" })
	orderdetail!: OrderDetail;

	@Field()
	@Column()
	amount!: number;

	@Field()
	@Column()
	provider!: string;

	@Field(() => String)
	@Column({
		type: "enum",
		enum: ["PENDING", "COMPLETE", "REFUNDED", "FAILED", "ABANDONED"],
		default: "PENDING",
	})
	status!: PaymentStatus;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}

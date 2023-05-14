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
	| "COMPLETED"
	| "REFUNDED"
	| "FAILED"
	| "EXPIRED";

@ObjectType()
@Entity()
export class PaymentDetail extends BaseEntity {
	@Field(() => String)
	@Column()
	@PrimaryColumn()
	id!: string;

	@Field(() => String)
	@Column()
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
		enum: ["PENDING", "COMPLETED", "REFUNDED", "FAILED", "ABANDONED"],
		default: "PENDING",
	})
	status!: PaymentStatus;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	transactionId!: string;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}

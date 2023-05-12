import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { OrderDetail } from "./OrderDetail";

@ObjectType()
@Entity()
export class PaymentDetail extends BaseEntity {
	@Column()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@Column()
	orderId!: string;

	@Field(() => OrderDetail)
	@OneToOne(() => OrderDetail, (orderdetail) => orderdetail.paymentdetail)
	orderdetail!: OrderDetail;

	@Field()
	@Column()
	amount!: number;

	@Field()
	@Column()
	provider!: string;

	@Field()
	@Column()
	pidx!: string;

	@Field()
	@Column()
	status!: string;

	@Field(() => String)
	@CreateDateColumn()
	created_at = new Date();

	@Field(() => String)
	@UpdateDateColumn()
	updated_at = new Date();
}

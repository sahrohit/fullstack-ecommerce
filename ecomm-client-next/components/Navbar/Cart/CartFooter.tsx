import { Dispatch, SetStateAction } from "react";

interface CartFooterProps {
	className?: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const CartFooter = ({ className, setOpen }: CartFooterProps) => {
	return (
		<div className={`border-t border-gray-200 py-6 px-4 sm:px-6 ${className}`}>
			<div className="flex justify-between text-base font-medium text-gray-900">
				<p>Subtotal</p>
				<p>$262.00</p>
			</div>
			<p className="mt-0.5 text-sm text-gray-500">
				Shipping and taxes calculated at checkout.
			</p>
			<button
				type="button"
				className="mt-6 btn btn-primary btn-block font-medium shadow-sm"
			>
				Checkout
			</button>
			<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
				<p>
					or{" "}
					<button
						type="button"
						className="font-medium text-indigo-600 hover:text-indigo-500"
						onClick={() => setOpen(false)}
					>
						Continue Shopping
						<span aria-hidden="true"> &rarr;</span>
					</button>
				</p>
			</div>
		</div>
	);
};

export default CartFooter;

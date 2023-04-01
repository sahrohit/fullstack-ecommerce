/* eslint-disable @next/next/no-img-element */
import {
	CartResponse,
	useDeleteFromCartMutation,
	useUpdateCartMutation,
} from "@generated/graphql";
import toast from "react-hot-toast";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

interface CartBodyProps {
	products?: CartResponse[] | [];
}

const CartBody = ({ products }: CartBodyProps) => {
	const [updateCart] = useUpdateCartMutation();
	const [deleteFromCart] = useDeleteFromCartMutation();

	return (
		<div className="flex-1 overflow-y-auto px-4 sm:px-6">
			<div className="mt-8">
				<div className="flow-root">
					{products ? (
						<ul role="list" className="-my-6 divide-y divide-gray-200">
							{products.map((product) => (
								<li key={product.id} className="flex py-6">
									<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
										{product.images && product.images[0].imageURL ? (
											<img
												src={product.images[0]?.imageURL}
												alt={product.product_name}
												className="h-full w-full object-cover object-center"
											/>
										) : (
											<img
												src={"https://via.placeholder.com/150"}
												alt={product.product_name}
												className="h-full w-full object-cover object-center"
											/>
										)}
									</div>

									<div className="ml-4 flex flex-1 flex-col">
										<div>
											<div className="flex justify-between text-base font-medium ">
												<h3>
													<a href="#"> {product.product_name} </a>
												</h3>
												<p className="ml-4 whitespace-nowrap">
													Rs {product.price}
												</p>
											</div>
											<div className="flex justify-between text-sm font-medium">
												<h3>
													<a href="#"> Variant: {product.variant} </a>
												</h3>
												<p className="ml-4"> ✕ {product.quantity}</p>
											</div>
										</div>
										<div className="flex flex-1 items-end justify-between text-sm">
											<p className="text-base font-medium text-md">
												Rs {product.quantity * product.price}
											</p>

											<div className="btn-group">
												<button
													className="btn btn-sm btn-outline btn-ghost"
													onClick={() => {
														toast.promise(
															updateCart({
																variables: {
																	inventoryId: product.inventoryId,
																	updatedCartQuantity: product.quantity + 1,
																},
																update: (cache) =>
																	cache.evict({ fieldName: "fetchCartItems" }),
															}),
															{
																loading: "Updating Cart...",
																success: "Updated Cart Successfully",
																error: (error) => error.message,
															}
														);
													}}
												>
													<AiOutlinePlus transform="scale(1.2)" />
												</button>
												<button
													className={`btn btn-sm btn-outline btn-ghost ${
														product.quantity <= 1 && "btn-error"
													}`}
													onClick={() => {
														toast.promise(
															deleteFromCart({
																variables: {
																	inventoryId: product.inventoryId,
																	quantity: 1,
																},
																update: (cache) =>
																	cache.evict({
																		fieldName: "fetchCartItems",
																	}),
															}),
															{
																loading: "Updating Cart...",
																success: "Updated Cart Successfully",
																error: (error) => error.message,
															}
														);
													}}
												>
													{product.quantity > 1 ? (
														<AiOutlineMinus transform="scale(1.2)" />
													) : (
														<BsTrash transform="scale(1.2)" />
													)}
												</button>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p className="text-center">No products in cart</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default CartBody;

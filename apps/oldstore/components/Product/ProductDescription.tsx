import {
	ProductResponse,
	ProductVariantResponse,
	useAddToCartMutation,
} from "@generated/graphql";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RatingStars from "./RatingStars";

interface ProductDescriptionProps {
	product: ProductResponse;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
	const [selectedVariant, setSelectedVariant] =
		useState<ProductVariantResponse>(
			product.variants.filter((variant) => variant.quantity > 0)[0]
		);

	const [addToCart] = useAddToCartMutation();

	return (
		<div className="m-4 p-4 flex flex-col space-y-8">
			<div className="flex flex-col space-y-2">
				<div className="flex flex-row justify-between">
					<h1 className="text-2xl font-semibold">{product.name}</h1>
					<h1 className="text-2xl font-semibold">Rs {selectedVariant.price}</h1>
				</div>
				<div className="flex flex-row space-x-2">
					<RatingStars rating={3.0} />
					<p>&middot;</p>
					<a className="font-semibold">See All Reviews</a>
				</div>
			</div>
			<RadioGroup value={selectedVariant} onChange={setSelectedVariant}>
				<RadioGroup.Label className="font-semibold">
					{`Variants : ${selectedVariant.variant}`}
				</RadioGroup.Label>
				<div className="flex flex-row space-x-4 flex-wrap">
					{product.variants.map((variant) => (
						<RadioGroup.Option
							key={variant.variant_id}
							value={variant}
							disabled={variant.quantity < 1}
						>
							{({ checked }) => (
								<div
									className={`border-solid border-2 rounded-md my-2 px-6 py-2 ${
										checked && "bg-primary-content"
									} ${variant.quantity < 1 && "bg-gray-200"}`}
								>
									<span
										className={`text-lg font-bold ${
											variant.quantity < 1 ? "text-gray-400" : "text-primary"
										}`}
									>
										{variant.variant.toUpperCase()}
									</span>
								</div>
							)}
						</RadioGroup.Option>
					))}
				</div>
			</RadioGroup>
			<button
				className="w-full btn btn-primary"
				onClick={() => {
					toast.promise(
						addToCart({
							variables: {
								inventoryId: selectedVariant.variant_id,
								quantity: 1,
							},
							update: (cache) => cache.evict({ fieldName: "fetchCartItems" }),
						}),
						{
							loading: "Updating Cart...",
							success: "Updated Cart Successfully",
							error: (error) => error.message,
						}
					);
				}}
			>
				Add to Cart
			</button>

			<div>
				<h2 className="font-semibold">Description</h2>
				<article className="prose prose-slate">
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{product.desc}
					</ReactMarkdown>
				</article>
			</div>
		</div>
	);
};

export default ProductDescription;

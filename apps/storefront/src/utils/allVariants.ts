import { ProductInventory } from "@/generated/graphql";

const allVariants = (inventories: ProductInventory[]) => {
	const mapped: Record<string, string[]> = {};
	inventories.forEach((inventory) => {
		inventory.variants?.forEach((variant) => {
			if (!mapped[variant.variant_value.variant.variant_name]) {
				mapped[variant.variant_value.variant.variant_name] = [];
			}
			if (
				!mapped[variant.variant_value.variant.variant_name].includes(
					variant.variant_value.value
				)
			) {
				mapped[variant.variant_value.variant.variant_name]?.push(
					variant.variant_value.value
				);
			}
		});
	});
	return mapped;
};

export default allVariants;

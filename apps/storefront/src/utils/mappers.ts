import { ProductInventory } from "@/generated/graphql";

/**
 * This method return all the possible variants that could be made
 *
 * @param inventories - Array of Product Inventories
 * @return Array of objects where keys are variant names, and values are all the possible values for that variant
 *
 * @example
 * ```ts
 * {size:["S","M","L"],color:["red","blue","green"]}
 *```
 */
export const allVariants = (inventories: ProductInventory[]) => {
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

/**
 * This method return all the valid variants in the database
 *
 * @param inventories - Array of Product Inventories
 * @return Array of all the unqiue variants that are in the database
 *
 * @example
 * ```ts
 * [{price:1471,size:"L",color:"blue"},{price:1087,size:"M",color:"green"}]
 *```
 */
export const validVariants = (inventories: ProductInventory[]) =>
	inventories.map((inventory) => {
		const values: Record<string, string | number> = {};
		values.inventoryId = inventory.inventory_id;
		values.price = inventory.price;
		inventory.variants?.forEach((variant) => {
			values[`${variant.variant_value.variant.variant_name}`] =
				variant.variant_value.value;
		});
		return values;
	});

/**
 * This method return an object with all the variant names as keys and null as values
 *
 * @param selectors - Array of objects where keys are variant names, and values are all the possible values for that variant
 * ```ts
 * {size:["S","M","L"],color:["red","blue","green"]}
 *```
 *
 * @return Object with all the variant names as keys and null as values
 * ```ts
 * {size:null,color:null}
 * ```
 *
 */
export const selectorsToKeys = (selectors: Record<string, string[]>) => {
	const keys: Record<string, string | number | null> = {};
	Object.keys(selectors).forEach((key: string) => {
		keys[key] = null;
	});
	return keys;
};

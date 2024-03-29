import {
	HStack,
	StackProps,
	Text,
	TextProps,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export interface PriceTagProps {
	currency: string;
	price: number;
	salePrice?: number;
	rootProps?: StackProps;
	priceProps?: TextProps;
	salePriceProps?: TextProps;
}

export type FormatPriceOptions = { locale?: string; currency?: string };

export function formatPrice(
	value: number,
	opts: { locale?: string; currency?: string } = {}
) {
	const { locale = "en-US", currency = "NPR" } = opts;
	const formatter = new Intl.NumberFormat(locale, {
		currency,
		style: "currency",
		maximumFractionDigits: 2,
	});
	return formatter.format(value);
}

export const PriceTag = (props: PriceTagProps) => {
	const { price, currency, salePrice, rootProps, priceProps, salePriceProps } =
		props;
	return (
		<HStack spacing="1" {...rootProps}>
			<Price isOnSale={!!salePrice} textProps={priceProps}>
				{formatPrice(price / 100, { currency })}
			</Price>
			{salePrice && (
				<SalePrice {...salePriceProps}>
					{formatPrice(salePrice, { currency })}
				</SalePrice>
			)}
		</HStack>
	);
};

PriceTag.defaultProps = {
	salePrice: undefined,
	rootProps: {},
	priceProps: {},
	salePriceProps: {},
};

export interface PriceProps {
	children: ReactNode;
	isOnSale?: boolean;
	textProps?: TextProps;
}

export const Price = (props: PriceProps) => {
	const { isOnSale, children, textProps } = props;
	const defaultColor = mode("gray.700", "gray.100");
	const onSaleColor = mode("gray.400", "gray.500");
	const color = isOnSale ? onSaleColor : defaultColor;
	return (
		<Text
			as="span"
			fontWeight="medium"
			color={color}
			textDecoration={isOnSale ? "line-through" : "none"}
			{...textProps}
		>
			{children}
		</Text>
	);
};

Price.defaultProps = {
	isOnSale: false,
	textProps: {},
};

const SalePrice = (props: TextProps) => (
	<Text
		as="span"
		fontWeight="semibold"
		color={mode("gray.800", "gray.100")}
		{...props}
	/>
);

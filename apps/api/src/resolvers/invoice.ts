import { COMPANY } from "../constants";
import { OrderDetail } from "../entities/OrderDetail";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import easyinvoice from "easyinvoice";
import { sendEmailWithAttachment } from "../utils/sendEmail";
import { invoiceTemplate } from "../static/invoiceTemplate";
import { isAuth } from "../middlewares/isAuth";

@Resolver()
export class InvoiceResolver {
	@Mutation(() => String, { nullable: true })
	@UseMiddleware(isAuth)
	async generateInvoice(
		@Arg("orderId", () => String) orderId: string
	): Promise<string> {
		return (await easyinvoice.createInvoice(await getSampleData(orderId))).pdf;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async emailInvoice(
		@Arg("orderId", () => String) orderId: string,
		@Arg("email", () => String) email: string
	): Promise<boolean> {
		await easyinvoice.createInvoice(
			await getSampleData(orderId),
			async function (result) {
				await sendEmailWithAttachment(
					email,
					`Invoice for ${orderId}`,
					invoiceTemplate(orderId),
					[
						{
							filename: `INVOICE-${orderId}.pdf`,
							path: `data:application/pdf;base64,${result.pdf}`,
						},
					]
				);
			}
		);
		return true;
	}
}

export const getSampleData = async (orderId: string) => {
	const order = await OrderDetail.findOne({
		relations: {
			orderitems: {
				inventory: {
					product: {
						images: true,
						category: true,
						inventories: {
							variants: {
								variant_value: {
									variant: true,
								},
							},
						},
					},
					variants: {
						variant_value: {
							variant: true,
						},
					},
				},
			},
			address: true,
			paymentdetails: true,
			promo: true,
			user: true,
		},
		where: { id: orderId },
	});

	return {
		images: {
			logo: COMPANY.logo,
		},
		sender: {
			company: COMPANY.name,
			address: COMPANY.address,
			zip: COMPANY.zip,
			city: COMPANY.city,
			country: COMPANY.country,
		},
		client: {
			company: order?.user?.first_name + " " + order?.user?.last_name,
			address: order?.address.address,
			zip: order?.address.zip,
			city: order?.address.city,
			country: order?.address.country,
			// "custom1": "custom value 1",
		},
		information: {
			date: order?.created_at.toString(),
			number: order?.id,
			// "due-date": "31-12-2021",
		},
		products: order?.orderitems.map((item) => {
			return {
				quantity: item.quantity.toString(),
				description: item.inventory.product.name,
				"tax-rate": 0,
				price: item.inventory.price,
			};
		}),
		// [
		// 	{
		// 		quantity: 2,
		// 		description: "Product 1",
		// 		"tax-rate": 6,
		// 		price: 33.87,
		// 	},
		// 	{
		// 		quantity: 4.1,
		// 		description: "Product 2",
		// 		"tax-rate": 6,
		// 		price: 12.34,
		// 	},
		// 	{
		// 		quantity: 4.5678,
		// 		description: "Product 3",
		// 		"tax-rate": 21,
		// 		price: 6324.453456,
		// 	},
		// ]
		"bottom-notice":
			"This is a fake invoice. It is not valid for tax purposes.",
		settings: {
			currency: "NPR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
			// "locale": "nl-NL", // Defaults to en-US, used for number formatting (see docs)
			// "margin-top": 25, // Default to 25
			// "margin-right": 25, // Default to 25
			// "margin-left": 25, // Default to 25
			// "margin-bottom": 25, // Default to 25
			// "format": "Letter", // Defaults to A4,
			// "height": "1000px", // allowed units: mm, cm, in, px
			// "width": "500px", // allowed units: mm, cm, in, px
			// "orientation": "landscape", // portrait or landscape, defaults to portrait
		},
		// Used for translating the headers to your preferred language
		// Defaults to English. Below example is translated to Dutch
		translate: {
			//     "invoice": "FACTUUR",
			//     "number": "Nummer",
			//     "date": "Datum",
			//     "due-date": "Verloopdatum",
			//     "subtotal": "Subtotaal",
			//     "products": "Producten",
			//     "quantity": "Aantal",
			//     "price": "Prijs",
			//     "product-total": "Totaal",
			//     "total": "Totaal"
			//		 "vat": "btw"
		},
	};
};

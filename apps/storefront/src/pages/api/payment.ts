// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { APP_URL } from "../../../constants";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	if (req.method !== "POST") {
		res.status(405).send({ message: "Only POST requests allowed" });
		return;
	}

	const resposne = await fetch(
		"https://a.khalti.com/api/v2/epayment/initiate/",
		{
			method: "POST",
			body: JSON.stringify({
				return_url: `${APP_URL}/cart/checkout/result`,
				website_url: APP_URL,
				...req.body,
			}),
			headers: {
				"content-type": "application/json",
				Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`, // Replace LIVE_SECRET_KEY with your live secret key
			},
		}
	);

	const khaltiResponse = await resposne.json();

	res.status(200).json({ ...khaltiResponse });
}

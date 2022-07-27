import nodemailer from "nodemailer";
import { COMPANY_NAME } from "../constants";

export async function sendEmail(to: string, subject: string, html: string) {
	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
		auth: {
			user: "rwsyp2irzn7dnwjn@ethereal.email",
			pass: "5MVb5jRYwEBntCNvQf",
		},
	});

	const info = await transporter.sendMail({
		from: `"${COMPANY_NAME} 👻" <noreply@${COMPANY_NAME.toLowerCase().replace(
			/\s/g,
			""
		)}.com>`,
		to: to,
		subject,
		html,
	});

	console.log("Message sent: %s", info.messageId);
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

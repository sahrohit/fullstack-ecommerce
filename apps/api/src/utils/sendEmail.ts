import nodemailer from "nodemailer";
import { COMPANY_NAME } from "../constants";

export async function sendEmail(to: string, subject: string, html: string) {
	const transporter = nodemailer.createTransport({
		host: "smtp.resend.com",
		port: 465,
		secure: true,
		auth: {
			user: "resend",
			pass: "re_Mmemn4qM_6nP3auYjegwysiXLFsaYkBbX",
		},
	});

	const info = await transporter.sendMail({
		from: `"${COMPANY_NAME} 👻" <noreply@rudejellyfish.live>`,
		to: to,
		subject,
		html,
	});

	console.log("Message sent: %s", info.messageId);
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

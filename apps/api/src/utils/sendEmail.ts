import nodemailer from "nodemailer";
import { COMPANY, __prod__ } from "../constants";
import { Attachment } from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function sendEmail(
	to: string,
	subject: string,
	html: string
): Promise<SMTPTransport.SentMessageInfo> {
	const transporter = nodemailer.createTransport({
		host: "smtp.resend.com",
		port: 465,
		secure: true,
		auth: {
			user: "resend",
			pass: process.env.RESEND_API_KEY,
		},
	});

	const info = await transporter.sendMail({
		from: `"${COMPANY.name} 👻" <noreply@rudejellyfish.live>`,
		to: to,
		subject,
		html,
	});

	console.log("Message sent: %s", info.messageId);
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

	return info;
}

export async function sendEmailWithAttachment(
	to: string,
	subject: string,
	html: string,
	attachments: Attachment[]
): Promise<SMTPTransport.SentMessageInfo> {
	const transporter = nodemailer.createTransport({
		host: "smtp.resend.com",
		port: 465,
		secure: __prod__,
		auth: {
			user: "resend",
			pass: process.env.RESEND_API_KEY,
		},
	});

	const info = await transporter.sendMail({
		from: `"${COMPANY.name} 👻" <noreply@rudejellyfish.live>`,
		to: to,
		subject,
		html,
		attachments: attachments,
	});

	console.log("Message sent: %s", info.messageId);
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

	return info;
}

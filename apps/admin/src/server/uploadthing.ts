import { log } from "logger";
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

export const ourFileRouter = {
	// Router for uploading documents
	kycDocumentUploader: f({
		image: { maxFileCount: 1 },
	}).onUploadComplete(async ({ file }) => {
		log("KYC Document Uploded", file.name, file.url);
	}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

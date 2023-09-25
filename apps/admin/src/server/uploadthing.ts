import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

export const ourFileRouter = {
	// Router for uploading documents
	kycDocumentUploader: f({
		image: { maxFileCount: 5 },
		pdf: { maxFileCount: 5 },
	}).onUploadComplete(async ({ file }) => {
		console.log("file url", file.url);
	}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

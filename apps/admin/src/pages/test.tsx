import { UploadDropzone } from "@/utils/uploadthing";

const TestPage = () => (
	<UploadDropzone
		endpoint="kycDocumentUploader"
		onClientUploadComplete={(res) => {
			// Do something with the response
			console.log("Files: ", res);
		}}
		onUploadError={(error: Error) => {
			// Do something with the error.
			alert(`ERROR! ${error.message}`);
		}}
	/>
);

export default TestPage;

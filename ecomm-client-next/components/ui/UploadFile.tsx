import { ReactNode, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineDelete } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";

interface UplaodFileProps {
	id: string;
	button: ReactNode;
}

const UploadFile = ({ id, button }: UplaodFileProps) => {
	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState<string | undefined>();

	const onDrop = useCallback((acceptedFiles: any) => {
		setSelectedFile(acceptedFiles[0]);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".jpeg", ".png"],
		},
	});

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	return (
		<>
			{button}
			<input type="checkbox" id={id} className="modal-toggle" />
			<label htmlFor={id} className="modal modal-bottom sm:modal-middle">
				<div className="modal-box whitespace-normal">
					<label
						htmlFor={id}
						className="btn btn-sm btn-circle absolute right-2 top-2"
					>
						✕
					</label>

					<h3 className="font-bold text-lg">Upload Photo</h3>
					<div className="flex flex-col gap-4 m-4">
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							{isDragActive ? (
								<div className="grid place-items-center py-10 px-2 border-2 border-dashed border-gray-400 rounded-md">
									<p>Drop the files here ...</p>
								</div>
							) : (
								<label className="grid place-items-center py-10 px-2 border-2 border-dashed border-gray-400 rounded-md">
									<CiImageOn className="text-4xl" />
									<p>
										<span className="text-secondary cursor-pointer">
											Upload a file{" "}
										</span>
										or drag and drop
									</p>
								</label>
							)}
						</div>

						{selectedFile && (
							<>
								<div>
									<img className="my-4" src={preview} alt="preview" />
								</div>
								<div className="w-full flex flex-row gap-4">
									<label
										className="btn btn-error btn-outline gap-2"
										onClick={(e) => {
											e.preventDefault();
											setSelectedFile(undefined);
										}}
									>
										<AiOutlineDelete transform="scale(1.5)" />
										Clear
									</label>
									<button
										className="btn btn-outline flex-grow"
										type="button"
										onClick={() => console.log("Hello WOrld")}
									>
										Upload
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</label>
		</>
	);
};

export default UploadFile;

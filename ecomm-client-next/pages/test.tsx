import { NextPage } from "next";
import { toast } from "react-hot-toast";

const Test: NextPage = () => {
	return (
		<button
			onClick={() => {
				toast.success(
					() => (
						<div>
							<strong>Successfully Registered !</strong>
							<p>Verify you email to continue.</p>
						</div>
					),
					{ duration: 9000 }
				);
			}}
		>
			Toast
		</button>
	);
};

export default Test;

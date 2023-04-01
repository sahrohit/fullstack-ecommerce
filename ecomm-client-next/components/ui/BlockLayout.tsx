import { ReactNode } from "react";

interface BlockLayoutProps {
	title: string;
	description: string;
	content: ReactNode;
}

const BlockLayout = ({ title, description, content }: BlockLayoutProps) => {
	return (
		<div className="flex flex-col md:flex-row space-y-4 md:space-x-4">
			<div className="basis-1/3">
				<h1 className="text-xl font-semibold">{title}</h1>
				<p>{description}</p>
			</div>
			<div className="basis-2/3">
				<div className="rounded-lg">{content}</div>
			</div>
		</div>
	);
};

export default BlockLayout;

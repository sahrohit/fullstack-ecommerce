import { ReactNode } from "react";

interface IconButtonProps {
	icon: ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	active: boolean;
	className?: string;
	style?: Record<string, string>;
}

const IconButton = ({ onClick, style, icon }: IconButtonProps) => {
	return (
		<button
			style={style}
			onMouseDown={(evt) => {
				evt.preventDefault();
				evt.stopPropagation();
			}}
			type="button"
			onClick={onClick}
			className={`text-white dark:text-black bg-gray-800 hover:bg-gray-700 font-medium rounded-full text-xl p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-100 dark:hover:bg-gray-200 $`}
		>
			{icon}
		</button>
	);
};

IconButton.defaultProps = {
	active: false,
	style: {},
};

export default IconButton;

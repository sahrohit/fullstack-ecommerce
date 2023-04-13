/* eslint-disable @typescript-eslint/no-non-null-assertion */
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import useDrag from "@components/hooks/useDrag";
import Alert from "@components/ui/Alert";
import { useCategoriesQuery } from "@generated/graphql";
import { useRouter } from "next/router";
import { ContextType, useContext, useRef } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

type scrollVisibilityApiType = ContextType<typeof VisibilityContext>;

const CategoryPage = () => {
	const { data, loading, error } = useCategoriesQuery();

	const apiRef = useRef({} as scrollVisibilityApiType);
	const { dragStart, dragStop, dragMove, dragging } = useDrag();

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	if (error) {
		return (
			<Alert
				message="An Error Occured"
				title="Couldn't load Current User"
				status="error"
			/>
		);
	}

	const reset = () => {
		apiRef.current.scrollToItem(
			apiRef.current.getItemById("22"),
			"smooth",
			"center",
			"nearest"
		);
	};

	const handleDrag =
		({ scrollContainer }: scrollVisibilityApiType) =>
		(ev: React.MouseEvent & any) =>
			dragMove(ev, (posDiff) => {
				if (scrollContainer.current) {
					scrollContainer.current.scrollLeft += posDiff;
				}
			});

	return (
		<>
			<ScrollMenu
				apiRef={apiRef}
				LeftArrow={LeftArrow}
				RightArrow={RightArrow}
				onMouseDown={() => dragStart as any}
				onMouseUp={() => dragStop}
				onMouseMove={handleDrag}
			>
				{data!.categories.map((category) => (
					<Card
						itemId={category.id}
						title={category.name}
						key={category.id}
						dragging={dragging}
					/>
				))}
			</ScrollMenu>
			<button onClick={reset}>Reset</button>
		</>
	);
};

export default CategoryPage;

const LeftArrow = () => {
	const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

	return (
		<button
			className="btn btn-sm btn-ghost"
			disabled={isFirstItemVisible}
			onClick={() => scrollPrev()}
		>
			<AiOutlineLeft />
		</button>
	);
};

function RightArrow() {
	const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

	return (
		<button
			className="btn btn-sm btn-ghost"
			disabled={isLastItemVisible}
			onClick={() => scrollNext()}
		>
			<AiOutlineRight />
		</button>
	);
}

interface CardType {
	itemId: string | number;
	title: string;
	dragging: boolean;
	onClick?: (visibility: scrollVisibilityApiType) => void;
}

const Card = ({ title, itemId, dragging }: CardType) => {
	const router = useRouter();

	return (
		<button
			onClick={() => {
				if (!dragging) {
					router.push("/");
				}
			}}
			key={itemId}
			className="btn btn-sm btn-ghost snap-center whitespace-nowrap"
			type="button"
		>
			{title}
		</button>
	);
};

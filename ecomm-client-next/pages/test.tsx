import useDrag from "@components/hooks/useDrag";
import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const getItems = () =>
	Array(20)
		.fill(0)
		.map((_, ind) => ({ id: `element-${ind}` }));

function App() {
	const [items, setItems] = React.useState(getItems);
	const [selected, setSelected] = React.useState([]);

	const apiRef = React.useRef({} as scrollVisibilityApiType);

	const reset = () => {
		apiRef.current.scrollToItem(
			apiRef.current.getItemById("element-15"),
			"smooth",
			"center",
			"nearest"
		);
	};

	const { dragStart, dragStop, dragMove, dragging } = useDrag();
	const handleDrag =
		({ scrollContainer, scrollToItem }: scrollVisibilityApiType) =>
		(ev: React.MouseEvent) =>
			dragMove(ev, (posDiff) => {
				if (scrollContainer.current) {
					scrollContainer.current.scrollLeft += posDiff;
				}
			});

	const isItemSelected = (id: any) => !!selected.find((el) => el === id);

	const handleClick =
		(id: any) =>
		({ getItemById, scrollToItem }: scrollVisibilityApiType) => {
			const itemSelected = isItemSelected(id);

			setSelected((currentSelected) =>
				itemSelected
					? currentSelected.filter((el) => el !== id)
					: currentSelected.concat(id)
			);
		};

	return (
		<>
			<ScrollMenu
				apiRef={apiRef}
				LeftArrow={LeftArrow}
				RightArrow={RightArrow}
				onMouseDown={() => dragStart}
				onMouseUp={() => dragStop}
				onMouseMove={handleDrag}
			>
				{items.map(({ id }) => (
					<Card
						itemId={id} // NOTE: itemId is required for track items
						title={id}
						key={id}
						onClick={handleClick(id)}
						selected={isItemSelected(id)}
					/>
				))}
			</ScrollMenu>
			<button onClick={reset}>Jesus</button>
		</>
	);
}

function LeftArrow() {
	const { isFirstItemVisible, scrollPrev } =
		React.useContext(VisibilityContext);

	return (
		<button disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
			Left
		</button>
	);
}

function RightArrow() {
	const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

	return (
		<button disabled={isLastItemVisible} onClick={() => scrollNext()}>
			Right
		</button>
	);
}

function Card({ onClick, selected, title, itemId }: any) {
	const visibility = React.useContext(VisibilityContext);

	return (
		<div
			onClick={() => onClick(visibility)}
			style={{
				width: "160px",
			}}
			tabIndex={0}
		>
			<div className="card">
				<div>{title}</div>
				<div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
				<div>selected: {JSON.stringify(!!selected)}</div>
			</div>
			<div
				style={{
					height: "200px",
				}}
			/>
		</div>
	);
}

export default App;

import { useState } from "react";

export interface SwipeProps {
	minSwipeDistance?: number;
	onLeftSwipe?: () => void;
	onRightSwipe?: () => void;
}

export const useDetectSwipe = ({
	minSwipeDistance = 30,
	onLeftSwipe,
	onRightSwipe,
}: SwipeProps) => {
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);

	// the required distance between touchStart and touchEnd to be detected as a swipe

	const onTouchStart = (e: any) => {
		setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;

		if (isLeftSwipe && onLeftSwipe) onLeftSwipe();
		if (isRightSwipe && onRightSwipe) onRightSwipe();
		// add your conditional logic here
	};

	// const getSwipeProps = () => {

	return {
		onTouchStart,
		onTouchMove,
		onTouchEnd,
	};
};

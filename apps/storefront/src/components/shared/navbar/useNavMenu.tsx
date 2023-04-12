/* eslint-disable consistent-return */
import { useDisclosure } from "@chakra-ui/react";
import { isFocusable, getOwnerDocument, isRightClick } from "@chakra-ui/utils";
import { useRef, useEffect, ComponentPropsWithRef } from "react";

const getTarget = (event: FocusEvent) =>
	(event.relatedTarget || document.activeElement) as HTMLElement;

type OmitMotionProps<T> = Omit<
	T,
	"onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"
>;

const useNavMenu = () => {
	const { isOpen, onClose, onToggle, onOpen } = useDisclosure();
	const menuRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<any>(null);
	const timeoutRef = useRef<number>();

	useEffect(
		() => () => {
			if (timeoutRef.current) {
				window.clearTimeout(timeoutRef.current);
			}
		},
		[]
	);

	const focusMenu = () => {
		timeoutRef.current = window.setTimeout(() => {
			menuRef.current?.focus({ preventScroll: true });
		}, 100);
	};

	const getTriggerProps = () => {
		const triggerProps: ComponentPropsWithRef<any> = {
			ref: triggerRef,
			"aria-expanded": isOpen,
			"aria-controls": "menu",
			"aria-haspopup": "true",
		};

		triggerProps.onClick = (event: MouseEvent) => {
			if (isRightClick(event)) return;
			onToggle();
			if (!isOpen) {
				focusMenu();
			}
		};

		triggerProps.onBlur = (event: FocusEvent) => {
			const target = getTarget(event);
			if (isOpen && !menuRef.current?.contains(target)) {
				onClose();
			}
		};

		triggerProps.onKeyDown = (event: KeyboardEvent) => {
			if (isOpen && event.key === "Escape") {
				onClose();
				triggerRef.current?.focus({ preventScroll: true });
			}

			if (event.key === "ArrowDown") {
				if (!isOpen) onOpen();
				focusMenu();
			}
		};

		return triggerProps;
	};

	const getMenuProps = () => {
		const menuProps: OmitMotionProps<ComponentPropsWithRef<"div">> & any = {
			ref: menuRef,
			id: "menu",
			tabIndex: -1,
		};

		menuProps.onKeyDown = (event: KeyboardEvent) => {
			if (!isOpen) return;

			switch (event.key) {
				case "Escape": {
					onClose();
					return triggerRef.current?.focus();
				}
				case "ArrowDown": {
					const doc = getOwnerDocument(menuRef.current);
					const next = doc?.activeElement
						?.nextElementSibling as HTMLAnchorElement | null;
					return next?.focus();
				}
				case "ArrowUp": {
					const doc = getOwnerDocument(menuRef.current);
					const prev = doc?.activeElement
						?.previousElementSibling as HTMLAnchorElement | null;
					const el = (prev ?? triggerRef.current) as HTMLElement;
					return el.focus();
				}
				default:
					break;
			}
		};

		menuProps.onBlur = (event: FocusEvent) => {
			const target = getTarget(event);
			const shouldBlur =
				isOpen &&
				!target.isSameNode(triggerRef.current) &&
				!menuRef.current?.contains(target);
			if (shouldBlur) {
				onClose();
				if (!isFocusable(target)) {
					triggerRef.current?.focus({ preventScroll: true });
				}
			}
		};

		return menuProps;
	};

	return {
		isOpen,
		onClose,
		getTriggerProps,
		getMenuProps,
	};
};

export default useNavMenu;

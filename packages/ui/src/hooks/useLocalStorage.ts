/* eslint-disable import/prefer-default-export */
import {
	Dispatch,
	SetStateAction,
	useDebugValue,
	useEffect,
	useState,
} from "react";

export const useLocalStorage = <S>(
	key: string,
	initialState?: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] => {
	const [state, setState] = useState<S>(initialState as S);
	useDebugValue(state);

	useEffect(() => {
		const item = localStorage.getItem(key);
		if (item) setState(parse(item));
	}, [key]);

	useEffect(() => {
		if (state !== initialState) {
			localStorage.setItem(key, JSON.stringify(state));
		}
	}, [state, initialState, key]);

	return [state, setState];
};

const parse = (value: string) => {
	try {
		return JSON.parse(value);
	} catch {
		return value;
	}
};

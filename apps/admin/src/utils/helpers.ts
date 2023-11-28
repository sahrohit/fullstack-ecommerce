/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */

const f = (a: any, b: any) =>
	[].concat(...a.map((d: any) => b.map((e: any) => [].concat(d, e))));
export const cartesian: any = (a: any, b: any, ...c: any) =>
	b ? cartesian(f(a, b), ...c) : a;

// const f = (a: any, b: any) =>
// 	[].concat(...a.map((d: any) => b.map((e: any) => [].concat(d, e))));
// export const cartesian: any = (a: any, b: any, ...c: any) => {
// 	if (b?.length === 0 && c?.length === 0) {
// 		return a.map((d: any) => [].concat(d));
// 	}
// 	return b ? cartesian(f(a, b), ...c) : a;
// };

// const f = (a: any, b: any) =>
// 	[].concat(...(a?.map((d: any) => b?.map((e: any) => [].concat(d, e))) ?? []));
// export const cartesian: any = (...args: any) => {
// 	const arrays = args.length === 1 ? [args[0]] : args;
// 	return arrays.reduce(f);
// };

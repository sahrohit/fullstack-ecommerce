export const encodeURL = (url: string) => {
	return encodeURI(
		url
			.toLowerCase()
			.replace("&", "and")
			.replace(/[!"#$%&'()*+,./:;<=>?@[\]^_`’{|}~]/g, "")
			.replace(/ +/g, "-")
	);
};

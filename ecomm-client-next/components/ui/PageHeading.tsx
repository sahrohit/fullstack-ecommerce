import React from "react";

interface PageHeadingProps {
	text: string;
}

const PageHeading = ({ text }: PageHeadingProps) => {
	return <h1 className="text-3xl font-bold tracking-tight">{text}</h1>;
};

export default PageHeading;

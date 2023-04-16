/* eslint-disable func-names */
import React from "react";
import SidebarLayout from "../shared/sidebar";

const withSidebar = (Component: React.FC) =>
	function (props: any) {
		return (
			<SidebarLayout>
				<Component {...props} />
			</SidebarLayout>
		);
	};

export default withSidebar;

import {
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Icon,
} from "@chakra-ui/react";
import { BiStoreAlt } from "react-icons/bi";
import { IoShareSocialSharp } from "react-icons/io5";
import { FiUserCheck } from "react-icons/fi";
import { GrDomain } from "react-icons/gr";
import { CiDeliveryTruck } from "react-icons/ci";
import { type IconType } from "react-icons";
import HeadingGroup from "@/components/ui/HeadingGroup";
import StoreDetails from "@/components/pages/settings/StoreDetails";

const SETTING_TABS = [
	{
		icon: BiStoreAlt,
		heading: "Store Details",
		component: StoreDetails,
	},
	{
		icon: IoShareSocialSharp,
		heading: "Social Accounts",
		component: () => <p>Social Accounts</p>,
	},
	{
		icon: FiUserCheck,
		heading: "KYC",
		component: () => <p>KYC Page</p>,
	},
	{
		icon: CiDeliveryTruck,
		heading: "Delivery Options",
		component: () => <p>Delivery Options</p>,
	},
	{
		icon: GrDomain,
		heading: "Domains",
		component: () => <p>Domains</p>,
	},
];

export const TabHeader = ({
	icon,
	heading,
}: {
	icon: IconType;
	heading: string;
}) => (
	<Tab alignItems="center" gap={2}>
		<Icon as={icon} />
		{heading}
	</Tab>
);

const StoreSettings = () => (
	<>
		<HeadingGroup
			title="Account Settings"
			description="Change your profile, request your data, and more"
		/>
		<Tabs
			isLazy
			variant="enclosed-colored"
			isFitted
			colorScheme="primary"
			size="lg"
		>
			<TabList>
				{SETTING_TABS.map((tab) => (
					<TabHeader key={tab.heading} icon={tab.icon} heading={tab.heading} />
				))}
			</TabList>
			<TabPanels>
				{SETTING_TABS.map((tab) => (
					<TabPanel>
						<tab.component />
					</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	</>
);

export default StoreSettings;

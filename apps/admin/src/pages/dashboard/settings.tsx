import {
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Icon,
	Text,
} from "@chakra-ui/react";
import { BiStoreAlt, BiSupport } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";
import { GrDomain } from "react-icons/gr";
import { CiDeliveryTruck } from "react-icons/ci";
import { type IconType } from "react-icons";
import { HeadingGroup } from "ui";
import StoreDetails from "@/components/pages/settings/StoreDetails";
import DeliveryOptions from "@/components/pages/settings/DeliveryOptions";
import Domains from "@/components/pages/settings/Domains";
import StoreContacts from "@/components/pages/settings/Contact";
import TenantKYC from "@/components/pages/settings/KYC";
import withProtected from "@/routes/withProtected";

const SETTING_TABS = [
	{
		icon: BiStoreAlt,
		heading: "Store Details",
		component: StoreDetails,
	},
	{
		icon: BiSupport,
		heading: "Contact",
		component: StoreContacts,
	},
	{
		icon: FiUserCheck,
		heading: "KYC",
		component: TenantKYC,
	},
	{
		icon: CiDeliveryTruck,
		heading: "Delivery Options",
		component: DeliveryOptions,
	},
	{
		icon: GrDomain,
		heading: "Domains",
		component: Domains,
	},
];

export const TabHeader = ({
	icon,
	heading,
}: {
	icon: IconType;
	heading: string;
}) => (
	<Tab flexDirection={["column", "column", "row"]} alignItems="center" gap={2}>
		<Icon as={icon} />
		<Text
			display={{
				base: "none",
				md: "block",
			}}
		>
			{heading}
		</Text>
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
			<TabList position="sticky" top={0} zIndex={10}>
				{SETTING_TABS.map((tab) => (
					<TabHeader
						key={`tab-heading-${tab.heading}`}
						icon={tab.icon}
						heading={tab.heading}
					/>
				))}
			</TabList>
			<TabPanels>
				{SETTING_TABS.map((tab) => (
					<TabPanel key={`tab-content-${tab.heading}`}>
						<tab.component />
					</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	</>
);

export default withProtected(StoreSettings);

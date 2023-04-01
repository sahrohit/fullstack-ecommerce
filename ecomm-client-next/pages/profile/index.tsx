import AccountOptions from "@components/Profile/AccountOptions";
import AddressInformationForm from "@components/Profile/Address/AddressInformationForm";
import PersonalInformationForm from "@components/Profile/PersonalInformationForm";
import BlockLayout from "@components/ui/BlockLayout";
import { withProtected } from "@components/utils/routes";
import { NextPage } from "next";

const ProfilePage: NextPage = () => {
	return (
		<>
			<div className="m-6 rounded-lg p-4 space-y-4">
				<BlockLayout
					title="Profile"
					description="This information will be displayed publicly so be careful what you
						share."
					content={<PersonalInformationForm />}
				/>
				<div className="divider" />
				<BlockLayout
					title="Address"
					description="This information will be displayed publicly so be careful what you
						share."
					content={<AddressInformationForm />}
				/>
				<div className="divider" />
				<BlockLayout
					title="Account Settings"
					description="Please be careful with your cursor down here."
					content={<AccountOptions />}
				/>
			</div>
		</>
	);
};

export default withProtected(ProfilePage);

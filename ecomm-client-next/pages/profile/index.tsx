import Navbar from "@components/Navbar";
import AccountOptions from "@components/Profile/AccountOptions";
import AddressInformationForm from "@components/Profile/Address/AddressInformationForm";
import PersonalInformationForm from "@components/Profile/PersonalInformationForm";
import { withProtected } from "@components/utils/routes";
import { NextPage } from "next";
import { ReactNode } from "react";

const ProfilePage: NextPage = () => {
	return (
		<>
			<Navbar />
			<div className="m-6 rounded-lg p-4 space-y-4">
				<ProfilePageBlockLayout
					title="Profile"
					description="This information will be displayed publicly so be careful what you
						share."
					content={<PersonalInformationForm />}
				/>
				<div className="divider" />
				<ProfilePageBlockLayout
					title="Address"
					description="This information will be displayed publicly so be careful what you
						share."
					content={<AddressInformationForm />}
				/>
				<div className="divider" />
				<ProfilePageBlockLayout
					title="Account Settings"
					description="Please be careful with your cursor down here."
					content={<AccountOptions />}
				/>
			</div>
		</>
	);
};

export default withProtected(ProfilePage);

interface ProfilePageBlockLayoutProps {
	title: string;
	description: string;
	content: ReactNode;
}

const ProfilePageBlockLayout = ({
	title,
	description,
	content,
}: ProfilePageBlockLayoutProps) => {
	return (
		<div className="flex flex-col md:flex-row space-y-4 md:space-x-4">
			<div className="basis-1/3">
				<h1 className="text-xl font-semibold">{title}</h1>
				<p>{description}</p>
			</div>
			<div className="basis-2/3">
				<div className="rounded-lg">{content}</div>
			</div>
		</div>
	);
};

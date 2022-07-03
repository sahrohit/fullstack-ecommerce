import PersonalInformationForm from "@components/Profile/PersonalInformationForm";
import { NextPage } from "next";
import React from "react";

const ProfilePage: NextPage = () => {
	return (
		<>
			<div className="bg-gray-200 m-6 rounded-lg p-4 space-y-4">
				<div className="flex flex-col md:flex-row space-y-4 md:space-x-4">
					<div className="basis-1/3">
						<h1 className="text-xl font-semibold">Profile</h1>
						<p>
							This information will be displayed publicly so be careful what you
							share.
						</p>
					</div>
					<div className="basis-2/3">
						<div className="bg-white rounded-lg p-4">
							<PersonalInformationForm />
						</div>
					</div>
				</div>
				<div className="divider"></div>
				<div className="flex flex-col md:flex-row space-y-4 md:space-x-4">
					<div className="basis-1/3">
						<h1 className="text-xl font-semibold">Profile</h1>
						<p>
							This information will be displayed publicly so be careful what you
							share.
						</p>
					</div>
					<div className="basis-2/3">
						<div className="bg-white rounded-lg flex flex-col md:flex-row p-4">
							Hello
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfilePage;

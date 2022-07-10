import React, { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePasswordModal = () => {
	const [changePasswordModalOpen, setChangePasswordModalOpen] =
		useState<boolean>(false);

	return (
		<div>
			<label
				htmlFor="change-password-modal"
				className="btn modal-button btn-info btn-outline"
			>
				Change Password
			</label>

			<input
				type="checkbox"
				id="change-password-modal"
				className="modal-toggle"
				checked={changePasswordModalOpen}
				onChange={(e) => setChangePasswordModalOpen(e.target.checked)}
			/>
			<label htmlFor="change-password-modal" className="modal cursor-pointer">
				<label className="modal-box relative" htmlFor="">
					<label
						htmlFor="change-password-modal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
					>
						✕
					</label>
					<h3 className="text-lg font-bold">Change Password</h3>
					<ChangePasswordForm
						setChangePasswordModalOpen={setChangePasswordModalOpen}
					/>
				</label>
			</label>
		</div>
	);
};

export default ChangePasswordModal;

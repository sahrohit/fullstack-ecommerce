import AdminUserCard from "@components/Admin/Users/AdminUserCard";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import Alert from "@components/ui/Alert";
import BlockLayout from "@components/ui/BlockLayout";
import {
	UserDataQuery,
	useRolesQuery,
	UserRole,
	useUserDataQuery,
} from "@generated/graphql";
import { NextPage } from "next";

const ManageAdmin: NextPage = () => {
	const { data, loading, error } = useRolesQuery();
	const {
		data: users,
		loading: userLoading,
		error: userError,
	} = useUserDataQuery();

	if (loading || userLoading) {
		return <FullPageLoadingSpinner />;
	}

	if (error || userError) {
		return (
			<Alert
				message="An Error Occured"
				title="Couldn't load Current User"
				status="error"
			/>
		);
	}

	return (
		<div className="m-6 rounded-lg p-4 space-y-4">
			{data?.roles
				.slice()
				.sort((a, b) => b.id - a.id)
				.map((role) => (
					<AdminRoles
						key={`${role.id} ${role.name}`}
						role={role}
						users={users!}
					/>
				))}
		</div>
	);
};

export default ManageAdmin;

interface AdminRoleProps {
	role: UserRole;
	users: UserDataQuery;
}

const AdminRoles = ({ role, users }: AdminRoleProps) => {
	const filteredUsers = users.users.filter((user) => user.roleId === role.id);

	if (filteredUsers.length < 1) {
		return null;
	}

	return (
		<BlockLayout
			key={role.id}
			title={role.name}
			description="This information will be displayed publicly so be careful what you
share."
			content={
				<div className="grid gap-4 sm:grid-cols-2 grid-cols-1">
					{filteredUsers.map((user) => (
						<AdminUserCard user={user} key={user.id} />
					))}
				</div>
			}
		/>
	);
};

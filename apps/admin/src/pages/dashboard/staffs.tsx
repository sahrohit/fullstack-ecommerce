/* eslint-disable no-nested-ternary */
import { CellContext, createColumnHelper } from "@tanstack/react-table";
import {
	Avatar,
	Badge,
	Flex,
	HStack,
	Text,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
	Stack,
	VStack,
	useToast,
	Spinner,
	Tag,
	FormErrorMessage,
	Button,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/react";

import { BsSearch } from "react-icons/bs";
import { RiAddFill } from "react-icons/ri";
import { type Dispatch, type SetStateAction, useState, useRef } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import withProtected from "@/routes/withProtected";
import {
	Staff,
	UserRole,
	useAddStaffMutation,
	useDeleteStaffMutation,
	useMeStaffQuery,
	useRolesQuery,
	useStaffsQuery,
	useUpdateRoleMutation,
	useUpdateStaffStatusMutation,
	useUserByEmailLazyQuery,
} from "generated-graphql";
import colorFromStatus from "@/config/color";
import {
	Result,
	ModalButton,
	InputField,
	HeadingGroup,
	ConfirmationModal,
	capitalize,
} from "ui";
import { DataTable } from "@/components/ui/table";
import { BRAND_NAME } from "../../../constants";

const columnHelper = createColumnHelper<Staff>();

const columns = [
	columnHelper.accessor("user", {
		cell: (info) => (
			<UserProfile
				email={info.getValue()?.email ?? ""}
				imageUrl={info.getValue()?.imageUrl ?? ""}
				name={`${info.getValue()?.first_name} ${info.getValue()?.last_name}`}
			/>
		),
		header: "User",
	}),
	columnHelper.accessor("user.role", {
		cell: (info) => <RoleSelector info={info} />,
		header: "Role",
	}),
	columnHelper.accessor("status", {
		cell: (info) => (
			<Badge fontSize="xs" colorScheme={colorFromStatus(info.getValue())}>
				{info.getValue()}
			</Badge>
		),
		header: "Status",
	}),
	columnHelper.accessor("id", {
		cell: (info) => <StaffActions info={info} />,
		header: "Actions",
	}),
];

interface UserProfileProps {
	name: string;
	imageUrl: string;
	email: string;
}

export const UserProfile = ({ name, imageUrl, email }: UserProfileProps) => {
	const { data: me, loading: meLoading, error: meError } = useMeStaffQuery();

	if (meLoading) {
		return <Spinner />;
	}

	if (meError) {
		return (
			<Result
				heading={meError.name}
				text={meError.message}
				type="error"
				dump={meError.stack}
			/>
		);
	}

	return (
		<HStack spacing="4" px="2" w="full">
			<Avatar
				name={name}
				src={
					imageUrl ??
					`https://api.dicebear.com/6.x/micah/svg?size=256&seed=${name}`
				}
			/>
			<Flex direction="column">
				<Text fontWeight="medium">
					{name}{" "}
					{me?.meStaff?.email === email ? (
						<Tag colorScheme="green" size="sm">
							You
						</Tag>
					) : null}
				</Text>
				<Text fontSize="sm" lineHeight="shorter">
					{email}
				</Text>
			</Flex>
		</HStack>
	);
};

interface RoleSelectorProps {
	info: CellContext<Staff, UserRole>;
}

const RoleSelector = ({ info }: RoleSelectorProps) => {
	const toast = useToast();

	const {
		data: rolesData,
		loading: rolesLoading,
		error: rolesError,
	} = useRolesQuery();

	const { data: me, loading: meLoading, error: meError } = useMeStaffQuery();

	const [updateRole] = useUpdateRoleMutation({
		refetchQueries: ["Staffs"],

		onCompleted(data) {
			toast({
				title: "Role Updated Successfully",
				description: `${info.row.original.user
					?.first_name}'s role is updated to ${capitalize(
					data.updateRole.user?.role.name ?? ""
				)}`,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		},
		onError(error) {
			toast({
				title: "An Error Occured",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});

	if (rolesLoading || meLoading) {
		return <Spinner />;
	}

	if (rolesError || meError) {
		return (
			<Result
				heading={rolesError ? rolesError.name : meError?.name!}
				text={rolesError ? rolesError.message : meError?.message!}
				type="error"
				dump={rolesError ? rolesError.stack : meError?.stack!}
			/>
		);
	}

	const isHigherRole = info.row.original.user?.roleId! > me?.meStaff?.roleId!;
	const isMyself = info.row.original.userId === me?.meStaff?.id!;

	return (
		<Select
			w={{ base: "300px", md: "full" }}
			rounded="base"
			size="sm"
			value={info.getValue().id}
			onChange={(e) => {
				updateRole({
					variables: {
						newroleId: Number(e.target.value),
						userId: info.row.original.userId,
					},
				});
			}}
			isDisabled={isHigherRole || isMyself}
		>
			{rolesData?.roles
				.filter((r) => r.id !== 1)
				.map((role) => (
					<option key={`update-role-${role.id}`} value={role.id}>
						{role.name}
					</option>
				))}
		</Select>
	);
};

interface TableActionsProps {
	searchText: string;
	setSearchText: Dispatch<SetStateAction<string>>;
	selectedRole: number;
	setSelectedRole: Dispatch<SetStateAction<number>>;
}

interface NewStaffFormValues {
	email: string;
	roleId: number;
}

const NewStaffFormSchema = Yup.object({
	email: Yup.string().email().required("Required"),
	roleId: Yup.number().required("Required"),
});

export const TableActions = ({
	searchText,
	selectedRole,
	setSearchText,
	setSelectedRole,
}: TableActionsProps) => {
	const toast = useToast();

	const modalRef: any = useRef();

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.closeModal();
		}
	};
	const {
		data: rolesData,
		loading: rolesLoading,
		error: rolesError,
	} = useRolesQuery();

	const [
		userByEmail,
		{
			data: userByEmailData,
			loading: userByEmailLoading,
			error: userByEmailError,
			refetch: userByEmailRefetch,
		},
	] = useUserByEmailLazyQuery();

	const [addStaff] = useAddStaffMutation({
		refetchQueries: ["Staffs"],
		onCompleted(data) {
			toast({
				title: "Staff Added Successfully",
				description: `${data.addStaff.user
					?.first_name}'s access is ${capitalize(data.addStaff.status)}`,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		},
		onError(error) {
			toast({
				title: "An Error Occured",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields, touchedFields, isSubmitting },
		watch,
		setValue,
	} = useForm<NewStaffFormValues>({
		defaultValues: {
			email: "",
			roleId: 3,
		},
		resolver: yupResolver(NewStaffFormSchema),
	});

	const { email } = watch();

	if (rolesLoading) {
		return <Spinner />;
	}

	if (rolesError) {
		return (
			<Result
				heading={rolesError.name}
				text={rolesError.message}
				type="error"
				dump={rolesError.stack}
			/>
		);
	}

	return (
		<Stack
			w="full"
			spacing="4"
			direction={{ base: "column", md: "row" }}
			justify="space-between"
			position="sticky"
			top="0"
		>
			<HStack>
				<FormControl minW={{ md: "320px" }} id="search">
					<InputGroup size="sm">
						<FormLabel srOnly>Filter by name or email</FormLabel>
						<InputLeftElement pointerEvents="none" color="gray.400">
							<BsSearch />
						</InputLeftElement>
						<Input
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							rounded="base"
							type="search"
							placeholder="Filter by name or email..."
						/>
					</InputGroup>
				</FormControl>
				<Select
					w={{ base: "300px", md: "full" }}
					rounded="base"
					size="sm"
					value={selectedRole}
					onChange={(e) => setSelectedRole(Number(e.target.value))}
				>
					<option value={0}>All roles</option>
					{rolesData?.roles
						.filter((r) => r.id !== 1)
						.map((role) => (
							<option key={`role-${role.id}`} value={role.id}>
								{role.name}
							</option>
						))}
				</Select>
			</HStack>
			<ModalButton
				buttonText="New member"
				modalHeader="Add New Staff"
				size="sm"
				colorScheme="primary"
				iconSpacing="1"
				leftIcon={<RiAddFill fontSize="1.25em" />}
				ref={modalRef}
			>
				<form
					onSubmit={handleSubmit(async (values) => {
						if (userByEmailData?.userByEmail?.id) {
							await addStaff({
								variables: {
									roleId: values.roleId,
									userId: userByEmailData?.userByEmail?.id,
								},
							});
							closeModal();
							userByEmailRefetch({
								email: "",
							});
						} else {
							toast({
								title: "An Error Occured",
								description: "User not found",
								status: "error",
								duration: 5000,
								isClosable: true,
							});
						}
					})}
				>
					<VStack gap={3}>
						<InputField
							register={{ ...register("email") }}
							error={errors.email}
							touched={dirtyFields.email}
							required
							name="email"
							type="email"
							label="New Staff Email address"
							autoComplete="email"
							placeholder="Email address"
							size="lg"
							fontSize="md"
							disabled={
								!!userByEmailData?.userByEmail?.email && !userByEmailError
							}
						/>

						{userByEmailData || userByEmailError ? (
							userByEmailData?.userByEmail?.email && !userByEmailError ? (
								<VStack w="full" gap={3} my={4}>
									<HStack w="full">
										<UserProfile
											email={userByEmailData.userByEmail?.email ?? ""}
											imageUrl={userByEmailData.userByEmail?.imageUrl ?? ""}
											name={`${userByEmailData.userByEmail?.first_name} ${userByEmailData.userByEmail?.last_name}`}
										/>
										<Button
											onClick={() => {
												userByEmailRefetch({
													email: "",
												});
												setValue("email", "");
											}}
											size="sm"
										>
											Not this?
										</Button>
									</HStack>
									{userByEmailData.userByEmail.staff?.tenantId &&
									userByEmailData.userByEmail.staff.status === "ACCEPTED" ? (
										<Alert status="error">
											<AlertIcon />
											{userByEmailData.userByEmail?.first_name} is already a{" "}
											{capitalize(userByEmailData.userByEmail.role?.name)} at{" "}
											{userByEmailData.userByEmail.staff.tenant?.name}
										</Alert>
									) : (
										<Alert status="info">
											<AlertIcon />
											{userByEmailData.userByEmail?.first_name} is already a{" "}
											{capitalize(userByEmailData.userByEmail.role?.name)} at{" "}
											{userByEmailData.userByEmail.staff?.tenant?.name}. But his
											access is revoked.
										</Alert>
									)}
									<FormControl
										id="roleId"
										isInvalid={!!errors.roleId && touchedFields.roleId}
									>
										<HStack justifyContent="space-between">
											<FormLabel>New Staff Role</FormLabel>
											<FormErrorMessage>
												{errors.roleId?.message}
											</FormErrorMessage>
										</HStack>
										<Select size="lg" {...register("roleId")}>
											{!rolesLoading &&
												rolesData?.roles
													.filter((r) => r.id !== 1)
													.map((role) => (
														<option
															key={`new-staff-role-${role.id}`}
															value={role.id}
														>
															{role.name}
														</option>
													))}
										</Select>
									</FormControl>
									<Button
										isLoading={isSubmitting}
										w="full"
										colorScheme="primary"
										type="submit"
										isDisabled={
											!!userByEmailData.userByEmail.staff?.tenantId &&
											!!(
												userByEmailData.userByEmail.staff.status === "ACCEPTED"
											)
										}
									>
										Add {userByEmailData.userByEmail.first_name}{" "}
										{userByEmailData.userByEmail.last_name} to Staff
									</Button>
								</VStack>
							) : (
								<>
									<Button
										isLoading={userByEmailLoading}
										type="button"
										colorScheme="primary"
										w="full"
										mb={4}
										onClick={async () => {
											await userByEmail({
												variables: {
													email,
												},
											});
										}}
									>
										Preview
									</Button>
									{userByEmailError ? (
										<Alert
											status="error"
											variant="subtle"
											flexDirection="column"
											alignItems="center"
											justifyContent="center"
											textAlign="center"
											rounded="md"
											mb={4}
										>
											<AlertIcon boxSize="40px" mr={0} />
											<AlertTitle mt={4} mb={1} fontSize="lg">
												Invalid Email! Try again with a different email.
											</AlertTitle>
											<AlertDescription maxWidth="sm">
												{`If the user is not signed up, try signing up in any of the store powered by ${BRAND_NAME}`}
											</AlertDescription>
										</Alert>
									) : null}
								</>
							)
						) : (
							<Button
								isLoading={userByEmailLoading}
								type="button"
								colorScheme="primary"
								w="full"
								mb={4}
								onClick={async () => {
									await userByEmail({
										variables: {
											email,
										},
									});
								}}
							>
								Preview
							</Button>
						)}
					</VStack>
				</form>
			</ModalButton>
		</Stack>
	);
};

export const StaffActions = ({
	info,
}: {
	info: CellContext<Staff, number>;
}) => {
	const toast = useToast();
	const { data: me, loading: meLoading, error: meError } = useMeStaffQuery();
	const [updateStaffStatus] = useUpdateStaffStatusMutation({
		refetchQueries: ["Staffs"],

		onCompleted(data) {
			toast({
				title: "Staff Updated Successfully",
				description: `${data.updateStaffStatus.user
					?.first_name}'s access is ${capitalize(
					data.updateStaffStatus.status
				)}`,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		},
		onError(error) {
			toast({
				title: "An Error Occured",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});

	const [deleteStaff] = useDeleteStaffMutation({
		refetchQueries: ["Staffs"],
		onCompleted() {
			toast({
				title: "Staff Deleted Successfully",
				description: `${info.row.original.user?.first_name}'s deleted from ${info.row.original.tenant?.name} `,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		},
		onError(error) {
			toast({
				title: "An Error Occured",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});

	if (meLoading) {
		return <Spinner />;
	}

	if (meError) {
		return (
			<Result
				type="error"
				heading="An Error Occured"
				text={meError.message}
				dump={meError.stack}
			/>
		);
	}

	const isHigherRole = info.row.original.user?.roleId! > me?.meStaff?.roleId!;
	const isMyself = info.row.original.userId === me?.meStaff?.id!;

	return (
		<HStack>
			{info.row.original.status === "REVOKED" ? (
				<ConfirmationModal
					bodyText={`Are you sure you want to allow ${info.row.original.user?.first_name}'s access to ${info.row.original.tenant?.name} ${info.row.original.user?.role.name} permissions?`}
					confirmButtonProps={{ colorScheme: "primary" }}
					headerText="Allow Access"
					onSuccess={() => {
						updateStaffStatus({
							variables: {
								status: "ACCEPTED",
								userId: info.row.original.userId,
							},
						});
					}}
					size="sm"
					colorScheme="primary"
					isDisabled={isHigherRole || isMyself}
				>
					Approve
				</ConfirmationModal>
			) : (
				<ConfirmationModal
					bodyText={`Are you sure you want to revoke ${info.row.original.user?.first_name}'s access to ${info.row.original.tenant?.name} ${info.row.original.user?.role.name} permissions?`}
					confirmButtonProps={{ colorScheme: "red" }}
					headerText="Revoke Access"
					onSuccess={() => {
						updateStaffStatus({
							variables: {
								status: "REVOKED",
								userId: info.row.original.userId,
							},
						});
					}}
					size="sm"
					colorScheme="red"
					confirmText="revoke"
					isDisabled={isHigherRole || isMyself}
				>
					Revoke
				</ConfirmationModal>
			)}
			<ConfirmationModal
				bodyText={`Are you sure you want to delete ${info.row.original.user?.first_name} ${info.row.original.user?.first_name} as a staff from ${info.row.original.tenant?.name}?`}
				confirmButtonProps={{ colorScheme: "red" }}
				headerText={`Delete Staff ${info.row.original.user?.first_name}`}
				onSuccess={() => {
					deleteStaff({
						variables: {
							userId: info.row.original.userId,
						},
					});
				}}
				size="sm"
				colorScheme="red"
				confirmText="delete"
				isDisabled={isHigherRole || isMyself}
			>
				Delete
			</ConfirmationModal>
		</HStack>
	);
};

const ManageStaffsPage = () => {
	const [searchText, setSearchText] = useState("");
	const [selectedRole, setSelectedRole] = useState(0);
	const { data, loading, error } = useStaffsQuery();

	if (error) {
		<Result
			heading={error.name}
			type="error"
			text={error.message}
			dump={error.stack}
		/>;
	}

	let filteredData: Staff[] = data?.staffs as Staff[];

	if (searchText) {
		filteredData = data?.staffs?.filter(
			(staff) =>
				staff.user?.first_name
					.toLowerCase()
					.includes(searchText.toLowerCase()) ||
				staff.user?.last_name
					.toLowerCase()
					.includes(searchText.toLowerCase()) ||
				staff.user?.email.toLowerCase().includes(searchText.toLowerCase())
		) as Staff[];
	}

	if (selectedRole) {
		filteredData = filteredData?.filter(
			(staff) => staff.user?.roleId === selectedRole
		) as Staff[];
	}

	return (
		<VStack gap={4} w="full">
			<HeadingGroup
				title="Manage Staffs"
				description="Manage your staffs here."
			/>
			<TableActions
				searchText={searchText}
				setSearchText={setSearchText}
				selectedRole={selectedRole}
				setSelectedRole={setSelectedRole}
			/>
			{loading ? (
				<Spinner />
			) : (
				<DataTable columns={columns} data={filteredData} />
			)}
		</VStack>
	);
};

export default withProtected(ManageStaffsPage);

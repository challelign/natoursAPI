import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getTours } from "../api/NatoursAPI";
import Spinner from "../ui/Spinner";
import Table from "react-bootstrap/Table";
import Heading from "../ui/Heading";
import useUsersList from "./auth/useUsersList";
import UsersList from "./UsersList";
const UsersTable = () => {
	const { isLoading, users, error } = useUsersList();

	if (isLoading) {
		return <Spinner />;
	}

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Full Name</th>
						<th>Role</th>
						<th>Email</th>
						<th>profile pic</th>
					</tr>
				</thead>
				<tbody>
					{users?.map((user) => (
						<UsersList user={user} key={user._id} />
					))}
				</tbody>
			</Table>
		</>
	);
};

export default UsersTable;

import React, { useState } from "react";
import SignupForm from "../ui/SignupForm";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import useUsersList from "./auth/useUsersList";
import { StyleSheetManager } from "styled-components";
import Button from "react-bootstrap/esm/Button";
import Typography from "@mui/material/Typography";
import UsersTable from "./UsersTable";

const Users = () => {
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<div>
				<Typography component="h1" variant="h5" sx={{ mb: 3 }}>
					Create a new user
				</Typography>
			</div>

			<UsersTable />
			<Button
				style={{ fontWeight: "bold", fontSize: "16px" }}
				variant="primary"
				onClick={() => setShowForm((sw) => !sw)}
			>
				Add New Tours
			</Button>
			{showForm && <SignupForm />}
		</>
	);
};

export default Users;

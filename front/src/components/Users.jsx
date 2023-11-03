import React, { useState } from "react";
import SignupForm from "../ui/SignupForm";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import useUsersList from "./auth/useUsersList";
import { StyleSheetManager } from "styled-components";
import Button from "react-bootstrap/esm/Button";
import Typography from "@mui/material/Typography";
import UsersTable from "./UsersTable";
import { useDarkMode } from "../context/DarkModeContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const defaultTheme = createTheme({
	typography: {
		fontSize: 18, // Adjust the font size as needed
	},
});
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
	typography: {
		fontSize: 18, // Adjust the font size as needed
	},
});
const Users = () => {
	const [showForm, setShowForm] = useState(false);
	const { isDarkMode, toggleDarkMode } = useDarkMode();
	return (
		<ThemeProvider theme={isDarkMode ? darkTheme : defaultTheme}>
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
				Add New User
			</Button>
			{showForm && <SignupForm />}
		</ThemeProvider>
	);
};

export default Users;

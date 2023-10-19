import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/system";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// TODO remove, this demo shouldn't need to reset the theme.
import styled from "styled-components";
import { useSignup } from "../components/auth/useSignup";

const defaultTheme = createTheme({
	typography: {
		fontSize: 18, // Adjust the font size as needed
	},
});
const rolesName = [
	{ label: "user", value: "user" },
	{ label: "guide", value: "guide" },
	{ label: "lead-guide", value: "lead-guide" },
	{ label: "admin", value: "admin" },
];
export default function SignupForm() {
	// const [roles, setRoles] = useState({});
	const { createUser, isLoading } = useSignup();
	const { register, formState, getValues, handleSubmit, reset } = useForm();
	const { errors } = formState;

	// {
	// 	name, email, password, passwordConfirm, roles;
	// }
	const onSubmit = ({ name, email, password, passwordConfirm, role }) => {
		// console.log(data);
		console.log(role);
		// console.log(name);
		// console.log(email);
		createUser(
			{ name, email, password, passwordConfirm, role },
			{ onSettled: () => reset() }
		);
	};
	// const handleChange = (event) => {
	// 	setRoles(event.target.value);
	// 	alert(event.target.value);
	// };
	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xl">
				<CssBaseline />
				<Box
					sx={{
						// marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography component="h1" variant="h5" sx={{ mb: 3 }}>
						Create a new user
					</Typography>

					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container spacing={2}>
							<Grid item xs={10}>
								<TextField
									autoComplete="given-name"
									name="name"
									fullWidth
									id="name"
									label="Full Name"
									autoFocus
									disabled={isLoading}
									{...register("name", {
										required: "This field is required",
									})}
									// error={errors?.name?.message}
									error={!!errors.name}
									helperText={errors.name?.message}
								/>
							</Grid>

							<Grid item xs={10}>
								<TextField
									// required
									fullWidth
									id="email"
									label="Email Address"
									disabled={isLoading}
									name="email"
									autoComplete="email"
									{...register("email", {
										required: "This field is required",
										pattern: {
											value: /\S+@\S+\.\S+/,
											message: "Please provide a valid email address",
										},
									})}
									error={!!errors.email}
									helperText={errors.email?.message}
								/>
							</Grid>

							<Grid item md={10} xs={12}>
								<TextField
									fullWidth
									label="Role"
									name="role"
									// onChange={handleChange}
									required
									select
									SelectProps={{ native: true }}
									variant="outlined"
									{...register("role", {
										required: "This field is required",
									})}
									error={!!errors?.role}
									helperText={errors?.role?.message}
								>
									{rolesName.map((role) => (
										<option key={role.value} value={role.value}>
											{role.label}
										</option>
									))}
								</TextField>
							</Grid>

							<Grid item xs={10}>
								<TextField
									// required
									fullWidth
									name="password"
									label="password"
									disabled={isLoading}
									type="password"
									id="password"
									autoComplete="new-password"
									{...register("password", {
										required: "This field is required",
										minLength: {
											value: 8,
											message: "Password needs a minimum of 8 characters",
										},
									})}
									error={!!errors?.password}
									helperText={errors?.password?.message}
								/>
							</Grid>

							<Grid item xs={10}>
								<TextField
									fullWidth
									name="passwordConfirm"
									label="Confirm Password"
									type="password"
									disabled={isLoading}
									id="passwordConfirm"
									autoComplete="new-password"
									{...register("passwordConfirm", {
										required: "This field is required",
										validate: (value) =>
											value === getValues().password ||
											"Passwords need to match",
									})}
									error={!!errors?.passwordConfirm}
									helperText={errors?.passwordConfirm?.message}
								/>
							</Grid>
						</Grid>

						<Stack
							spacing={2}
							direction="row"
							disabled={isLoading}
							sx={{ mt: 3, mb: 3 }}
						>
							<Button variant="contained" type="reset" onClick={reset}>
								cancel
							</Button>
							<Button type="submit" disabled={isLoading} variant="contained">
								Create new user
							</Button>
						</Stack>
					</form>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

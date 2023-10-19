import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Card from "react-bootstrap/Card";
import { Stack } from "@mui/system";
import { useUpdatePassword } from "../components/auth/useUpdatePassword";
const defaultTheme = createTheme({
	typography: {
		fontSize: 18, // Adjust the font size as needed
	},
});
const PasswordUpdate = () => {
	const { register, formState, getValues, handleSubmit, reset } = useForm();
	const { errors } = formState;

	const { updatePassword, isLoading } = useUpdatePassword();

	const onSubmit = ({ passwordCurrent, password, passwordConfirm }) => {
		updatePassword(
			{ passwordCurrent, password, passwordConfirm },
			{ onSettled: () => reset() }
		);
	};
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
						Update user password
					</Typography>

					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container spacing={2}>
							<Grid item xs={10}>
								<TextField
									// required
									fullWidth
									name="passwordCurrent"
									label="Old Password"
									disabled={isLoading}
									type="password"
									id="password"
									autoComplete="new-password"
									{...register("passwordCurrent", {
										required: "This field is required",
										minLength: {
											value: 8,
											message: "Password needs a minimum of 8 characters",
										},
									})}
									error={!!errors?.passwordCurrent}
									helperText={errors?.passwordCurrent?.message}
								/>
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
};

export default PasswordUpdate;

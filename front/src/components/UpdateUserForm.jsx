import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import useUser from "./auth/useUser";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { updateAnyUser } from "../api/NatoursAPI";
import { useUpdateAnyUser } from "./auth/useUpdateAnyUser";
const UpdateUserForm = ({ user, onClose }) => {
	const [fields, setFields] = useState({ ...user });
	const { updateAnyUser, isUpdating } = useUpdateAnyUser();

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log("fields", fields);
		updateAnyUser(fields);
		onClose();
	};
	const handleCancel = () => {
		setFields({ ...user });
	};

	const handleChange = (e) => {
		setFields({
			...fields,
			[e.target.name]: e.target.value,
		});
	};
	const rolesName = [
		{ label: "user", value: "user" },
		{ label: "guide", value: "guide" },
		{ label: "lead-guide", value: "lead-guide" },
		{ label: "admin", value: "admin" },
	];
	return (
		<div className="p-3">
			<Form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-3"></div>

					<div className=" col-6 pt-3">
						<Form.Group className="mb-3">
							<Form.Label style={{ fontWeight: "bold", fontSize: "16px" }}>
								Email
							</Form.Label>
							<Form.Control
								type="email"
								name="email"
								value={fields.email}
								disabled
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label style={{ fontWeight: "bold", fontSize: "16px" }}>
								Full name
							</Form.Label>
							<Form.Control
								type="name"
								name="name"
								value={fields.name}
								disabled={isUpdating}
								onChange={handleChange}
								placeholder="Full Name"
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label style={{ fontWeight: "bold", fontSize: "16px" }}>
								Choose Role
							</Form.Label>
							<Form.Select
								aria-label="Default select example"
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
								name="role"
								value={fields.role}
								onChange={handleChange}
							>
								{rolesName.map((rol) => (
									<option
										key={rol.value}
										value={rol.value}
										// selected={rol.value === fields.role}
									>
										{rol.label}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						{/* 
							<Form.Group className="mb-3">
								<Form.Label style={{ fontWeight: "bold", fontSize: "16px" }}>
									Password
								</Form.Label>
								<Form.Control
									type="password"
									name="password"
									disabled={isUpdating}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="password"
									style={{
										border: "1px solid #ccc",
										borderRadius: "4px",
										padding: "8px",
										fontSize: "14px",
									}}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label style={{ fontWeight: "bold", fontSize: "16px" }}>
									password Confirm
								</Form.Label>
								<Form.Control
									type="password"
									name="passwordConfirm"
									disabled={isUpdating}
									onChange={(e) => setPasswordConfirm(e.target.value)}
									placeholder="password"
									style={{
										border: "1px solid #ccc",
										borderRadius: "4px",
										padding: "8px",
										fontSize: "14px",
									}}
								/>
							</Form.Group> */}

						<Form.Group className="mb-3">
							<Button
								// type="reset"
								variant="secondary"
								disabled={isUpdating}
								onClick={handleCancel}
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
							>
								Cancel
							</Button>
							<Button
								disabled={isUpdating}
								type="submit"
								variant="primary"
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
							>
								Submit
							</Button>
						</Form.Group>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default UpdateUserForm;

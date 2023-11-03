import Button from "react-bootstrap/Button";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import SpinnerMini from "../ui/SpinnerMini";
import Link from "@mui/material/Link";
import { useResetTokenPasswordChange } from "./auth/useResetTokenPasswordChange";

const ForgetPasswordReset = () => {
	const { token } = useParams();
	console.log(token);
	const [passwordConfirm, setPasswordConfirm] = useState();
	const [password, setPassword] = useState();
	const { resetPasswordToken, isChanging } = useResetTokenPasswordChange(token);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!passwordConfirm || !password) {
			return;
		}

		const dataValue = { password, passwordConfirm };
		if (token == null) {
			alert("No Token");
		}
		resetPasswordToken(dataValue, {
			onSuccess: () => {
				navigate("/dashboard");
			},
		});
	};
	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<div
						style={{
							display: "flex",
							justifyContent: "center" /* Center horizontally */,
							alignItems: "center" /* Center vertically */,
						}}
					>
						<img
							src="/img/logo-green-round.png"
							alt="Natours logo"
							width="100px"
							height="100px"
						/>
					</div>
					<Col className="text-center">
						<p>admin@natours.io</p>
						<Form.Label style={{ fontWeight: "bold", fontSize: "24px" }}>
							Confirm Your Email and Change Your Password
						</Form.Label>
					</Col>
				</Form.Group>

				<br />
				<Form.Group className="row">
					<Col sm="4"> </Col>
					<Col sm="6">
						<Form.Group
							as={Row}
							className="mb-3"
							controlId="formPlaintextPassword"
						>
							<Form.Label
								column
								sm="2"
								style={{ fontWeight: "bold", fontSize: "16px" }}
							>
								Password
							</Form.Label>
							<Col sm="6">
								<Form.Control
									style={{
										border: "1px solid #ccc",
										borderRadius: "4px",
										padding: "8px",
										fontSize: "16px",
									}}
									type="password"
									placeholder="Password"
									value={password}
									disabled={isChanging}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Col>
						</Form.Group>

						<Form.Group
							as={Row}
							className="mb-3"
							controlId="formPlaintextEmail"
						>
							<Form.Label
								column
								sm="2"
								style={{ fontWeight: "bold", fontSize: "16px" }}
							>
								Confirm Password
							</Form.Label>
							<Col sm="6">
								<Form.Control
									style={{
										border: "1px solid #ccc",
										borderRadius: "4px",
										padding: "8px",
										fontSize: "16px",
									}}
									autoComplete="username"
									type="password"
									placeholder="Confirm Password"
									value={passwordConfirm}
									onChange={(e) => setPasswordConfirm(e.target.value)}
									disabled={isChanging}
								/>
							</Col>
						</Form.Group>
						<Form.Group className="row">
							<Col sm="2"> </Col>
							<Col sm="6" className="d-grid gap-2">
								<Button
									disabled={isChanging}
									type="submit"
									variant="primary"
									size="lg"
									style={{
										border: "1px solid #ccc",
										borderRadius: "4px",
										padding: "8px",
										fontSize: "16px",
									}}
								>
									{!isChanging ? "Change Password" : <SpinnerMini />}
								</Button>
							</Col>
						</Form.Group>
						<Form.Group className="row">
							<Col sm="2"> </Col>
							<Col sm="6" className="d-grid gap-2">
								<Link
									href="/forget-password"
									variant="body2"
									size="lg"
									style={{
										padding: "8px",
										fontSize: "16px",
										textDecoration: "none",
									}}
								>
									Login To Your Account
								</Link>
							</Col>
						</Form.Group>
					</Col>
				</Form.Group>
			</Form>
		</div>
	);
};

export default ForgetPasswordReset;

import Button from "react-bootstrap/Button";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useLogin } from "./auth/useLogin";
import Spinner from "../ui/Spinner";
import useUser from "./auth/useUser";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../ui/SpinnerMini";
import toast from "react-hot-toast";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useForgetPassword } from "./auth/useForgetPassword";
const Error = styled.span`
	font-size: 1.4 rem;
	color: var(--color-red-700);
`;
const ForgetPassword = () => {
	const [email, setEmail] = useState("chalie2123@gmail.com");
	const { forgetPassword, isSending } = useForgetPassword();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email) {
			return;
		}
		// console.log(email);

		forgetPassword({ email });
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
						<br />
						<Form.Label style={{ fontWeight: "bold", fontSize: "24px" }}>
							Valid Email and Confirm Your Email
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
							controlId="formPlaintextEmail"
						>
							<Form.Label
								column
								sm="2"
								style={{ fontWeight: "bold", fontSize: "16px" }}
							>
								Email
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
									type="email"
									value={email}
									placeholder="Provide Valid Email"
									onChange={(e) => setEmail(e.target.value)}
									disabled={isSending}
								/>
							</Col>
						</Form.Group>

						<Form.Group className="row">
							<Col sm="2"> </Col>
							<Col sm="6" className="d-grid gap-2">
								<Button
									disabled={isSending}
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
									{!isSending ? "Send Confirmation Email" : <SpinnerMini />}
								</Button>
							</Col>
						</Form.Group>
						<Form.Group className="row">
							<Col sm="2"> </Col>
							<Col sm="6" className="d-grid gap-2">
								<Link
									href="/login"
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

export default ForgetPassword;

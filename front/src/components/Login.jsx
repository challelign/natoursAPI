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
const Error = styled.span`
	font-size: 1.4 rem;
	color: var(--color-red-700);
`;
const FullPage = styled.div`
	height: 100vh;
	--color-gray-50: rgb(204, 204, 204)
	background-color: var(--color-gray-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Login = () => {
	const [email, setEmail] = useState("sophie@example.com");
	const [password, setPassword] = useState("test1234");
	const { login, isLogging } = useLogin();
	const { user, isAuthenticated, isLoading } = useUser();

	// console.log(user);
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/dashboard");
		}
	}, [user]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email || !password) {
			return;
		}
		login(
			{ email, password },
			{
				onSettled: () => {
					setEmail("");
					setPassword("");
				},
			}
		);
	};
	if (isLoading) return <SpinnerMini />;
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
							Please User Your Email and Password
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
									onChange={(e) => setEmail(e.target.value)}
									disabled={isLogging}
								/>
							</Col>
						</Form.Group>
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
									disabled={isLogging}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Col>
						</Form.Group>
						<Form.Group className="row">
							<Col sm="2"> </Col>
							<Col sm="6" className="d-grid gap-2">
								<Button
									disabled={isLogging}
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
									{!isLogging ? "Login" : <SpinnerMini />}
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
									Forgot password?
								</Link>
							</Col>
						</Form.Group>
					</Col>
				</Form.Group>
			</Form>
		</div>
	);
};

export default Login;

import React, { useEffect } from "react";
import useUser from "../components/auth/useUser";
import Spinner from "./Spinner";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
	height: 100vh;
	--color-gray-50: rgb(204, 204, 204)
	background-color: var(--color-gray-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;
const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();
	// 1 load the authenticated user

	const { isAuthenticated, isLoading } = useUser();

	// 2 if there is No authenticated user, redirect to /login

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			navigate("/login");
		}
	}, [isAuthenticated, isLoading, navigate]);

	// 3 while loading , show a spinner
	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	// 4 if there is a user , render the app
	if (isAuthenticated) {
		return children;
	}
};

export default ProtectedRoute;

import React from "react";
import styled from "@emotion/styled";

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "../components/Footer";
import Login from "../components/Login";

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.8rem 6.4rem;
	overflow: scroll;
`;

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
	height: 100vh;
`;

const Container = styled.div`
	max-width: 120rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;
const AppLayout = () => {
	return (
		<>
			<StyledAppLayout>
				<Header />
				<Sidebar />
				<Main>
					<Container>
						<Outlet />
					</Container>
				</Main>
			</StyledAppLayout>
			<Footer />
		</>
	);
};

export default AppLayout;

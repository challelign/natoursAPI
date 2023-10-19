import React from "react";
import Button from "react-bootstrap/Button";
import { ArrowRight } from "react-bootstrap-icons";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogout } from "./auth/useLogout";
import { NavLink } from "react-router-dom";

const Logout = () => {
	const { logoutUser, isLoading } = useLogout();
	return (
		// <Button className="nav__el" disabled={isLoading} onClick={logoutUser}>
		// 	{!isLoading ? "Logout" : "loading"}
		// </Button>

		<button className="nav__el">
			<NavLink disabled={isLoading} onClick={logoutUser}>
				{!isLoading ? (
					<LogoutIcon
						sx={{
							color: "blueviolet",
							fontFamily: "Arial",
							fontSize: "24px",
						}}
					/>
				) : (
					"loading"
				)}
			</NavLink>
		</button>
	);
};

export default Logout;

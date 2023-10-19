import styled from "@emotion/styled";
// const StyledHeader = styled.header`
// 	background-color: var(--color-grey-0);
// 	padding: 1.2rem 4.8rem;
// 	border-bottom: 1px solid var(--color-grey-100);
// `;
import { NavLink } from "react-router-dom";
import Logout from "../components/Logout";
import useUser from "../components/auth/useUser";
import { url } from "../url";

function Header() {
	const { isLoading, user, isAuthenticated } = useUser();
	return (
		// <StyledHeader>
		<header className="header">
			<nav className="nav nav--tours">
				<NavLink to="/dashboard" className="nav__el">
					All tours
				</NavLink>
				<form className="nav__search">
					<button className="nav__search-btn">
						<svg>
							<use href="/img/icons.svg#icon-search" />
						</svg>
					</button>
					<input
						type="text"
						placeholder="Search tours"
						className="nav__search-input"
					/>
				</form>
			</nav>
			<div className="header__logo">
				<img src="/img/logo-white.png" alt="Natours logo" />
			</div>
			<nav className="nav nav--user">
				{/* <a href="#" className="nav__el">
					My bookings
				</a> */}

				{isAuthenticated && user ? (
					<>
						<NavLink to={`/users/${user?._id}`} className="nav__el">
							<img
								src={`${url}/img/users/${user.photo}`}
								alt=""
								className="nav__user-img"
							/>
							<span>{user?.name}</span>
						</NavLink>
						<Logout />
					</>
				) : (
					<>
						<button className="nav__el">
							<NavLink to="/login">Log in</NavLink>
						</button>
						<button className="nav__el nav__el--cta">Sign up</button>
					</>
				)}

				{/* <NavLink to="/dashboard" className="nav__el">
					All tours
				</NavLink> */}
				{/* <button className="nav__el nav__el--cta">Sign up</button> */}
			</nav>
		</header>
		// </StyledHeader>
	);
}

export default Header;

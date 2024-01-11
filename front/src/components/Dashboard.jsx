import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getTours } from "../api/NatoursAPI";
import moment from "moment";
import { url } from "../url";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import useTours from "./auth/useTours";
import { useSearchParams } from "react-router-dom";
import Pagination from "../ui/Pagination";
import PaginationRange from "../ui/PaginationRange";
import TextField from "@mui/material/TextField";
import useToursSearch from "./auth/useToursSearch";
import api from "../api/api";
import axios from "axios";
import { Fragment } from "react";
import Grid from "@mui/system/Unstable_Grid/Grid";
import FilterChalie from "../ui/FilterChalie";

const CONSTANTSlEVEL = [
	// { label: "All", value: "all" },
	{ label: "Easy", value: "easy" },
	{ label: "Medium", value: "medium" },
	{ label: "Difficult", value: "difficult" },
];
const Dashboard = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	const [searchQuery, setSearchQuery] = useState("");
	const page = new URLSearchParams(location.search).get("page") || 1;
	const [selectedDifficulty, setSelectedDifficulty] = useState([]);
	const [applyDiscount, setApplyDiscount] = useState(false);

	// const page = parseInt(searchParams.get("page")) || 1;

	const { isLoading, tourData, totalCount, totalRes } = useTours(page);

	const {
		isError,
		isSearching,
		data,
		totalSearch,
		fetchNextPage,
		hasNextPage,
		error,
		isFetching,
		isFetchingNextPage,
	} = useToursSearch(searchQuery);

	useEffect(() => {
		const updateURL = () => {
			const params = new URLSearchParams(searchParams);
			if (searchQuery) {
				// params.set("page", "1");
				params.delete("page");
				params.set("search", searchQuery);
			} else {
				params.delete("search");
				params.set("page", page.toString());
			}
			navigate(`?${params.toString()}`, { replace: true });
		};
		updateURL();
	}, [searchQuery]);
	if (isLoading) {
		return <Spinner />;
	}

	if (isSearching) {
		return <Spinner />;
	}

	if (isError) {
		return <h2>{error.message}</h2>;
	}
	const handleDifficultyChange = (event) => {
		const { value, checked } = event.target;

		if (checked) {
			setSelectedDifficulty([...selectedDifficulty, value]);
		} else {
			setSelectedDifficulty(
				selectedDifficulty.filter((difficulty) => difficulty !== value)
			);
		}
	};
	return (
		<main className="main" key={tourData?.id}>
			<TextField
				id="outlined-basic"
				fullWidth
				label="Search"
				variant="outlined"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<br />
			<br />

			{searchQuery ? (
				<>
					<h4 className="card__sub-heading">
						Search Result is of {searchQuery} is found
					</h4>
					<br />
					<div className="card-container">
						{data?.pages?.map((page) =>
							page?.data?.data?.data?.doc?.map((product) => (
								<>
									<div className="card" key={product._id}>
										<div className="card__header">
											<div className="card__picture">
												<div className="card__picture-overlay">&nbsp;</div>

												<img
													src={`${url}/img/tours/${product.imageCover}`}
													alt={product.name}
													className="card__picture-img"
												/>
											</div>

											<h3 className="heading-tertirary">
												<span>{product.name}</span>
											</h3>
										</div>

										<div className="card__details">
											<h4 className="card__sub-heading">
												{product.difficulty} {product.duration}- day tour
											</h4>
											<p className="card__text">{product?.summary}</p>
											<div className="card__data">
												<svg className="card__icon">
													<use href="img/icons.svg#icon-map-pin" />
												</svg>
												<span>{product?.startLocation?.description} </span>
											</div>
											<div className="card__data">
												<svg className="card__icon">
													<use href="img/icons.svg#icon-calendar"></use>
												</svg>
												<span>
													{" "}
													{moment(product.startDates[0]).format("ll")}
												</span>
											</div>
											<div className="card__data">
												<svg className="card__icon">
													<use href="img/icons.svg#icon-flag" />
												</svg>
												<span>{product?.locations?.length} stops</span>
											</div>
											<div className="card__data">
												<svg className="card__icon">
													<use href="img/icons.svg#icon-user" />
												</svg>
												<span>{product?.maxGroupSize} people</span>
											</div>
										</div>

										<div className="card__footer">
											<p>
												<span className="card__footer-value">
													${product?.price}
												</span>{" "}
												<span className="card__footer-text"> per person</span>
											</p>
											<p className="card__ratings">
												<span className="card__footer-value">
													{product?.ratingsAverage}
												</span>{" "}
												<span className="card__footer-text">
													rating <span></span> ({product?.ratingsQuantity})
												</span>
											</p>
											<a
												href={`dashboard/${product?.slug}`}
												className="btn btn--green btn--small"
											>
												Details
											</a>
										</div>
									</div>
								</>
							))
						)}
						<br />
					</div>
					<div>
						{hasNextPage && (
							<button
								onClick={() => fetchNextPage()}
								style={{
									backgroundColor: "#f2f2f2",
									color: "#069767",
									padding: "10px 20px",
									// border: "none",
									borderRadius: "4px",
									cursor: "pointer",
								}}
							>
								Load More 2
							</button>
						)}
					</div>
					<div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
				</>
			) : (
				<>
					<Grid container spacing={2}>
						<Grid item>
							<FilterChalie
								filterOptions={CONSTANTSlEVEL}
								onChange={handleDifficultyChange}
							/>
						</Grid>
					</Grid>

					<Grid container spacing={2}>
						<Grid item>
							{/* {CONSTANTSlEVEL?.map((genre) => (
								<FormControlLabel
									control={
										<Checkbox
											value={genre.value}
											onChange={handleDifficultyChange}
										/>
									}
									label={genre.value}
								/>
							))} */}

							<FormControlLabel
								control={
									<Checkbox
										// value={genre.value}
										onChange={(e) => setApplyDiscount(e.target.checked)}
									/>
								}
								label="Apply Discount"
							/>
							{/* <input
								type="checkbox"
								checked={applyDiscount}
								onChange={(e) => setApplyDiscount(e.target.checked)}
							/>
							<label>Apply Discount</label> */}
						</Grid>
					</Grid>

					<div className="card-container">
						{tourData?.data
							.filter(
								(product) =>
									// selectedDifficulty.length === 0 ||
									// selectedDifficulty.includes(product.difficulty)
									(selectedDifficulty.length === 0 ||
										selectedDifficulty.includes(product.difficulty)) &&
									(!applyDiscount || product.priceDiscount)
							)
							.map((product) => (
								<>
									<div className="card" key={product._id}>
										<div className="card__header">
											<div className="card__picture">
												<div className="card__picture-overlay">&nbsp;</div>

												<img
													src={`${url}/img/tours/${product.imageCover}`}
													alt={product.name}
													className="card__picture-img"
												/>
											</div>

											<h3 className="heading-tertirary">
												<span>{product.name}</span>
											</h3>
										</div>

										<div className="card__details">
											<h4 className="card__sub-heading">
												{product.difficulty} {product.duration}- day tour
											</h4>
											<p className="card__text">{product?.summary}</p>
											<div className="card__data">
												<svg className="card__icon">
													<use href="img/icons.svg#icon-map-pin" />
												</svg>
												<span>{product?.startLocation?.description} </span>
											</div>
											<div className="card__data">
												<svg className="card__icon">
													<use href="img/icons.svg#icon-calendar"></use>
												</svg>
												<span>
													{" "}
													{moment(product.startDates[0]).format("ll")}
												</span>
											</div>
											<div className="card__data">
												<svg className="card__icon">
													<use href="img/icons.svg#icon-flag" />
												</svg>
												<span>{product?.locations?.length} stops</span>
											</div>
											<div className="card__data">
												<svg className="card__icon">
													<use href="img/icons.svg#icon-user" />
												</svg>
												<span>{product?.maxGroupSize} people</span>
											</div>
										</div>

										<div className="card__footer">
											<p>
												<span className="card__footer-value">
													${product?.price}
												</span>{" "}
												<span className="card__footer-value">
													${product?.priceDiscount}
												</span>{" "}
												<span className="card__footer-text"> per person</span>
											</p>
											<p>
												{product?.priceDiscount > 0 ? (
													<>
														<p>
															<span className="card__footer-value">
																${product?.priceDiscount}
															</span>
															<span className="card__footer-text">
																Price Discount
															</span>
														</p>
													</>
												) : (
													<span className="card__footer-text">No Discount</span>
												)}
											</p>
											<p className="card__ratings">
												<span className="card__footer-value">
													{product?.ratingsAverage}
												</span>{" "}
												<span className="card__footer-text">
													rating <span></span> ({product?.ratingsQuantity})
												</span>
											</p>
											<a
												href={`dashboard/${product?.slug}`}
												className="btn btn--green btn--small"
											>
												Details
											</a>
										</div>
									</div>
								</>
							))}
					</div>
					<br />
					<PaginationRange count={totalCount} />
				</>
			)}
		</main>
	);
};

export default Dashboard;

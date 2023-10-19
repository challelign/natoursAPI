import React from "react";
import Spinner from "../ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getTours } from "../api/NatoursAPI";
import moment from "moment";
import { url } from "../url";
const Dashboard = () => {
	const {
		isLoading,
		isError,
		data: products,
		status,
		error,
	} = useQuery({
		queryKey: ["tours"],
		queryFn: getTours,
	});

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<main className="main">
			<div className="card-container">
				{products?.map((product) => (
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
									<span> {moment(product.startDates[0]).format("ll")}</span>
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
									<span className="card__footer-value">${product?.price}</span>{" "}
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
				))}
			</div>
		</main>
	);
};

export default Dashboard;

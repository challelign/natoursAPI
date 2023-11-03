import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";

import { url } from "../url";
import useUser from "../components/auth/useUser";
import StarRating from "./review/StarRating";
import useDeleteReview from "../components/auth/useDeleteReview";
export const OverViewBox = ({ label, text, icon }) => {
	return (
		<div>
			<div className="overview-box__detail">
				<svg className="overview-box__icon">
					<use href={`/img/icons.svg#icon-${icon}`}></use>
				</svg>
				<span className="overview-box__label">{label}</span>
				<span className="overview-box__text">{text}</span>
			</div>
		</div>
	);
};

export const ReviewCard = ({ review }) => {
	const stars = [1, 2, 3, 4, 5];
	const { user, isAuthenticated } = useUser();
	const { isDeleting, deleteReview } = useDeleteReview(review._id);
	const [show, setShow] = useState(false);
	// console.log(review);
	// console.log(review.user._id);
	const handleClose = () => {
		setShow(false);
	};

	const handleDelete = (id) => {
		deleteReview(id);
	};
	return (
		<>
			<div className="reviews__card">
				<div className="reviews__avatar">
					<img
						src={`${url}/img/users/${review?.user?.photo}`}
						alt={review?.user?.name}
						className="reviews__avatar-img"
					/>
					<h6 className="reviews__user">{review?.user?.name}</h6>
				</div>
				<p className="reviews__text">{review?.review}</p>
				<div className="reviews__rating">
					{stars?.map((star, index) => (
						<svg
							key={index}
							className={`reviews__star reviews__star--${
								review.rating >= star ? "active" : "inactive"
							}`}
						>
							<use href="/img/icons.svg#icon-star"></use>
						</svg>
					))}
				</div>
				<br />
				{user && isAuthenticated && user?._id === review?.user?._id ? (
					<>
						<Stack spacing={2} direction="row" sx={{ mt: 3, mb: 3 }}>
							<Button
								type="submit"
								variant="contained"
								onClick={() => setShow((sw) => !show)}
							>
								{show ? "Close To Edit Mode" : "Click Edit"}
							</Button>

							<Button
								variant="contained"
								color="secondary"
								onClick={() => handleDelete(review._id)}
							>
								Delete
							</Button>
						</Stack>
					</>
				) : (
					""
				)}
			</div>
			{show && <StarRating reviewComment={review} onClose={handleClose} />}
		</>
	);
};

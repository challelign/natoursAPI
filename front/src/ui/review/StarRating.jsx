import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import Star from "./Star";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useReview } from "../../components/auth/useReview";
import { useUpdateReview } from "../../components/auth/useUpdateReview";
import useUser from "../../components/auth/useUser";
import useReviewAll from "../../components/auth/useReviewAll";

const containerStyle = {
	display: "flex",
	alignItems: "center",
	gap: "14px",
};

const starContainerStyle = {
	display: "flex",
	alignItems: "center",
	gap: "3px",
};
const defaultTheme = createTheme({
	typography: {
		fontSize: 20, // Adjust the font size as needed
	},
});
const StarRating = ({
	maxRating = 5,
	color = "#fcc419",
	size = 40,
	tourId,
	reviewComment,
	onClose,
}) => {
	const [rating, setRating] = useState(reviewComment?.rating || 0);
	const [review, setReview] = useState(reviewComment?.review || "");
	const [tempRating, setTempRating] = useState(0);
	const stars = [1, 2, 3, 4, 5];
	const { user, isAuthenticated } = useUser();
	const { reviews, error } = useReviewAll();
	const { createReview, isLoading } = useReview(tourId);
	const { updateReview, isUpdating } = useUpdateReview(reviewComment?._id);
	// console.log(user._id);

	// console.log(reviewComment?.rating);

	// console.log(reviewComment);
	const handleRating = (rating) => {
		setRating(rating);
	};
	const [errorMsg, setErrorMsg] = useState("");

	const textStyle = {
		lineHeight: "1",
		margin: "0",
		color,
		fontSize: `${size / 1.5} px`,
		gap: "14px",
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		if (review.length < 3 || review === "") {
			setErrorMsg("Please Fill Comment ");
			return;
		}
		if (rating === 0) {
			setErrorMsg("Please select the Star ");
			return;
		}
		const dataValue = { review, rating };
		if (reviewComment) {
			updateReview(dataValue);
			onClose();
		} else {
			console.log(dataValue);
			createReview(dataValue);
		}
	};

	const handleCancel = () => {
		setRating(reviewComment?.rating || 0);
		setReview(reviewComment?.review || "");
		setErrorMsg("");
	};

	return (
		<>
			<ThemeProvider theme={defaultTheme}>
				<div className={reviewComment ? "reviews__card" : ""}>
					{/* user && isAuthenticated && user?._id === review?.user?._id ? */}
					{user &&
					isAuthenticated &&
					reviewComment &&
					user._id === reviewComment?.user?._id ? (
						<>
							{errorMsg !== "" ? (
								<Alert severity="error">{errorMsg}</Alert>
							) : (
								""
							)}
							<Typography component="h3" variant="h6" sx={{ mb: 3 }}>
								Update Your Review <br />
								{/* {user._id} <br /> */}
								{/* {reviewComment?.user?._id} */}
							</Typography>
							<form onSubmit={handleSubmit}>
								<div>
									<Grid item xs={6}>
										<TextField
											fullWidth
											id="filled-multiline-static"
											label="Comment Tour"
											multiline
											value={review}
											disabled={reviewComment ? isUpdating : isLoading}
											name="review"
											onChange={(e) => setReview(e.target.value)}
											rows={4}
										/>
									</Grid>
								</div>
								{/* {reviewComment.rating} */}
								<br />
								<div style={starContainerStyle}>
									{Array.from({ length: maxRating }, (_, i) => (
										<Star
											key={i}
											full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
											onRate={() => handleRating(i + 1)}
											onHoverIn={() => setTempRating(i + 1)}
											onHoverOut={() => setTempRating(0)}
											color={color}
											size={size}
										/>
									))}

									<p style={textStyle}>
										{/* {tempRating || rating || ""} {reviewComment?.rating} */}
									</p>
								</div>
								<Stack
									spacing={2}
									direction="row"
									disabled={reviewComment ? isUpdating : isLoading}
									sx={{ mt: 3, mb: 3 }}
								>
									<Button
										variant="contained"
										type="reset"
										onClick={handleCancel}
									>
										cancel
									</Button>

									<Button
										type="submit"
										disabled={reviewComment ? isUpdating : isLoading}
										variant="contained"
									>
										{reviewComment ? "Update Review" : "Create review"}
									</Button>
								</Stack>
							</form>
						</>
					) : (
						<>
							{/* {user._id} <br /> */}
							{/* {reviewComment?.user?._id}  */}

							{errorMsg !== "" ? (
								<Alert severity="error">{errorMsg}</Alert>
							) : (
								""
							)}
							<Typography component="h1" variant="h4" sx={{ mb: 3 }}>
								Give Your Review
							</Typography>
							<form onSubmit={handleSubmit}>
								<div>
									<Grid item xs={6}>
										<TextField
											fullWidth
											id="filled-multiline-static"
											label="Comment Tour"
											multiline
											value={review}
											disabled={reviewComment ? isUpdating : isLoading}
											name="review"
											onChange={(e) => setReview(e.target.value)}
											rows={4}
										/>
									</Grid>
								</div>
								{/* {reviewComment.rating} */}
								<br />
								<div style={starContainerStyle}>
									{Array.from({ length: maxRating }, (_, i) => (
										<Star
											key={i}
											full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
											onRate={() => handleRating(i + 1)}
											onHoverIn={() => setTempRating(i + 1)}
											onHoverOut={() => setTempRating(0)}
											color={color}
											size={size}
										/>
									))}

									<p style={textStyle}>
										{/* {tempRating || rating || ""} {reviewComment?.rating} */}
									</p>
								</div>
								<br />

								<Stack
									spacing={2}
									direction="row"
									disabled={reviewComment ? isUpdating : isLoading}
									sx={{ mt: 3, mb: 3 }}
								>
									<Button
										variant="contained"
										type="reset"
										onClick={handleCancel}
									>
										cancel
									</Button>

									<Button
										type="submit"
										disabled={reviewComment ? isUpdating : isLoading}
										variant="contained"
									>
										{reviewComment ? "Update Review" : "Create review"}
									</Button>
								</Stack>
							</form>
						</>
					)}
				</div>
			</ThemeProvider>
		</>
	);
};

export default StarRating;

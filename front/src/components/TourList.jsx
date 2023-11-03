import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import useUser from "./auth/useUser";
import TourUpdate from "./TourUpdate";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditTourDialog from "../ui/EditTourDialog";
import useCreateTour from "./auth/useCreateTour";
import useDeleteTour from "./auth/useDeleteTour";
const formatCurrency = require("format-currency");

const TourList = ({ tour }) => {
	const {
		id: tourId,
		name,
		duration,
		difficulty,
		price,
		ratingsAverage,
		maxGroupSize,
		priceDiscount,
	} = tour;
	const { user, isAuthenticated } = useUser();
	const [showForm, setShowForm] = useState(false);
	const { isCreatingTours, createTour } = useCreateTour();
	const { isDeleting, deleteTour } = useDeleteTour();

	const handleSubmit = () => {
		setShowForm(false);
	};
	const handleDelete = (tourId) => {
		// console.log(tourId);
		deleteTour(tourId);
	};
	const handleDuplicate = () => {
		createTour({
			name: `Copy of ${name}`,
			duration,
			difficulty,
			price,
			priceDiscount,

			ratingsAverage,
			maxGroupSize,
		});
	};

	return (
		<>
			<tr product={tour} key={tour.id}>
				{/* 	<td>{tour._id}</td>
				<td>{tour.name}</td>  */}

				<td>{tourId}</td>
				<td>{name}</td>
				<td>{duration}</td>
				<td>{difficulty}</td>
				<td>{formatCurrency(price)}</td>
				<td>{formatCurrency(priceDiscount)}</td>

				<td>{ratingsAverage}</td>
				<td>{maxGroupSize}</td>
				{user && isAuthenticated && user?.role === "admin" ? (
					<>
						<td>
							<Button
								style={{ fontWeight: "bold", fontSize: "16px" }}
								variant="danger"
								onClick={() => handleDelete(tour._id)}
								disabled={isDeleting}
							>
								<DeleteIcon />
							</Button>
						</td>
						<td>
							<EditTourDialog
								tourToEdit={tour}
								// tourId={productId}
								// onClose={handleSubmit}
							/>
						</td>
						<td>
							<Button
								style={{ fontWeight: "bold", fontSize: "16px" }}
								variant="primary"
								onClick={handleDuplicate}
								disabled={isDeleting}
							>
								<ContentCopyIcon />
							</Button>
						</td>
					</>
				) : (
					""
				)}
			</tr>
			<div>
				{showForm && (
					<TourUpdate
						tourToEdit={tour}
						tourId={tourId}
						onClose={handleSubmit} // this help to close the form while form submit data in the tourUpdate
					/>
				)}
			</div>
		</>
	);
};

export default TourList;

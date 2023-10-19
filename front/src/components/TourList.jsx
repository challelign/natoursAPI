import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { deleteTour } from "../api/NatoursAPI";
import { toast } from "react-hot-toast";
import useUser from "./auth/useUser";
import TourUpdate from "./TourUpdate";
import { Box } from "@mui/system";
import EditTourDialog from "../ui/EditTourDialog";
const formatCurrency = require("format-currency");

const TourList = ({ product }) => {
	const {
		id: productId,
		name,
		duration,
		difficulty,
		price,
		ratingsAverage,
	} = product;
	const { user, isAuthenticated } = useUser();
	const [showForm, setShowForm] = useState(false);

	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate } = useMutation({
		mutationFn: (id) => deleteTour(id),
		onSuccess: () => {
			toast.success("Tours successfully deleted");
			queryClient.invalidateQueries({ queryKey: ["tours"] });
		},
		onError: (err) => toast.error(err.message),
	});

	const handleSubmit = () => {
		setShowForm(false);
	};
	return (
		<>
			<tr product={product} key={product.id}>
				{/* 	<td>{product._id}</td>
				<td>{product.name}</td>  */}

				<td>{productId}</td>
				<td>{name}</td>
				<td>{duration}</td>
				<td>{difficulty}</td>
				<td>{formatCurrency(price)}</td>
				<td>{ratingsAverage}</td>
				{user && isAuthenticated && user?.role === "admin" ? (
					<>
						<td>
							<Button
								style={{ fontWeight: "bold", fontSize: "16px" }}
								variant="danger"
								onClick={() => mutate(product._id)}
								disabled={isDeleting}
							>
								Delete
							</Button>
						</td>
						<td>
							{/* <Button
								style={{ fontWeight: "bold", fontSize: "16px" }}
								variant="primary"
								onClick={() => setShowForm((sw) => !showForm)}
								disabled={isDeleting}
							>
								{!showForm ? "Edit" : "Close"}
							</Button> */}
							<EditTourDialog
								tourToEdit={product}
								// tourId={productId}
								// onClose={handleSubmit}
							/>
						</td>
					</>
				) : (
					""
				)}
			</tr>
			<div>
				{showForm && (
					<TourUpdate
						tourToEdit={product}
						tourId={productId}
						onClose={handleSubmit} // this help to close the form while form submit data in the tourUpdate
					/>
				)}
			</div>
		</>
	);
};

export default TourList;

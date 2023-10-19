import React from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

import useCreateTour from "../components/auth/useCreateTour";

const Error = styled.span`
	font-size: 1.4 rem;
	color: var(--color-red-700);
`;
const ToursForm = () => {
	const { isCreatingTours, createTour } = useCreateTour();
	const { register, handleSubmit, reset, getValues, formState } = useForm();
	const { errors } = formState;

	const onSubmit = (data) => {
		createTour(data);
		reset();
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Card border="primary row">
				<div className="row">
					<div className="col-3"></div>

					<div className=" col-6 pt-3">
						<Form.Group className="mb-3">
							<Form.Label style={{ fontWeight: "bold", fontSize: "16px" }}>
								Name
							</Form.Label>
							<Form.Control
								type="name"
								id="name"
								name="name"
								disabled={isCreatingTours}
								{...register("name", {
									required: "This field is required",
									minLength: {
										value: 10,
										message: "Input length should be at least 10 characters",
									},
								})}
								placeholder="Tour Name"
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
							/>
							{errors?.name?.message && <Error>{errors.name.message}</Error>}
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label style={{ fontWeight: "bold", fontSize: "16px" }}>
								duration
							</Form.Label>
							<Form.Control
								type="duration"
								name="duration"
								disabled={isCreatingTours}
								id="duration"
								{...register("duration", {
									required: "This field is required",
								})}
								placeholder="Duration"
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
							/>
							{errors?.duration?.message && (
								<Error>{errors.duration.message}</Error>
							)}
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label style={{ fontWeight: "bold", fontSize: "16px" }}>
								Rating Average
							</Form.Label>
							<Form.Control
								type="number"
								name="ratingsAverage"
								disabled={isCreatingTours}
								id="ratingsAverage"
								{...register("ratingsAverage", {
									required: "This field is required",
									min: {
										value: 1,
										message: "Ratting should be at least 1",
									},

									max: {
										value: 5,
										message: "Ratting max value no more than 5",
									},
								})}
								placeholder="Rating Average"
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
							/>
							{errors?.ratingsAverage?.message && (
								<Error>{errors.ratingsAverage.message}</Error>
							)}
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label style={{ fontWeight: "bold", fontSize: "16px" }}>
								Price
							</Form.Label>
							<Form.Control
								type="number"
								name="price"
								disabled={isCreatingTours}
								id="price"
								{...register("price", { required: "This field is required" })}
								placeholder="Price"
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
							/>
							{errors?.price?.message && <Error>{errors.price.message}</Error>}
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label style={{ fontWeight: "bold", fontSize: "16px" }}>
								Price Discount
							</Form.Label>
							<Form.Control
								type="number"
								name="priceDiscount"
								disabled={isCreatingTours}
								id="priceDiscount"
								defaultValue={0}
								placeholder="Price Discount"
								{...register("priceDiscount", {
									required: "This field is required",

									validate: (value) =>
										Number(value) <= Number(getValues().price) ||
										"Discount should be less than the regular price",
								})}
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
							/>
							{errors?.priceDiscount?.message && (
								<Error>{errors.priceDiscount.message}</Error>
							)}
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label style={{ fontWeight: "bold", fontSize: "16px" }}>
								Max Group Size
							</Form.Label>
							<Form.Control
								type="number"
								disabled={isCreatingTours}
								id="maxGroupSize"
								name="maxGroupSize"
								{...register("maxGroupSize", {
									required: "This field is required",
								})}
								placeholder="Max Group Size"
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
							/>
							{errors?.maxGroupSize?.message && (
								<Error>{errors.maxGroupSize.message}</Error>
							)}
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label style={{ fontWeight: "bold", fontSize: "16px" }}>
								Level Type
							</Form.Label>
							<Form.Select
								aria-label="Default select example"
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
								name="difficulty"
								disabled={isCreatingTours}
								id="difficulty"
								{...register("difficulty", {
									required: "This field is required",
								})}
							>
								<option value="">Select Level Type</option>
								{/* Added an empty value for the disabled option */}
								<option value="easy">Easy</option>
								<option value="medium">Medium</option>
								<option value="difficult">Difficult</option>
							</Form.Select>
							{errors?.difficulty && <Error>{errors.difficulty.message}</Error>}
						</Form.Group>

						<Form.Group className="mb-3">
							<Button
								type="reset"
								variant="secondary"
								onClick={reset}
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
							>
								Cancel
							</Button>
							<Button
								disabled={isCreatingTours}
								type="submit"
								variant="primary"
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
							>
								Create new Tours
							</Button>
						</Form.Group>
					</div>
				</div>
			</Card>
		</Form>
	);
};

export default ToursForm;

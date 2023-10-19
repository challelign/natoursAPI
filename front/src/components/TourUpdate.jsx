import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

import { useUpdateTour } from "./auth/useUpdateTour";
import { Col, Row } from "react-bootstrap";

const Error = styled.span`
	font-size: 1.4 rem;
	color: var(--color-red-700);
`;
const labelName = [
	{ label: "easy", value: "easy" },
	{ label: "medium", value: "medium" },
	{ label: "difficult", value: "difficult" },
];
const TourUpdate = ({ tourToEdit, onClose }) => {
	const [fields, setFields] = useState({ ...tourToEdit });
	const [imageCover, setImageCover] = useState(null);
	const [images, setImages] = useState([]);
	const { editTour, isUpdating } = useUpdateTour(tourToEdit._id);

	const handleCancel = () => {
		setFields({ ...tourToEdit });
		setImageCover(null);
		setImages([]);
	};

	const handleChange = (e) => {
		setFields({
			...fields,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(fields.imageCover);
		const formData = new FormData();

		if (imageCover !== null && imageCover !== undefined) {
			console.log(imageCover);
			formData.append("imageCover", e.target.imageCover.files[0]);
		} else {
			console.log("imageCover file does not exist");
		}
		for (let i = 0; i < images.length; i++) {
			formData.append("images", images[i]);
		}

		formData.append("name", e.target.name.value);

		formData.append("duration", e.target.duration.value);
		formData.append("price", parseInt(e.target.price.value));
		formData.append("difficulty", e.target.difficulty.value);
		formData.append("maxGroupSize", e.target.maxGroupSize.value);
		formData.append("priceDiscount", e.target.priceDiscount.value);
		// const formData = new FormData();
		// const updatedFields = { ...fields, imageCover: formData };
		// editTour(updatedFields);
		await editTour(formData);
		onClose();
	};

	return (
		<>
			<Form onSubmit={handleSubmit} enctype="multipart/form-data">
				<div className="row">
					<div className="col-1"></div>

					<div className="   pt-3">
						<Form.Group className="mb-3" as={Row}>
							<Form.Label
								column
								sm="3"
								style={{ fontWeight: "bold", fontSize: "16px" }}
							>
								Name
							</Form.Label>
							<Col sm="9">
								<Form.Control
									type="name"
									id="name"
									onChange={handleChange}
									name="name"
									value={fields.name}
									disabled={isUpdating}
									placeholder="Tour Name"
									style={{
										border: "1px solid #ccc",
										borderRadius: "4px",
										padding: "8px",
										fontSize: "14px",
									}}
								/>
							</Col>
						</Form.Group>

						<Form.Group className="mb-3" as={Row}>
							<Col sm="6" column>
								<Form.Group className="mb-3" as={Row}>
									<Form.Label
										column
										duration
										sm="6"
										style={{ fontWeight: "bold", fontSize: "16px" }}
									>
										duration
									</Form.Label>
									<Col sm="6">
										<Form.Control
											type="duration"
											onChange={handleChange}
											name="duration"
											value={fields.duration}
											disabled={isUpdating}
											placeholder="Duration"
											style={{
												border: "1px solid #ccc",
												borderRadius: "4px",
												padding: "8px",
												fontSize: "14px",
											}}
										/>
									</Col>
								</Form.Group>
							</Col>
							<Col sm="6" column>
								<Form.Group className="mb-3" as={Row}>
									<Form.Label
										column
										sm="6"
										style={{ fontWeight: "bold", fontSize: "16px" }}
									>
										Rating Average
									</Form.Label>
									<Col sm="6">
										<Form.Control
											type="number"
											onChange={handleChange}
											name="ratingsAverage"
											value={fields.ratingsAverage}
											disabled={isUpdating}
											id="ratingsAverage"
											placeholder="Rating Average"
											style={{
												border: "1px solid #ccc",
												borderRadius: "4px",
												padding: "8px",
												fontSize: "14px",
											}}
										/>
									</Col>
								</Form.Group>
							</Col>
						</Form.Group>
						{/*  */}
						<Form.Group className="mb-3" as={Row}>
							<Col sm="6" column>
								<Form.Group className="mb-3" as={Row}>
									<Form.Label
										column
										duration
										sm="6"
										style={{ fontWeight: "bold", fontSize: "16px" }}
									>
										Price
									</Form.Label>
									<Col sm="6">
										<Form.Control
											type="number"
											name="price"
											onChange={handleChange}
											// value={fields.price}
											value={parseFloat(fields.price)}
											disabled={isUpdating}
											id="price"
											placeholder="Price"
											style={{
												border: "1px solid #ccc",
												borderRadius: "4px",
												padding: "8px",
												fontSize: "14px",
											}}
										/>
									</Col>
								</Form.Group>
							</Col>
							<Col sm="6" column>
								<Form.Group className="mb-3" as={Row}>
									<Form.Label
										column
										sm="6"
										style={{ fontWeight: "bold", fontSize: "16px" }}
									>
										Price Discount{" "}
									</Form.Label>
									<Col sm="6">
										<Form.Control
											type="number"
											name="priceDiscount"
											// value={fields.priceDiscount}
											value={parseFloat(fields.priceDiscount)}
											onChange={handleChange}
											disabled={isUpdating}
											id="priceDiscount"
											defaultValue={0}
											placeholder="Price Discount"
											style={{
												border: "1px solid #ccc",
												borderRadius: "4px",
												padding: "8px",
												fontSize: "14px",
											}}
										/>
									</Col>
								</Form.Group>
							</Col>
						</Form.Group>

						<Form.Group className="mb-3" as={Row}>
							<Col sm="6" column>
								<Form.Group className="mb-3" as={Row}>
									<Form.Label
										column
										duration
										sm="6"
										style={{ fontWeight: "bold", fontSize: "16px" }}
									>
										Max Group Size
									</Form.Label>
									<Col sm="6">
										<Form.Control
											type="number"
											onChange={handleChange}
											disabled={isUpdating}
											value={fields.maxGroupSize}
											id="maxGroupSize"
											name="maxGroupSize"
											placeholder="Max Group Size"
											style={{
												border: "1px solid #ccc",
												borderRadius: "4px",
												padding: "8px",
												fontSize: "14px",
											}}
										/>
									</Col>
								</Form.Group>
							</Col>
							<Col sm="6" column>
								<Form.Group className="mb-3" as={Row}>
									<Form.Label
										column
										sm="6"
										style={{ fontWeight: "bold", fontSize: "16px" }}
									>
										Choose difficulty
									</Form.Label>
									<Col sm="6">
										<Form.Select
											aria-label="Default select example"
											style={{
												border: "1px solid #ccc",
												borderRadius: "4px",
												padding: "8px",
												fontSize: "14px",
											}}
											name="difficulty"
											value={fields.difficulty}
											onChange={handleChange}
										>
											{labelName.map((level) => (
												<option
													key={level.value}
													value={level.value}
													selected={level.value === fields.difficulty}
												>
													{level.label}
												</option>
											))}
										</Form.Select>
									</Col>
								</Form.Group>
							</Col>
						</Form.Group>

						{/*  */}

						{/* image is {imageCover} */}
						<Form.Group controlId="formFileLg" className="mb-3" as={Row}>
							<Form.Label column sm="3">
								Image Cover
							</Form.Label>
							<Col sm="9">
								<Form.Control
									type="file"
									disabled={isUpdating}
									// required
									name="imageCover"
									onChange={(e) => setImageCover(e.target.files[0])}
									accept="image/*"
									size="lg"
								/>
							</Col>
						</Form.Group>
						<Form.Group controlId="formFileLg" className="mb-3" as={Row}>
							<Form.Label column sm="3">
								Images
							</Form.Label>
							<Col sm="9">
								<Form.Control
									type="file"
									multiple
									disabled={isUpdating}
									// required
									name="images[]"
									onChange={(e) => setImages(e.target.files)}
									accept="image/*"
									size="lg"
								/>
							</Col>
						</Form.Group>

						<Form.Group className="mb-3">
							<Button
								variant="secondary"
								onClick={handleCancel}
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
								disabled={isUpdating}
								type="submit"
								variant="primary"
								style={{
									border: "1px solid #ccc",
									borderRadius: "4px",
									padding: "8px",
									fontSize: "14px",
								}}
							>
								update tours
							</Button>
						</Form.Group>
					</div>
				</div>
			</Form>
		</>
	);
};

export default TourUpdate;

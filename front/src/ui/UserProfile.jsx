import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { useParams } from "react-router-dom";
import useUser from "../components/auth/useUser";
import Spinner from "./Spinner";
import { url } from "../url";
import { useForm } from "react-hook-form";
import { updateCurrentUser } from "../api/NatoursAPI";
import { useUpdateUser } from "../components/auth/useUpdateUser";
import PasswordUpdate from "./PasswordUpdate";
const Error = styled.span`
	font-size: 1.4 rem;
	color: var(--color-red-700);
`;

const UserProfile = () => {
	const { isLoading, user: uProfile } = useUser();
	const { updateUser, isUpdating } = useUpdateUser();

	const [name, setName] = useState(uProfile.name);
	const [photo, setPhoto] = useState(null);

	if (isLoading) {
		return <Spinner />;
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("photo", photo);
		formData.append("name", name);

		if (!name) return;
		updateUser(formData, {
			onSuccess: () => {
				setPhoto(null);
				e.target.reset();
			},
		});
	};
	const handleCancel = () => {
		setName(uProfile.name);
		setPhoto(null);
	};
	return (
		<>
			<div className="row featurette">
				<div
					className="col-md-7 order-md-2"
					style={{ borderLeft: "2px solid #465244", borderRadius: "1px" }}
				>
					<h2 className="featurette-heading fw-normal lh-1">
						{" "}
						Update Your account{" "}
						<span className="text-body-secondary">See for yourself ,</span>
					</h2>
					<h2 className="overview-box__text">{uProfile.name}</h2>
					<br />
					{uProfile.role === "guide" ? (
						<span className="overview-box__label"> Tour Guid</span>
					) : (
						""
					)}
					{uProfile.role === "user" ? (
						<span className="overview-box__label"> Tour User</span>
					) : (
						""
					)}
					<p></p>
					{uProfile.role === "lead-guide" ? (
						<span className="heading-secondary ma-bt-lg"> Lead Guid</span>
					) : (
						""
					)}
					{/* <h2 className="overview-box__label">{uProfile.email}</h2> */}

					<div className="p-3">
						<Form onSubmit={handleSubmit} enctype="multipart/form-data">
							<Card border="primary row">
								<div className="row">
									<div className="col-3"></div>

									<div className=" col-6 pt-3">
										<Form.Group className="mb-3">
											<Form.Label
												style={{ fontWeight: "bold", fontSize: "16px" }}
											>
												Email
											</Form.Label>
											<Form.Control
												type="email"
												name="email"
												value={uProfile.email}
												disabled
												style={{
													border: "1px solid #ccc",
													borderRadius: "4px",
													padding: "8px",
													fontSize: "14px",
												}}
											/>
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label
												style={{ fontWeight: "bold", fontSize: "16px" }}
											>
												Full name
											</Form.Label>
											<Form.Control
												type="name"
												name="name"
												value={name}
												disabled={isUpdating}
												onChange={(e) => setName(e.target.value)}
												placeholder="Full Name"
												style={{
													border: "1px solid #ccc",
													borderRadius: "4px",
													padding: "8px",
													fontSize: "14px",
												}}
											/>
										</Form.Group>

										<Form.Group controlId="formFileLg" className="mb-3">
											<Form.Label>Profile Photo</Form.Label>

											<Form.Control
												type="file"
												disabled={isUpdating}
												name="photo"
												onChange={(e) => setPhoto(e.target.files[0])}
												accept="image/*"
												size="lg"
											/>
										</Form.Group>
										<Form.Group className="mb-3">
											<Button
												type="reset"
												variant="secondary"
												disabled={isUpdating}
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
												Submit
											</Button>
										</Form.Group>
									</div>
								</div>
							</Card>
						</Form>
					</div>

					<PasswordUpdate />
				</div>
				<div className="col-md-5 order-md-1">
					<img
						className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto img-thumbnail"
						width="70%"
						height="70%"
						src={`${url}/img/users/${uProfile.photo}`}
						alt={uProfile.name}
					/>
					<br />
					<br />
					<h2 className="heading-secondary ma-bt-lg">Tour {uProfile.role}</h2>
				</div>
			</div>
		</>
	);
};

export default UserProfile;

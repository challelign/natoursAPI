import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmationDialog = ({ user, onDelete }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleDelete = () => {
		onDelete(user._id);
		setShow(false);
	};

	return (
		<>
			<Button
				style={{ fontWeight: "bold", fontSize: "16px" }}
				variant="danger"
				onClick={() => setShow(true)}
			>
				Delete
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Deletion</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure you want to delete this user?</p>
					<p>
						<strong>{user.name}</strong>
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="danger" onClick={handleDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default DeleteConfirmationDialog;

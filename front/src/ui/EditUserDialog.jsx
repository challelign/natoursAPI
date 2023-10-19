import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import UpdateUserForm from "../components/UpdateUserForm";

const EditUserDialog = ({ user }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
	};

	return (
		<>
			<Button
				style={{ fontWeight: "bold", fontSize: "16px" }}
				variant="danger"
				onClick={() => setShow(true)}
			>
				Edit
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Update {user.name} Detail</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UpdateUserForm user={user} onClose={handleClose} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default EditUserDialog;

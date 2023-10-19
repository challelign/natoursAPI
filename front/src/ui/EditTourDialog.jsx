import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import UpdateUserForm from "../components/UpdateUserForm";
import TourUpdate from "../components/TourUpdate";

const EditTourDialog = ({ tourToEdit }) => {
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
					<Modal.Title>Update {tourToEdit.name} Detail</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* <UpdateUserForm user={user} onClose={handleClose} /> */}

					<TourUpdate
						tourToEdit={tourToEdit}
						onClose={handleClose} // this help to close the form while form submit data in the tourUpdate
					/>
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

export default EditTourDialog;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { url } from "../url";

import Button from "react-bootstrap/Button";
import { deleteTour } from "../api/NatoursAPI";
import { toast } from "react-hot-toast";
import UpdateUserForm from "./UpdateUserForm";
import useUser from "./auth/useUser";
import useUserDelete from "./auth/useUserDelete";
import DeleteConfirmationDialog from "../ui/DeleteConfirmationDialog";
import EditUserDialog from "../ui/EditUserDialog";
const formatCurrency = require("format-currency");

const UsersList = ({ user }) => {
	const [showForm, setShowForm] = useState(false);
	const { user: userId, isAuthenticated } = useUser();
	// console.log(userId);
	const { isDeleting, deleteUser } = useUserDelete();

	const handleDeleteUser = (id) => {
		deleteUser(id);
	};
	return (
		<>
			<tr user={user} key={user.id}>
				<td>{user._id}</td>
				<td>{user.name}</td>
				<td>{user.role}</td>
				<td>{user.email}</td>
				<td>
					<img
						src={`${url}/img/users/${user.photo}`}
						alt={user.name}
						className="nav__user-img"
					/>
				</td>
				{user._id !== userId._id ? (
					<>
						<td>
							<DeleteConfirmationDialog
								user={user}
								onDelete={handleDeleteUser}
							/>
						</td>

						<td>
							<EditUserDialog user={user} />
						</td>
						{/* <td>
							<Button
								style={{ fontWeight: "bold", fontSize: "16px" }}
								variant="danger"
								onClick={() => setShowForm((sw) => !showForm)}
								disabled={isDeleting}
							>
								Edit
							</Button>
						</td> */}
					</>
				) : (
					""
				)}
			</tr>
			{/* <div>{showForm && <UpdateUserForm user={user} />}</div> */}
		</>
	);
};

export default UsersList;

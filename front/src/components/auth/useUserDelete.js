import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { deleteUserAPI } from "../../api/NatoursAPI";

const useUserDelete = () => {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
		mutationFn: (id) => deleteUserAPI(id),
		onSuccess: () => {
			toast.success("Users successfully deleted");
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteUser };
};

export default useUserDelete;

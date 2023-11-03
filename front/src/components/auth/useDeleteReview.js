import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { deleteReviewAPI, deleteUserAPI } from "../../api/NatoursAPI";

const useDeleteReview = () => {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: deleteReview } = useMutation({
		mutationFn: (id) => deleteReviewAPI(id),
		onSuccess: () => {
			toast.success("Review successfully deleted");
			queryClient.invalidateQueries({ queryKey: ["tours"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteReview };
};

export default useDeleteReview;

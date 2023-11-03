import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { deleteTourAPI } from "../../api/NatoursAPI";

const useDeleteTour = () => {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: deleteTour } = useMutation({
		mutationFn: (id) => deleteTourAPI(id),
		onSuccess: () => {
			toast.success("Tours successfully deleted");
			queryClient.invalidateQueries({ queryKey: ["tours"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteTour };
};

export default useDeleteTour;

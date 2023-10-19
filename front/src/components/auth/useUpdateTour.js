import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTourAPI } from "../../api/NatoursAPI";

import toast from "react-hot-toast";

export const useUpdateTour = (userId) => {
	// console.log(userId);
	const queryClient = useQueryClient();
	const { mutate: editTour, isLoading: isUpdating } = useMutation({
		mutationFn: (dataValue) => updateTourAPI(userId, dataValue),
		onSuccess: () => {
			toast.success("tours successfully Updated ?");
			queryClient.invalidateQueries({ queryKey: ["tours"] });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { editTour, isUpdating };
};

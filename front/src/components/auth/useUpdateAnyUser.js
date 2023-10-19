import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateAnyUserAPI } from "../../api/NatoursAPI";

export const useUpdateAnyUser = () => {
	const queryClient = useQueryClient();
	const { mutate: updateAnyUser, isLoading: isUpdating } = useMutation({
		mutationFn: updateAnyUserAPI,
		onSuccess: () => {
			toast.success("User successfully Updated");
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	// console.log(editTour);
	return { updateAnyUser, isUpdating };
};

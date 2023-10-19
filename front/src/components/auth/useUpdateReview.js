import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateReviewAPI } from "../../api/NatoursAPI";

import toast from "react-hot-toast";

export const useUpdateReview = (reviewId) => {
	console.log(reviewId);
	const queryClient = useQueryClient();
	const { mutate: updateReview, isLoading: isUpdating } = useMutation({
		mutationFn: (dataValue) => updateReviewAPI(reviewId, dataValue),
		onSuccess: () => {
			toast.success("Review successfully Updated");
			queryClient.invalidateQueries({ queryKey: ["tours"] });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { updateReview, isUpdating };
};

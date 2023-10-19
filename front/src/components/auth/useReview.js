import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createReviewAPI, updateTourAPI } from "../../api/NatoursAPI";

import toast from "react-hot-toast";

export const useReview = (tourId) => {
	console.log(tourId);
	const queryClient = useQueryClient();
	const { mutate: createReview, isLoading } = useMutation({
		mutationFn: (dataValue) => createReviewAPI(tourId, dataValue),
		onSuccess: () => {
			toast.success("Review successfully Created");
			queryClient.invalidateQueries({ queryKey: ["tours"] });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { createReview, isLoading };
};

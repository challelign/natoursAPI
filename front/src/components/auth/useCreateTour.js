import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createToursAPI } from "../../api/NatoursAPI";
import toast from "react-hot-toast";

const useCreateTour = () => {
	const queryClient = useQueryClient();
	const { mutate: createTour, isLoading: isCreatingTours } = useMutation({
		mutationFn: createToursAPI,
		onSuccess: () => {
			toast.success("New Tour successfully Created");
			queryClient.invalidateQueries({ queryKey: ["tours"] });
			// reset();
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { isCreatingTours, createTour };
};

export default useCreateTour;

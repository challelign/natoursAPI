import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCurrentUser } from "../../api/NatoursAPI";

import toast from "react-hot-toast";

export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isLoading: isUpdating } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: () => {
			toast.success("Account successfully updated ");

			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});
	return { updateUser, isUpdating };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signup } from "../../api/NatoursAPI";
import toast from "react-hot-toast";
export const useSignup = () => {
	const queryClient = useQueryClient();

	const { mutate: createUser, isLoading } = useMutation({
		queryKey: ["users"],
		mutationFn: signup,
		onSuccess: (user) => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			console.log(user);
			toast.success("Account successfully created ");
		},
		onError: (err) => {
			console.log("ERROR", err);
			// this will show the error from the database
			// toast.error(err.stack);
			toast.error(
				"Provided Email or Password , name | The Email is Already Exists"
			);
		},
	});
	return { createUser, isLoading };
};

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCurrentUserPassword } from "../../api/NatoursAPI";
import toast from "react-hot-toast";

export const useUpdatePassword = () => {
	const queryClient = useQueryClient();

	const { mutate: updatePassword, isLoading } = useMutation({
		queryKey: ["user"],
		mutationFn: updateCurrentUserPassword,
		onSuccess: (user) => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
			console.log(user);
			toast.success("Account successfully updated ");
		},
		onError: (err) => {
			console.log("ERROR", err);
			// this will show the error from the database
			// toast.error(err.stack);
			toast.error("Invalid Password  | The Old password does not match");
		},
	});
	return { updatePassword, isLoading };
};

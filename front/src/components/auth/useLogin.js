import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { loginUser } from "../../api/NatoursAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate: login, isLoading: isLogging } = useMutation({
		mutationFn: ({ email, password }) =>
			loginUser({
				email,
				password,
			}),
		onSuccess: (user) => {
			queryClient.setQueryData(["user"], user.data);
			// console.log(user);
			console.log("Login successful:", user);

			navigate("/dashboard", { replace: true });
		},
		// added later
		onSettled: () => {
			queryClient.invalidateQueries(["user"]);
		},

		onError: (err) => {
			console.log("ERROR", err);
			toast.error("Provided Email or Password Or user is Inactive");
		},
	});
	return { login, isLogging };
};

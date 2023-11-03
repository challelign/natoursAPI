import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { forgetPasswordAPI, loginUser } from "../../api/NatoursAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useForgetPassword = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate: forgetPassword, isLoading: isSending } = useMutation({
		mutationFn: forgetPasswordAPI,

		onSuccess: () => {
			toast.success("forget Password successfully Send to your email ?");
		},
		onError: (err) => {
			console.log("ERROR", err);
			toast.error("Provided Email   is Inactive");
		},
	});
	return { forgetPassword, isSending };
};

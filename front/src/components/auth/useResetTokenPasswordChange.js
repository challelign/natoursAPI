import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
	resetPasswordUsingTokenAPI,
	updateCurrentUserPassword,
} from "../../api/NatoursAPI";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";

export const useResetTokenPasswordChange = (token) => {
	console.log(token);

	const { mutate: resetPasswordToken, isLoading: isChanging } = useMutation({
		mutationFn: (dataValue) => resetPasswordUsingTokenAPI(token, dataValue),
		onSuccess: () => {
			toast.success("Password successfully Changed , Please login ");
		},
		onError: (err) => {
			console.log("ERROR", err);

			toast.error("Invalid Password  | The Token is Expired");
		},
	});
	return { resetPasswordToken, isChanging };
};

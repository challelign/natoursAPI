import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "../../api/NatoursAPI";

import { useNavigate } from "react-router-dom";

export const useLogout = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate: logoutUser, isLoading } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.removeQueries();
			navigate("/login", { replace: true });
		},
	});
	return { logoutUser, isLoading };
};

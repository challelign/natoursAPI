import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getCurrentUser } from "../../api/NatoursAPI";

const useUser = () => {
	const queryClient = useQueryClient();
	const {
		isLoading,
		data: user,
		error,
	} = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});
	// console.log("user ", user);
	// console.log(user.role);
	console.log("User:", user);
	console.log("Is authenticated:", user?.isAuthenticated);
	console.log("Error:", error);
	return {
		isLoading,
		user,
		error,
		isAuthenticated: user?.isAuthenticated === true,
	};
};

export default useUser;

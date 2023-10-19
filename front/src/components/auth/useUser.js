import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../../api/NatoursAPI";

const useUser = () => {
	const {
		isLoading,
		data: user,
		error,
	} = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});
	console.log("user ", user);
	// console.log(user.role);
	return {
		isLoading,
		user,
		error,
		isAuthenticated: user?.isAuthenticated === true,
	};
};

export default useUser;

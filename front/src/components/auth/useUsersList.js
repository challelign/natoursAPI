import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "../../api/NatoursAPI";

const useUsersList = () => {
	const {
		isLoading,
		data: users,
		error,
	} = useQuery({
		queryKey: ["users"],
		queryFn: getAllUsers,
	});
	console.log("user ", users);
	// console.log(user.role);
	return { isLoading, users, error };
};

export default useUsersList;

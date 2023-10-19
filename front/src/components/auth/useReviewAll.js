import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
	getAllReviews,
	getAllReviewsAPI,
	getAllUsers,
} from "../../api/NatoursAPI";

const useReviewAll = () => {
	const {
		isLoading,
		data: reviews,
		error,
	} = useQuery({
		queryKey: ["reviews"],
		queryFn: getAllReviewsAPI,
	});
	console.log("reviews ", reviews);
	// console.log(user.role);
	return { isLoading, reviews, error };
};

export default useReviewAll;

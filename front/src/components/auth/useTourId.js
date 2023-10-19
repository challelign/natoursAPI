import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getToursUsingId } from "../../api/NatoursAPI";

const useTourId = (id) => {
	// const id = 6546546564;
	console.log(id);
	const {
		isLoading,
		isError,
		data: tour,
		status,
		error,
	} = useQuery({
		queryKey: ["tours", id],
		queryFn: () => getToursUsingId(id),
	});
	console.log(tour);
	return { tour, isLoading };
};

export default useTourId;

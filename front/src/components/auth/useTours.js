import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getTours } from "../../api/NatoursAPI";

const useTours = (pageNumber) => {
	const {
		isLoading,
		isError,
		data: { data: tourData, totalCount } = {},
		status,
		error,
	} = useQuery({
		queryKey: ["tours", pageNumber],
		queryFn: () => getTours(pageNumber),
		keepPreviousData: true,
	});
	return { isLoading, tourData, error, totalCount };
};

export default useTours;

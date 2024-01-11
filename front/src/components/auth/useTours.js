import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getTours } from "../../api/NatoursAPI";

const useTours = (
	pageNumber,
	//  searchQuery
	filterGenre
) => {
	const {
		isLoading,
		isError,
		data: { data: tourData, totalCount, totalRes } = {},
		status,
		error,
	} = useQuery({
		/* 	queryKey: ["tours", pageNumber, searchQuery],
		queryFn: () => getTours(pageNumber, searchQuery), */
		queryKey: ["tours", pageNumber],
		queryFn: () => getTours(pageNumber),
		keepPreviousData: true,
	});
	return { isLoading, tourData, error, totalCount, totalRes };
};

export default useTours;

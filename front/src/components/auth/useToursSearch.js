import React, { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getToursSearchAPI } from "../../api/NatoursAPI";
const PAGE_SIZE = 8;
const useToursSearch = (searchQuery) => {
	// const pageCount = Math.ceil(count / PAGE_SIZE);
	console.log(searchQuery);
	// const isFetchingNextPage = useRef(false);

	const {
		error,
		data,
		isLoading: isSearching,
		isError,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		isSuccess,
	} = useInfiniteQuery({
		queryKey: ["tours", searchQuery],
		queryFn: ({ pageParam = 1 }) => getToursSearchAPI(pageParam, searchQuery),

		getNextPageParam: (lastPage, pages) => {
			if (pages.length < lastPage.totalPages) {
				return pages.length + 1;
			}
			return undefined;
		},
		keepPreviousData: true,
	});
	// console.log(totalPages);
	// console.log(data?.pages[0].data?.totalCountSearch);

	return {
		isSearching,
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		isSuccess,
	};
};

export default useToursSearch;

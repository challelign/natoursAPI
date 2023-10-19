import React from "react";
import {
	getSuperHeroes,
	getSuperHero,
	getUsersByEmail,
	getCoursesByChannelId,
	getPaginatedData,
	addSuperHero,
} from "../api/SuperHeroes";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useSuperHeroesData = (onSuccess, onError, search) => {
	return useQuery({
		queryKey: ["super-heroes", search],
		queryFn: () => getSuperHeroes(search),
		onSuccess,
		onError,
		// cacheTime: 5000, // to reduce no of network request
		// staleTime: 30000, // 30 sec default is 0 sec
		// refetchOnMount: true,
		// refetchOnWindowFocus: true,
		// refetchInterval: 2000,
		// refetchIntervalInBackground: true,
	}); //passing param is optional
};
// getting single hero detail
export const useSuperHeroData = (heroId) => {
	const queryClient = useQueryClient(); //setting initial data to the query
	return useQuery({
		queryKey: ["super-hero", heroId],
		queryFn: () => getSuperHero(heroId),
		initialData: () => {
			const hero = queryClient
				.getQueryData("super-hero")
				?.data?.find((hero) => hero.id === parseInt(heroId));
			if (hero) {
				return { data: hero };
			} else {
				return undefined;
			}
		},
	});
};

export const useUsersDataByEmail = (email) => {
	return useQuery({
		queryKey: ["users-by-email", email],
		queryFn: () => getUsersByEmail(email),
	});
};

export const useCoursesByChannelId = (channelId) => {
	return useQuery({
		queryKey: ["courses-by-channelId", channelId],

		queryFn: () => getCoursesByChannelId(channelId),

		enable: !channelId,
	});
};

export const usePaginatedData = (pageNumber) => {
	return useQuery({
		queryKey: ["paginated-data", pageNumber],
		queryFn: () => getPaginatedData(pageNumber),

		keepPreviousData: true,
	});
};

export const useAddSuperHeroData = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addSuperHero,
		queryKey: "add-hero",
		onSuccess: () => {
			//key super-heroes must be the same as  useSuperHeroesData queryKey
			queryClient.invalidateQueries("super-heroes");
		},
	});
};
// the same with the above but this will remove multiple network request
// export const useAddSuperHeroData = () => {
// 	const queryClient = useQueryClient();
// 	return useMutation(addSuperHero, {
// 		onSuccess: (data) => {
// 			//key super-heroes must be the same as  useSuperHeroesData queryKey
// 			queryClient.setQueryData("super-heroes", (oldQueryData) => {
// 				return {
// 					...oldQueryData,
// 					data: [...oldQueryData.data, data.data],
// 				};
// 			});
// 		},
// 	});
// };

import axios from "axios";

const api = axios.create({
	baseURL: `http://localhost:4000/`,
});

// export const request = ({ ...Options }) => {
// 	api.defaults.headers.common.Authorization = `Bearer token`;
// 	const onSuccess = (response) => response;
// 	const onError = (error) => {
// 		return error;
// 	};
// 	return api(Options).then(onSuccess).catch(onError);
// };
export const getSuperHeroes = async (search) => {
	const response = await api.get(`/superheroes?q=${search}`);
	return response.data;
};

export const getSuperHero = async (heroId) => {
	const response = await api.get(`/superheroes/${heroId}`);
	return response.data;
};

export const getUsersByEmail = async (email) => {
	const response = await api.get(`/users/${email}`);
	return response.data;
};

export const getCoursesByChannelId = async (channelId) => {
	const response = await api.get(`/channels/${channelId}`);
	return response.data;
};

export const getPaginatedData = async (pageNumber) => {
	const response = await api.get(`/colors?_limit=2&_page=${pageNumber}`);
	return response.data;
};

export const addSuperHero = async (hero) => {
	const response = await api.post(`/superheroes/`, hero);

	return response.data;
};

export const deleteSuperHero = async (id) => {
	const response = await api.delete(`/superheroes/${id}`, deleteSuperHero);
	return response.data;
};

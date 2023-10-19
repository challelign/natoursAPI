import axios from "axios";
import Cookies from "js-cookie";
import api from "./api";

// const api = axios.create({
// 	baseURL: `http://localhost:3008/api/v1/`,
// 	// headers: {
// 	// 	Authorization: `Bearer ${Cookies.get("jwtToken")}`,
// 	// },
// });

export const getTours = async () => {
	const { data, error } = await api.get(`/tours`);
	if (error) {
		console.error("getTours", error);
		throw new Error("Products Could not be loaded");
	}
	// console.log(data.data.data);
	return data.data.data;
};
export const getToursUsingId = async (id) => {
	const { data, error } = await api.get(`/tours/${id}`);
	if (error) {
		console.error("getTours", error);
		throw new Error("Tours Could not be loaded");
	}
	console.log(data.data.data);
	return data.data.data;
};

export const getToursUsingSlug = async (slug) => {
	const { data, error } = await api.get(`/tours/${slug}/title`);
	if (error) {
		console.error("getTours", error);
		throw new Error("Tours Could not be loaded");
	}
	return data?.data?.tour;
};

// export const createTours = async (newTour) => {
// 	const { data, error } = await api.post(`/tours/`, newTour);

// 	if (error) {
// 		console.error("create tours", error);
// 		throw new Error("Tours Could not be Created");
// 	}
// 	return data.tours;
// };
export const createToursAPI = async (newTour) => {
	try {
		const { data, error } = await api.post(`/tours/`, newTour);
		if (error) {
			console.error("create tours", error);
			throw new Error("Tours Could not be Created");
		}
		return data.data.data;
	} catch (error) {
		// console.error("An error occurred while creating tours:", error);
		// throw new Error("Tours Could not be Created", error);

		// log the error from the backend api
		console.error(error.response.data.error);
		throw new Error(error.response.data.error.message);
	}
};

/* export const updateTourAPI = async (
	id,
	name,
	duration,
	price,
	ratingsQuantity,
	difficulty,
	maxGroupSize,
	priceDiscount
) => {
	console.log(id);
	try {
		const { data, error } = await api.patch(
			`/tours/${id}`,
			id,
			name,
			duration,
			price,
			ratingsQuantity,
			difficulty,
			maxGroupSize,
			priceDiscount
		);
		if (error) {
			console.error("update tours", error);
			throw new Error("Tours Could not be updated");
		}
		return data.data;
	} catch (error) {
		console.error(error.response.data.error);
		throw new Error(error.response.data.error);
	}
};
 */
export const deleteTour = async (id) => {
	const { data, error } = await api.delete(`/tours/${id}`);
	if (error) {
		console.error("deleteTours", error);
		throw new Error("Tours Could not be deleted");
	}
	return data.data;
};

export const loginUser = async ({ email, password }) => {
	const { data, error } = await api.post(`/users/login/`, { email, password });
	if (error) {
		console.error("user not login", error);
		throw new Error("User Could is not login");
	}
	// console.log(data);
	// document.cookie = `jwt=${data.token}; path=/`;

	// the same as the above
	Cookies.remove("jwt"); // Remove any existing token cookie
	Cookies.set("jwt", data.token);
	return data.data;
};

export const getCookie = (name) => {
	const cookieValue = Cookies.get(name);
	return cookieValue || null;
};
export const getCurrentUser = async () => {
	const token = getCookie("jwt");
	if (!token) {
		return null;
	}

	const headers = {
		Authorization: `Bearer ${token}`,
	};
	// console.log("headers", headers);
	const { data: session, error } = await api.get("users/me", { headers });

	if (!session.data) {
		return null;
	}
	if (error) {
		throw new Error(error.message);
	}
	// console.log("session", session);
	console.log(session.data.data);
	return session?.data.data;
};

export const logout = async () => {
	const { error } = await api.get("users/logout");
	Cookies.remove("jwt");

	if (error) {
		throw new Error(error.message);
	}
	return null;
};

export const signup = async ({
	name,
	email,
	password,
	passwordConfirm,
	role,
}) => {
	try {
		const { data, error } = await api.post(`/users/signup/`, {
			name,
			email,
			password,
			passwordConfirm,
			role,
		});
		if (error) {
			console.error("singup user", error);
			throw new Error("user Could not be Created");
		}
		return data.data;
	} catch (error) {
		console.error(error.response.data.error);
		// throw new Error(error.response.data.error.message);
		throw new Error(error.response.data.error);
	}
};
export const getAllUsers = async () => {
	const { data, error } = await api.get(`/users`);
	if (error) {
		console.error("getAllUsers", error);
		throw new Error("Users Could not be loaded");
	}
	// console.log(data.data.data);
	return data.data.data;
};
// update current login data ,
export const updateCurrentUser = async (formData) => {
	try {
		const { data: updatedUser, error } = await api.patch(
			`/users/updateMe/`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		// console.log(updatedUser); 1278183 rahel , 1278081 genet
		// if (!photo) return updatedUser.data.data;

		if (error) {
			console.error("update user", error);
			throw new Error("update user Could not be Created");
		}

		return updatedUser;
	} catch (error) {
		console.error(error.response.data.error);
		// throw new Error(error.response.data.error);
		throw new Error(error.response.data.error.message);
	}
};

export const updateCurrentUserPassword = async ({
	passwordCurrent,
	password,
	passwordConfirm,
}) => {
	try {
		const { data, error } = await api.patch(`/users/updateMyPassword/`, {
			passwordCurrent,
			password,
			passwordConfirm,
		});
		if (error) {
			console.error("update user password", error);
			throw new Error("update user password Could not be Created");
		}
		return data.data;
	} catch (error) {
		console.error(error.response.data.error);
		// throw new Error(error.response.data.error);
		throw new Error(error.response.data.error.message);
	}
};

export const updateAnyUserAPI = async (updateUser) => {
	// console.log(id);
	console.log(updateUser._id);
	console.log(updateUser);
	try {
		const { data, error } = await api.patch(
			`/users/${updateUser._id}`,
			updateUser
		);

		if (error) {
			console.error("getAllUsers", error);
			throw new Error("Users Could not be loaded");
		}
		return data.data.data;
	} catch (error) {
		console.error(error.response.data.error);
		throw new Error(error.response.data.error.message);
		// throw new Error(error.response.data.error);
	}
};

export const updateTourAPI = async (userId, dataValue) => {
	// console.log(userId);
	// console.log(dataValue);
	try {
		const { data, error } = await api.patch(`/tours/${userId}`, dataValue, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		if (error) {
			console.error("update tours", error);
			throw new Error("Tours Could not be updated");
		}
		if (data !== undefined && data.data !== undefined) {
			console.log(data.data);
		} else {
			console.log("Error: Invalid response");
		}
		return data.data;
	} catch (error) {
		console.error(error.response.data.error);
		throw new Error(
			error.response.data.error.message || error.response.data.error.codeName
		);
	}
};
export const deleteUserAPI = async (id) => {
	const { data, error } = await api.delete(`/users/${id}`);
	if (error) {
		console.error("deleteUsers", error);
		throw new Error("Users Could not be deleted");
	}
	return data.data;
};

export const createReviewAPI = async (tourId, dataValue) => {
	console.log(tourId);
	console.log(dataValue);
	try {
		const { data, error } = await api.post(
			`/tours/${tourId}/reviews`,
			dataValue
		);

		if (error) {
			console.error("create review", error);
			throw new Error("review Could not be updated");
		}
		if (data !== undefined && data.data !== undefined) {
			console.log(data.data);
		} else {
			console.log("Error: Invalid response");
		}
		return data.data;
	} catch (error) {
		console.error(error.response.data.error);
		throw new Error(
			error.response.data.error.message || error.response.data.error.codeName
		);
	}
};

export const updateReviewAPI = async (reviewId, dataValue) => {
	console.log(reviewId);
	console.log(dataValue);
	try {
		const { data, error } = await api.patch(`/reviews/${reviewId}`, dataValue);

		if (error) {
			console.error("create review", error);
			throw new Error("review Could not be updated");
		}
		if (data !== undefined && data.data !== undefined) {
			console.log(data.data);
		} else {
			console.log("Error: Invalid response");
		}
		return data.data;
	} catch (error) {
		console.error(error.response.data.error);
		throw new Error(
			error.response.data.error.message || error.response.data.error.codeName
		);
	}
};
export const getAllReviewsAPI = async () => {
	const { data, error } = await api.get(`/reviews`);
	if (error) {
		console.error("getAll Reviews", error);
		throw new Error("Reviews Could not be loaded");
	}
	console.log(data.data.data);
	return data.data.data;
};

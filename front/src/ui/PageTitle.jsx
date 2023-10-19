import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getToursUsingSlug } from "../api/NatoursAPI";
import { useParams } from "react-router-dom";

const PageTitle = ({ title }) => {
	useEffect(() => {
		if (!title) return;
		document.title = `Tours | ${title}`;
		return function () {
			document.title = "ALL TOURS ";
		};
	}, [title]);

	return null; // Render nothing in the component
};

export default PageTitle;

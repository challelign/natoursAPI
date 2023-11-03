import React from "react";
import TableOperations from "../ui/TableOperations";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Typography from "@mui/material/Typography";

import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";

export const TourTableOperations = ({ totalCount }) => {
	return (
		<TableOperations>
			<Filter
				filterField="discount"
				options={[
					{ value: "all", label: `${totalCount} All Items` },

					{ value: "no-discount", label: "No discount" },
					{ value: "with-discount", label: "With discount" },
					{
						value: "rating-greater-three",
						label: (
							<>
								<Typography variant="h5">
									Rating <ArrowUpwardIcon /> 3
								</Typography>
							</>
						),
					},
				]}
			/>
			<SortBy
				options={[
					{ value: "name-asc", label: "Sort by name (A-Z)" },
					{ value: "name-desc", label: "Sort by name (Z-A)" },
					{ value: "price-asc", label: "Sort by Price (lower first)" },
					{ value: "price-desc", label: "Sort by Price (high first)" },
					{ value: "duration-asc", label: "Sort by Duration (lower first)" },
					{ value: "duration-desc", label: "Sort by Duration (high first)" },
					{
						value: "maxGroupSize-asc",
						label: "Sort by GroupSize (lower first)",
					},
					{
						value: "maxGroupSize-desc",
						label: "Sort by GroupSize (high first)",
					},
				]}
			/>
		</TableOperations>
	);
};

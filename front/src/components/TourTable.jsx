import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getTours } from "../api/NatoursAPI";
import Spinner from "../ui/Spinner";
import Table from "react-bootstrap/Table";
import Heading from "../ui/Heading";
import TourList from "./TourList";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useSearchParams } from "react-router-dom";
import useTours from "./auth/useTours";
import Pagination from "../ui/Pagination";
const TourTable = () => {
	const [searchParams] = useSearchParams();

	// const [pageNumber, setPageNumber] = useState(1);

	const page = parseInt(searchParams.get("page")) || 1;

	const { isLoading, tourData, totalCount } = useTours(page);
	// console.log(tourData?.data);
	let tours = tourData?.data;
	// console.log(tours);
	// console.log(totalCount);
	// Extract the 'page' parameter from the query string

	if (isLoading) {
		return <Spinner />;
	}

	// 1 Filter
	const filterValue = searchParams.get("discount") || "all";
	// console.log(filterValue);
	let filterdTours;
	if (filterValue === "all") {
		filterdTours = tours;
	}
	if (filterValue === "no-discount") {
		filterdTours = tours.filter((tour) => tour.priceDiscount === 0);
	}
	if (filterValue === "with-discount") {
		filterdTours = tours.filter((tour) => tour.priceDiscount > 0);
	}
	if (filterValue === "rating-greater-three") {
		filterdTours = tours.filter((tour) => tour.ratingsAverage > 3);
	}

	// console.log(tours);

	// 2 Sort
	const sortBy = searchParams.get("sortBy") || "createdAt-asc";
	const [field, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;

	const sortedTours = filterdTours.sort(
		(a, b) => (a[field] - b[field]) * modifier
	);

	// console.log(sortedTours);
	// console.log(field, direction);
	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Product Name</th>
						<th>duration</th>
						<th>Difficulty</th>
						<th>Price</th>
						<th>Discount</th>

						<th>Ratings Average</th>
						<th>max Group Size</th>
					</tr>
				</thead>
				<tbody>
					{/* {filterdTours?.map((tour) => (
						<TourList tour={tour} key={tour._id} />
					))} */}
					{sortedTours?.map((tour) => (
						<TourList tour={tour} key={tour._id} />
					))}
				</tbody>
			</Table>

			<Pagination count={totalCount} />
			{/* <button
				onClick={() => setPageNumber((page) => page - 1)}
				disabled={pageNumber === 1}
			>
				prev
			</button>
			<button
				onClick={() => setPageNumber((page) => page + 1)}
				disabled={pageNumber === 4}
			>
				Next
			</button> */}
		</>
	);
};

export default TourTable;

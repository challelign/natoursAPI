import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getTours } from "../api/NatoursAPI";
import Spinner from "../ui/Spinner";
import Table from "react-bootstrap/Table";
import Heading from "../ui/Heading";
import TourList from "./TourList";
const TourTable = () => {
	const {
		isLoading,
		isError,
		data: products,
		status,
		error,
	} = useQuery({
		queryKey: ["tours"],
		queryFn: getTours,
	});

	if (isLoading) {
		return <Spinner />;
	}

	// console.log(products.data);
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
						<th>Ratings Average</th>
					</tr>
				</thead>
				<tbody>
					{products?.map((product) => (
						<TourList product={product} key={product._id} />
					))}
				</tbody>
			</Table>
		</>
	);
};

export default TourTable;

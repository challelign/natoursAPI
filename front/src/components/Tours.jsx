import React, { useState } from "react";
import Heading from "../ui/Heading";
import TourTable from "./TourTable";
import Button from "react-bootstrap/esm/Button";
import ToursForm from "../ui/ToursForm";

const Tours = () => {
	const [showForm, setShowForm] = useState(false);
	return (
		<>
			<div>
				<Heading as="h1">All Tours</Heading>
				<p>Filter / Sort</p>
			</div>

			<TourTable />

			<Button
				style={{ fontWeight: "bold", fontSize: "16px" }}
				variant="primary"
				onClick={() => setShowForm((sw) => !sw)}
			>
				Create New Tours
			</Button>
			{showForm && <ToursForm />}
		</>
	);
};

export default Tours;

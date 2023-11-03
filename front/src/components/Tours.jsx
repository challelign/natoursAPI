import React, { useState } from "react";
import Heading from "../ui/Heading";
import TourTable from "./TourTable";
import Button from "react-bootstrap/esm/Button";
import ToursForm from "../ui/ToursForm";
import Row from "../ui/Row";
import { TourTableOperations } from "./TourTableOperations";
import useTours from "./auth/useTours";

const Tours = () => {
	const [showForm, setShowForm] = useState(false);
	// const { tours } = useTours();
	const { isLoading, tourData, totalCount } = useTours();

	return (
		<>
			<Row type="horizontal">
				<Heading as="h2">All Tours</Heading>
				<TourTableOperations totalCount={totalCount} />
			</Row>

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

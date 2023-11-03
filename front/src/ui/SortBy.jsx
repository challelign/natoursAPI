import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	// to set the active tab
	const sortBy = searchParams.get("sortBy") || "";
	const handleChange = (e) => {
		// console.log(e.target.value);
		searchParams.set("sortBy", e.target.value);
		setSearchParams(searchParams);
	};
	return (
		<Select
			options={options}
			type="white"
			value={sortBy}
			onChange={handleChange}
		/>
	);
};

export default SortBy;

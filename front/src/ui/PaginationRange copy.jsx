import {
	HiChevronLeft,
	HiChevronRight,
	HiChevronDoubleLeft,
	HiChevronDoubleRight,
} from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
// import { PAGE_SIZE } from "../utils/constants";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const StyledPagination = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const P = styled.p`
	font-size: 1.4rem;
	margin-left: 0.8rem;

	& span {
		font-weight: 600;
	}
`;

const Buttons = styled.div`
	display: flex;
	gap: 0.6rem;
`;

const PaginationButton = styled.button`
	background-color: ${(props) =>
		props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
	color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	padding: 0.6rem 1.2rem;
	transition: all 0.3s;

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}

	& svg {
		height: 1.8rem;
		width: 1.8rem;
	}

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;
const PAGE_SIZE = 6;
const count = 100;
function PaginationRange({ count }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = !searchParams.get("page")
		? 1
		: Number(searchParams.get("page"));

	const pageCount = Math.ceil(count / PAGE_SIZE);

	function nextPage() {
		const next = currentPage === pageCount ? currentPage : currentPage + 1;

		searchParams.set("page", next);
		setSearchParams(searchParams);
	}

	function prevPage() {
		const prev = currentPage === 1 ? currentPage : currentPage - 1;

		searchParams.set("page", prev);
		setSearchParams(searchParams);
	}
	function firstPage() {
		searchParams.set("page", 1);
		setSearchParams(searchParams);
	}

	function lastPage() {
		searchParams.set("page", pageCount);
		setSearchParams(searchParams);
	}
	function goToPage(currentPage) {
		console.log(currentPage);
		searchParams.set("page", currentPage);
		setSearchParams(searchParams);
	}

	const handleChange = (event, value) => {
		event.preventDefault();
		if (value <= pageCount && value > 0) {
			// console.log(event);
			console.log(value);
			searchParams.set("page", value);
			setSearchParams(searchParams);
		}
	};
	// Generate an array of page numbers

	if (pageCount <= 1) return null;

	return (
		<StyledPagination>
			<P>
				current page is <span>{currentPage}</span> showing{" "}
				<span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
				<span>
					{currentPage === pageCount ? count : currentPage * PAGE_SIZE}
				</span>{" "}
				of <span>{count}</span> results
			</P>

			<Buttons>
				{/* <PaginationButton onClick={firstPage} disabled={currentPage === 1}>
					<HiChevronDoubleLeft />
					<span>First</span>
				</PaginationButton>
				<PaginationButton onClick={prevPage} disabled={currentPage === 1}>
					<HiChevronLeft /> <span>Previous</span>
				</PaginationButton>
				<PaginationButton
					onClick={nextPage}
					disabled={currentPage === pageCount}
				>
					<span>Next</span>
					<HiChevronRight />
				</PaginationButton>
				<PaginationButton
					onClick={lastPage}
					disabled={currentPage === pageCount}
				>
					<span>Last</span>
					<HiChevronDoubleRight />
				</PaginationButton>
				 */}
				<PaginationButton onClick={firstPage} disabled={currentPage === 1}>
					<HiChevronDoubleLeft />
					<span>First</span>
				</PaginationButton>

				<Pagination
					count={pageCount}
					page={currentPage}
					onChange={handleChange}
					renderItem={(item) => (
						<PaginationItem
							{...item}
							disabled={item.page === currentPage} // Disable the active button
						/>
					)}
					sx={{
						".MuiPagination-root": {
							backgroundColor: "#f5f5f5",
						},
						".MuiPagination-button": {
							padding: "8px 12px",
						},
						".css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root": {
							fontSize: "16px",
						},

						".MuiPaginationItem-circular": {
							color: "#4f46e5",
						},
						".MuiPaginationItem-page": {
							"&.Mui-selected.Mui-disabled": {
								pointerEvents: "none",
								// opacity: 0.5,
								color: "white",
								backgroundColor: "#4f46e5", // Set the color to red
							},
						},
						".css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
							{
								backgroundColor: "#4f46e5",
								fontSize: "16px",
								color: "white",
							},
						".css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root:hover": {
							backgroundColor: "#4f46e5",
							color: "white",
							cursor: "pointer",
						},
					}}
				/>

				<PaginationButton
					onClick={lastPage}
					disabled={currentPage === pageCount}
				>
					<span>Last</span>
					<HiChevronDoubleRight />
				</PaginationButton>
			</Buttons>
		</StyledPagination>
	);
}

export default PaginationRange;

import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState } from "react";
import Grid from "@mui/system/Unstable_Grid/Grid";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	font-size: 2.4rem;
	gap: 0.4rem;
	font-weight: 500;
`;

const FilterButton = styled.button`
	background-color: var(--color-grey-0);
	border: none;

	${(props) =>
		props.active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 2.4rem;
	/* To give the same height as select */
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

function FilterChalie({ filterOptions, onChange }) {
	return (
		<>
			{/* {filterOptions?.map((genre) => (
				<div key={genre}>
					<input type="checkbox" value={genre.value} onChange={onChange} />
					<p>{genre.value}</p>
				</div>
			))} */}
			<StyledFilter>
				{filterOptions?.map((genre) => (
					<FormControlLabel
						control={<Checkbox value={genre.value} onChange={onChange} />}
						label={genre.value}
					/>
				))}
			</StyledFilter>
		</>
	);
}

export default FilterChalie;

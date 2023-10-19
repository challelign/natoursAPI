// import styled from "styled-components";

// import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Header";

function PageNotFound() {
	// const moveBack = useMoveBack();

	return (
		<>
			<Heading as="h1">
				The page you are looking for could not be found 😢
			</Heading>
			{/* <button onClick={moveBack} size="large">
					&larr; Go back
				</button> */}
		</>
	);
}

export default PageNotFound;

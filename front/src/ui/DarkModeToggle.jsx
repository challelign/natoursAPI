import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
	const { isDarkMode, toggleDarkMode } = useDarkMode();

	return (
		<ButtonIcon onClick={toggleDarkMode}>
			{isDarkMode ? <DarkModeOutlinedIcon /> : <LightModeIcon />}
		</ButtonIcon>
	);
}

export default DarkModeToggle;

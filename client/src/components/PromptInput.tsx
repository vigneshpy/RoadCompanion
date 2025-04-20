import {
	Box,
	Typography,
	TextField,
	Button,
	CircularProgress,
	Alert,
	AlertTitle,
	IconButton,
	Tooltip,
} from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import useTripStore from "../store/tripStore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { memo, useMemo, useState } from "react";

// Custom MUI theme with biking aesthetic
const theme = createTheme({
	palette: {
		primary: {
			main: "#facc15", // Biking yellow
		},
		secondary: {
			main: "#1f2937", // Dark gray
		},
		error: {
			main: "#b91c1c", // Red for errors
		},
		text: {
			primary: "#ffffff",
			secondary: "#d1d5db",
		},
		background: {
			default: "#111827",
		},
	},
	typography: {
		fontFamily: "'Bebas Neue', 'Montserrat', 'Inter', sans-serif",
		h2: {
			fontWeight: 900,
			textTransform: "uppercase",
			color: "#facc15",
			letterSpacing: "0.05em",
		},
		body1: {
			color: "#e5e7eb",
			fontSize: "1.1rem",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: "24px",
					textTransform: "none",
					fontWeight: 600,
					border: "2px solid #000",
					padding: "8px 20px",
					transition: "transform 0.2s, box-shadow 0.2s",
					"&:hover": {
						transform: "scale(1.05)",
						boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
						backgroundColor: "#facc15",
						color: "#000",
					},
					"&:disabled": {
						opacity: 0.6,
						borderColor: "#4b5563",
					},
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						backgroundColor: "#1f2937",
						color: "#ffffff",
						borderRadius: "12px",
						"& fieldset": {
							borderColor: "#4b5563",
						},
						"&:hover fieldset": {
							borderColor: "#facc15",
						},
						"&.Mui-focused fieldset": {
							borderColor: "#facc15",
							boxShadow: "0 0 0 3px rgba(250, 204, 21, 0.3)",
						},
					},
					"& .MuiInputLabel-root": {
						color: "#d1d5db",
						fontWeight: 500,
					},
					"& .MuiInputLabel-root.Mui-focused": {
						color: "#facc15",
					},
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					borderRadius: "8px",
					padding: "12px",
					alignItems: "center",
				},
			},
		},
	},
});

const PromptInput = () => {
	const { tripPrompt, setTripPrompt, planTripFromPrompt, isLoading, error } =
		useTripStore();
	const [showError, setShowError] = useState(!!error);

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		setShowError(false);
		planTripFromPrompt();
	};

	// Handle clear input
	const handleClear = () => {
		setTripPrompt("");
		setShowError(false);
	};

	// Memoize theme to prevent re-creation
	const memoizedTheme = useMemo(() => theme, []);

	// Character counter
	const maxChars = 500;
	const charCount = tripPrompt.length;
	/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */ return (
		<ThemeProvider theme={memoizedTheme}>
			<Box
				sx={{
					background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
					border: "1px solid #374151",
					borderRadius: "12px",
					padding: { xs: "24px", md: "40px" },
					marginBottom: "40px",
					boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
					position: "relative",
					overflow: "hidden",
					"&:before": {
						content: '""',
						position: "absolute",
						inset: 0,
						backgroundImage:
							'url("https://www.transparenttextures.com/patterns/dark-tire.png")',
						opacity: 0.15,
						zIndex: 1,
					},
				}}
			>
				{/* Header Section */}
				<Box display="flex" alignItems="center" mb={3} sx={{ zIndex: 2 }}>
					<Typography
						variant="h2"
						sx={{ display: "flex", alignItems: "center" }}
					>
						<DirectionsBikeIcon
							sx={{
								fontSize: "1.5rem",
								marginRight: "12px",
								color: "#facc15",
								transition: "transform 0.3s ease",
								"&:hover": {
									transform: "rotate(360deg)",
								},
							}}
							aria-hidden="true"
						/>
						Bike Trip Planner
					</Typography>
				</Box>

				{/* Instruction Text */}
				<Typography variant="body1" mb={4} sx={{ zIndex: 2 }}>
					Craft your perfect bike adventure! Try something like:{" "}
					<Box component="span" sx={{ fontStyle: "italic", color: "#facc15" }}>
						"Plan a mountain bike ride from Denver to Moab with rugged trails,
						max 50 km/day."
					</Box>
				</Typography>

				{/* Prompt Suggestions */}
				<Box display="flex" flexWrap="wrap" gap={1.5} mb={4} sx={{ zIndex: 2 }}>
					<Tooltip title="Explore rugged trails in the Rockies" placement="top">
						<Button
							variant="contained"
							color="secondary"
							size="small"
							onClick={() =>
								setTripPrompt(
									"Plan a mountain bike trip through the Rockies with rugged trails, max 50 km/day."
								)
							}
							sx={{
								borderRadius: "12px",
								fontWeight: 600,
								transition: "all 0.3s ease",
								"&:hover": {
									backgroundColor: "#facc15",
									color: "#000",
									transform: "translateY(-2px)",
								},
							}}
							aria-label="Select mountain bike adventure prompt"
						>
							Mountain Adventure
						</Button>
					</Tooltip>
					<Tooltip title="Ride along scenic coastal roads" placement="top">
						<Button
							variant="contained"
							color="secondary"
							size="small"
							onClick={() =>
								setTripPrompt(
									"Plan a road bike trip from Seattle to Portland, max 100 km/day, with coastal views."
								)
							}
							sx={{
								borderRadius: "12px",
								fontWeight: 600,
								transition: "all 0.3s ease",
								"&:hover": {
									backgroundColor: "#facc15",
									color: "#000",
									transform: "translateY(-2px)",
								},
							}}
							aria-label="Select coastal road trip prompt"
						>
							Coastal Cruise
						</Button>
					</Tooltip>
				</Box>

				{/* Form for Trip Planning */}
				<Box component="form" onSubmit={handleSubmit} sx={{ zIndex: 2 }}>
					<Box mb={3}>
						{/* Trip Description Textarea */}
						<TextField
							fullWidth
							multiline
							rows={5}
							value={tripPrompt}
							onChange={(e) => setTripPrompt(e.target.value)}
							placeholder="Describe your bike trip, e.g., 'Ride from San Francisco to Los Angeles along coastal trails, max 100 km/day, with camping spots.'"
							required
							sx={{
								"& .MuiInputBase-input::placeholder": {
									color: "#9ca3af",
									opacity: 1,
								},
							}}
						/>
						<Typography
							variant="caption"
							sx={{
								color: charCount > maxChars * 0.9 ? "#b91c1c" : "#d1d5db",
								mt: 1,
								display: "block",
								textAlign: "right",
							}}
						>
							{charCount}/{maxChars} characters
						</Typography>
					</Box>

					{/* Action Buttons */}
					<Box display="flex" gap={2}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={isLoading || !tripPrompt.trim()}
							fullWidth
							startIcon={
								isLoading ? (
									<CircularProgress
										size={18}
										sx={{ color: "#000", marginRight: "8px" }}
										aria-hidden="true"
									/>
								) : (
									<DirectionsBikeIcon
										sx={{
											fontSize: "1.2rem",
											color: "#000",
											transition: "transform 0.3s ease",
											"&:hover": {
												transform: "rotate(360deg)",
											},
										}}
										aria-hidden="true"
									/>
								)
							}
							sx={{
								flex: 1,
								padding: "12px",
								fontSize: "1.1rem",
							}}
							aria-label={
								isLoading ? "Planning your bike trip" : "Plan my bike trip"
							}
						>
							{isLoading ? "Planning Your Ride..." : "Plan My Ride"}
						</Button>
						<Button
							variant="outlined"
							color="secondary"
							onClick={handleClear}
							disabled={isLoading || !tripPrompt}
							sx={{
								flex: 0.5,
								borderColor: "#facc15",
								color: "#facc15",
								"&:hover": {
									borderColor: "#ffffff",
									color: "white",
								},
							}}
							aria-label="Clear trip description"
						>
							Clear
						</Button>
					</Box>
				</Box>

				{/* Error Message */}
				{showError && error && (
					<Alert
						severity="error"
						icon={
							<WarningIcon
								sx={{ fontSize: "1.25rem", color: "#b91c1c" }}
								aria-hidden="true"
							/>
						}
						sx={{
							mt: 3,
							backgroundColor: "#7f1d1d",
							color: "#ffffff",
							borderLeft: "4px solid #b91c1c",
							borderRadius: "8px",
							zIndex: 2,
							position: "relative",
						}}
						action={
							<IconButton
								aria-label="Dismiss error message"
								color="inherit"
								size="small"
								onClick={() => setShowError(false)}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
					>
						<AlertTitle sx={{ display: "none" }}>Error</AlertTitle>
						{error || "Something went wrong. Please try again."}
					</Alert>
				)}
			</Box>
		</ThemeProvider>
	);
};

export default memo(PromptInput);

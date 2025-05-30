import {
	Box,
	Typography,
	TextField,
	Button,
	CircularProgress,
	Tooltip,
} from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { memo, useMemo, useState } from "react";

// Custom MUI theme with biking aesthetic - moved before component
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

interface TripDetails {
	tripPrompt: string;
	isLoading: boolean;
	isError?: boolean;
}

const PromptInput = () => {
	const memoizedTheme = useMemo(() => theme, []);
	const [tripDetails, setTripDetails] = useState<TripDetails>({
		tripPrompt: '',
		isLoading: false,
		isError: false
	});

	const handleChange = (prompt: string) => {
		setTripDetails(prev => ({
			...prev,
			tripPrompt: prompt
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Add your submit logic here
		console.log("Submitting trip:", tripDetails.tripPrompt);
	};

	const handleClear = () => {
		setTripDetails(prev => ({
			...prev,
			tripPrompt: ''
		}));
	};

	// Character counter
	const maxChars = 500;
	const charCount = tripDetails.tripPrompt.length;

	return (
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
					backgroundImage:
						'url("https://www.transparenttextures.com/patterns/dark-tire.png")',
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
						Trip Planner
					</Typography>
				</Box>

				{/* Instruction Text */}
				<Typography variant="body1" mb={4} sx={{ zIndex: 2 }}>
					Craft your perfect adventure! Try something like:{" "}
					<Box component="span" sx={{ fontStyle: "italic", color: "#facc15" }}>
						"Plan a bike ride from Chennai to Sivakasi with hour break"
					</Box>
				</Typography>

				{/* Prompt Suggestions */}
				<Box display="flex" flexWrap="wrap" gap={1.5} mb={4} sx={{ zIndex: 2 }}>
					<Tooltip title="Explore rugged trails in the Rockies" placement="top">
						<Button
							variant="contained"
							color="secondary"
							size="small"
							onClick={() => handleChange("Plan a bike trip from chennai to sivakasi take a break for every 3 hour")}
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
							Bike Trip
						</Button>
					</Tooltip>
					<Tooltip title="Ride along scenic coastal roads" placement="top">
						<Button
							variant="contained"
							color="secondary"
							size="small"
							onClick={() =>
								handleChange(
									"Plan a car trip from chennai to goa take a break at tea shop for every 3 hour"
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
							Car Trip
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
							value={tripDetails.tripPrompt}
							onChange={(e) => handleChange(e.target.value)}
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
							disabled={tripDetails.isLoading || !tripDetails.tripPrompt.trim()}
							fullWidth
							startIcon={
								tripDetails.isLoading ? (
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
								tripDetails.isLoading ? "Planning your bike trip" : "Plan my bike trip"
							}
						>
							{tripDetails.isLoading ? "Planning Your Ride..." : "Plan My Ride"}
						</Button>
						<Button
							variant="outlined"
							color="secondary"
							onClick={handleClear}
							disabled={tripDetails.isLoading || !tripDetails.tripPrompt}
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
			</Box>
		</ThemeProvider>
	);
};

export default memo(PromptInput);
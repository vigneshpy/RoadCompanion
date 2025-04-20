import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PromptInput from "./components/PromptInput";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./index.css";
import { Box, Typography, Grid, Container } from "@mui/material";

// Custom MUI theme for biking aesthetic (same as PromptInput)
const theme = createTheme({
	palette: {
		primary: {
			main: "#facc15", // Biking yellow
		},
		secondary: {
			main: "#1f2937", // Dark gray for backgrounds
		},
		error: {
			main: "#b91c1c", // Red for errors
		},
		text: {
			primary: "#ffffff",
			secondary: "#d1d5db",
		},
	},
	typography: {
		fontFamily: "'Montserrat', 'Inter', sans-serif",
		h1: {
			fontWeight: 800,
			textTransform: "uppercase",
			color: "#facc15",
			fontSize: "2.5rem",
		},
		body1: {
			color: "#d1d5db",
		},
		caption: {
			color: "#9ca3af",
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					minHeight: "100vh",
					backgroundColor: "#111827",
					color: "#ffffff",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
					{/* Header Section */}
					<Box
						component="header"
						sx={{
							mb: 4,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: 2,
						}}
						aria-label="AI Bike Trip Planner Header"
					>
						<DirectionsBikeIcon
							sx={{
								fontSize: "2rem", // Smaller than original h-10 w-10
								color: "#facc15",
								animation: "spin-slow 10s linear infinite",
								transition: "transform 0.2s",
								"&:hover": {
									transform: "rotate(12deg)",
								},
							}}
							aria-hidden="true"
						/>
						<Box textAlign="center">
							<Typography variant="h1">AI Bike Trip Planner</Typography>
							<Typography
								variant="body1"
								sx={{ mt: 1, fontStyle: "italic", fontWeight: 300 }}
							>
								Plan your ultimate biking adventure with AI-powered precision
							</Typography>
						</Box>
					</Box>

					<PromptInput />

					<Box
						component="footer"
						sx={{ mt: 6, textAlign: "center" }}
						aria-label="Footer"
					>
						<Typography variant="caption" component="p">
							© 2025 AI Bike Trip Planner. All rights reserved.
						</Typography>
					</Box>
				</Container>
			</Box>
		</ThemeProvider>
	);
}

export default App;

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { create } from "zustand";
import api from "../services/api";

const useTripStore = create(
	(
		set: (arg0: {
			tripPrompt?: any;
			startLocation?: any;
			endLocation?: any;
			riderSpeed?: any;
			hoursPerDay?: any;
			stopInterval?: any;
			error?: any;
			isLoading?: boolean;
			route?: any;
			stops?: any;
			weather?: any;
			tripDays?: any;
		}) => void,
		get: () => {
			(): any;
			new (): any;
			riderSpeed?: any;
			hoursPerDay?: any;
			tripPrompt?: any;
			startLocation?: any;
			endLocation?: any;
			stopInterval?: any;
		}
	) => ({
		// User input state
		tripPrompt: "",
		startLocation: "",
		endLocation: "",
		riderSpeed: 20, // Default speed in km/h
		hoursPerDay: 4, // Default riding hours per day
		stopInterval: 10, // Default stop interval in km

		// Trip planning results
		route: null,
		stops: [],
		weather: null,
		tripDays: 1, // Number of days needed for the trip

		// UI state
		isLoading: false,
		error: null,

		// Form input handlers
		setTripPrompt: (prompt: unknown) => set({ tripPrompt: prompt }),
		setStartLocation: (startLocation: unknown) => set({ startLocation }),
		setEndLocation: (endLocation: unknown) => set({ endLocation }),
		setRiderSpeed: (riderSpeed: unknown) => set({ riderSpeed }),
		setHoursPerDay: (hoursPerDay: unknown) => set({ hoursPerDay }),
		setStopInterval: (stopInterval: unknown) => set({ stopInterval }),

		// Main trip planning actions
		planTripFromPrompt: async () => {
			const { tripPrompt } = get();

			if (!tripPrompt.trim()) {
				set({ error: "Please enter a trip prompt" });
				return;
			}

			try {
				set({ isLoading: true, error: null });

				const serverResponse = await api.post("/plan-trip", {
					prompt: tripPrompt,
				});

				// The server returns the trip plan in a 'response' field.
				const tripData = serverResponse.data.response;

				set({
					route: tripData.route,
					stops: tripData.stops,
					weather: tripData.weather,
					tripDays: tripData.tripDays,
					// Also update the form fields with extracted data
					startLocation: tripData.startLocation,
					endLocation: tripData.endLocation,
					riderSpeed: tripData.riderSpeed || get().riderSpeed,
					hoursPerDay: tripData.hoursPerDay || get().hoursPerDay,
					isLoading: false,
				});
			} catch (error) {
				set({
					error: error.response?.data?.message || "Failed to plan trip",
					isLoading: false,
				});
			}
		},

		// Reset all form inputs and results
		resetTrip: () =>
			set({
				tripPrompt: "",
				startLocation: "",
				endLocation: "",
				riderSpeed: 20,
				hoursPerDay: 4,
				stopInterval: 10,
				route: null,
				stops: [],
				weather: null,
				tripDays: 1,
				error: null,
			}),
	})
);

export default useTripStore;

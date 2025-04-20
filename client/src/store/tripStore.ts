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

				const response = await api.post("/trips/plan-from-prompt", {
					prompt: tripPrompt,
				});

				set({
					route: response.data.route,
					stops: response.data.stops,
					weather: response.data.weather,
					tripDays: response.data.tripDays,
					// Also update the form fields with extracted data
					startLocation: response.data.startLocation,
					endLocation: response.data.endLocation,
					riderSpeed: response.data.riderSpeed || get().riderSpeed,
					hoursPerDay: response.data.hoursPerDay || get().hoursPerDay,
					isLoading: false,
				});
			} catch (error) {
				set({
					error: error.response?.data?.message || "Failed to plan trip",
					isLoading: false,
				});
			}
		},

		planTripFromForm: async () => {
			const {
				startLocation,
				endLocation,
				riderSpeed,
				hoursPerDay,
				stopInterval,
			} = get();

			if (!startLocation || !endLocation) {
				set({ error: "Please enter both start and end locations" });
				return;
			}

			try {
				set({ isLoading: true, error: null });

				const response = await api.post("/trips/plan", {
					startLocation,
					endLocation,
					riderSpeed,
					hoursPerDay,
					stopInterval,
				});

				set({
					route: response.data.route,
					stops: response.data.stops,
					weather: response.data.weather,
					tripDays: response.data.tripDays,
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

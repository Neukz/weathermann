import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Units } from './units';
import axios, { AxiosError } from 'axios';
import dayjs from '../../utils/dayjs';
import { timeOfDay } from '../../constants/timeOfDay';

// Responses from OpenWeatherMap API
interface CurrentWeather {
	weather: {
		main: string;
		description: string;
		icon: string;
	}[];
	main: {
		temp: number;
		feels_like: number;
		pressure: number;
		humidity: number;
	};
	visibility: number;
	wind: {
		speed: number;
	};
	rain: {
		'1h': number;
	};
	snow: {
		'1h': number;
	};
	dt: number;
	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	name: string;
}

interface Air {
	list: [
		{
			main: {
				aqi: number;
			};
			components: {
				co: number;
				no: number;
				no2: number;
				o3: number;
				so2: number;
				pm2_5: number;
				pm10: number;
				nh3: number;
			};
		}
	];
}

interface Forecast {
	list: [
		{
			main: CurrentWeather['main'];
			weather: CurrentWeather['weather'];
			dt_txt: string;
		}
	];
}

// Forecast data grouped by day
interface GroupedForecast {
	[key: string]: [
		{
			name: 'night' | 'morning' | 'afternoon' | 'evening';
			data: Forecast['list'][0];
		}
	];
}

// Response from proxy server
interface Response {
	current: CurrentWeather;
	forecast: Forecast;
	air: Air;
}

interface ResponseError {
	message: string;
}

interface WeatherState {
	data: {
		current: CurrentWeather;
		forecast: GroupedForecast;
		air: Air;
	} | null;
	error: string | null;
	loading: boolean;
}

export const fetchWeather = createAsyncThunk<
	Response,
	{
		position: google.maps.LatLngLiteral;
		units: Units;
	},
	{
		rejectValue: ResponseError;
	}
>('weather/fetchWeather', async ({ position, units }, { rejectWithValue }) => {
	try {
		const res = await axios.get(
			import.meta.env.VITE_API_URL + '/weathermann/weather',
			{
				params: {
					lat: position.lat,
					lon: position.lng,
					units
				}
			}
		);

		return res.data;
	} catch (err) {
		let error: AxiosError<ResponseError> = err;
		if (!error.response) {
			throw err;
		}

		return rejectWithValue(error.response.data);
	}
});

const initialState: WeatherState = {
	data: null,
	error: null,
	loading: false
};

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		clearWeather: state => {
			state.data = null;
		},
		clearError: state => {
			state.error = null;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchWeather.pending, state => {
			state.loading = true;
		});
		builder.addCase(
			fetchWeather.fulfilled,
			(state, action: PayloadAction<Response>) => {
				state.loading = false;
				// Group forecast data by day and leave only forecasts for night, morning, afternoon and evening
				const groupedForecast = action.payload.forecast.list.reduce(
					(acc, curr) => {
						const date = dayjs(curr.dt_txt).format('YYYY-MM-DD');
						if (!acc[date]) {
							// @ts-ignore
							acc[date] = [];
						}
						const name = timeOfDay.get(dayjs(curr.dt_txt).format('HH'));
						if (name) {
							acc[date].push({ name, data: curr });
						}
						return acc;
					},
					{} as GroupedForecast
				);
				state.data = {
					current: action.payload.current,
					forecast: groupedForecast,
					air: action.payload.air
				};
				state.error = null;
			}
		);
		builder.addCase(fetchWeather.rejected, (state, action) => {
			state.loading = false;
			if (action.payload) {
				state.error = action.payload.message;
			} else {
				state.error = action.error.message || 'Something went wrong';
			}
		});
	}
});

export const { clearWeather, clearError } = weatherSlice.actions;

export const selectWeather = (state: RootState) => state.weather;

export default weatherSlice.reducer;

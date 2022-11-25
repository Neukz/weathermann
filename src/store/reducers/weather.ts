import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Position } from './position';
import { Units } from './units';
import axios, { AxiosError } from 'axios';

// Response schema from OpenWeatherMap API
interface Response {
	coord: {
		lon: number;
		lat: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level: number;
		grnd_level: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	clouds: {
		all: number;
	};
	rain: {
		'1h': number;
		'3h': number;
	};
	snow: {
		'1h': number;
		'3h': number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

interface ResponseError {
	message: string;
}

interface WeatherState {
	data: Response | null;
	error: string | null;
	loading: boolean;
}

export const fetchWeather = createAsyncThunk<
	Response,
	{
		position: Position;
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
				state.data = action.payload;
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

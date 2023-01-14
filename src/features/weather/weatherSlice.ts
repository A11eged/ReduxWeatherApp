import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

type WeatherDataResult = {
  latitude: number;
  longitude: number;
  timezone: string;
};

const initialState: WeatherState = {
  value: '',
  status: 'idle',
};

export interface WeatherState {
  value: '';
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
}

export interface Data {
  cod: string;
  message: number;
  cnt: number;
}

const key = '349e04d6f4944a636e2961a34170d94c';

// export const fetchWeather = createAsyncThunk(
//   'weather/fetchWeather',
//   async ({ lat, lon, key }) => {
//     const response = await fetch(
//       `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&id=524901&appid=${key}`
//     );
//     const data = await response.json();
//     return data;
//   }
// );
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (latitude: number, longitude: number, key: string) => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`
    );
    return (await response.json()) as Data;
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    weatherData: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    searchCriteria: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { weatherData, searchCriteria } = weatherSlice.actions;

export const selectWeather = (state: RootState) => state.weather.value;

export default weatherSlice.reducer;

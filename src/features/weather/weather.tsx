import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectWeather, fetchWeather } from './weatherSlice';

export function Weather() {
  const weather = useAppSelector(selectWeather);
  const dispatch = useAppDispatch();
  // 42.3601° N, 71.0589° W

  return (
    <div>
      <div>
        <button
          onClick={() =>
            dispatch(
              fetchWeather({
                lat: 40.73061,
                lon: -73.935242,
                apikey: '349e04d6f4944a636e2961a34170d94c',
              })
            )
          }
        >
          Get Weather
        </button>
      </div>
      <div>
        <p>{weather}</p>
      </div>
    </div>
  );
}

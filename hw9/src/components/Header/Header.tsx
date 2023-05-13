import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WeatherInfo } from "../../interfaces/Weather";
import "./Header.css";
import React from "react";
import { updateWeather } from "../../redux/weatherSlice";
import { RootState } from "../../redux/reducers";
import { config } from "../../config";

export default function Header() {
  const dispatch = useDispatch();
  const weather = useSelector((state: RootState) => state.weather);

  async function loadWeather() {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${config.apiKey}&q=Tbilisi&aqi=yes`
      );
      if (response.ok) {
        const data: WeatherInfo = await response.json();
        const { location, current } = data;
        const { name } = location;
        const { temp_c, condition } = current;
        const { icon } = condition;
        dispatch(updateWeather({ temp_c, icon, name }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadWeather();
  }, [dispatch]);

  return (
    <div className="header">
      <span className="header__title">To Do List</span>
      <div className="header__weather">
        {weather.data && (
          <>
            <img
              src={`http:${weather.data.icon}`}
              className="header__weather__img"
            />
            <div className="header__weather__temp">{`${weather.data.temp_c}\u00B0`}</div>
            <div className="header--weather__city">{weather.data.name}</div>
          </>
        )}
      </div>
    </div>
  );
}

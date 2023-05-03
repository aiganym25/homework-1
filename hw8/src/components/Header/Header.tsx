import { useCallback, useEffect, useState } from "react";
import { getTbilisiWeatherInfo } from "../../service/weather";
import { WeatherInfo } from "../../interfaces/Weather";
import "./Header.css";

export default function Header() {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({
    location: { name: "" },
    current: { temp_c: "", condition: { icon: "" } },
  });

  const fetchWeatherInfo = useCallback(() => {
    getTbilisiWeatherInfo()
      .then((data) => setWeatherInfo(data))
      .catch((err: Error) => console.log(err));
  }, []);

  useEffect(() => {
    fetchWeatherInfo();
  }, [fetchWeatherInfo]);

  return (
    <div className="header">
      <span className="header__title">To Do List</span>
      <div className="header__weather">
        <img
          src={`http:${weatherInfo.current.condition.icon}`}
          className="header__weather__img"
        />
        <div className="header__weather__temp">{`${weatherInfo.current.temp_c}\u00B0`}</div>
        <div className="header--weather__city">{`${weatherInfo.location.name}`}</div>
      </div>
    </div>
  );
}

import { WeatherInfo } from "../interfaces/Weather";

export const getTbilisiWeatherInfo = async (): Promise<any> => {
  try {
    const apiKey: string = "1a6debdafdde4b7d952200620231804";

    const response: Response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Tbilisi&aqi=yes`
    );
    const weatherInfo: WeatherInfo = await response.json();

    const { location, current } = weatherInfo;
    const { temp_c, condition } = current;
    const { icon } = condition;

    return { location, current: { temp_c, condition: { icon } } };
  } catch (error) {
    throw error;
  }
};
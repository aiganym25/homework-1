import '../main.css'

const apiKey = "1a6debdafdde4b7d952200620231804";

async function getTbilisiTemp(): Promise<any> {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Tbilisi&aqi=yes`
  );
  const weatherInfo = await response.json();
  return weatherInfo;
}

const weatherIcon = document.querySelector(
  ".container__header--right__img"
) as HTMLImageElement;
const temperature = document.querySelector(
  ".container__header--right__temp"
) as HTMLDivElement;
const city = document.querySelector(
  ".container__header--right__city"
) as HTMLDivElement;

export const renderWeather = () =>
  getTbilisiTemp().then(async (info: any) => {
    weatherIcon.src = `http:${info.current.condition.icon}`;
    temperature.textContent = `${info.current.temp_c}\u00B0`;
    city.textContent = info.location.name
  });

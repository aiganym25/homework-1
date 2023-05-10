export interface WeatherInfo {
    location: {
      name: string;
    };
    current: {
      temp_c: string;
      condition: {
        icon: string;
      };
    };
  }
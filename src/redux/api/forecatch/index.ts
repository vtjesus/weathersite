import { api as index } from "..";

type getResponse = {
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
      hour: {
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      }[];
    }[];
  };
};

type GetRequest = {
  query: string; 
  days: number; 
};

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getForecast: build.query<getResponse, GetRequest>({
      query: ({ query, days }) => ({
        url: `/forecast.json`,
        method: "GET",
        params: {
          key: import.meta.env.VITE_API_KEY, 
          q: query, 
          days, 
        },
      }),
      providesTags: ["forecast"], 
    }),
  }),
});

export const { useGetForecastQuery } = api; 

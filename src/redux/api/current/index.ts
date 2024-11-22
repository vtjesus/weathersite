import { api as index } from "..";

type GetResponse = {
  location: {
    name: string;
    region: string;
    tz_id: string;
  };
  current: {
    temp_c: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

type GetRequest = {
  query: string;
};

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getCurrentWeather: build.query<GetResponse, GetRequest>({
      query: ({ query }) => ({
        url: "/current.json",
        method: "GET",
        params: {
          key: import.meta.env.VITE_API_KEY,
          q: query,
        },
      }),
      providesTags: ["current"],
    }),
  }),
});

export const { useGetCurrentWeatherQuery } = api;

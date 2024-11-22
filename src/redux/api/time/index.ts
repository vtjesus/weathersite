import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getTimeZone: build.query({
      query: ({query}) => ({
        url: "/timezone.json",
        method: "GET",
        params: {
            key: import.meta.env.VITE_API_KEY,
            q: query,
          },
      }),
      providesTags: ["time"],
    }),
  }),
});

export const { useGetTimeZoneQuery } = api;

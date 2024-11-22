import { api as index } from "..";
type getResponse = {
  id?: string;
  name: string;
  region: string;
  country: string;
};
const api = index.injectEndpoints({
  endpoints: (build) => ({
    getSearch: build.query<getResponse[], string>({
      query: (query) => ({
        url: `/search.json`,
        method: "GET",
        params: {
          key: import.meta.env.VITE_API_KEY,
          q: query,
        },
      }),
      providesTags: ["search"],
    }),
  }),
});

export const { useGetSearchQuery } = api;

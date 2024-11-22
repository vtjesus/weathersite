import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  prepareHeaders: (headers) => {
    if (import.meta.env.VITE_API_KEY) {
      headers.set("Authorization", `Bearer ${import.meta.env.VITE_API_KEY}`);
    }
    return headers;
  },
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: ["search", "current", "time", "forecast"],
  endpoints: () => ({}),
});

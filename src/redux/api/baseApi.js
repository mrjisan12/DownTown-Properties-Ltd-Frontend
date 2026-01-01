import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://192.168.10.247:8000/api",
    baseUrl: "https://admin.downtown-bd.com/api",

    credentials: "include",
  }),
  tagTypes: ["HomeApi","ProjectApi"],
  endpoints: () => ({}),
});

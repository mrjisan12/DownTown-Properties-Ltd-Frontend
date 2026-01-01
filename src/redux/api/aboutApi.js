import { baseApi } from "./baseApi";

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: (id) => ({
        url: `/about`,
        method: "GET",
      }),
      providesTags: ["AboutApi"],
    }),
    getAllstaff: builder.query({
      query: () => ({
        url: "/staffs",
        method: "GET",
      }),
      providesTags: ["AboutApi"],
    }),
  }),
});

export const { useGetAboutQuery,useGetAllstaffQuery } = aboutApi;

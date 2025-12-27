import { baseApi } from "./baseApi";

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFooter: builder.query({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
      providesTags: ["HomeApi"],
    }),
    getHomeBanner: builder.query({
      query: () => ({
        url: "/home-banners",
        method: "GET",
      }),
      providesTags: ["HomeApi"],
    }),
    getMiniAbout: builder.query({
      query: () => ({
        url: "/home-sections",
        method: "GET",
      }),
      providesTags: ["HomeApi"],
    }),
  }),
});

export const { useGetFooterQuery,useGetHomeBannerQuery ,useGetMiniAboutQuery } = homeApi;

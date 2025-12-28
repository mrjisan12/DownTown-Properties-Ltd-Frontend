import { baseApi } from "./baseApi";

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
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

    getSocialLinks: builder.query({
      query: () => ({
        url: "/social-links",
        method: "GET",
      }),
      providesTags: ["HomeApi"],
    }),
    getHomeProjects: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["HomeApi"],
    }),

    getHomeMap: builder.query({
      query: () => ({
        url: "/home-map",
        method: "GET",
      }),
      providesTags: ["HomeApi"],
    }),

  }),
});

export const { useGetSettingsQuery, useGetHomeBannerQuery ,useGetMiniAboutQuery,useGetSocialLinksQuery, useGetHomeProjectsQuery, useGetHomeMapQuery } = homeApi;

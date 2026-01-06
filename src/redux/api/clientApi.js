import { baseApi } from "./baseApi";

export const testimonialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTestimonial: builder.query({
      query: () => ({
        url: "/testimonials",
        method: "GET",
      }),
      providesTags: ["AboutApi"],
    }),
  }),
});

export const { useGetAllTestimonialQuery } = testimonialApi;

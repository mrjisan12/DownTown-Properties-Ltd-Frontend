import CommonBanner from "@/components/commonBanner/commonBanner";
import React from "react";
import galleryImg from "../../assets/BannerImages/Gallery.jpeg";
import {
  useGetGalleryImageQuery,
  useGetGalleryVideoQuery,
} from "@/redux/api/galleryApi";
import HomeMiniAboutSkeleton from "@/components/skeletons/homeMiniAboutSkeleton";
import PhotoGallery from "./PhotoGallery/PhotoGallery";
import VideoGallery from "./VideoGalllery/VideoGallery";
import PhotoGallerySkeleton from "@/components/skeletons/PhotoGallerySkeleton";
import VideoGallerySkeleton from "@/components/skeletons/VideoGallerySkeleton";
const Gallery = () => {
  const { data: galleryImageData, isLoading: galleryImageLoading } =
    useGetGalleryImageQuery();
  const { data: galleryVideosData, isLoading: galleryVideosLoading } =
    useGetGalleryVideoQuery();
  console.log("galleryVideosData", galleryVideosData);

  return (
    <>
      <CommonBanner
        backgroundImage={galleryImg}
        subtitle="Gallery Section"
        title="Our Memory"
        highlight="Excellence"
      />
      {galleryImageLoading || !galleryImageData ? (
        <PhotoGallerySkeleton />
      ) : (
        <PhotoGallery images={galleryImageData?.data || []} />
      )}
      {galleryVideosLoading || !galleryVideosData ? (
        <VideoGallerySkeleton />
      ) : (
        <VideoGallery images={galleryVideosData?.data || []} />
      )}
    </>
  );
};

export default Gallery;

import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";


const TopRated = () => {

   
  const {data, loading} = useFetch(`/movie/top_rated`); //En Çok Oy Alan filmleri api ile çeker


  return (
    <div className="carouselSection"> {/*diziyi yatay döndüren slayt gösterisi*/}
      <ContentWrapper>
        <span className="carouselTitle">The Highest Rated Movies</span> {/*En Çok Oy Alan Filmler*/}
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  );
};

export default TopRated;

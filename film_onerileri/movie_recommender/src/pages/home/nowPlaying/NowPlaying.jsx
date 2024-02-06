import React, { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";


const NowPlaying = () => {

   
  const {data, loading} = useFetch(`/movie/now_playing`); //Şu Anda Sinemalarda Olan filmleri api ile çeker


  return (
    <div className="carouselSection"> {/*diziyi yatay döndüren slayt gösterisi*/}
      <ContentWrapper>
        <span className="carouselTitle">Now Playing Movies</span> {/*şuanda sinemada olan filmler */}
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  );
};

export default NowPlaying;

import React, { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";


const Upcoming = () => {

   
  const {data, loading} = useFetch(`/movie/upcoming`); //Yakında Vizyona Girecek filmleri api ile çeker


  return (
    <div className="carouselSection"> {/*diziyi yatay döndüren slayt gösterisi*/}
      <ContentWrapper>
        <span className="carouselTitle">Upcoming Releases</span> {/*Yakında vizyona girecek olan */}
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  );
};

export default Upcoming;

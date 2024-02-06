import React, { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";


const Trending = () => {

  const [endpoint, setEndpoint] = useState("day");
   
  const {data, loading} = useFetch(`/trending/movie/${endpoint}`); //trend filmleri api ile çeker

  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };

  return (
    <div className="carouselSection"> {/*diziyi yatay döndüren slayt gösterisi*/}
      <ContentWrapper>
        <span className="carouselTitle">Trends</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  );
};

export default Trending;

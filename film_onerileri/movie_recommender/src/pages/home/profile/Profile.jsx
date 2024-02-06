import React, { useEffect, useState, useRef } from "react";
import "./style.scss";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { userAuth } from "../../../context/AuthContext";
import { db } from "../../../utils/firebase";
import Img from "../../../components/lazyLoadImage/Img";
import { doc, onSnapshot } from "firebase/firestore";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import CircleRating from "../../../components/circleRating/CircleRating";
import Genres from "../../../components/genres/Genres";
import dayjs from "dayjs"; 

const Profile = () => {
  const { url } = useSelector((state) => state.home);
  const carouselContainer = useRef();
  const [movies, setMovies] = useState([]);
  const { user } = userAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setMovies(doc.data().favShows);
      });
    }
  }, [user?.email]);

  if(!user) {
    return (
      <>
        <p>Fetching shows...</p>
      </>
    )
  }

  console.log(movies);

  const navigation = (dir) => {
    const container = carouselContainer.current; //o an ki durumu alır

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 50)
        : container.scrollLeft + (container.offsetWidth + 50);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth", //kaydırma işlemi iyileştirir
    });
  };

  return <div className="container">
    <div className="main">
      <h1 className="title">My Shows</h1>
      <p className="email">
        {user.email}
      </p>
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
          <div className="carouselItems" ref={carouselContainer}>
            {movies?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div key={item.id} className="carouselItem">
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date || item.first_air_date).format(
                        "MMM D, YYYY"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
      </ContentWrapper>
    </div>
  </div>;
};

export default Profile;
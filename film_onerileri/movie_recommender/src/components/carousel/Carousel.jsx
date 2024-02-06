import React, { useRef, useState, useEffect } from "react"; //useRef referans oluşturan hook
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import dayjs from "dayjs"; //hangi gün yazıldığı

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { arrayUnion, doc, updateDoc, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { userAuth } from "../../context/AuthContext";

const Carosuel = ({ data, loading }) => {
  const {user} = userAuth();
  const [likedItems, setLikedItems] = useState([]);
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home); //useSelector hook'u home daki url özelliğini seçerek component içinde kullanılabilir hale getirdi

  useEffect(() => {
    // firestore'da kullanıcı belgesine erişir
    //kullanıcının beğendiği öğelerin listesini Firestore'dan alıp
    // bileşenin durumu içindeki likedItems adlı bir state değişkenine atar.
    const fetchLikedItems = async () => {
      const userEmail = user?.email;
      if (userEmail) {
        const userDoc = doc(db, "users", userEmail); // kullanıcının e-posta adresini userEmail değişkenine atar
        const userDocSnap = await getDoc(userDoc); //Firestore'da users koleksiyonunda kullanıcının e-posta adresine sahip bir belgeyi temsilen
        if (userDocSnap.exists()) { //belge mevcut mu
          const userDocData = userDocSnap.data(); //belge içindeki verileri nesne olarak döndürür
          const favShows = userDocData.favShows || []; //"favShows" alanından beğenilen şovların listesi alınır.
          const likedItemIds = favShows.map((favShow) => favShow.id); //beğenilen şovların id'si
          setLikedItems(likedItemIds);
        }
      }
    };

    fetchLikedItems();
  }, [user]);

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

  const skItem = () => {
    //index.css skeleton yapısı ile yüklenirken posterimsi görüntü çıkacak
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  const markFavShow = async (itemId) => {
    const userEmail = user?.email; // Kullanıcının e-posta adresini alır


    if (userEmail) { // Eğer kullanıcı e-posta adresi tanımlı ise devam eder
      const userDoc = doc(db, "users", userEmail); // Firestore'da kullanıcının belge referansını oluşturur
      const isItemLiked = likedItems.includes(itemId);

      if (isItemLiked) { // Kullanıcının beğendiği öğenin likedItems içinde olup olmadığını kontrol eder
        // Beğenilen öğeyi likedItems'tan çıkar
        setLikedItems(likedItems.filter((id) => id !== itemId));
        await updateDoc(userDoc, {
          favShows: arrayRemove({ id: itemId }),
        });
      } else {
        // Öğeyi likedItems'a ekle
        setLikedItems([...likedItems, itemId]);
        await updateDoc(userDoc, {
          favShows: arrayUnion({ ...data.find((item) => item.id === itemId) }),
        });
      }
    } else {
      alert("Login to save a movie");
    }
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
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
                  <div className="like">
                  <p onClick={() => markFavShow(item.id)}>
                  {likedItems.includes(item.id) ? (
                      <FaHeart style={{ fontSize: "20px", color: "red" }} />
                    ) : (
                      <FaRegHeart style={{ fontSize: "20px", color: "red" }} />
                    )}
                  </p>
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
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carosuel;  
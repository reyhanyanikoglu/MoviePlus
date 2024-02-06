import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/*
useNavigate hook'u
react router tarafından sağlanan bir hook. kullanıcının uygulama içinde farklı sayfalara geçiş yapmasını sağlamak için kullanılır
bir bileşen içinde çağrıldığında tarayıcı geçmişi üzerinde bir hareket gerçekleştirmek için bir fonksiyon döndürür
*/
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch"; // API'ye HTTP isteği yapar ve gelen veriyi yönetmek için kullanılır

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState(""); //state bir bileşenin içindeki veriyi depolamak için kullanılır ve bileşenin yeniden render edilmesini sağlar
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home); //state.home ifadesi, Redux store'daki home adlı state'in bir parçasını temsil eder.

  const { data, loading } = useFetch("/movie/upcoming"); //api ye istek
  /*
  Bu '/movie/upcoming' endpoint'ine bi HTTP GET isteği gönderir ve gelen veriyi 'data' adlı bir state içinde saklar.
  ve isteğin tamamlanıp tamamlanmadığını kontrol etmek için loading adlı bir state de kullanır.
  */
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path; //0 ile 19 arasında bir tamsayı üretir
    //?. güvenli erişim operatörü
    setBackground(bg); //arka plan resmi değiştiğinde bileşen tekrar render edilecek
  }, [data]); //data değişkeni değiştiğinde tekrar çalışacak

  const searchQueryHandler = (event) => {
    //kullanıcının arama yapmasını sağlayacak fonksiyon
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  /*
  searchQueryHandler fonksiyonu kullanıcı bir tuşa bastığında çalışacak. Eğer kullanıcı "enter" tuşuna basmışsa ve 
  'query' state'indeki değer boş değilse 'navigate' fonksiyonu kullanılarak bir sayfa geçişi yapılır.
  Böylece kullanıcının arama sorgusu ile "/search/{query}" sayfasına yönlendirilmesi sağlanır
  */

  function onChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="heroBanner">
      {!loading && ( //loading false olduguncda arkaplan backround değişkeni ile olcak
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
          We're here for you to discover millions of movies. Now is time to explore with Movie+.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie..."
              onChange={onChange}
              onKeyUp={searchQueryHandler} // Kullanıcı klavyeden bir tuşa bastığında searchQueryHandler fonksiyonu çalışacaktır.
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;

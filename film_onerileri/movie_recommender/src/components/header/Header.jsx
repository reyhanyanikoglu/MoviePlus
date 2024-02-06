import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi"; //arama simgesi
import { VscChromeClose } from "react-icons/vsc"; //kapat simgesi
import { useNavigate, useLocation, Link } from "react-router-dom";
import { userAuth } from "../../context/AuthContext";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/moviePlus_logo.png";
import icon from "../../assets/clapperboard.png";

const Header = () => {
  const { user, logOut } = userAuth();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const [show, setShow] = useState("top"); //navbar
  const [lastScrollY, setLastScrollY] = useState(0); //sayfa üzerindeki son kaydırma konumunu takip eder
  const [query, setQuery] = useState(""); //arama sorgusunu takip eder
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate(); //sayfa geçişlerini yönetir
  const location = useLocation(); //sayfanın mevvut konumu ve url bilgilerini içerir

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // sadece location değiştiğinde useEffect çalışacaktır.

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      //kaydırdığı satır sayısı 200 ü geçerse
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    //kullanıcının arama yapmasını sağlayacak fonksiyon
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false); //1 saniye sonra arama kısmını kapatır
      }, 1000);
    }
  };

  const openSearch = () => {
    setShowSearch(true);
  };

  return (
    <header className={`header ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img className="icon" src={icon} alt="" />
          <img className="logo" src={logo} alt="" />
        </div>
        <ul className="menuItems">
          {user?.email ? ( //kullanıcı giriş yaparsa
            <ul className="menuItems">
              <li className="menuItem">
                <Link to="/profile">
                  <button className="button">Profile</button>
                </Link>
              </li>
              <li className="menuItem">
                <button onClick={handleLogout} className="button">
                  Log Out
                </button>
              </li>
            </ul>
          ) : (
            <ul className="menuItems">
              <li className="menuItem">
                <Link to="/login">
                  <button className="button">Sign In</button>
                </Link>
              </li>
              <li className="menuItem">
                <Link to="/signup">
                  <button className="button">Sign Up</button>
                </Link>
              </li>
            </ul>
          )}
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Bir film veya dizi aratın..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler} // Kullanıcı klavyeden bir tuşa bastığında searchQueryHandler fonksiyonu çalışacaktır.
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;

//Header kısmı için react'ın ikon kütüphanesini kullandım. Bu ikonları kullanabilmek için projeme react-icons kütüphanesini npm kurdum.
//sonrasında kullanmak istediğim ikonların paketini import ettim

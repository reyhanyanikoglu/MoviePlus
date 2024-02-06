import React from "react";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms of Service</li> {/*kullanım şartları*/}
          <li className="menuItem">Privacy Policy</li> {/*gizlilik politikası*/}
          <li className="menuItem">About</li> {/*hakkımızda*/}
        </ul>
        <div className="infoText">
        With Movie+, you can easily follow trending TV series and movies from our lists. If there is a movie that interests you,
         do not hesitate to heart it.
         We are very happy to contribute to our users with Movie+. We'll find more movies to watch together, join us!
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;

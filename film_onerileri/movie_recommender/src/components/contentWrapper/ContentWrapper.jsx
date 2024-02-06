import React from "react";

import "./style.scss";

const ContentWrapper = ({ children }) => { //children prop'unu aldı
    return <div className="contentWrapper">{children}</div>;
    /*
        Bileşen, aldığı children prop'unu, contentWrapper adlı CSS sınıfına sahip bir div içine yerleştirir.
         Bu sayede ContentWrapper bileşeni ile çevrelenen içerik (children) belirli bir stile sahip olur.
    */
};

export default ContentWrapper;

/*
Sonuç olarak ContentWrapper bileşeni içine aldığı içeriği (children prop'u) elemanlarını belirli bi stil içine
saran bir konteynerdir.
*/
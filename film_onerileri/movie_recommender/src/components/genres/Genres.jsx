import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

const Genres = ({ data }) => { //data propsu aldı
    const { genres } = useSelector((state) => state.home); //homeslice da

    return (
        <div className="genres">
            {/*data prop'u üzerinde map fonksiyonu çağırır*/}
            {data?.map((g) => {
                if (!genres[g]?.name) return;
                return (
                    <div key={g} className="genre">
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;
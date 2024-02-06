import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // "react-router-dom" kütüphanesinden alınan bileşenler

import { fetchDataFromApi } from "./utils/api"; // api çağrısı yapmak için fonksiyon

import { useSelector, useDispatch } from "react-redux"; // Redux kütüphanesinden gelen hook'lar
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/home";
import Login from "./pages/home/login/Login";
import Signup from "./pages/home/signUp/Signup";
import Profile from "./pages/home/profile/Profile";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  const dispatch = useDispatch(); //dispatch fonksiyonu Redux store'a gönderir 
  const { url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      //tmdb den çektim
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url)); //Oluşturulan URL'leri Redux store'a gönderir
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["movie"];
    let allGenres = {}; //çekilen türün bilgilerini depolar

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          {/*ana dizindeyken home componentini çalıştıracak*/}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          {/*' /search/:query' URL'sine eşleşen bir 'Route' tanımlanmıştır. element prop'u bu URL ile eşleştiğinde render edilecek bileşeni belirtir. 'SearchResult' bileşeni element prop'u aracılığıyla 'Route' bileşeni tarafından render edilecektir.*/}
        </Routes>
        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../../../context/AuthContext";

const Login = () => {
  const [rememberLogin, setRememberLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {user, logIn} = userAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await logIn(email,password)
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Login</h1>
        <div className="opacity-layer"></div>
        <form onSubmit={handleFormSubmit}>
          <input
            className="sign-input"
            type="email"
            placeholder="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="sign-input"
            type="password"
            placeholder="şifre"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="uye">Login</button>
          <div className="content">
            <p>
              <input
                type="checkbox"
                className="check-button"
                checked={rememberLogin}
                onChange={(e) => setRememberLogin(!rememberLogin)}
              />
              &nbsp;&nbsp;Remember me
            </p>
            <p>Need help?</p>
          </div>
          <p className="giris-yonlendir">
            <span>Don't you have an account?</span>&nbsp;&nbsp;
            <Link to="/signup" className="giris-yap">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
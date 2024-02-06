import React, { useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../../../context/AuthContext";

const Signup = () => {
  const [rememberLogin, setRememberLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, signUp } = userAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Sign Up</h1>
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
          <button className="uye">Sign Up</button>
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
            <span>Do you already have an account?</span>&nbsp;&nbsp;
            <Link to="/login" className="giris-yap">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Signup;

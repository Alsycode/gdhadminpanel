import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storeUser } from "../../helpers";
import { useAuth } from "../../context/AuthContext";
import image from "../images/cover.jpg";
import logo from "../images/gdhlogo.png"

const initialUser = { password: "", identifier: "" };

const Login = () => {
  const { setAuthUser } = useAuth();
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const url = `http://localhost:1337/api/auth/local`;
    try {
      if (user.identifier && user.password) {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) {
          throw new Error('Failed to login');
        }
        const data = await response.json();
        if (data.jwt) {
          storeUser(data);
          setAuthUser(data);
          // Notify success without Toastify
          alert("Logged in successfully!");
          setUser(initialUser);
          window.location.reload();
        }
      }
    } catch (error) {
      // Notify error without Toastify
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
        <div style={{ 
        width: "50%",
        padding: "0 10%",
        display: "flex",
        flexDirection: "column",
        background: "rgba(255, 255, 255, 0.3)", /* Translucent white background */
        backdropFilter: "blur(2px)", /* Apply a blur effect */
        borderRadius: "10px", /* Rounded corners */
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        margin: "0 20%"}}>
        <h2 style={{ textAlign: "center" }}>Login to your GDH Dashboard</h2>
        <img src={logo} alt="GDH Logo" style={{ height: "40px", width: "120px", margin: "0 auto" }} />
        <div style={{ marginBottom: "15px",marginTop: "15px" }}>
          <input
            type="email"
            name="identifier"
            value={user.identifier}
            onChange={handleChange}
            placeholder="Enter your email"
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter password"
            style={inputStyle}
          />
        </div>
        <button style={buttonStyle} onClick={handleLogin}>
          Login
        </button>
        </div>
       
        {/* <h6>
          Click <Link to="/registration">Here</Link> to sign up
        </h6> */}
      </div>
      <div
        style={{
          width: "50%",
          height: "100%",

          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "blue",
  color: "white",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  marginBottom: "10px",
};

export default Login;

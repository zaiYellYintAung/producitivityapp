import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/userSlice";
import getUrl from "../../hooks/getUrl";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const url = getUrl();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/login/username`, {
        username,
        password,
      });

      const { token, userID } = response.data;

      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
      localStorage.setItem("userID", userID);

      dispatch(
        setUser({
          username,
          token,
          userID,
          isAuthenticated: true,
        })
      );

      navigate("/");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 text-xs lg:text-sm min-h-[95vh] ">
      <Link to="/" className="absolute left-4 top-4">
        <button className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
      </Link>
      <div className="max-w-md w-full mx-auto rounded-lg shadow-lg bg-white p-8">
        <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-800 font-semibold mb-2">
              Username
            </label>
            <input
              type="name"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-800 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-100 hover:text-black">
            Login
          </button>
        </form>
        <p className="text-gray-600 text-center mt-4 text-[0.65rem]">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline ">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

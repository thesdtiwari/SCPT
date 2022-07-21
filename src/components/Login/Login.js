import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import SvgIcon from "../SvgIcon";
import {BASE_URL} from "../../CONSTANTS";

async function loginUser(credentials) {
  let data = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  data = await data.json();
  // console.log(data);
  return data;
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    // console.log(token)
    setToken(token);
    history.push("/home");
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-0 pb-12 md:pt-20 md:pb-20">
              {/* Page header */}
              <div
                className="header-logo"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <SvgIcon src="logo.png" />
              </div>
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h3 className="h4">Welcome back to</h3>
                <h3 className="h3">Placement Portal IIT(ISM) Dhanbad</h3>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto pb-12 md:pb-20">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your email address"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="password"
                        >
                          Password
                        </label>
                      </div>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Link
                        to="forgot-password"
                        className="text-sm font-medium text-blue-600 hover:underline float-right my-1"
                      >
                        Forgot Password
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-4">
                    <div className="w-full px-3">
                      <button
                        type="submit"
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="max-w-sm mx-auto my-1 text-center pb-12 md:pb-20">
                <h5>Brought to you by</h5>
                <h4 className="h4">Saurabh Tiwari</h4>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
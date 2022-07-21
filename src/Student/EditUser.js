import React from "react";

import { BASE_URL } from "../CONSTANTS";

async function updateLinkedin(linkedlnURL) {
  try {
    // console.log(linkedlnURL);

    const data = await fetch(`${BASE_URL}/update/linkedin`, {
      method: "post",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ linkedlnURL }),
    });

    if (data.status === 200) {
      alert("Linkedln URL updated Successfully");
    } else {
      alert("Linkedln URL could not be updated");
    }
    // console.log(data);
  } catch (err) {
    console.error("Error in updating Linkedln URL", err);
    return "error, please check console for details";
  }
}

async function updateResume(resumeUrl) {
  try {
    // console.log(resumeUrl);

    const data = await fetch(`${BASE_URL}/update/resume`, {
      method: "post",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resumeUrl }),
    });

    if (data.status === 200) {
      alert("Resume URL updated Successfully");
    } else {
      alert("Resume URL could not be updated");
    }
    // console.log(data);
  } catch (err) {
    console.error("Error in updating Resume URL", err);
    return "error, please check console for details";
  }
}

async function updatePhone(contactNo) {
  try {
    // console.log(phone);

    const data = await fetch(`${BASE_URL}/update/phone`, {
      method: "post",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactNo }),
    });

    if (data.status === 200) {
      alert("Phone Number updated Successfully");
    } else {
      alert("Phone Number could not be updated");
    }
    // console.log(data);
  } catch (err) {
    console.error("Error in updating phone number", err);
    return "error, please check console for details";
  }
}

async function updatePassword(password) {
  try {
    // console.log(password);

    const data = await fetch(`${BASE_URL}/update/password`, {
      method: "post",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (data.status === 200) {
      alert("Password updated Successfully");
    } else {
      alert("Password could not be updated");
    }
    // console.log(data);
  } catch (err) {
    console.error("Error in updating password", err);
    return "error, please check console for details";
  }
}

export default function EditUser() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="linkedIn"
                      >
                        LinkedIn
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="linkedIn"
                        type="url"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your new LinkedIn URL"
                        required
                      />
                      <button
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        onClick={event => {
                          event.preventDefault();
                          updateLinkedin(
                            document.getElementById("linkedIn").value
                          );
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="resume"
                      >
                        Resume URL
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="resume"
                        type="url"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your new Resume URL"
                        required
                      />
                      <button
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        onClick={event => {
                          event.preventDefault();
                          updateResume(document.getElementById("resume").value);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="phone"
                      >
                        Phone Number
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="phone"
                        type="text"
                        maxLength={10}
                        minLength={10}
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your new Phone Number"
                        required
                      />
                      <button
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        onClick={event => {
                          event.preventDefault();
                          updatePhone(document.getElementById("phone").value);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        New Password
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="password"
                        type="url"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your New Password"
                        required
                      />
                      <button
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        onClick={event => {
                          event.preventDefault();
                          updatePassword(
                            document.getElementById("password").value
                          );
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

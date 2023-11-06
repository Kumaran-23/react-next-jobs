"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authenticateUser } from "../../../utils/auth";

const login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const loginUser = async (evt) => {
    evt.preventDefault();

    const userData = {
      username: formData.username,
      password: formData.password,
    };

    const res = await authenticateUser(userData.username, userData.password);

    if (res.success) {
      router.push("/");
    } else {
      console.log({ formErrors });
      setFormErrors({
        message: "Login failed due to incorrect username/password.",
      });
    }
  };

  return (
    <>
      <h1 className="text-center text-xl">Sign In</h1>
      <div className="flex justify-center items-center mt-8">
        <form onSubmit={loginUser} className="w-1/3">
          <div className="form-control w-full">
            <label htmlFor="username">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="johndoe"
              className="input input-bordered w-full"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            {formErrors.username && (
              <label htmlFor="username">
                <span className="label-text-alt text-red-500">
                  {formErrors.username.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full">
            <label htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder=""
              className="input input-bordered w-full"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {formErrors.message && (
              <div className="text-red-500 mt-2">{formErrors.message}</div>
            )}
          </div>

          <div className="form-control w-full mt-4">
            <button className="btn btn-md btn-accent hover:btn-primary">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default login;


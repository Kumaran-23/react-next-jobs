"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authenticateUser } from "../../../../utils/auth";
import { setAlert, clearAlert } from "../../../../store/alerts/alertSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch()

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const postSignUp = () => {
    router.push("/");
  };

  async function createUser(evt) {
    evt.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      setFormErrors({
        password: { message: "Password confirmation does not match" },
      });
      return;
    }

    const userData = {
       username: evt.target["username"].value,
      email: evt.target["email"].value,
      password: evt.target["password"].value,
      passwordConfirm: evt.target['password-confirmation'].value,
    };

    try {
      const resp = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          "/api/collections/users/records",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
     );
     console.log(userData)

      if (resp.status === 200) {
        const res = await authenticateUser(
          userData.username,
          userData.password
        );

        if (res.success) {
           dispatch(
          setAlert({
            message: "Sign Up Successful!",
            type: "alert-success",
          })
        );
        setTimeout(() => {
          dispatch(clearAlert());
        }, 3000);
          postSignUp();
        } else {
          throw "Sign up succeeded but authentication failed";
        }
      } else {
        const res = await resp.json();
        setFormErrors(res.data);
         dispatch(
          setAlert({
            message: "Sign Up Unsuccesful, Please Try Again.",
            type: "alert-error",
          })
        );
        setTimeout(() => {
          dispatch(clearAlert());
        }, 3000);
      }
    } catch (error) {
      console.error(error);//l
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-center text-xl">Create an Account to Post a Job</h1>
      <div className="text-center">
        <a className="link-hover italic text-xs" href="/login">
          Already have an account? Click here to login instead.
        </a>
      </div>
      <div className="flex justify-center items-center mt-8">
        <form onSubmit={createUser} className="w-1/3">
          <div className="form-control w-full">
            <label className="label" htmlFor="username">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="johndoe"
              className="input input-bordered w-full"
            />
            {formErrors.username && (
              <label className="label" htmlFor="username">
                <span className="label-text-alt text-red-500">
                  {formErrors.username.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              className="input input-bordered w-full"
              required
            />
            {formErrors.email && (
              <label className="label" htmlFor="email">
                <span className="label-text-alt text-red-500">
                  {formErrors.email.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder=""
              className="input input-bordered w-full"
              required
            />
            {formErrors.password && (
              <label className="label" htmlFor="password">
                <span className="label-text-alt text-red-500">
                  {formErrors.password.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label" htmlFor="password">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="password-confirmation"
              placeholder=""
              className="input input-bordered w-full"
              required
            />
            {formErrors.password && (
              <label className="label" htmlFor="password">
                <span className="label-text-alt text-red-500">
                  {formErrors.password.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full mt-4">
            <button className="btn btn-md btn-accent hover:btn-primary">Create an Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
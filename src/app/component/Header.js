"use client";
import React, { useEffect } from "react";
//import { themeChange } from "theme-change";
import Link from "next/link";
import { logOut } from "../../../utils/auth";
import { useSelector } from "react-redux";
import { isValidToken } from "../../../utils/auth";
import ThemeChange from "./Theme";

function Navbar() {
  useEffect(() => {
    isValidToken();
  }, []);
 const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="navbar">
      <div className="flex-1">
        <Link href="/">
          <button className="btn rounded-full font-bold py-2 px-4 btn-accent hover:btn-primary">
            Home
          </button>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <ThemeChange />
          {!isLoggedIn && (
            <Link href="/users/new">
              <button className="btn btn-hidden rounded-full font-bold py-2 px-4 mx-1 btn-accent hover:btn-primary">
                Sign Up
              </button>
            </Link>
          )} 
           {/* <Link href="/users/new">
              <button className="btn-hidden rounded-full font-bold py-2 px-4 mx-1 btn-accent hover:btn-primary">
                Sign Up
              </button>
            </Link> */}

            {isLoggedIn && (
            <Link href="/jobs/new">
              <button className="btn rounded-full font-bold py-2 px-4 mx-1 btn-accent hover:btn-primary">
                Post a Job
              </button>
            </Link>
          )}

            {isLoggedIn ? (
            <Link href="/">
              <button
                onClick={logOut}
                className="btn rounded-full font-bold py-2 px-4 mx-1 btn-accent hover:btn-primary"
              >
                Logout
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="btn rounded-full font-bold py-2 px-4 mx-1 btn-accent hover:btn-primary">
                Login
              </button>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
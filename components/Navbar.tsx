"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Modal } from "antd";
import CustomButton from "./CustomButton";
import { IUser } from "@types";
import axios from "axios";
import { useRouter,redirect } from "next/navigation";

const initialUser = {
  userName: "",
  password: "",
};

const NavBar = () => {
  const router = useRouter();
  // const signeduser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const signeduser=""
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<IUser>(initialUser);
  const [signedUser, setSignedUser] = useState<string>(signeduser || "");

  const { userName, password } = user;

  const handleLogout = async () => {
    setUser(initialUser);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setSignedUser("")
    setOpen(false)
    router.push("/");
  };

  const handleSignin = async () => {
    if(!userName)return
    try {
      const response = await axios.post("http://localhost:5000/signin", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle response
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("token", response.data);
        localStorage.setItem("user", userName);
        setSignedUser(userName);
        setOpen(false);
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


   



  return (
    <header className="w-full   bg-green-700 opacity-80 z-[999]">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <div className="flex gap-16 bg-white rounded-full px-16 py-2">
          <Link href="/" className="flex justify-center items-center">
            Home
          </Link>
          <div className="w-[0.1rem] bg-slate-500 opacity-70  rounded-full shadow-2xl shadow-slate-900"></div>
          <a href="#catelog" className="flex justify-center items-center">
            Catelog
          </a>
          <div className="w-[0.1rem] bg-slate-500 opacity-70  rounded-full shadow-2xl shadow-slate-900"></div>
          <a href="#about" className="flex justify-center items-center">
            About
          </a>
          {signedUser != "" ? (<>
          <div className="w-[0.1rem] bg-slate-500 opacity-70  rounded-full shadow-2xl shadow-slate-900"></div>
          <Link href="/admin" className="flex justify-center items-center">
            Admin
          </Link>
          </>
        ) : (
          ""
        )}
        </div>

        {signedUser != "" ? (
          <CustomButton
            title={signedUser}
            btnType="button"
            handleClick={() => setOpen(true)}
            containerStyles="text-green-700 rounded-full bg-white border-2  hover:bg-green-700  hover:text-white  "
          />
        ) : (
          <CustomButton
            title="Sign in"
            btnType="button"
            handleClick={() => setOpen(true)}
            containerStyles="text-green-700 rounded-full bg-white border-2  hover:bg-green-700  hover:text-white  "
          />
        )}

        {signedUser == "" ? (
          <Modal
            open={open}
            onCancel={() => setOpen(false)}
            className="card"
            width={400}
            footer={[
              <div className="flex justify-between px-5 pb-5">
                <Button
                  className="bg-yellow-500"
                  onClick={() => setUser(initialUser)}
                >
                  Clear
                </Button>

                <Button
                  key="submit"
                  className="bg-green-500"
                  onClick={handleSignin}
                >
                  Sign in
                </Button>
              </div>,
            ]}
          >
            <div className="flex justify-center  pt-5 hero__subtitle">
              Sign in
            </div>
            <div className="my-10 px-5 flex flex-col gap-10">
              <div>
                <label className="font-light text-black-100 text-md">
                  User Name
                </label>
                <input
                  placeholder="Enter  username"
                  type="text"
                  className="search-manufacturer__input "
                  value={userName}
                  onChange={(e) =>
                    setUser({ ...user, userName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="font-light text-black-100 text-md">
                  Password
                </label>
                <input
                  placeholder="Enter  password"
                  type="password"
                  value={password}
                  className="search-manufacturer__input"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <div className="hover:underline text-sm pl-2 pt-1">
                  forget password ?
                </div>
              </div>
            </div>
          </Modal>
        ) : (
          <Modal
            open={open}
            onCancel={() => setOpen(false)}
            className="card"
            width={400}
            footer={[
              <div className="flex justify-center ">
                <Button className="bg-red-500" onClick={handleLogout}>
                  Log out
                </Button>
              </div>,
            ]}
          >
            <div className="flex justify-center  pt-5 hero__subtitle">
              Log Out
            </div>
          </Modal>
        )}
      </nav>
    </header>
  );
};

export default NavBar;

import React, { Dispatch, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Navbar = ({
  isUser,
  setIsUser,
}: {
  isUser: boolean;
  setIsUser: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {
    try {
      if (email === "" || password === "") {
        alert("Fill The Fields");
        return;
      }
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("Logged In SuccessFully");
          setIsUser(true);
          console.log(auth.currentUser);
        })
        .catch((e) => {
          alert("error : " + e.message);
        });
    } catch (error) {
      alert("Some Error Occuerd Try Again Later");
    }
  };
  const SignUp = () => {
    try {
      if (email === "" || password === "") {
        alert("Fill The Fields");
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("User Created SuccessFully");
          setIsUser(true);
        })
        .catch((e) => {
          alert("error : " + e.message);
        });
    } catch (error) {
      alert("Some Error Occuerd Try Again Later");
    }
  };

  return (
    <div className="navbar bg-black text-white font-bold fixed top-0 left-0 right-0 z-10 drop-shadow-2xl">
      {/*Sign Up  */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Sign Up</h3>
          <div className="form flex gap-2 flex-wrap m-4 items-center justify-center">
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
              onChange={(ele) => setEmail(ele.target.value)}
            />
            <input
              type="text"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
              onChange={(ele) => setPassword(ele.target.value)}
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
              <button
                className="btn ml-4"
                onClick={(e) => {
                  e.preventDefault();
                  SignUp();
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* Log In  */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Log In</h3>
          <div className="form flex gap-2 flex-wrap m-4 items-center justify-center">
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
              onChange={(ele) => setEmail(ele.target.value)}
            />
            <input
              type="text"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
              onChange={(ele) => setPassword(ele.target.value)}
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
              <button
                className="btn ml-4"
                onClick={(e) => {
                  e.preventDefault();
                  Login();
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="flex-1">
        <a className="p-4 bg-transparent">GIF ~ VORTEX</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-16 rounded-full relative">
              <Image
                src="/images/profile.gif"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {isUser ? (
              <>
                <li onClick={()=>{auth.signOut().then(()=>{setIsUser(false);alert("Sign Out Succes Fully");})}}>
                  <a>Logout</a>
                </li>
              </>
            ) : (
              <>
                <li
                  onClick={() =>
                    (
                      document.getElementById("my_modal_1") as HTMLFormElement
                    )?.showModal()
                  }
                >
                  <div>Sign Up</div>
                </li>
                <li
                  onClick={() =>
                    (
                      document.getElementById("my_modal_2") as HTMLFormElement
                    )?.showModal()
                  }
                >
                  <div>Log In</div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

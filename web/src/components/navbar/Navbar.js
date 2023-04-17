import React from "react";
import "./Navbar.css";
import { auth } from "../../firebase";
// import { signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
// import { Link } from "react-router-dom";
import { HOST } from "../../API";
import { toast } from "react-toastify";
import { MdTask } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
function Navbar({signInWithGoogle}) {
  // const navigate = useNavigate();

  // console.log(currentUser);

  const logoutUser = () => {
    // console.log("logout")
    signOut(auth).then(() => {
      // setIsAuth(false);
      Cookies.set("isAuth", false);
      Cookies.set("uId", "");
      // setTaskList([]);

      window.location.pathname = "/";
    });
  };

  //  console.log(Cookies.get("isAuth"));
// console.log(currentUser);

  return (
    <>
      <nav className="navbarMain">
        <div className="div1">
          <span className="fs-1"><MdTask></MdTask> Taxks</span>
        </div>
        <div className="div2">
          {(Cookies.get("uId"))? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={signInWithGoogle}>Login</button>
          )}

          {/* <button onClick={logoutUser}>Logout</button>
<button onClick={signInWithGoogle}>Login</button> */}

 <div className="div2">
          <button onClick={
            ()=>{navigator.clipboard.writeText(`${HOST}/share/${Cookies.get("uId")}`)
          toast.success("Link Copied!!")
          }
          }>Copy Link </button>
        </div>

        </div>
      </nav>
    </>
  );
}

export default Navbar;

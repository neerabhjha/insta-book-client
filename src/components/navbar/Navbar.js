import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import "./Navbar.scss";
import { AiOutlineLogout } from "react-icons/ai";
import { RxInstagramLogo } from "react-icons/rx";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

function Navbar() {
  const navigate = useNavigate();

  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  async function handleLogoutClicked() {
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (error) {}
  }

  return (
    <div className="Navbar">
      <div className="container">
        <div className="hover-link banner">
          <RxInstagramLogo className="logo" />
          <h2 onClick={() => navigate("/")}>Instabook</h2>
        </div>
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => navigate(`/profile/${myProfile?._id}`)}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <div className="logout hover-link" onClick={handleLogoutClicked}>
            <AiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

import React from "react";
import "./Avatar.scss";
import userImg from "../../assets/user.png";
import { useNavigate } from "react-router-dom";

function Avatar({ src }) {
    const navigate = useNavigate();
  return (
    <div className="Avatar">
      <img
        src={src ? src : userImg}
        alt="user Img"
        onClick={() => navigate("/profile/sds")}
      />
    </div>
  );
}

export default Avatar;

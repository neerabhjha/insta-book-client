import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./Profile.scss";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../createPost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postsSlice";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";
import userPng from "../../assets/user.png";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const userProfile = useSelector((state) => state.postsReducer.userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const feedData = useSelector((state) => state.feedDataReducer.feedData);

  const dispatch = useDispatch();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );
    setIsMyProfile(myProfile?._id === params.userId);
    setIsFollowing(
      feedData?.followings?.find((item) => item._id === params.userId)
    );
  }, [myProfile, params.userId, feedData]);

  function handleUserFollow() {
    dispatch(
      followAndUnfollowUser({
        userIdToFollow: params.userId,
      })
    );
  }

  return (
    <div className="Profile">
      <div className="container">
        <div className="left-part">
          {isMyProfile && <CreatePost />}
          {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img
              className="user-img"
              src={userProfile?.avatar?.url || userPng}
              alt={userProfile?.name}
            />
            <h2 className="user-name">{userProfile?.name}</h2>
            <p>{userProfile?.bio}</p>
            <div className="follower-info">
              <h4>{`${userProfile?.followers?.length} Followers`}</h4>
              <h4>{`${userProfile?.followings?.length} Followings`}</h4>
            </div>
            {isMyProfile && (
              <button
                className="update-profile btn-secondary"
                onClick={() => {
                  navigate("/updateProfile");
                }}
              >
                Update Profile
              </button>
            )}

            {/* {isFollowing  ? "Unfollow" :  "Follow"} */}
            {(() => {
              if (isFollowing && !isMyProfile) {
                return (
                  <button
                    onClick={handleUserFollow}
                    className="btn-secondary follow"
                  >
                    Unfollow
                  </button>
                );
              }
              if (!isFollowing && !isMyProfile) {
                return (
                  <button
                    onClick={handleUserFollow}
                    className="btn-primary follow"
                  >
                    Follow
                  </button>
                );
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

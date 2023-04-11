import React, { useEffect } from "react";
import Follower from "../follower/Follower";
import Post from "../post/Post";
import "./Feed.scss";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../../redux/slices/feedSlice";

function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector(state => state.feedDataReducer.feedData)

  useEffect(()=>{
    dispatch(getFeedData());
  }, [dispatch])

  return (
    <div className="Feed">
      <div className="container">
        <div className="left-part">
          {feedData?.posts?.map(post => <Post key={post._id} post={post} />)}
        </div>
        <div className="right-part">
          <div className="following">
            <h2 className="title">You are following</h2>
            {feedData?.followings?.map(user => <Follower key={user._id} user={user} />)}
          </div>
          <div className="suggestions">
            <h2 className="title">Suggestions</h2>
            {feedData?.suggestions?.map(user => <Follower key={user._id} user={user} />)}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;

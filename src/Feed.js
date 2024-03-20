import { useContext } from "react";
import Post from "./Post";
import DataContext from "./context/DataContext";

const Feed = () => {
  const { posts } = useContext(DataContext);
  return (
    <>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feed;

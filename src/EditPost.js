import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EditPost = ({
  posts,
  handleEdit,
  editTitle,
  setEditTitle,
  editBody,
  setEditBody,
}) => {
  const id = useParams();
  const post = posts.find(post => (post.id).toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);
  return (
    <main className="EditPost">
      {editTitle && 
        <>
          <h2>New Post</h2>
          <form className="newPostForm" onSubmit={handleEdit}>
            <label htmlFor="postTitle" className="postTitle">
              Title:
            </label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody" className="postBody">
              Post:
            </label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      }
      {
        !editTitle &&   <>
        <h2>Post Not Found</h2>
        <p>Well, thats disppointing</p>
        <Link to="/">Visit Our HomePage</Link>
      </>
      }
    </main>
  );
};

export default EditPost;

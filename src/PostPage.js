import { Link, useParams } from "react-router-dom";

const PostPage = ({ posts, handleDelete,handleEdit }) => {
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${id}`} >
            <button onClick={(e) => handleEdit(post.id)} className="editButton">Edit Post</button>
            </Link>
            <button onClick={(e) => handleDelete(post.id)} className="deleteButton">Delete Post</button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, thats disppointing</p>
            <Link to="/">Visit Our HomePage</Link>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;

import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Missing from "./Missing";
import Footer from "./Footer";
import About from "./About";
import EditPost from "./EditPost";


import { useEffect, useState } from "react";

import "./App.css";
import { format } from "date-fns";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "./api/Posts";


function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState([]);
  const [postBody, setPostBody] = useState([]);
  const [editTitle, setEditTitle] = useState([]);
  const [editBody, setEditBody] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(`Error ${err.message}`);
        }
      }
    };
    fetchPosts();
  }, []);

    useEffect(() => {
      const filteredResults = posts.filter(post => {
        // Check if post.body exists and is a string before calling toLowerCase()
        const body = post.body && typeof post.body === 'string' ? post.body.toLowerCase() : '';
        const title = post.title && typeof post.title === 'string' ? post.title.toLowerCase() : '';
        return body.includes(search.toLowerCase()) || title.includes(search.toLowerCase());
    });

        setSearchResults(filteredResults.reverse());
    }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd,yyyy pp");
    const newPost = { id, title: postTitle, body: postBody, datetime };
    try {
      const response = await api.post("/posts", newPost);
      if (response) {
        const allPosts = [...posts, newPost];
        setPosts(allPosts);
        setPostTitle("");
        setPostBody("");
      }
    } catch (err) {
      if (err.response) {
        console.log(`Error ${err.message}`);
      }
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
        const response = await api.put(`/posts/${id}`, updatedPost);
        // Assuming the response.data contains the updated post object
        const updatedPostData = response.data;
        setPosts(posts.map(post => post.id === id ? updatedPostData : post));
        setEditTitle('');
        setEditBody('');
        navigate('/');
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

  const handleDelete = async (id) => {
    try {
      const response = api.delete(`/posts/${id}`);
      if (response) {
        const postList = posts.filter((post) => post.id !== id);
        setPosts(postList);
        navigate("/");
      }
    } catch (err) {}
  };

  return (
    <div className="App">
      <Header title="Social Media" />
      <Nav
        search={search}
        setSearch={setSearch}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
      <Routes>
        <Route
          path="/"
          element={<Home posts={searchResults} setPosts={setPosts} />}
        />
        <Route path="post">
          <Route
            index
            element={
              <NewPost
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
                handleSubmit={handleSubmit}
              />
            }
          />

          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} handleEdit={handleEdit}/>}
          />
        </Route>
        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editBody={editBody}
              setEditBody={setEditBody}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
            />
          }
        />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

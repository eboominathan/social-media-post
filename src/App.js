import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Missing from "./Missing";
import Footer from "./Footer";
import About from "./About";

import { useEffect, useState } from "react";

import "./App.css";
import { format } from "date-fns";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Post One Title",
      body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
      datetime: "Mar 11, 2024 11:17:00 AM",
    },
    {
      id: 2,
      title: "Post Two Title",
      body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
      datetime: "Mar 11, 2024 11:17:00 AM",
    },
    {
      id: 3,
      title: "Post Three Title",
      body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut",
      datetime: "Mar 11, 2024 11:17:00 AM",
    },
  ]);

  const [search, setSearch] = useState("");
  const [searchResults, setsearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState([]);
  const [postBody, setPostBody] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setsearchResults(filteredResults.reverse());
  }, [posts, search]);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd,yyyy pp");
    const newPost = { id, title: postTitle, body: postBody, datetime };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
  };

  const handleDelete = (id) => {

    const postList = posts.filter(post => post.id !== id);
    setPosts(postList);
    navigate('/')
  }
  
  
  return (
    <div className="App">
      <Header title="Social Media" />
      <Nav
        search={search}
        setSearch={setSearch}
        searchResults={searchResults}
        setsearchResults={setsearchResults}
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
            element={
              <PostPage
                posts={posts}
                handleDelete={handleDelete}
              />
            }
          />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Missing from "./Missing";
import Footer from "./Footer";

import { useState } from "react";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
      datetime : "Mar 11, 2024 11:17:00 AM"
    },
    {
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
      datetime : "Mar 11, 2024 11:17:00 AM"
    },
    {
      id: 3,
      title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut",
      datetime : "Mar 11, 2024 11:17:00 AM"
    },
  ]);

  const [search, setSearch] = useState("");
  const [searchResults, setsearchResults] = useState([]);

  return (
    <div className="App">
      <Header title="Social Media" />
      <Nav search={search} setSearch={setSearch} />
      <Home posts={posts} />
      <NewPost />
      <PostPage />
      <Missing />
      <Footer />
    </div>
  );
}

export default App;

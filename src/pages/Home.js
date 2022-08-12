import "../css/Home.css"
import "../css/articles.css"
import Nav from "../components/nav";
import Welcome from "../components/welcome";
import Lower from "../components/lower-nav";
import Articles from "../components/articles";
import Heading from "../components/heading";
import Footer from "../components/footer";
import { React, useState, useEffect } from "react";
function Home() {
  const [blogs, setBlogs] = useState(null)
  useEffect(() => {
    fetch('http://localhost:3003/blog/featured').then(res => {
      return res.json()
    }).then(
      (res) => {
        setBlogs(res);
      }
    )
  })
  
  return (
    <div className="page-sizing">
      <Nav />
      <Welcome />
      <Heading item='Featured-Articles' />
      <div className="articles-container">
        {blogs?.length ? <>{blogs.map((index) => {
          return (
            <Articles key={index.blogId} {...index} />
          )
        })}</> : <div className="empty">Nothing To Show</div>}
      </div>
      <Lower />
      <Footer />
    </div>
  );
}

export default Home;

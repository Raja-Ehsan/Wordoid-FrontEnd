import "../css/my-blogs.css"
import "../css/articles.css"
import Nav from "../components/nav";
import Lower from "../components/lower-nav";
import Articles from "../components/articles";
import Heading from "../components/heading";
import Footer from "../components/footer";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function MyBlogs() {

    const [blogs, setBlogs] = useState(null)
    const {id} =useParams();
    useEffect(() => {
        fetch(`http://localhost:3003/blog/get/${id}`).then(res => {
            return res.json()
        }).then(
            (res) => {
                console.log(res)
                setBlogs(res);
            }
        )
    }, [id])
    return (
        <div className="page-sizing">
            <Nav />
            <div className="search-container">
                <Heading item="My-Blogs" /> <div className="articles-container">
                    {blogs?.length? <>{blogs.map((index) => {
                        return (
                            <Articles options={true} key={index.blogId} {...index} />
                        )
                    })}</>:<div className="empty">Nothing To Show</div>}
                </div>
            </div>
            <Footer />
            <Lower />
        </div>
    );
}

export default MyBlogs;

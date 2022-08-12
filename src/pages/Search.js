import "../css/Search.css"
import Nav from "../components/nav";
import Lower from "../components/lower-nav";
import Articles from "../components/articles";
import Heading from "../components/heading";
import Footer from "../components/footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Search() {
    const [blogs, setBlogs] = useState();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const keyword = query.get('keyword');
    useEffect(() => {
        keyword ? fetch(`http://localhost:3003/blog/getBlogs/${keyword}`)
            .then((res => res.json()))
            .then((res) => {
                setBlogs(res)
            }) : fetch(`http://localhost:3003/blog/get`)
                .then((res => res.json()))
                .then((res) => {
                    setBlogs(res)
                })

    }, [keyword])
    console.log(blogs)
    return (
        <div className="page-sizing">
            <Nav />
            <div className="search-container">
                <div className="search-title"> <h3 style={{ margin: '0px' }}> Search Results for "{keyword}" </h3 >  </div>
                <Heading item="Searched Articles" />
                <div className="articles-container">
                {blogs?.length? <>{blogs.map((index) => {
                        return (
                            <Articles key={index.blogId} {...index} />
                        )
                    })}</>:<div className="empty">Nothing To Show</div>}
                </div>
            </div>
                <Footer />
            <Lower />
        </div>
    );
}

export default Search;

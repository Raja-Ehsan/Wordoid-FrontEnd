import "../css/Article.css"
import Nav from "../components/nav";
import Lower from "../components/lower-nav";
import Footer from "../components/footer";
import Heading from "../components/heading";
import Articles from "../components/articles";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function Article() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [blogs, setBlogs] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3003/blog/get/article/${id}`).then(res => {
            return res.json()
        }).then(
            (res) => {
                setBlog(res);
            }
        )
    }, [id]) 
    useEffect(() => {
        fetch(`http://localhost:3003/blog/incrementRead/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        }).then(res => {
            return res.json()
        }).then( (res) => {console.log(res) })
    }, [id])

    useEffect(() => {
        fetch('http://localhost:3003/blog/featured').then(res => {
            return res.json()
        }).then(
            (res) => {
                console.log(res)
                setBlogs(res);
            }
        )
    },[])
    return (
        <div className="page-sizing">
            <Nav />
            <div className="search-container">
                <Heading item='Reading......' />
                <div className="article-container">
                    <img style={{ width: '80vw', borderRadius: '10px' }} alt='' src={`http://localhost:3003/images/${blog?.blogImage}`} />
                    <div>
                        <h1 className="article-heading"> {blog?.blogName}</h1>
                        <div className="articleInfo">
                            <div>Author:  {blog?.blogAuthor}</div>
                            <div>{blog?.blogDate} | 8 min Read</div>
                        </div>
                        <div className="article-text" >
                            <pre style={{ whiteSpace: 'pre-wrap',fontFamily:'sans-serif',fontSize:'20px'}}>
                            {blog?.blogText}
                            </pre>
                        </div>
                    </div>
                </div>

                <Heading item='Suggested for You' />
                <div className="articles-container">{blogs?.length ? <>{blogs.map((index) => {
                    return (
                        <Articles key={index.blogId} {...index} />
                    )
                })}</> : <div className="empty">Nothing To Show</div>}
                </div>
            </div>
            <Footer />
            <Lower />
        </div>
    );
}

export default Article;

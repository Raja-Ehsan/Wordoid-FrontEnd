import "../css/AddArticle.css"
import Nav from "../components/nav";
import Lower from "../components/lower-nav";
import Footer from "../components/footer";
import Heading from "../components/heading";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { React, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
function AddArticle() {
    const navigate = useNavigate();
    let currentUser = JSON.parse(sessionStorage.getItem("User"));
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const hiddenFileInput = useRef(null);

    const [error, setError] = useState({
        visibility: false,
        text: 'You Must fill this form completely'
    });
    const [blog, setBlog] = useState({
        blogName: '',
        blogAuthor: currentUser?.userName,
        blogDate: date + "/" + month + "/" + year,
        featured: false,
        timesRead: 0,
        blogImage: '',
        userId: currentUser?._id,
        blogText: ''
    });
    console.log(blog)
    const handleChange = (event) => {
        setBlog((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }
    const handleChangeImage = (event) => {
        const fileUploaded = event.target.files[0];
        const data = new FormData();
        data.append("file", fileUploaded)
        data.append("name", fileUploaded?.name)
        fetch('http://localhost:3003/uploadImage', {
            method: 'POST',
            body: data
        })
        setBlog((prev) => {
            return {
                ...prev,
                blogImage: fileUploaded
            }
        })
    }
    const addBlog = () => {
        if (!blog.blogImage || !blog.blogName || !blog.blogText) {
            setError(prev => {
                return {
                    ...prev,
                    visibility: true
                }
            })
        }
        else {
            fetch("http://localhost:3003/blog/uploadBlog", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...blog,
                    blogImage: blog.blogImage.name
                })
            })
                .then(res => res.json())
                .then(res => { navigate(`/my-blogs/${currentUser?._id}`) })
        }
    }
    return (
        <div className="page-sizing">
            <Nav />
            <div className="search-container">
                <Heading item='Writing......' />
                <div className="add-article-container">
                    {blog.blogImage ? <img src={URL.createObjectURL(blog.blogImage)} alt='' style={{ width: '80vw', borderRadius: '10px' }} />
                        : <></>}
                    <div onClick={() => { hiddenFileInput.current.click() }} className="upload-button" >
                        <div><AddCircleOutlineIcon htmlColor="grey" fontSize="large" /></div>
                        <div style={{ color: 'grey' }}><h3>{blog.blogImage ? "Change Photo" : "Upload Photo"}</h3></div>
                        <input
                            type="file"
                            ref={hiddenFileInput}
                            onChange={handleChangeImage}
                            style={{ display: 'none' }}
                        />

                    </div>
                    <div style={{ width: '100%' }}>
                        <div className="title-input">
                            <input placeholder="Title" name="blogName" onChange={handleChange} type='text' className="input-title" ></input>
                        </div>
                        <div className="description-input">
                            <label style={{ margin: '10px' }} > Description:</label>
                        </div>
                        <textarea name="blogText" onChange={handleChange} type='text' className="description-text-input"  ></textarea>
                        {error.visibility ? <span style={{ color: 'red' }}>{error.text}<br /></span> : <span style={{ padding: '5px' }}></span>}
                        <button onClick={addBlog} style={{ width: '100px', border: 'none', backgroundColor: 'grey' }}>Add Blog</button>
                    </div>
                </div>
            </div>
            <Footer />
            <Lower />
        </div>
    );
}

export default AddArticle;

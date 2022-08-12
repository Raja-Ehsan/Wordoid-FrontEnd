import "../css/AddArticle.css"
import Nav from "../components/nav";
import Lower from "../components/lower-nav";
import Footer from "../components/footer";
import Heading from "../components/heading";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { React, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function EditArticle() {
    const navigate = useNavigate();
    let currentUser = JSON.parse(sessionStorage.getItem("User"));
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const hiddenFileInput = useRef(null);
    const [error, setError] = useState({
        visibility: false,
        text: 'You Must fill this form completely'
    });

    useEffect(() => {
        fetch(`http://localhost:3003/blog/get/article/${id}`).then(res => {
            return res.json()
        }).then(
            (res) => {
                setBlog(res);
            }
        )
    }, [id])

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
        setBlog((prev) => {
            return {
                ...prev,
                blogImage: fileUploaded
            }
        })
    }

    const updateBlog = () => {
        if (!blog.blogImage || !blog.blogName || !blog.blogText) {
            setError(prev => {
                return {
                    ...prev,
                    visibility: true
                }
            })
        }
        else {
            fetch(`http://localhost:3003/blog/updateBlog/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    blogName: blog.blogName,
                    blogText: blog.blogText,
                    blogImage: blog.blogImage.name ? blog.blogImage.name : blog.blogImage
                })
            })
                .then(res => res.json())
                .then(res => { navigate(`/my-blogs/${currentUser?._id}`) })
        }
    }
    if (blog?.userId === currentUser?._id) {
        return (
            <div className="page-sizing">
                <Nav />
                <div className="search-container">
                    <Heading item='Editing......' />
                    <div className="add-article-container">
                        <div className="image-container" style={{ backgroundImage: `url('${blog?.blogImage.name ? URL.createObjectURL(blog.blogImage) : 'http://localhost:3003/images/' + blog?.blogImage}')` }}>
                            {/* <img style={{ width: '80vw', borderRadius: '10px' }} alt='' src="https://source.unsplash.com/1200x600?comics" /> */}
                            <div className="edit-change-button" onClick={() => { hiddenFileInput.current.click() }} >
                                <div><AddCircleOutlineIcon htmlColor="grey" fontSize="large" /></div>
                                <div style={{ color: 'grey' }}><h3>Change Photo</h3></div><input
                                    type="file"
                                    ref={hiddenFileInput}
                                    onChange={handleChangeImage}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                        <div style={{ width: '100%' }}>
                            <div className="title-input">
                                <label style={{ fontSize: '20px', fontWeight: 'bolder', color: 'grey' }}>Title:</label>
                                <input name="blogName" onChange={handleChange} value={blog?.blogName || ''} type='text' style={{ width: '50%', height: '50px', borderRadius: '15px', margin: '20px', fontSize: '20px', border: 'none' }} ></input>
                            </div>
                            <div className="description-input">
                                <label style={{ margin: '10px' }}> Description:</label>
                            </div>
                            <textarea name="blogText" onChange={handleChange} value={blog?.blogText || ''} type='text' className="description-text-input"  ></textarea>
                            {error.visibility ? <span style={{ color: 'red' }}>{error.text}<br /></span> : <span style={{ padding: '5px' }}></span>}
                            <button onClick={updateBlog} style={{ width: '120px', border: 'none', backgroundColor: 'grey' }}>Update Blog</button>
                        </div>
                    </div>
                </div>
                <Footer />
                <Lower />
            </div>
        );
    }
    else {
        return (
            <div className="page-sizing">
                <Nav />
                <div className="search-container">
                    <Heading item='Restricted' />
                    <div className="add-article-container">
                        <div className="empty">You are Not Allowed to visit this Page</div>
                    </div>
                </div>
                <Footer />
                <Lower />
            </div>
        )
    }
}

export default EditArticle;

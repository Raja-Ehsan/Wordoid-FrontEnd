import "../css/Profile.css"
import "../css/articles.css"
import Nav from "../components/nav";
import Lower from "../components/lower-nav";
import Heading from "../components/heading";
import Articles from "../components/articles";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function Profile() {
    const { id } = useParams();
    const [blogs, setBlogs] = useState(null);
    const [error, setError] = useState({
        visibility: false,
        text: 'You Must fill this form completely'
    });
    const [userInfo, setUserInfo] = useState({ userPassword: '' });
    useEffect(() => {
        fetch(`http://localhost:3003/blog/get/profile/${id}`).then(res => {
            return res.json()
        }).then(
            (res) => {
                console.log(res)
                setBlogs(res);
            }
        )
    }, [id])
    useEffect(() => {
        fetch(`http://localhost:3003/user/getProfile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id:id
            })
        }).then(res => {
            return res.json()
        }).then(
            (res) => {
                setUserInfo((prev) => {
                    return {
                        ...prev,
                        userName: res[0].userName,
                        userEmail: res[0].userEmail
                    }
                })
            }
        )
    }, [id])

    const handleChange = (event) => {
        setUserInfo((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }
    const updateUser = () => {
        if (!userInfo.userName || !userInfo.userEmail || !userInfo.userPassword) {
            setError(prev => {
                return {
                    ...prev,
                    visibility: true
                }
            })
        }
        else {
            fetch(`http://localhost:3003/blog/changeAuthorName/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    blogAuthor: userInfo.userName
                })
            })

            fetch(`http://localhost:3003/user/updateProfile/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName: userInfo.userName,
                    userEmail: userInfo.userEmail,
                    userPassword: userInfo.userPassword
                })
            })
                .then(res => res.json())
                .then(res => {
                    window.location.reload(false);
                })
        }
    }
    return (
        <div className="page-sizing">
            <Nav />
            <div className="search-container">
                <Heading item="Profile" />
                <div className="profile-container">
                    <h2 >Edit your Profile:</h2>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex' }}>
                            <span>Username:</span> <input onChange={handleChange} name='userName' type='text' value={userInfo?.userName ||""} /> <br />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <span>Email:</span> <input onChange={handleChange} name='userEmail' style={{ marginLeft: '54px' }} type='text' value={userInfo?.userEmail || ""} /> <br />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <span>Password:</span> <input onChange={handleChange} name='userPassword' style={{ marginLeft: '20px' }} type='text' value={userInfo?.userPassword || ""} /> <br />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}> <button onClick={updateUser} > Update</button> </div>
                    </div>
                    {error.visibility ? <span style={{ color: 'red' }}>{error.text}<br /></span> : <span style={{ padding: '5px' }}></span>}
                </div>
                <Heading item="Most Viewed Articles" /> <div className="articles-container">
                    {blogs?.length ? <>{blogs.map((index) => {
                        return (
                            <Articles options={true} key={index.blogId} {...index} />
                        )
                    })}</> : <div className="empty">Nothing To Show</div>}
                </div>
            </div>
            <Lower />
        </div>
    );
}

export default Profile;

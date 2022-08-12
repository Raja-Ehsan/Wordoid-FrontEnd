import "../css/Nav.css"
import "@emotion/react"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
function Nav() {
    const searchLink=useRef();
    const navigate=useNavigate();
    let currentUser = JSON.parse(sessionStorage.getItem("User"));
    const [keyword, setKeyword] = useState('');
    const handleChange = (e) => {
        setKeyword(e.target.value);
    }
    function handleLogout(){
        if(window.confirm("By Clicking Ok You Will Logout")){
          sessionStorage.removeItem('User');
          navigate('/');
        }
    }
    return (
        <div className="nav-container">
            <nav >
                <div className="portion">
                    <a style={{ textDecoration: 'none', color: 'rgb(66, 66, 66)' }} href="/"><h3 className="logo-text">Wordoid...   </h3></a>
                </div>
                <div className="searchBar">
                    <input onChange={handleChange} placeholder="Search Articles..."
                        className="search"
                        type="text" name="search" id="search"  onKeyPress={(e)=>{if(e.key === 'Enter')searchLink.current.click()}}></input>

                    <a ref={searchLink} style={{ textDecoration: 'none', color: 'rgb(66, 66, 66)' }} href={`/articles-search?keyword=${keyword}`}> <SearchIcon id='search' htmlColor="rgb(66, 66, 66)" fontSize="medium" className="searchIcon" /></a>
        </div>
                {
        currentUser ? <div className="buttons">
            <h4 onClick={handleLogout} className="button">Logout</h4>
            <a style={{ textDecoration: 'none', color: 'rgb(66, 66, 66)' }} href={`/Profile/${currentUser?._id}`}><AccountCircleIcon htmlColor="rgb(66, 66, 66)" fontSize="medium" className="profileIcon" /></a>
        </div> :
         <div className="buttons" style={{marginBottom:'10px'}}>
            <a style={{ textDecoration: 'none', color: 'rgb(66, 66, 66)' }} href="/register"><h4 className="button">Register</h4></a>
            <a style={{ textDecoration: 'none', color: 'rgb(66, 66, 66)' }} href="/login"><h4 className="button">Login</h4></a>
        </div>
    }
                
            </nav >

        <div className="nav2">
            <div className="options">
                <a style={{ textDecoration: 'none', color: 'rgb(66, 66, 66)' }} href="/"><h4 className="opt">Home</h4></a>
                <a style={{ textDecoration: 'none', color: 'rgb(66, 66, 66)' }} href="/about"><h4 className="opt">About</h4></a>
                <a style={{ textDecoration: 'none', color: 'rgb(66, 66, 66)' }} href="/contact-us"><h4 className="opt">Contact-Us</h4></a>
                {currentUser ?
                    <><a style={{ textDecoration: 'none', color: 'rgb(66, 66, 66)' }} href={`/my-blogs/${currentUser?._id}`}><h4 className="opt">My Blogs</h4></a>
                        <a style={{ textDecoration: 'none', color: 'rgb(66, 66, 66)' }} href="/add-article"><h4 className="opt">Write</h4></a></> : <></>}
            </div>
        </div>
        </div >
    )
}

export default Nav;

import "../css/lower-nav.css"
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Lower() {
    let currentUser = JSON.parse(sessionStorage.getItem("User"));
    return (

        <div className="lower-nav">
            <div className="optionss">
            <a  style={{textDecoration:'none',color:'rgb(66, 66, 66)'}} href="/"><HomeIcon fontSize="large" className="opts" htmlColor="rgb(66, 66, 66)"   /></a>
            <a  style={{textDecoration:'none',color:'rgb(66, 66, 66)'}} href={`/my-blogs/${currentUser?._id}`}><LibraryBooksIcon fontSize="large" className="opts" htmlColor="rgb(66, 66, 66)"   /></a>
            <a  style={{textDecoration:'none',color:'rgb(66, 66, 66)'}} href="/add-article"><AddCircleOutlineIcon fontSize="large" className="opts" htmlColor="rgb(66, 66, 66)"/></a>
            <a  style={{textDecoration:'none',color:'rgb(66, 66, 66)'}} href="/"><InfoIcon fontSize="large" className="opts" htmlColor="rgb(66, 66, 66)"   /></a>
            <a  style={{textDecoration:'none',color:'rgb(66, 66, 66)'}} href="/contact-us"><ContactMailIcon fontSize="large" className="opts" htmlColor="rgb(66, 66, 66)"   /></a>
            </div>
        </div>
    )
}

export default Lower;

import "../css/footer.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
function Footer() {
    let currentUser = JSON.parse(sessionStorage.getItem("User"));
    return (

        <div className="footer">
            <div className="footer-options">
            <a  style={{textDecoration:'none',color:'rgb(66, 66, 66)'}} href="/"> <span className="footer-opt">Home</span></a>
            <a  style={{textDecoration:'none',color:'rgb(66, 66, 66)'}} href="/about"> <span className="footer-opt">About</span></a>
            <a  style={{textDecoration:'none',color:'rgb(66, 66, 66)'}} href="/contact-us"> <span className="footer-opt">Contact-Us</span></a>
            <a  style={{textDecoration:'none',color:'rgb(66, 66, 66)'}} href={`/my-blogs/${currentUser?._id}`}> <span className="footer-opt">My Blogs</span></a>
            <a  style={{textDecoration:'none',color:'rgb(66, 66, 66)'}} href="/"> <span className="footer-opt"> </span></a>
            </div>
            <div >
                <span >  Contacts: </span>
                <span > <InstagramIcon /></span>
                <span > <FacebookIcon /></span>
                <span > <WhatsAppIcon /></span>
                </div >
            </div>
            )
}

            export default Footer;

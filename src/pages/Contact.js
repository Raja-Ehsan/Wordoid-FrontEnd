import "../css/Contact.css"
import Nav from "../components/nav";
import Lower from "../components/lower-nav";
import Heading from "../components/heading";
import Footer from "../components/footer";
function Contact() {
    return (
        <div className="page-sizing">
            <Nav />
            <div className="search-container">
                <Heading item="Contact-Us" />
                <div className="contact-container">
                   <h2> Feel Free to Contact Us</h2> 
                   <input type='text' placeholder="Enter your Name"/>
                   <input type='number' placeholder="Enter your Phone Number"/>
                   <input type='text' placeholder="Enter your Email Address"/>
                   <textarea placeholder="How Can We Help You?"></textarea>
                   <button onClick={()=>{
                    window.location.reload(false);}}> Send</button>
                </div>
            </div>
            <Footer/>
            <Lower />
        </div>
    );
}

export default Contact;

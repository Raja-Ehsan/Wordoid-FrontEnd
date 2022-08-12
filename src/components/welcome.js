import "../css/welcome.css"

function Welcome() {
    return (
        <>
            <div className="welcome-container" >
                <div className="message-container">
                    <span className="welcome-title">Write something Good</span> <br/>
                    <span className="welcome-text">"Either write something worth reading or do something worth writing."
                        --Benjamin Franklin</span> <br/>
                    <a href="/about" style={{textDecoration:'none'}}><button style={{width:'100px'}} className="About-us"> About Us</button></a>
                </div>
            </div>
        </>
    );
}

export default Welcome;

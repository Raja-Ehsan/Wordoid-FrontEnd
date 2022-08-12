import "../css/heading.css"
function Heading(props) {
    return (
        <div className="heading-container">
            <span className="heading">{props.item}</span>
        </div>
    )
}

export default Heading;

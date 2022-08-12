import "../css/articles.css"
import { React } from "react";
function Articles(props) {
    function handleDelete(){
        if(window.confirm('By clicking OK this Article would be deleted'))
        {
            fetch(`http://localhost:3003/blog/delete/article/${props._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            }).then((res) => {
                return res.json()
            }).then((res) => {
                window.location.reload(false);
            })
        }
    }
    const wordsPerMinute = 200; 
    let result;
    let textLength = props.blogText.split(" ").length; 
    if (textLength > 0) {
        let value = Math.ceil(textLength / wordsPerMinute);
        result = `~${value} min read`;
    }
    return (
        <>
            <div className="article-card" key={props.blogId}>
                <div className="article-image">
                    <img src={`http://localhost:3003/images/${props.blogImage}`} alt="" />
                </div>

                <div className="article-info">
                    <a style={{ textDecoration: 'none', color: 'rgb(66, 66, 66)' }} href={`/article/${props._id}`}><div  >  <span className="article-title">{props.blogName}</span></div></a>
                    <div ><span className="article-author">Author: {props.blogAuthor}</span> </div>
                    <div ><span className="article-time"> <small>{props.blogDate} | {result}</small></span></div>
                    <div ><span className="article-description"> {`${props.blogText.substring(0, 420)}`}..................... {props.options ? <><a style={{ color: 'grey', margin: '5px' }} href={`/edit-article/${props._id}`}>Edit</a><a style={{ color: 'grey', margin: '5px' }} href="/article" onClick={handleDelete}>Delete</a> </> : <></>}
                    </span>
                    </div>
                </div>
            </div>
            <hr className="separation" />
        </>
    )
}

export default Articles;
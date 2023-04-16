import React, {useState, useEffect} from "react";
import './Article.css';

function Article() {

  const [data, setData] = useState([]);
  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/techblog/articles/')
    .then(response => response.json())
    .then(data => setData(data));
  }, []);

console.log(data)

  return (
    <div>{data.map((a, i) => {
      return(
        <div className="content-field">
          <hr/>
          <h4 className="title"><a href={a.link}>{a.title}</a>
          </h4>
          <p>{a.author} {a.published_date}</p>
          <div>{a.content}</div>
        </div>
      
      
      )

    })}</div>
  );
}

export default Article;
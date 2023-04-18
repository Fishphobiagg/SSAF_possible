import React, {useState, useEffect} from "react";
import './Article.css';
import { Pagination, Container, Row, Col} from "react-bootstrap";


function Article() {
  const basic_url = 'http://127.0.0.1:8000/api/techblog/articles/?page='
  const [data, setData] = useState({results: [], count: 0});
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [url, setUrl] = useState(basic_url+page)
  

  useEffect(()=>{
    fetch(url)
    .then(response => response.json())
    .then(data => setData(data));
  }, [url]);
  let maxPage = Math.ceil(data.count / perPage);

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
    setUrl(basic_url+pageNum);
  }

  
  return (
    <div>
      <Container>
    <Row>
    <div className="col">
    {data.results && data.results.map((article, index) => (
    <div className="content-field" key={index}>
    <p onClick={()=>{
      console.log(1)
    }} className="content-tag">#{article.ent_name}</p>
    <a href={article.link}>
    <h3>{article.title}</h3>
    <p>{article.author} {article.published_date}</p>
    <p>{article.content}</p>  
    </a>
    <hr/>
    </div>
))}
  <div className="pagination">
    <div className="pagenavi">
    <a className="page larger" href=""> 1 </a>
    <a className="page larger" href=""> 2 </a>
    <a className="page larger" href=""> 3 </a>
    <a className="page larger" href=""> 4 </a>
    <a className="page larger" href=""> 5 </a>
    </div>

  </div>

  </div>
    </Row>
      </Container>
    </div>
  );
}


export default Article;
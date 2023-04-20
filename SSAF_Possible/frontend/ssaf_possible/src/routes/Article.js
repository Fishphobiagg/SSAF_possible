import React, {useState, useEffect, useCallback} from "react";
import './Article.css';
import { Pagination, Container, Row, Col} from "react-bootstrap";


function Article() {
  const basic_url = 'http://127.0.0.1:8000/api/techblog/articles/?page='
  const [data, setData] = useState({results: [], count: 0});
  let [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [url, setUrl] = useState(basic_url+page)
  let maxPage = Math.ceil(data.count / perPage);
  let arr;
  if (page===1||page===2){
    arr = [1, 2, 3, 4, 5]
  }
  else if (page===maxPage||page===maxPage-1){
    arr = [maxPage-4, maxPage-3, maxPage-2, maxPage-1, maxPage];
  }
  else {
    arr = [page-2, page-1, page, page+1, page+2]
  }
  
  console.log(page)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log(jsonData)
      setData(jsonData);
    };
  
    fetchData();
  }, [url]);


  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    setUrl(basic_url + pageNumber);
  };
  
  return (
    <div>
      <Container>
        <Row>
          <div className="col">
            {data.results && data.results.map((article, index) => (
              <div><p onClick={()=>{console.log(1)}} className="content-tag">#{article.ent_name}</p>
              <div className="content-field" key={index}>
                <a href={article.link}>
                  <h3 key={article.id}>{article.title}</h3>
                  <p>{article.published_date} {article.author}</p>
                  <p>{article.content}</p>
                </a>
                <hr/>
              </div>
            </div>
          ))}
          <div className="pagination">
            <div className="pagenavi">
              {page === 1|| page ===2? <li></li>:<li href="" className="page larger previouspage" onClick={() => handlePageClick(page-1)}></li>}
              {arr.map(a => (
                <li href="" className="page larger" key={a} onClick={() => handlePageClick(a)}>
                  {a}
                </li>
              ))}
              {page === maxPage| page===maxPage-1?<li></li>:<li href="" className="page larger nextpage" onClick={()=>{handlePageClick(page+1)}}></li > }
            </div>
          </div>
        </div>
      </Row>
    </Container>
  </div>
  );
}

export default Article;

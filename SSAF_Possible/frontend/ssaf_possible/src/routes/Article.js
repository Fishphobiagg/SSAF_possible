import React, {useState, useEffect} from "react";
import './Article.css';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


function Article() {

  const articles_api = 'http://127.0.0.1:8000/article/list/?page='
  const set_api = (keyword) => 'http://127.0.0.1:8000/article/search/' + keyword + '?page='
  const [data, setData] = useState({results: [], count: 0});
  const [basicUrl, setBasicUrl] = useState(articles_api)

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState()
  const [perPage] = useState(10);
  const [url, setUrl] = useState(basicUrl+page)
  console.log(url)
  let maxPage = Math.ceil(data.count / perPage);


  let arr;
  const paging = ()=>{if (page===1||page===2){
    arr = [1, 2, 3, 4, 5]
  }
  else if (page===maxPage||page===maxPage-1){
    arr = [maxPage-4, maxPage-3, maxPage-2, maxPage-1, maxPage];
  }
  else {
    arr = [page-2, page-1, page, page+1, page+2]
  }}
  paging()

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
    console.log(url)
    setUrl(basicUrl + pageNumber);
    console.log(url)
  };
  
  return (
    <div className="main">
      <div className="post-wrap">
          <div className="col">
            {data.results && data.results.map((article, index) => ( // 리액트에서 map을 통해서 반복적으로 컴포넌트 만들 때 index 전달해주는거 중요. Good
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
              {page === 1? <li className="blind"></li>:<li href="" className="page larger previouspage" onClick={() => handlePageClick(page-1)}></li>}
              {arr.map(a => (
                <li href="" className="page larger" key={a} onClick={() => handlePageClick(a)}>
                  {a}
                </li>
              ))}
              {page === maxPage?<li className="blind"></li>:<li href="" className="page larger nextpage" onClick={()=>{handlePageClick(page+1)}}></li > }
            </div>
          </div>
        </div>
    </div>
    <aside className="sidebar">
      <div className="searchbar">
      <button className="search-btn" onClick={()=>{ 
          setPage(1);
          setBasicUrl(set_api(keyword));
          setUrl(basicUrl+page);
        }}>검색</button>
        <input type="text" placeholder="Keyword" onChange={(e)=>{
          setKeyword(e.target.value)
        }}/>
      </div>
    </aside>
  </div>
  );
}

export default Article;

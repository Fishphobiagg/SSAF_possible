import React, {useState, useEffect} from "react";
import './Article.css';


function Article() {
  // 보통 URL 같은 건 하드타이핑 하지 않고 따로 변수로 관리하는 경우가 많음
  // 만약 이렇게 일일이 하드타이핑 해두면, 이후에 서버 포트 번호나 url이 변경됐을 때 모든 코드 다 뒤져가면서 수정해야 함

  // basic_url을 상태관리하여 검색주잉ㄹ 경우에는 검색 api, 전체 열람 중일 경우에는 전체 열람 api의 url을 할당해야할듯
  const articles_api = 'http://127.0.0.1:8000/api/techblog/articles/?page='
  const set_api = (keyword) => 'http://127.0.0.1:8000/api/techblog/search/' + keyword + '?page='
  const [data, setData] = useState({results: [], count: 0});
  const [basicUrl, setBasicUrl] = useState(articles_api)

  // useState로 받을 때 const 써도 되고 보통 const 쓸 수 있으면 무조건 const 쓰는 걸 추천
  // let [page, setPage] = useState(1);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState()

  // 변경될 일이 없는 데이터는 굳이 상태로 선언해주지 않아도 됨
  const [perPage] = useState(10);
  const [url, setUrl] = useState(basicUrl+page)
  console.log(url)
  let maxPage = Math.ceil(data.count / perPage);

  // 이렇게 짜놓으면 아래 if 분기 로직이 뭘 의미하는건지 알수가 없음
  // 이를 주석으로 처리할 수도 있지만, 일반적으로 함수로 분리하고 함수명으로 이게 무슨 일을 하는지 표현하는게 좋음
  // 특히 아래 로직은 page의 상태가 변경될 때마다 도는 로직인데, 이럴 경우 page 값에 따라 useMemo, useCallback으로 메모이제이션 가능
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

  // 다음처럼 useEffect가 작성되어 있을 경우 useEffect 내 콜백이 작동하는 경우는 아래와 같음
  // 페이지가 처음 렌더링 됐을 때, url 값이 setUrl을 통해서 변경되었을 때
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
  
  // 이렇게 길어지는거 별로 안좋음
  // 남들이 봤을 때 코드 파악 힘들고 관리하기도 안좋음
  // 그래서 이런 경우에는 여러 함수형 컴포넌트로 분리하는거 추천
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

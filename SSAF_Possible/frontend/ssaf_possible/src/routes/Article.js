import React, {useState, useEffect} from "react";
import './Article.css';
import { Pagination, Container, Row, Col} from "react-bootstrap";


function Article() {
  const basic_url = 'http://127.0.0.1:8000/api/techblog/articles/?page='
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [url, setUrl] = useState(basic_url+page)

  useEffect(()=>{
    fetch(url)
    .then(response => response.json())
    .then(data => setData(data));
  }, [page]);
  let [maxpage, setMaxpage] = useState(parseInt(data.count/10));

  return (
    <div>
      <Container>
        <Row>
          {data.results.map(function(a, i){
            
            return(
              <Col>
                <h4>{a.title}</h4>
              </Col>
            )
          })}
        </Row>
      </Container>
      <Pagination></Pagination>
      
    </div>
  );
}

function Content(props) {

  console.log(props.data.results);
  <Col>
    {props.data.results.map(function(a, i){

      console.log(a)
      return (
        <h4>{a.title}</h4>
      )
    })
      
    }
  </Col>
}

export default Article;
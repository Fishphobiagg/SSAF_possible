import { useState } from "react";
function Scrap(){

    const scrapListApi = 'http://127.0.0.1:8000/api/techblog/scraps/'
    const scrapApi = (article_pk) => {'http://127.0.0.1:8000/api/techblog/scraps/' + article_pk}
    const [scrapData, setScrapData] = useState()
    return(
        <div>
            <h2>Scraps</h2>
            <ul className="scrap_list"></ul>
        </div>
    );
}

function Tags(){
    return(
        <div>
            <h2>Tags</h2>
        </div>
    );
}

export {Scrap, Tags};


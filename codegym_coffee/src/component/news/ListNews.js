import React, {useEffect, useState} from "react";
import {findAllNews, findByIdNews} from "../../service/news/news";
import {Header} from "../Homepage/Header";
import {Link, useParams} from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../news/News.css"


export function ListNews() {
    const [listNews, setListNews] = useState([]);
    const [detailNews, SetDetailNews] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [request, setRequest] = useState({
        page: 0,
        title: "",
        idNews: 0
    })

    const param = useParams();


    useEffect(() => {
        const fetchApiListNews = async () => {
            const newsApi = await findAllNews();
            setListNews(newsApi.content);
            console.log(newsApi);
        };
        fetchApiListNews();
    }, []);


    useEffect(() => {
        const data = async () => {
            const detailNewsApi = await findByIdNews(param.id);
            SetDetailNews(detailNewsApi);
        };
        data();
    }, [param.id]);


    const handlePageOnclick = (event) => {
        setRequest((prev) => ({...prev, page: event.selected}))
    }


    if (!listNews) {
        return null
    }

    return (
        <>


            <div id="formList">
                {listNews.map((news) => (
                    <div id="list">
                        <div className="item">
                            <Link to={"/news/detail/" + news.idNews}>
                                <img class="avatar" src={news.image} alt={news.title}/>
                            </Link>
                            <div className="content">
                                <div>
                                    <span className="nameGroup">
                                        <Link to={"/news/detail/" + news.idNews}>
                                            <h3 className="card-title">{news.title}</h3>
                                        </Link>
                                    </span>
                                </div>
                                <div>
                                    <h5>
                                        {news.content}
                                    </h5>
                                </div>
                                <div>
                                    {news.dayPost}
                                </div>
                            </div>
                        </div>


                        {listNews && (
                            <div className="d-grid">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel=">"
                                    onPageChange={handlePageOnclick}
                                    pageCount={pageCount}
                                    previousLabel="<"
                                    containerClassName="pagination"
                                    pageLinkClassName="page-num"
                                    nextLinkClassName="page-num"
                                    previousLinkClassName="page-num"
                                    activeClassName="active"
                                    disabledClassName="d-none"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

import React, {useEffect, useState} from "react";
import {Carousel} from "react-bootstrap";
import moment from 'moment';
import "../../css/News/News.css";
import {Link} from "react-router-dom";
import {findAllNews} from "../../service/NewsService/NewsService";

export function ListNews() {
    const [listNews, setListNews] = useState(null);


    useEffect(() => {
        const fetchApiListNews = async () => {
            const newsApi = await findAllNews();
            setListNews(newsApi.content);
            console.log(newsApi);
        };
        fetchApiListNews();
    }, []);


    if (!listNews) {
        return null
    }

    return (
        <>
            <div className="container" id='news'>
                <Carousel interval={10000} controls>
                    {listNews.map((news, index) => (
                        <Carousel.Item key={index}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <Link to={"/detail-news/" + news.idNews}>

                                        <img className="d-block w-100 foodImg"
                                             src={news.image} alt={news.title}
                                        />
                                    </Link>
                                </div>
                                <div className="col-lg-6 title-news">
                                    <Link className="link-title" to={"/detail-news/" + news.idNews}>
                                        <h1 className="titleService">{news.title}</h1>
                                    </Link>
                                    <p>
                                        {news.content}
                                    </p>
                                    <p id="day-post">
                                        <span>Ngày đăng:</span> {moment(news.dayPost).format('DD-MM-YYYY')}</p>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </>
    )
}

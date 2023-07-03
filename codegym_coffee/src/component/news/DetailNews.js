import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import * as newsService from "../../service/news/newsService";
import moment from "moment";
import "../news/DetailNews.css"
import {Header} from "../Homepage/Header";

export const DetailNews = () => {
    const [listNews, setListNews] = useState(null);
    const [detailNews, setDetailNews] = useState({});
    const param = useParams();

    useEffect(() => {
        const detail = async () => {
            try {
                const res = await newsService.findByIdNews(param.id);
                document.title = res.title;
                setDetailNews(res);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchApiListNews = async () => {
            const res = await newsService.findAllNews();
            setListNews(res);
        };
        detail();
        fetchApiListNews();

    }, [param.id]);

    if (!detailNews) {
        return null;
    };

    return (
        <>
            <Header/>
            {detailNews && (
                <div className="container">
                    <div className="content">
                        <div className="row">
                            <div className="col-lg-6">
                                <img className="d-block w-100 foodImg"
                                     src={detailNews.image} alt=''/>
                            </div>
                            <div className="col-lg-6 title-news">
                                <h1 className="titleService">{detailNews.title}</h1>
                                <p>{detailNews.content}</p>

                                <p id="day-post">
                                    <span>Ngày đăng:</span> {moment(detailNews.dayPost).format('DD-MM-YYYY')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
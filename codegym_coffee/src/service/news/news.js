import axios from "axios";


export const findAllNews = async (page) =>{
    try{
        const result = await axios.get(`http://localhost:8080/api/list-news?page=`)
        return result.data
    }catch (error) {
        console.log(error)
    }
}


export const findByIdNews = async (id)=>{
    try {
        const result = await axios.get(`http://localhost:8080/api/news/detail/${id}`)
        return result.data
    }catch (e) {
        console.log(e)
    }
}

// {listNews.map((news) => (
//     <div className="movie-card p-3">
//         <Link to={"/news/detail/" + news.idNews}>
//             <figure className="card-banner">
//                 <img src={news.image} alt={news.title} />
//             </figure>
//         </Link>
//         <div className="title-wrapper">
//             <Link to={"/news/detail/" + news.idNews}>
//                 <h3 className="card-title">{news.title}</h3>
//             </Link>
//         </div>
//         <div className="card-meta pt-2">
//             <div className="badge badge-outline">
//                 {news.content}
//             </div>
//             <div className="duration">
//                 <ion-icon name="time-outline" />
//                 <time dateTime="PT137M">{news.dayPost}</time>
//             </div>
//         </div>
//     </div>
// ))}
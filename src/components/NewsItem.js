import React from 'react'

const NewsItem = ({title, description, imageUrl, newsUrl, author, date, source})=>{
        return (
            <>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={imageUrl} className="card-img-top card-image" alt="..." />
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'95%', zIndex:'1'}} >{source}</span>
                    <div className="card-body">
                        <h5 className="card-title text-center">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {author == null ? 'Unknown' : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </>
        )
}

export default NewsItem

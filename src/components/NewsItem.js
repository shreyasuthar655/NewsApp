import React, { Component } from "react";

// export class NewsItem extends Component {
  const NewsItem = (props) => {
    let { title, description, imgurl, newsurl, author, date, source } =
      props;
    return (
      <div className="my-3">
        <div className="card">
          <span
            className="badge bg-primary"
            style={{ display: 'flex', position: 'absolute', justifyContent: 'flex-end', right: '0' }}
          >
            {source}
          </span>
          <img
            src={
              imgurl
                ? imgurl
                : "https://img.freepik.com/free-photo/3d-rendering-illustration-letter-blocks-forming-word-news-white-background_181624-60840.jpg?w=1380&t=st=1709878816~exp=1709879416~hmac=a1b88fe96b6c6fd6ae47754eae177235c365c16687a09ea77e9c833ebd141b9f"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsurl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;

import React, { useEffect, useState, setState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

// export class News extends Component {
const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const capaitalizeFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // constructor will not work in function based component
  // constructor(props) {
  //   super(props); //must
  //   state = {
  //     articles: [],
  //     loading: true,
  //     page: 1,
  //     totalResults: 0,
  //   };
    
  // }

  const updateNews = async() => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=71b29c9082574de48e87150b141da279&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
// the work of componentDidMount wil be done by useEffect
  // async componentDidMount() {
  //   updateNews();
  // }
useEffect(() => {
  document.title = `${capaitalizeFirst(
    props.category
  )} - DailyDigest`;
  updateNews();
}, [])


  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=71b29c9082574de48e87150b141da279&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    // setLoading(false)
    // setState({
    //   articles: articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // })
  };
  // handleNextClick = async() => {
  //   // if(!(page+1>Math.ceil(totalResults/props.pageSize))){
  //   setPage(page+1)
  //   updateNews()
  // }

  // handlePreviousClick = async() =>{
  //   setPage(page-1)
  //   updateNews()
  // }

    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px', marginTop:'70px'}}>
          DailyDigest Top Headlines about {capaitalizeFirst(props.category)}
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row">
            {articles.map((element) => {
              {
                /* md-3: in medium devices, it will take 3 columns. total 12 grids are there in bootstrap */
              }
              return <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    author={element.author ? element.author : "Unknown Author"}
                    date={element.publishedAt}
                    source={element.source.name}
                    imgurl={element.urlToImage}
                    newsurl={element.url}
                  />
                </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button><button disabled={page+1>Math.ceil(totalResults/16)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 12,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

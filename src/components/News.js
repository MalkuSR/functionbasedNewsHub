import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ category, setProgress, apikey }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12); // Keeping this constant, if you want to change, adjust the state accordingly.
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - Headlines Hub`;
    fetchArticles();
    // eslint-disable-next-line
  }, []);

  const fetchArticles = async () => {
    setProgress(0);
    let url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apikey}&page=${page}&pageSize=${pageSize}`;

    console.log(`Fetching articles from URL: ${url}`);

    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let parsedData = await response.json();
      console.log("Fetched articles:", parsedData);

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setLoading(true);
    let url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apikey}&page=${nextPage}&pageSize=${pageSize}`;

    console.log(`Fetching more articles from URL: ${url}`);

    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let parsedData = await response.json();
      console.log("Fetched more articles:", parsedData);

      setArticles(articles.concat(parsedData.articles || []));
      setLoading(false);
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error("Error fetching more articles:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='text-center my-5'>Top {capitalizeFirstLetter(category)} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container main-content-loaded">
          <div className="d-flex flex-row justify-content-center gap-5 my-3 flex-wrap">
            {articles.filter((element) => element.urlToImage !== null).map((element) => {
              return (
                <NewsItem key={element.id} title={element.title ? element.title.slice(0, 33) : ""} description={element.description ? element.description.slice(0, 70) + "...more" : element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'in',
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;

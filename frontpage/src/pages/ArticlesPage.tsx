import Footer from '../components/Footer';
import Header from '../components/Header';
import Map from '../components/Map';
import NewsHorizontal from '../components/NewsHorizontal';
import Spinner from '../components/Spinner';
import * as React from 'react';

const ArticlePage = () => {
  return (
    <div id="news-page">
      <Spinner />
      <Header />
      <NewsHorizontal/>
      <Map />
      <Footer />
    </div>
  )
}

export default ArticlePage
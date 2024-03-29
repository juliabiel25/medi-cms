import { useAtom } from 'jotai';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NewsDetail from '../components/NewsDetail';
import Spinner from '../components/Spinner';
import * as React from 'react';
import { oneNewsStore } from '../stores/basicInfoStore';

const ArticlePage = () => {
  const [oneNews, setOneNews] = useAtom(oneNewsStore)

  return(
    <div id="article-page">
      <Spinner />
      <Header />
      <NewsDetail />      
      <Footer />
    </div>
  )
}

export default ArticlePage
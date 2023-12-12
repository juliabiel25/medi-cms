import Footer from '../components/Footer';
import Header from '../components/Header';
import NewsDetail from '../components/NewsDetail';
import Spinner from '../components/Spinner';

const Article = () => {
  return(
    <div id="article-page">
      <Spinner />
      <Header />
      <NewsDetail />      
      <Footer />
    </div>
  )
}

export default Article
import About from '../components/About';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Home from '../components/Home';
import Map from '../components/Map';
import News from '../components/News';
import Spinner from '../components/Spinner';

const ArticlePage = () => {
  return (
    <div id="news-page">
      <Spinner />
      <Header />
      <Home />
      <About />
      <Map />
      <Footer />
    </div>
  )
}

export default ArticlePage
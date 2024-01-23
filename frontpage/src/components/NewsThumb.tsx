import { useAtom } from 'jotai';
import * as React from 'react';
import { oneNewsStore } from '../stores/basicInfoStore';

const NewsThumb = () => {
  const [oneNews, setOneNews] = useAtom(oneNewsStore)

  return (
    <div className="news-detail-thumb">
      <div className="news-image">
        <img src="images/news-image3.jpg" className="img-responsive" alt="" />
      </div>
      <h3>{oneNews.title}</h3>
      <p>{oneNews.text}</p>
      <div className="news-social-share">
        <h4>Share this article</h4>
        <a href="#" className="btn btn-primary"><i className="fa fa-facebook"></i>Facebook</a>
        <a href="#" className="btn btn-success"><i className="fa fa-twitter"></i>Twitter</a>
        <a href="#" className="btn btn-danger"><i className="fa fa-google-plus"></i>Google+</a>
      </div>
    </div>
  )
}

export default NewsThumb;
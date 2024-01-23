import { useAtom } from "jotai";
import { oneNewsStore } from "../stores/basicInfoStore";
import NewsThumb from "./NewsThumb";
import * as React from 'react';

const NewsDetail = () => {
  const [oneNews, setOneNews] = useAtom(oneNewsStore)
  
  return (
    <section id="news-detail" data-stellar-background-ratio="0.5">
      <div className="container">
        <div className="row">

          <div className="col-md-8 col-sm-7">
            <NewsThumb />
          </div>

          <div className="col-md-4 col-sm-5">
            <div className="news-sidebar">
              <div className="news-author">
                <h4>About the author</h4>
                <p>Lorem ipsum dolor sit amet, maecenas eget vestibulum justo imperdiet, wisi risus purus augue vulputate voluptate neque.</p>
              </div>

              <div className="news-categories">
                <h4>Categories</h4>
                <li><a href="#"><i className="fa fa-angle-right"></i> Dental</a></li>
                <li><a href="#"><i className="fa fa-angle-right"></i> Cardiology</a></li>
                <li><a href="#"><i className="fa fa-angle-right"></i> Health</a></li>
                <li><a href="#"><i className="fa fa-angle-right"></i> Consultant</a></li>
              </div>

              <div className="news-tags">
                <h4>Tags</h4>
                <li><a href="#">Pregnancy</a></li>
                <li><a href="#">Health</a></li>
                <li><a href="#">Consultant</a></li>
                <li><a href="#">Medical</a></li>
                <li><a href="#">Doctors</a></li>
                <li><a href="#">Social</a></li>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>)
}

export default NewsDetail;
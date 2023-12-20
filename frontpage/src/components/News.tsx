import * as React from 'react';

const News = () => {
  return (
    <section id="news" data-stellar-background-ratio="2.5">
          <div className="container">
               <div className="row">

                    <div className="col-md-12 col-sm-12">
                         {/* <!-- SECTION TITLE --> */}
                         <div className="section-title wow fadeInUp" data-wow-delay="0.1s">
                              <h2>Latest News</h2>
                         </div>
                    </div>

                    <div className="col-md-4 col-sm-6">
                         <a href="/articlesOne">
                              <div className="news-thumb wow fadeInUp" data-wow-delay="0.4s">
                                   <a href="articlesOne">
                                        <img src="images/news-image1.jpg" className="img-responsive" alt=""/>
                                   </a>
                                   <div className="news-info">
                                        <span>March 08, 2018</span>
                                        <h3><a href="articlesOne">About Amazing Technology</a></h3>
                                        <p>Maecenas risus neque, placerat volutpat tempor ut, vehicula et felis.</p>
                                        <div className="author">
                                             <img src="images/author-image.jpg" className="img-responsive" alt=""/>
                                             <div className="author-info">
                                                  <h5>Jeremie Carlson</h5>
                                                  <p>CEO / Founder</p>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </a>
                    </div>

                    <div className="col-md-4 col-sm-6">
                         <a href="articlesOne">
                              <div className="news-thumb wow fadeInUp" data-wow-delay="0.6s">
                                   <a href="articlesOne">
                                        <img src="images/news-image2.jpg" className="img-responsive" alt=""/>
                                   </a>
                                   <div className="news-info">
                                        <span>February 20, 2018</span>
                                        <h3><a href="articlesOne">Introducing a new healing process</a></h3>
                                        <p>Fusce vel sem finibus, rhoncus massa non, aliquam velit. Nam et est ligula.</p>
                                        <div className="author">
                                             <img src="images/author-image.jpg" className="img-responsive" alt=""/>
                                             <div className="author-info">
                                                  <h5>Jason Stewart</h5>
                                                  <p>General Director</p>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </a>
                    </div>

                    <div className="col-md-4 col-sm-6">
                         <a href="articlesOne">
                              <div className="news-thumb wow fadeInUp" data-wow-delay="0.8s">
                                   <a href="articlesOne">
                                        <img src="images/news-image3.jpg" className="img-responsive" alt=""/>
                                   </a>
                                   <div className="news-info">
                                        <span>January 27, 2018</span>
                                        <h3><a href="articlesOne">Review Annual Medical Research</a></h3>
                                        <p>Vivamus non nulla semper diam cursus maximus. Pellentesque dignissim.</p>
                                        <div className="author">
                                             <img src="images/author-image.jpg" className="img-responsive" alt=""/>
                                             <div className="author-info">
                                                  <h5>Andrio Abero</h5>
                                                  <p>Online Advertising</p>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </a>
                    </div>

               </div>

               <div style={{width: '100%', display: "flex", marginTop: "20px", justifyContent: "center"}}>
                    <button id="cf-submit" name="meet" style={{height: "40px", width: "200px", backgroundColor: "#A5C422", borderWidth: "0px", color: 'white', borderRadius: "3px", fontWeight: "600"}}>
                         <a href="/articles">
                              Read more
                         </a>
                    </button>
               </div>
          </div>
     </section>
  )
}

export default News;
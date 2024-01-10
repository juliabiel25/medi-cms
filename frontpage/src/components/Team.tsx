import * as React from 'react';

const Team = () => {
  return (
    <section id="team" data-stellar-background-ratio="1">
          <div className="container">
               <div className="row">

                    <div className="col-md-6 col-sm-6">
                         <div className="about-info">
                              <h2 className="wow fadeInUp" data-wow-delay="0.1s">Our Doctors</h2>
                         </div>
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-4 col-sm-6">
                         <a href="/doctorsOne">
                              <div className="team-thumb wow fadeInUp" data-wow-delay="0.2s">
                                   <img src="images/team-image1.jpg" className="img-responsive" alt="" />

                                        <div className="team-info">
                                             <h3>Nate Baston</h3>
                                             <p>General Principal</p>
                                             <div className="team-contact-info">
                                                  <p><i className="fa fa-phone"></i> 010-020-0120</p>
                                                  <p><i className="fa fa-envelope-o"></i> <a href="#">general@company.com</a></p>
                                             </div>
                                             <ul className="social-icon">
                                                  <li><a href="#" className="fa fa-linkedin-square"></a></li>
                                                  <li><a href="#" className="fa fa-envelope-o"></a></li>
                                             </ul>
                                        </div>

                              </div>
                         </a>
                    </div>

                    <div className="col-md-4 col-sm-6">
                         <a href="/doctorsOne">
                              <div className="team-thumb wow fadeInUp" data-wow-delay="0.4s">
                                   <img src="images/team-image2.jpg" className="img-responsive" alt="" />

                                        <div className="team-info">
                                             <a href="/doctor/2">
                                                  <h3>Jason Stewart</h3>
                                                  <p>Pregnancy</p>
                                             </a>
                                             <div className="team-contact-info">
                                                  <p><i className="fa fa-phone"></i> 010-070-0170</p>
                                                  <p><i className="fa fa-envelope-o"></i> <a href="#">pregnancy@company.com</a></p>
                                             </div>
                                             <ul className="social-icon">
                                                  <li><a href="#" className="fa fa-facebook-square"></a></li>
                                                  <li><a href="#" className="fa fa-envelope-o"></a></li>
                                                  <li><a href="#" className="fa fa-flickr"></a></li>
                                             </ul>
                                        </div>

                              </div>
                         </a>
                    </div>

                    <div className="col-md-4 col-sm-6">
                         <a href="/doctorsOne">
                              <div className="team-thumb wow fadeInUp" data-wow-delay="0.6s">
                                   <img src="images/team-image3.jpg" className="img-responsive" alt="" />

                                        <div className="team-info">
                                             <a href="/doctor/3">
                                                  <h3>Miasha Nakahara</h3>
                                                  <p>Cardiology</p>
                                             </a>
                                             <div className="team-contact-info">
                                                  <p><i className="fa fa-phone"></i> 010-040-0140</p>
                                                  <p><i className="fa fa-envelope-o"></i> <a href="#">cardio@company.com</a></p>
                                             </div>
                                             <ul className="social-icon">
                                                  <li><a href="#" className="fa fa-twitter"></a></li>
                                                  <li><a href="#" className="fa fa-envelope-o"></a></li>
                                             </ul>
                                        </div>
                              </div>
                         </a>
                    </div>
                    
               </div>
               
               <div style={{width: '100%', display: "flex", marginTop: "20px", justifyContent: "center"}}>
                    <button id="cf-submit" name="meet" style={{height: "40px", width: "200px", backgroundColor: "#A5C422", borderWidth: "0px", color: 'white', borderRadius: "3px", fontWeight: "600"}}>
                         <a href="/doctors">
                              Meet them
                         </a>
                    </button>
               </div>
          </div>
     </section>
  )
}

export default Team;
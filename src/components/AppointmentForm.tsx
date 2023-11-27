const AppointmentForm = () => {
  return (
    <section id="appointment" data-stellar-background-ratio="3">
          <div className="container">
               <div className="row">

                    <div className="col-md-6 col-sm-6">
                         <img src="images/appointment-image.jpg" className="img-responsive" alt=""/>
                    </div>

                    <div className="col-md-6 col-sm-6">
                         {/* <!-- CONTACT FORM HERE --> */}
                         <form id="appointment-form" role="form" method="post" action="#">

                              {/* <!-- SECTION TITLE --> */}
                              <div className="section-title wow fadeInUp" data-wow-delay="0.4s">
                                   <h2>Make an appointment</h2>
                              </div>

                              <div className="wow fadeInUp" data-wow-delay="0.8s">
                                   <div className="col-md-6 col-sm-6">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Full Name"/>
                                   </div>

                                   <div className="col-md-6 col-sm-6">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" placeholder="Your Email"/>
                                   </div>

                                   <div className="col-md-6 col-sm-6">
                                        <label htmlFor="date">Select Date</label>
                                        <input type="date" name="date" value="" className="form-control"/>
                                   </div>

                                   <div className="col-md-6 col-sm-6">
                                        <label htmlFor="select">Select Department</label>
                                        <select className="form-control">
                                             <option>General Health</option>
                                             <option>Cardiology</option>
                                             <option>Dental</option>
                                             <option>Medical Research</option>
                                        </select>
                                   </div>

                                   <div className="col-md-12 col-sm-12">
                                        <label htmlFor="telephone">Phone Number</label>
                                        <input type="tel" className="form-control" id="phone" name="phone" placeholder="Phone"/>
                                        <label htmlFor="Message">Additional Message</label>
                                        <textarea className="form-control" rows={5} id="message" name="message" placeholder="Message"></textarea>
                                        <button type="submit" className="form-control" id="cf-submit" name="submit">Submit Button</button>
                                   </div>
                              </div>
                        </form>
                    </div>

               </div>
          </div>
     </section>
  )
}

export default AppointmentForm;
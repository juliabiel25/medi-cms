import * as React from 'react';
import { Link } from 'react-router-dom';

const DoctorDetail = () => {
  return (
    <section id="news-detail" data-stellar-background-ratio="0.5">
      <div className="container">
        <div className="column">
          <div
            className="col-md-12 col-sm-5"
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <div className="col-md-4">
              <img src="images/news-image1.jpg" className="img-responsive" alt="" />
            </div>

            <div
              style={{
                marginLeft: "10px"
              }}
            >
              <h4>Basic information</h4>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start'
                }}
              >
                <div
                  style={{
                    fontSize: '14pt',
                    fontWeight: '500'
                  }}
                >
                  Name:
                </div>
                <p style={{ marginLeft: "5px", fontSize: "14pt", marginTop: '0.5%' }}>Adam</p>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start'
                }}
              >
                <div
                  style={{
                    fontSize: '14pt',
                    fontWeight: '500'
                  }}
                >
                  Surame:
                </div>
                <p style={{ marginLeft: "5px", fontSize: "14pt", marginTop: '0.5%' }}>Kotaczak</p>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start'
                }}
              >
                <div
                  style={{
                    fontSize: '14pt',
                    fontWeight: '500'
                  }}
                >
                  Specialty:
                </div>
                <p style={{ marginLeft: "5px", fontSize: "14pt", marginTop: '0.5%' }}>Cardiology</p>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-sm-5">
            <div className="news-sidebar">
              <div className="news-tags">
                <h4>Field of interest</h4>
                <li><a>Pregnancy</a></li>
                <li><a>Health</a></li>
                <li><a>Consultant</a></li>
                <li><a>Medical</a></li>
                <li><a>Doctors</a></li>
                <li><a>Social</a></li>
              </div>

              <div className="news-author">
                <h4>Education</h4>
                <p>Lorem ipsum dolor sit amet, maecenas eget vestibulum justo imperdiet, wisi risus purus augue vulputate voluptate neque.</p>
              </div>

              <div className="contact-info">
                <h4>Contact</h4>
                <span
                  className="phone-icon"
                  onClick={() => window.open('tel:900300400')}
                >
                  <p>
                    <i className="fa fa-phone"></i>010-070-0170
                  </p>
                </span>
                <Link
                  to='#'
                  onClick={(e: any) => {
                    window.location.href = "mailto:info@company.com";
                    e.preventDefault();
                  }}
                  className="email-icon"
                >
                  <p><i className="fa fa-envelope-o"></i>info@doctor.com</p>
                </Link>
                <p>
                  <i className="fa fa-linkedin"></i><a href="#">info@doctor.com</a>
                </p>
                <p>
                  <i className="fa fa-facebook"></i> <a href="#">info@doctor.com</a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>)
}

export default DoctorDetail;
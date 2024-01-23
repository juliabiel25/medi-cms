import { useAtom } from 'jotai';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { doctorStore } from '../stores/basicInfoStore';

const DoctorDetail = () => {
  const [doctor, setDoctor] = useAtom(doctorStore)
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
                <p style={{ marginLeft: "5px", fontSize: "14pt", marginTop: '0.5%' }}>{doctor.name}</p>
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
                <p style={{ marginLeft: "5px", fontSize: "14pt", marginTop: '0.5%' }}>{doctor.surname}</p>
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
                <p style={{ marginLeft: "5px", fontSize: "14pt", marginTop: '0.5%' }}>{doctor.specialty}</p>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-sm-5">
            <div className="news-sidebar">
              <div className="news-tags">
                <h4>Field of interest</h4>
                <li><a>{doctor.fieldOfInterest}</a></li>
              </div>

              <div className="news-author">
                <h4>Education</h4>
                <p>{doctor.educationInformation}</p>
              </div>

              <div className="contact-info">
                <h4>Contact</h4>
                <span
                  className="phone-icon"
                  onClick={() => window.open(`tel:${doctor.phoneNumber}`)}
                >
                  <p>
                    <i className="fa fa-phone"></i>{doctor.phoneNumber}
                  </p>
                </span>

                <Link
                  to='#'
                  onClick={(e: any) => {
                    window.location.href = `mailto:${doctor.email}`;
                    e.preventDefault();
                  }}
                  className="email-icon"
                >
                  <p><i className="fa fa-envelope-o"></i>{doctor.email}</p>
                </Link>
                <p>
                  <i className="fa fa-linkedin"></i><a href={doctor.linkedInAccount}>{doctor.linkedInAccount}</a>
                </p>
                <p>
                  <i className="fa fa-facebook"></i> <a href={doctor.facebookAccount}>{doctor.facebookAccount}</a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>)
}

export default DoctorDetail;
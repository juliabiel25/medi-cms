import * as React from 'react';
import { useEffect } from 'react';
import { dbStore } from '../utils/firebase';
import { collection, doc, getDocs } from 'firebase/firestore/lite';
import { Doctor } from '../interfaces/interface';
import { useAtom } from 'jotai';
import { doctorStore, doctorsStore, initialDoctor } from '../stores/basicInfoStore';
import { Link } from 'react-router-dom';
import { getDataWithReferences } from '../utils/helpers';

const Team = () => {
  const [doctors, setDoctors] = useAtom(doctorsStore),
    [doctor, setDoctor] = useAtom(doctorStore)

  useEffect(() => {
    async function getDoctors(db: any) {
      getDataWithReferences(dbStore, 'doctors').then((data: any) => {                               
        const doctorsArray: Doctor[] = []

        let counter = 1
        const length = data.length
        data.map((d: any, index: number) => {
          if (counter <= 3) {
            const newData: Doctor = {
              id: index,
              educationInformation: d.data.educationInformation,
              email: d.data.email,
              facebookAccount: d.data.facebookAccount,
              fieldOfInterest: d.data.fieldOfInterest,
              imagePath: {
                altName: d.data.image.data.altName,
                name: d.data.image.data.name,
                url: d.data.image.data.url
              },
              linkedInAccount: d.data.linkedInAccount,
              name: d.data.name,
              phoneNumber: d.data.phoneNumber,
              specialty: d.data.specialty,
              surname: d.data.surname,
              services: []
            }

            doctorsArray.push(newData)
            counter++
          }
        })

        setDoctors(doctorsArray)
      })
    }

    getDoctors(dbStore).catch(console.error);
  }, [])

  useEffect(() => {
    if (doctor !== initialDoctor)
      window.location.href = `/doctorsOne?id=${doctor.id}`;
  }, [doctor])

  async function handleNavigation(e: any, doctorOne: Doctor) {
    e.preventDefault();
    await setDoctor(doctorOne);
  }
  
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

          {
            doctors.map((doctor: Doctor, index: number) => {
              return (
                <div className="col-md-4 col-sm-6" key={index}>
                  <a href="/doctorsOne" onClick={(e: any) => handleNavigation(e, doctor)}>
                    <div className="team-thumb wow fadeInUp" data-wow-delay="0.2s">
                      <img
                        src={doctor.imagePath.url}
                        className="img-responsive" alt={doctor.imagePath.altName}
                        style={{
                          maxHeight: "332px",
                          objectFit: "cover"
                        }}
                        />
                      <div className="team-info">
                        <h3>{doctor.name} {doctor.surname}</h3>
                        <p>{doctor.specialty}</p>
                        <div className="team-contact-info">
                          <p onClick={() => window.open(`tel:${doctor.phoneNumber}`)}><i className="fa fa-phone"></i>{doctor.phoneNumber}</p>
                          <p>
                            <Link
                              to='#'
                              onClick={(e: any) => {
                                window.location.href = `mailto:${doctor.email}`;
                                e.preventDefault();
                              }}
                              className="email-icon"
                            >
                              <i className="fa fa-envelope-o"></i> <i>{doctor.email}</i>
                            </Link>
                          </p>
                        </div>
                        <ul className="social-icon">
                          <li><Link to={doctor.linkedInAccount} className="fa fa-linkedin-square"></Link></li>
                          <li>
                            <Link
                              to='#'
                              onClick={(e: any) => {
                                window.location.href = `mailto:${doctor.email}`;
                                e.preventDefault();
                              }}
                              style={{paddingLeft: 13, paddingRight: 13, paddingTop: 11, paddingBottom: 13}}
                            ><i className="fa fa-envelope-o"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>

                    </div>
                  </a>
                </div>
              )
            })
          }

        </div>

        <div style={{ width: '100%', display: "flex", marginTop: "20px", justifyContent: "center" }}>
          <button id="cf-submit" name="meet" style={{ height: "40px", width: "200px", backgroundColor: "#A5C422", borderWidth: "0px", color: 'white', borderRadius: "3px", fontWeight: "600" }}>
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
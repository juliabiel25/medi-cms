import * as React from 'react';
import { useEffect } from 'react';
import { dbStore } from '../utils/firebase';
import { collection, doc, getDocs } from 'firebase/firestore/lite';
import { Doctor } from '../interfaces/interface';
import { useAtom } from 'jotai';
import { doctorStore, doctorsStore } from '../stores/basicInfoStore';
import { Link } from 'react-router-dom';

const Team = () => {
  const [doctors, setDoctors] = useAtom(doctorsStore),
    [doctor, setDoctor] = useAtom(doctorStore)

  useEffect(() => {
    async function getDoctors(db: any) {
      const dataCol = collection(db, 'doctors');
      const dataSnapshot = await getDocs(dataCol);
      const dataList = dataSnapshot.docs.map(doc => doc.data());
      let reqData = {...dataList};

      const doctorArray: Doctor[] = []

      let counter = 1
      for (var key in reqData) {
        let data: Doctor

        if (counter <= 3) {
          data = {
            educationInformation: reqData[key].educationInformation,
            email: reqData[key].email,
            facebookAccount: reqData[key].facebookAccount,
            fieldOfInterest: reqData[key].fieldOfInterest,
            imagePath: reqData[key].imagePath,
            imageRef: reqData[key].imageRef,
            linkedInAccount: reqData[key].linkedInAccount,
            name: reqData[key].name,
            phoneNumber: reqData[key].phoneNumber,
            specialty:reqData[key].specialty,
            surname: reqData[key].surname,
            services: reqData[key].services,
          }

          doctorArray.push(data)
          counter++
        } else break
      }

      setDoctors(doctorArray)
    }

    getDoctors(dbStore).catch(console.error);
  }, [])
  
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
            doctors.map((doctor: Doctor) => {
              return (
                <div className="col-md-4 col-sm-6">
                  <a 
                    href="/doctorsOne"
                    onClick={() => setDoctor(doctor)}
                  >
                    <div className="team-thumb wow fadeInUp" data-wow-delay="0.2s">
                      <img src="images/team-image1.jpg" className="img-responsive" alt="" />

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
                          <li><a href={doctor.linkedInAccount} className="fa fa-linkedin-square"></a></li>
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